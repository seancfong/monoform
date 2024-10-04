"use server";

import { validateUser } from "@/lib/auth/validate-user";

export default async function createSection({ formId }: { formId: string }) {
  const { user } = await validateUser();

  //   TODO: check if user owns form
}
