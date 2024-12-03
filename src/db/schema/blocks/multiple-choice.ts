import { blocks, responses } from "@/db/schema/forms";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const multipleChoiceOptions = pgTable("multiple_choice_options", {
  id: uuid("id").primaryKey().defaultRandom(),
  blockId: uuid("block_id")
    .notNull()
    .references(() => blocks.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  orderNum: integer("order_num").notNull(),
});

export const multipleChoiceOptionsRelations = relations(
  multipleChoiceOptions,
  ({ one, many }) => ({
    block: one(blocks, {
      fields: [multipleChoiceOptions.blockId],
      references: [blocks.id],
    }),
    multipleChoiceBlockResponses: many(multipleChoiceResponses),
  }),
);

export const multipleChoiceResponses = pgTable("multiple_choice_responses", {
  responseId: integer("response_id").references(() => responses.id, {
    onDelete: "cascade",
  }),
  selectedOptionId: uuid("selected_option_id").references(
    () => multipleChoiceOptions.id,
    { onDelete: "cascade" },
  ),
});

export const multipleChoiceResponsesRelations = relations(
  multipleChoiceResponses,
  ({ one }) => ({
    response: one(responses, {
      fields: [multipleChoiceResponses.responseId],
      references: [responses.id],
    }),
    selectedOption: one(multipleChoiceOptions, {
      fields: [multipleChoiceResponses.selectedOptionId],
      references: [multipleChoiceOptions.id],
    }),
  }),
);

export type SelectMultipleChoiceOptions = InferSelectModel<
  typeof multipleChoiceOptions
>;
export type SelectMultipleChoiceResponses = InferSelectModel<
  typeof multipleChoiceResponses
>;
export type InsertMultipleChoiceResponses = InferInsertModel<
  typeof multipleChoiceResponses
>;
