import { db } from "@/db";
import { emailVerificationCodes } from "@/db/schema";
import VerifyUserEmail from "@/emails/verification-code";
import { eq } from "drizzle-orm";
import { TimeSpan, createDate } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function generateEmailVerificationCode(
  userId: string,
  email: string,
): Promise<string> {
  await db
    .delete(emailVerificationCodes)
    .where(eq(emailVerificationCodes.userId, userId));

  const code = generateRandomString(6, alphabet("0-9", "A-Z"));

  await db.insert(emailVerificationCodes).values({
    userId,
    email,
    code,
    expiresAt: createDate(new TimeSpan(15, "m")),
  });

  return code;
}

export async function sendVerificationCode(email: string, code: string) {
  // TODO: add domain
  const sender = "Acme <onboarding@resend.dev>";

  const recipient =
    process.env.VERCEL_ENV === "production" ? email : "delivered@resend.dev";

  const { error } = await resend.emails.send({
    from: sender,
    to: [recipient],
    subject: "[Monoform] Verify your email",
    react: VerifyUserEmail({ verificationCode: code }),
  });

  if (error) {
    throw error;
  }
}
