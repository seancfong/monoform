import { users } from "@/db/schema/auth";
import { workspaceFolders } from "@/db/schema/workspaces";
import { InferSelectModel } from "drizzle-orm";
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

const BLOCK_TYPES = ["HEADER", "MULTIPLE_CHOICE", "CHECKBOX"] as const;

export const blockTypeEnum = pgEnum("blockType", BLOCK_TYPES);

export const forms = pgTable("forms", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  workspaceFolderId: integer("workspace_folder_id")
    .notNull()
    .references(() => workspaceFolders.id, { onDelete: "cascade" }),
  description: text("description"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const sections = pgTable("sections", {
  id: serial("id").primaryKey(),
  formId: uuid("form_id")
    .notNull()
    .references(() => forms.id),
  title: text("title").notNull(),
  orderNum: integer("order_num").notNull(),
});

export const blocks = pgTable("blocks", {
  id: serial("id").primaryKey(),
  sectionId: integer("section_id")
    .notNull()
    .references(() => sections.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  description: text("description"),
  blockType: blockTypeEnum("block_type").notNull(),
  orderNum: integer("order_num").notNull(),
  required: boolean("required").notNull().default(false),
});

export const responses = pgTable("responses", {
  id: serial("id").primaryKey(),
  responderId: text("responder_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  submittedAt: timestamp("submitted_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
  formId: uuid("form_id")
    .notNull()
    .references(() => forms.id),
});

export type SelectForms = InferSelectModel<typeof forms>;
export type SelectSections = InferSelectModel<typeof sections>;
export type SelectBlocks = InferSelectModel<typeof blocks>;
export type SelectResponses = InferSelectModel<typeof responses>;
