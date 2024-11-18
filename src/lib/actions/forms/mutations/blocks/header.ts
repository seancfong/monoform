"use server";

import * as schema from "@/db/schema";
import { blocks } from "@/db/schema";
import { validateUser } from "@/lib/auth/validate-user";
import { userOwnsBlock } from "@/lib/queries/blocks";
import { FormBlock } from "@/lib/types/forms";
import { Pool } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-serverless";
import { revalidatePath } from "next/cache";

/**
 * Data integrity must be followed for this mutation:
 * I.  user must own the mutated block
 * II. block must be a header block
 */
export default async function mutateHeaderBlock(
  formId: string,
  blockDraft: FormBlock,
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

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle(pool, { schema: schema });

  await db.transaction(async (tx) => {
    // Get existing block and its options
    const existingBlock = await tx.query.blocks.findFirst({
      where: eq(blocks.id, blockDraft.id),
    });

    if (!existingBlock) {
      return;
    }

    // II. Reconcile block type if different
    if (blockDraft.blockType !== existingBlock.blockType) {
      await tx.transaction(async (tx2) => {
        await tx2.delete(blocks).where(eq(blocks.id, blockDraft.id));
        await tx2.insert(blocks).values({
          id: existingBlock.id,
          text: blockDraft.text,
          description: blockDraft.description,
          required: blockDraft.required,
          blockType: blockDraft.blockType,
          sectionId: existingBlock.sectionId,
          orderNum: existingBlock.orderNum,
        });
      });
    } else {
      await tx
        .update(blocks)
        .set({
          text: blockDraft.text,
          description: blockDraft.description,
          required: blockDraft.required,
        })
        .where(eq(blocks.id, blockDraft.id));
    }
  });

  revalidatePath(`/edit/${formId}`, "page");

  await pool.end();
}
