import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").unique(),
  passwordHash: text("password_hash"),
});

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
