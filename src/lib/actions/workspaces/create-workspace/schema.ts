import { z } from "zod";

const SLUG_REGEX = /^[a-z](-?[a-z0-9])*$/;

export const createWorkspaceFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  slug: z.string().regex(SLUG_REGEX, {
    message: "Invalid URL path",
  }),
});

export interface CreateWorkspaceFormState {
  error: string;
}
