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
 * I. user must own the mutated block
 * II. orderNum must be sequential (0-based index) for each option
 * III. newly inserted options must belong to the block
 * IV. existing options that belong to the block may be inserted, but options that
 *     do not belong to the block will be ignored
 */
export default async function mutateMultipleChoiceBlock(
  formId: string,
  blockDraft: MultipleChoiceBlock,
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

    const draftMultipleChoiceIds = blockDraft.multipleChoiceOptions.map(
      (option) => option.id,
    );

    // Delete old options that are not in new draft
    await tx
      .delete(multipleChoiceOptions)
      .where(
        and(
          eq(multipleChoiceOptions.blockId, blockDraft.id),
          notInArray(multipleChoiceOptions.id, draftMultipleChoiceIds),
        ),
      );

    // Update block and new options
    await Promise.all([
      tx
        .update(blocks)
        .set({
          text: blockDraft.text,
          description: blockDraft.description,
          required: blockDraft.required,
        })
        .where(eq(blocks.id, blockDraft.id)),
      ...blockDraft.multipleChoiceOptions.map((option) => {
        return (
          tx
            .insert(multipleChoiceOptions)
            // III. Newly inserted options must belong to the block
            .values({
              id: option.id,
              text: option.text,
              orderNum: option.orderNum,
              blockId: blockDraft.id,
            })
            // IV. Existing options that belong to the block may be inserted, but options that
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

    // TODO: reconcile block type
    // if (blockDraft.blockType !== currentBlock.blockType) {
    // }
  });

  revalidatePath(`/edit/${formId}`, "page");

  await pool.end();
}
