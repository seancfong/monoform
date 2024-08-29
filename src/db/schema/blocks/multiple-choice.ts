import { blocks, responses } from "@/db/schema/forms";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const multipleChoiceOptions = pgTable("multiple_choice_options", {
  id: serial("id").primaryKey(),
  blockId: integer("block_id")
    .notNull()
    .references(() => blocks.id),
  text: text("text").notNull(),
  orderNum: integer("order_num").notNull(),
});

export const multipleChoiceResponses = pgTable("multiple_choice_responses", {
  responseId: integer("response_id").references(() => responses.id),
  selectedOptionId: integer("selected_option_id").references(
    () => multipleChoiceOptions.id,
  ),
});
