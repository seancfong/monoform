import { blocks, responses } from "@/db/schema/forms";
import { InferSelectModel, relations } from "drizzle-orm";
import { integer, pgTable, serial, text, uuid } from "drizzle-orm/pg-core";

export const multipleChoiceOptions = pgTable("multiple_choice_options", {
  id: serial("id").primaryKey(),
  blockId: uuid("block_id")
    .notNull()
    .references(() => blocks.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  orderNum: integer("order_num").notNull(),
});

export const multipleChoiceOptionsRelations = relations(
  multipleChoiceOptions,
  ({ one }) => ({
    block: one(blocks, {
      fields: [multipleChoiceOptions.blockId],
      references: [blocks.id],
    }),
  }),
);

export const multipleChoiceResponses = pgTable("multiple_choice_responses", {
  responseId: integer("response_id").references(() => responses.id),
  selectedOptionId: integer("selected_option_id").references(
    () => multipleChoiceOptions.id,
    { onDelete: "cascade" },
  ),
});

export type SelectMultipleChoiceOptions = InferSelectModel<
  typeof multipleChoiceOptions
>;
export type SelectMultipleChoiceResponses = InferSelectModel<
  typeof multipleChoiceResponses
>;
