import { users } from "@/db/schema/auth";
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const workspaces = pgTable("workspaces", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
});

export const userOwnsWorkspaces = pgTable(
  "user_owns_workspaces",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    workspaceId: integer("workspace_id")
      .notNull()
      .references(() => workspaces.id),
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
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.workspaceId] }),
    };
  },
);

export const workspaceFolders = pgTable("workspace_folders", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id")
    .notNull()
    .references(() => workspaces.id),
  title: text("title").notNull(),
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
