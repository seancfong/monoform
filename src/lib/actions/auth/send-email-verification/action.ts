"use server";

import {
  generateEmailVerificationCode,
  sendVerificationCode,
} from "@/lib/auth/email-verification";
import { validateRequest } from "@/lib/auth/validate-user";
import { redirect } from "next/navigation";

interface ActionResponse {
  success: boolean;
  message: string;
}

export default async function sendEmailVerification(): Promise<ActionResponse> {
  const { user } = await validateRequest();

  if (!user || !user.email || !user.id) {
    redirect("/login");
  }

  if (user.emailVerified) {
    redirect("/workspace");
  }

  const userId = user.id;
  const email = user.email;

  const verificationCode = await generateEmailVerificationCode(userId, email);

  try {
    if (process.env.VERCEL_ENV === "development") {
      console.log("Email verification code: ", verificationCode);
    } else {
      await sendVerificationCode(email, verificationCode);
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to send verification code",
    };
  }

  return {
    success: true,
    message: `Look out for a code sent to ${email}.`,
  };
}
