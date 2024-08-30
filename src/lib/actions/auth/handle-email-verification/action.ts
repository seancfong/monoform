"use server";

import {
  verifyEmailCodeFormSchema,
  VerifyEmailCodeFormState,
} from "@/lib/actions/auth/handle-email-verification/schema";
import { db } from "@/db";
import { emailVerificationCodes, users } from "@/db/schema";
import { lucia } from "@/lib/auth";
import { validateRequest } from "@/lib/auth/validate-user";
import { eq } from "drizzle-orm";
import type { User } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isWithinExpirationDate } from "oslo";

export default async function handleEmailVerification(
  _: VerifyEmailCodeFormState,
  formData: FormData,
): Promise<VerifyEmailCodeFormState> {
  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  const parsed = verifyEmailCodeFormSchema.safeParse({
    code: formData.get("code"),
  });

  if (!parsed.success) {
    return {
      error: "Invalid verification code",
    };
  }

  const { code } = parsed.data;

  const validCode = await verifyVerificationCode(user, code);

  if (!validCode) {
    return {
      error: "Invalid verification code",
    };
  }

  await lucia.invalidateUserSessions(user.id);
  await db
    .update(users)
    .set({ emailVerified: true })
    .where(eq(users.id, user.id));

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect("/dashboard");
}

async function verifyVerificationCode(
  user: User,
  code: string,
): Promise<boolean> {
  const [databaseCode] = await db
    .select()
    .from(emailVerificationCodes)
    .where(eq(emailVerificationCodes.userId, user.id));

  if (!databaseCode || databaseCode.code !== code) {
    return false;
  }

  await db
    .delete(emailVerificationCodes)
    .where(eq(emailVerificationCodes.id, databaseCode.id));

  if (!isWithinExpirationDate(databaseCode.expiresAt)) {
    return false;
  }

  if (databaseCode.email !== user.email) {
    return false;
  }

  return true;
}
