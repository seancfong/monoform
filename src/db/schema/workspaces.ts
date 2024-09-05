import { users } from "@/db/schema/auth";
import { InferSelectModel } from "drizzle-orm";
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

export const workspaces = pgTable("workspaces", {
  id: serial("id").primaryKey(),
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

export const usersOwnWorkspaces = pgTable(
  "users_own_workspaces",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    workspaceId: integer("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    orderNum: integer("order_num").notNull(),
    slug: text("slug").notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.workspaceId] }),
      unq: unique().on(table.userId, table.slug),
      unq2: unique().on(table.userId, table.workspaceId, table.orderNum),
    };
  },
);

export const workspaceFolders = pgTable("workspace_folders", {
  id: uuid("id").primaryKey().defaultRandom(),
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

export type SelectWorkspaces = InferSelectModel<typeof workspaces>;
export type SelectWorkspaceFolders = InferSelectModel<typeof workspaceFolders>;
export type SelectUserOwnsWorkspaces = InferSelectModel<
  typeof usersOwnWorkspaces
>;
