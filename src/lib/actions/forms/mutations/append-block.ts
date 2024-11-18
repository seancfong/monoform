"use server";

import { db } from "@/db";
import { blocks, BlockVariant, InsertBlocks } from "@/db/schema";
import { validateUser } from "@/lib/auth/validate-user";
import { revalidatePath } from "next/cache";

export default async function appendBlockToSection(
  sectionId: string,
  newBlock: InsertBlocks,
  formId: string,
) {
  const { user } = await validateUser();

  // TODO: check if section belongs to user

  // TODO: manually check orderNum

  await db.insert(blocks).values(newBlock);

  revalidatePath(`/edit/${formId}`, "page");
}
