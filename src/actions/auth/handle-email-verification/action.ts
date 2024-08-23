"use server";

import {
  verifyEmailCodeFormSchema,
  VerifyEmailCodeFormState,
} from "@/actions/auth/handle-email-verification/schema";

export default async function handleEmailVerification(
  _: VerifyEmailCodeFormState,
  formData: FormData,
): Promise<VerifyEmailCodeFormState> {
  const parsed = verifyEmailCodeFormSchema.safeParse({
    code: formData.get("code"),
  });

  if (!parsed.success) {
    return {
      error: "Invalid verification code",
    };
  }

  const { code } = parsed.data;

  console.log("da code is", code);

  return {
    error: "",
  };
}
