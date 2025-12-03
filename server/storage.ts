import { users, gameResults, type User, type InsertUser, type GameResult, type InsertGameResult } from "../shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveGameResult(gameResult: InsertGameResult): Promise<GameResult>;
  getUserGameResults(userId: number): Promise<GameResult[]>;
  getLeaderboard(): Promise<{ user: User; result: GameResult }[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async saveGameResult(gameResult: InsertGameResult): Promise<GameResult> {
    const [result] = await db
      .insert(gameResults)
      .values(gameResult)
      .returning();
    return result;
  }

  async getUserGameResults(userId: number): Promise<GameResult[]> {
    return await db
      .select()
      .from(gameResults)
      .where(eq(gameResults.userId, userId))
      .orderBy(desc(gameResults.completedAt));
  }

  async getLeaderboard(): Promise<{ user: User; result: GameResult }[]> {
    const results = await db
      .select({
        user: users,
        result: gameResults
      })
      .from(gameResults)
      .innerJoin(users, eq(gameResults.userId, users.id))
      .where(eq(gameResults.isWinner, true))
      .orderBy(desc(gameResults.finalValue))
      .limit(10);
    
    return results;
  }
}

export const storage = new DatabaseStorage();
