"use server";

import { loginFormSchema, LoginFormState } from "@/actions/auth/login/schema";
import { db } from "@/db";
import { passwords, users } from "@/db/schema";
import { lucia } from "@/lib/auth";
import { verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
  _: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const parsed = loginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      error: "Incorrect email or password",
    };
  }

  const { email, password } = parsed.data;

  const [existingUser] = await db
    .select({
      id: users.id,
      passwordHash: passwords.passwordHash,
    })
    .from(users)
    .where(eq(users.email, email))
    .innerJoin(passwords, eq(users.id, passwords.userId))
    .limit(1);

  if (!existingUser) {
    // NOTE:
    // Returning immediately allows malicious actors to figure out valid emails from response times,
    // allowing them to only focus on guessing passwords in brute-force attacks.
    // As a preventive measure, you may want to hash passwords even for invalid emails.
    // However, valid emails can be already be revealed with the signup page
    // and a similar timing issue can likely be found in password reset implementation.
    // It will also be much more resource intensive.
    // Since protecting against this is non-trivial,
    // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
    // If emails/usernames are public, you may outright tell the user that the username is invalid.
    return {
      error: "Incorrect email or password",
    };
  }

  const validPassword = await verify(existingUser.passwordHash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  if (!validPassword) {
    return {
      error: "Incorrect email or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect("/dashboard");
}
