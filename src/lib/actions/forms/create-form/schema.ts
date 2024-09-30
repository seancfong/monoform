import { z } from "zod";

export const createFormSchema = z.object({
  "folder-id": z.string().uuid(),
  name: z.string().min(1, { message: "Form name is required" }).max(255, {
    message: "Form name is too long",
  }),
});

export interface CreateFormState {
  error: string;
}
