import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(1, { message: "Password must not be empty" })
    .max(255, { message: "Invalid password" }),
});
