import { pgTable, serial, text, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Game results table
export const gameResults = pgTable("game_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  initialValue: decimal("initial_value", { precision: 10, scale: 2 }).notNull(),
  finalValue: decimal("final_value", { precision: 10, scale: 2 }).notNull(),
  roundsPlayed: integer("rounds_played").notNull(),
  isWinner: boolean("is_winner").notNull().default(false),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type GameResult = typeof gameResults.$inferSelect;
export type InsertGameResult = typeof gameResults.$inferInsert;

// Zod schemas
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertGameResultSchema = createInsertSchema(gameResults);
export const selectGameResultSchema = createSelectSchema(gameResults);
