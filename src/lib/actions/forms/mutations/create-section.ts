"use server";

import { db } from "@/db";
import { InsertSections, sections } from "@/db/schema";
import { validateUser } from "@/lib/auth/validate-user";
import { revalidatePath } from "next/cache";

export default async function createSection(
  formId: string,
  newSection: InsertSections,
) {
  const { user } = await validateUser();

  // TODO: check if user owns form

  // TODO: manually set orderNum

  await db.insert(sections).values(newSection);

  revalidatePath(`/edit/${formId}`, "page");
  revalidatePath(`/fill/${formId}`, "page");
}
