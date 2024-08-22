"use server";

import { signupFormSchema } from "@/app/(auth)/signup/signupFormSchema";
import { db } from "@/db";
import { users } from "@/db/schema";
import { lucia } from "@/lib/auth";
import {
  generateEmailVerificationCode,
  sendVerificationCode,
} from "@/lib/auth/email-verification";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface FormState {
  error: string;
}

export async function signup(formData: FormData): Promise<FormState> {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const parsed = signupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      error: "Invalid email or password",
    };
  }

  const { email, password } = parsed.data;

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
