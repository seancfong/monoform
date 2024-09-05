import { z } from "zod";

export const verifyEmailCodeFormSchema = z.object({
  code: z.string().length(6, { message: "Invalid code" }),
});

export interface VerifyEmailCodeFormState {
  error: string;
}
