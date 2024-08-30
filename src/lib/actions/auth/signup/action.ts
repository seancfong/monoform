"use server";

import {
  SignupFormState,
  signupFormSchema,
} from "@/lib/actions/auth/signup/schema";
import { db } from "@/db";
import { passwords, users } from "@/db/schema";
import { lucia } from "@/lib/auth";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(
  _: SignupFormState,
  formData: FormData,
): Promise<SignupFormState> {
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
      emailVerified: false,
    });
    await db.insert(passwords).values({
      passwordHash,
      userId,
    });
  } catch (error) {
    return {
      error: "User already exists",
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
