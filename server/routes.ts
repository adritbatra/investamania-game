import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGameResultSchema } from "../shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Save game result
  app.post("/api/game-results", async (req, res) => {
    try {
      const gameResult = insertGameResultSchema.parse(req.body);
      const result = await storage.saveGameResult(gameResult);
      res.json(result);
    } catch (error) {
      console.error("Error saving game result:", error);
      res.status(400).json({ error: "Invalid game result data" });
    }
  });

  // Get leaderboard
  app.get("/api/leaderboard", async (req, res) => {
    try {
      const leaderboard = await storage.getLeaderboard();
      res.json(leaderboard);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

  // Get user's game history
  app.get("/api/game-results/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      
      const results = await storage.getUserGameResults(userId);
      res.json(results);
    } catch (error) {
      console.error("Error fetching user game results:", error);
      res.status(500).json({ error: "Failed to fetch game results" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
