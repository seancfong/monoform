"use server";

import * as schema from "@/db/schema";
import { blocks } from "@/db/schema";
import { validateUser } from "@/lib/auth/validate-user";
import { userOwnsSection } from "@/lib/queries/forms";
import { Pool } from "@neondatabase/serverless";
import { asc, eq, inArray, sql, SQL } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-serverless";
import { revalidatePath } from "next/cache";

export default async function reorderSectionBlocks(
  formId: string,
  sectionId: string,
  blockDraftIds: string[],
) {
  const { user } = await validateUser();

  // I. Check if user owns section
  // TODO: use unstable cache
  const [ownedSection] = await userOwnsSection.execute({
    sectionId,
    formId,
    userId: user.id,
  });

  if (!ownedSection) {
    return;
  }

  const draftIndexMap = new Map<string, number>();

  blockDraftIds.forEach((id, index) => {
    draftIndexMap.set(id, index);
  });

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema: schema });

  await db.transaction(async (tx) => {
    const currentBlocks = await tx.query.blocks.findMany({
      columns: { id: true },
      where: eq(schema.blocks.sectionId, sectionId),
      orderBy: asc(schema.blocks.orderNum),
    });

    if (
      currentBlocks.length !== blockDraftIds.length ||
      !currentBlocks ||
      !blockDraftIds
    ) {
      tx.rollback();
    }

    await updateAllBlockOrders(currentBlocks, draftIndexMap, tx);
  });

  revalidatePath(`/console/${formId}`);
  revalidatePath(`/fill/${formId}`);

  await pool.end();
}

async function updateAllBlockOrders(
  currentBlocks: { id: string }[],
  draftIndexMap: Map<string, number>,
  tx: any,
) {
  const sqlChunks: SQL[] = [];
  const ids: string[] = [];

  sqlChunks.push(sql`(case`);

  currentBlocks.forEach(async (currentBlock) => {
    const newBlockIndex = draftIndexMap.get(currentBlock.id);

    if (newBlockIndex === undefined) {
      console.log("rollback");
      tx.rollback();
    }

    sqlChunks.push(
      sql`when ${blocks.id} = ${currentBlock.id} then ${newBlockIndex}::integer`,
    );
    ids.push(currentBlock.id);
  });

  sqlChunks.push(sql`end)`);
  const finalSql: SQL = sql.join(sqlChunks, sql.raw(" "));

  await tx
    .update(blocks)
    .set({ orderNum: finalSql })
    .where(inArray(blocks.id, ids));
}
