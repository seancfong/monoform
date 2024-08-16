import { db } from "@/db";
import { emailVerificationCodes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";

export async function generateEmailVerificationCode(
  userId: string,
  email: string
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

export async function sendVerificationCode(email: string, code: string) {}
