import { and, eq, InferSelectModel } from "drizzle-orm";
import { db } from "@/db";
import { oauthAccounts } from "@/db/schema";

export async function getOAuthAccount(
  providerId: InferSelectModel<typeof oauthAccounts>["providerId"],
  providerUserId: string,
) {
  return await db
    .select()
    .from(oauthAccounts)
    .where(
      and(
        eq(oauthAccounts.providerId, providerId),
        eq(oauthAccounts.providerUserId, providerUserId),
      ),
    )
    .limit(1);
}
