import { users } from "@/db/schema/auth";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

const BLOCK_TYPES = ["HEADER", "MULTIPLE_CHOICE", "CHECKBOX"] as const;

export const blockTypeEnum = pgEnum("blockType", BLOCK_TYPES);

export const forms = pgTable("forms", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  workspaceFolderId: text("workspace_folder_id").notNull(),
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
  formId: integer("form_id")
    .notNull()
    .references(() => forms.id),
  title: text("title").notNull(),
  orderNum: integer("order_num").notNull(),
});

export const blocks = pgTable("blocks", {
  id: serial("id").primaryKey(),
  sectionId: integer("section_id")
    .notNull()
    .references(() => sections.id),
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
    .references(() => users.id),
  submittedAt: timestamp("submitted_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
  formId: integer("form_id")
    .notNull()
    .references(() => forms.id),
});
