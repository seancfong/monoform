"use server";

import * as schema from "@/db/schema";
import { blocks, multipleChoiceOptions } from "@/db/schema";
import { validateUser } from "@/lib/auth/validate-user";
import { userOwnsBlock } from "@/lib/queries/blocks";
import { MultipleChoiceBlock } from "@/lib/types/forms";
import { Pool } from "@neondatabase/serverless";
import { and, asc, eq, notInArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-serverless";
import { revalidatePath } from "next/cache";

/**
 * Data integrity must be followed for this mutation:
 * I.   user must own the mutated block
 * II. orderNum must be sequential (0-based index) for each option
 * III.  block must be a multiple choice block
 *      otherwise, reconcile block type
 * IV.  newly inserted options must belong to the block
 * V.   existing options that belong to the block may be inserted, but options that
 *      do not belong to the block will be ignored
 */
export default async function mutateMultipleChoiceBlock(
  formId: string,
  blockDraft: MultipleChoiceBlock,
) {
  console.log("Mutating multiple choice block", blockDraft);
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

  // II. Re-assign order numbers
  blockDraft.multipleChoiceOptions.forEach((option, index) => {
    if (option.orderNum !== index) {
      option.orderNum = index;
    }
  });

  // Begin transaction
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle(pool, { schema: schema });

  await db.transaction(async (tx) => {
    // Get existing block and its options
    const existingBlock = await tx.query.blocks.findFirst({
      where: eq(blocks.id, blockDraft.id),
      with: {
        multipleChoiceOptions: {
          orderBy: asc(multipleChoiceOptions.orderNum),
        },
      },
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
      await tx.transaction(async (tx2) => {
        // Delete old options that are not in new draft
        await tx2.delete(multipleChoiceOptions).where(
          and(
            eq(multipleChoiceOptions.blockId, blockDraft.id),
            notInArray(
              multipleChoiceOptions.id,
              blockDraft.multipleChoiceOptions.map((option) => option.id),
            ),
          ),
        );
        await tx2
          .update(blocks)
          .set({
            text: blockDraft.text,
            description: blockDraft.description,
            required: blockDraft.required,
          })
          .where(eq(blocks.id, blockDraft.id));
      });
    }

    // Update new options
    await Promise.all([
      ...blockDraft.multipleChoiceOptions.map((option) => {
        return (
          tx
            .insert(multipleChoiceOptions)
            // IV. Newly inserted options must belong to the block
            .values({
              id: option.id,
              text: option.text,
              orderNum: option.orderNum,
              blockId: blockDraft.id,
            })
            // V. Existing options that belong to the block may be inserted, but options that
            //     do not belong to the block will be ignored
            .onConflictDoUpdate({
              target: multipleChoiceOptions.id,
              set: {
                text: option.text,
                orderNum: option.orderNum,
              },
              setWhere: eq(multipleChoiceOptions.blockId, existingBlock.id),
            })
        );
      }),
    ]);
  });

  revalidatePath(`/edit/${formId}`, "page");

  await pool.end();
}
