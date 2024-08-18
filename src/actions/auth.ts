"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { lucia } from "@/lib/auth";
import { isValidEmail } from "@/lib/auth/email-utils";
import {
  generateEmailVerificationCode,
  sendVerificationCode,
} from "@/lib/auth/email-verification";
import { validateRequest } from "@/lib/auth/validate-user";
import { hash, verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ActionResult {
  error: string;
}

export async function signup(formData: FormData): Promise<ActionResult> {
  const email = formData.get("email");
  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return {
      error: "Invalid email",
    };
  }

  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  const passwordHash = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  const userId = generateIdFromEntropySize(10); // 16 characters long

  try {
    await db.insert(users).values({
      id: userId,
      email,
      passwordHash: passwordHash,
      emailVerified: false,
    });
  } catch (error) {
    return {
      error: "User already exists",
    };
  }

  const verificationCode = await generateEmailVerificationCode(userId, email);

  try {
    if (process.env.VERCEL_ENV === "development") {
      console.log("Email verification code: ", verificationCode);
    } else {
      await sendVerificationCode(email, verificationCode);
    }
  } catch (error) {
    return {
      error: "Failed to send verification code",
    };
  }

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect("/email-verification");
}

export async function login(formData: FormData): Promise<ActionResult> {
  const email = formData.get("email");
  if (!email || typeof email !== "string") {
    return {
      error: "Invalid email",
    };
  }

  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
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

export async function logout(): Promise<ActionResult> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect("/login");
}
