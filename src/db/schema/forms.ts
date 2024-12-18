import { multipleChoiceOptions, workspaceFolders } from "@/db/schema";
import { users } from "@/db/schema/auth";
import { enumToPgEnum } from "@/lib/utils/enums";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export enum BlockVariant {
  HEADER = "HEADER",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  CHECKBOX = "CHECKBOX",
}

export const blockTypeEnum = pgEnum("blockType", enumToPgEnum(BlockVariant));

export const forms = pgTable("forms", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  workspaceFolderId: uuid("workspace_folder_id")
    .notNull()
    .references(() => workspaceFolders.id, { onDelete: "cascade" }),
  description: text("description"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

export const formsRelations = relations(forms, ({ one, many }) => ({
  folder: one(workspaceFolders, {
    fields: [forms.workspaceFolderId],
    references: [workspaceFolders.id],
  }),
  sections: many(sections),
}));

export const sections = pgTable(
  "sections",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    formId: uuid("form_id")
      .notNull()
      .references(() => forms.id),
    title: text("title").notNull(),
    orderNum: integer("order_num").notNull(),
  },
  (table) => ({
    unique: [table.formId, table.orderNum],
  }),
);

export const sectionsRelations = relations(sections, ({ one, many }) => ({
  form: one(forms, {
    fields: [sections.formId],
    references: [forms.id],
  }),
  blocks: many(blocks),
}));

export const blocks = pgTable(
  "blocks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sectionId: uuid("section_id")
      .notNull()
      .references(() => sections.id, { onDelete: "cascade" }),
    text: text("text").notNull(),
    description: text("description"),
    blockType: blockTypeEnum("block_type").notNull(),
    orderNum: integer("order_num").notNull(),
    required: boolean("required").notNull().default(false),
  },
  (table) => ({
    unique: [table.sectionId, table.orderNum],
  }),
);

export const blocksRelations = relations(blocks, ({ one, many }) => ({
  section: one(sections, {
    fields: [blocks.sectionId],
    references: [sections.id],
  }),
  multipleChoiceOptions: many(multipleChoiceOptions),
}));

export const responses = pgTable("responses", {
  id: serial("id").primaryKey(),
  responderId: text("responder_id").references(() => users.id, {
    onDelete: "set null",
  }),
  submittedAt: timestamp("submitted_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
  formId: uuid("form_id")
    .notNull()
    .references(() => forms.id, { onDelete: "cascade" }),
});

export type SelectForms = InferSelectModel<typeof forms>;
export type SelectSections = InferSelectModel<typeof sections>;
export type SelectBlocks = InferSelectModel<typeof blocks>;
export type SelectResponses = InferSelectModel<typeof responses>;

export type InsertSections = InferInsertModel<typeof sections>;
export type InsertBlocks = InferInsertModel<typeof blocks>;
