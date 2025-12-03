import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardEntry {
  user: {
    id: number;
    username: string;
    createdAt: string;
  };
  result: {
    id: number;
    finalValue: number;
    completedAt: string;
  };
}

export default function Leaderboard() {
  const { data: leaderboard, isLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ['/api/leaderboard'],
  });

  if (isLoading) {
    return (
      <Card className="bg-slate-800/80 border-slate-600">
        <CardHeader>
          <CardTitle className="text-gold flex items-center">
            <Trophy className="mr-2" size={20} />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-slate-400">Loading leaderboard...</div>
        </CardContent>
      </Card>
    );
  }

  if (!leaderboard || leaderboard.length === 0) {
    return (
      <Card className="bg-slate-800/80 border-slate-600">
        <CardHeader>
          <CardTitle className="text-gold flex items-center">
            <Trophy className="mr-2" size={20} />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-slate-400">
            No winners yet! Be the first to save your business empire.
          </div>
        </CardContent>
      </Card>
    );
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="text-gold" size={24} />;
      case 1:
        return <Medal className="text-slate-300" size={24} />;
      case 2:
        return <Award className="text-orange-400" size={24} />;
      default:
        return <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-sm font-bold">{index + 1}</div>;
    }
  };

  return (
    <Card className="bg-slate-800/80 border-slate-600">
      <CardHeader>
        <CardTitle className="text-gold flex items-center">
          <Trophy className="mr-2" size={20} />
          Top Business Saviors
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboard.map((entry, index) => (
            <div 
              key={entry.result.id}
              className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg border border-slate-600"
            >
              <div className="flex items-center space-x-3">
                {getRankIcon(index)}
                <div>
                  <div className="font-bold text-white">{entry.user.username}</div>
                  <div className="text-xs text-slate-400">
                    {new Date(entry.result.completedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-success">
                  ${(entry.result.finalValue / 1_000_000).toFixed(1)}M
                </div>
                <div className="text-xs text-slate-400">Final Portfolio</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}