"use server";

import { db } from "@/db";
import { blocks } from "@/db/schema";
import { validateUser } from "@/lib/auth/validate-user";
import { userOwnsBlock } from "@/lib/queries/blocks";
import { FormSection } from "@/lib/types/forms";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function deleteBlock(
  formId: string,
  blockDraft: FormSection["blocks"][number],
) {
  const { user } = await validateUser();

  // I. Check if user owns block
  // TODO: use unstable cache
  const [ownedBlock] = await userOwnsBlock.execute({
    blockId: blockDraft.id,
    formId,
    userId: user.id,
  });

  if (!ownedBlock || ownedBlock.blockId !== blockDraft.id) {
    return;
  }

  await db.delete(blocks).where(eq(blocks.id, blockDraft.id));

  revalidatePath(`/edit/${formId}`);
  revalidatePath(`/fill/${formId}`);
}
