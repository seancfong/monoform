import {
  fetchGithubUser,
  getPrimaryEmailData,
  GitHubUserResponse,
} from "@/app/(auth)/login/(providers)/github/callback/utils";
import { db } from "@/db";
import { oauthAccounts, users } from "@/db/schema";
import { github, lucia } from "@/lib/auth";
import { getOAuthAccount } from "@/lib/auth/oauth/utils";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";

const REDIRECT_PATH = "/dashboard";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("github_oauth_state")?.value ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);

    const githubUser: GitHubUserResponse = await fetchGithubUser(
      tokens.accessToken,
    );

    const [existingAccount] = await getOAuthAccount("github", githubUser.id);

    if (existingAccount) {
      const session = await lucia.createSession(existingAccount.userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: REDIRECT_PATH,
        },
      });
    }

    const emailData = await getPrimaryEmailData(tokens.accessToken);
    githubUser.emailVerified = emailData.verified;
    githubUser.email = emailData.email;

    const userId = generateIdFromEntropySize(10); // 16 characters long

    await db.insert(users).values({
      id: userId,
      email: githubUser.email,
      emailVerified: githubUser.emailVerified,
    });

    await db.insert(oauthAccounts).values({
      userId,
      providerId: "github",
      providerUserId: githubUser.id,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return new Response(null, {
      status: 302,
      headers: {
        Location: REDIRECT_PATH,
      },
    });
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }

    console.error(e);
    return new Response(null, {
      status: 500,
    });
  }
}
