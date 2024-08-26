import { z } from "zod";

export const signupFormSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(255, { message: "Password must be at most 255 characters" }),
});

export interface SignupFormState {
  error: string;
}
