import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Leaderboard from "@/components/leaderboard";

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2" size={16} />
              Back to Game
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">
            Hall of Fame
          </h1>
          <p className="text-center text-slate-400 text-lg">
            Business empires that survived the crisis
          </p>
        </div>
        
        <Leaderboard />
      </div>
    </div>
  );
}