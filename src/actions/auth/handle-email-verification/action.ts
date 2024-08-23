"use server";

import { VerifyEmailCodeFormState } from "@/actions/auth/handle-email-verification/schema";

export default async function handleEmailVerification(
  formData: FormData,
): Promise<VerifyEmailCodeFormState> {
  console.log("verifying", formData);

  return {
    error: "",
  };
}
