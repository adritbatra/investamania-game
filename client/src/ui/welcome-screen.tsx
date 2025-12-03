import { Button } from "@/components/ui/button";
import { soundManager } from "@/lib/sounds";
import { Coins, ChartLine, DollarSign, Rocket, TriangleAlert, Trophy } from "lucide-react";
import { Link } from "wouter";

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Floating icons animation */}
        <div className="relative mb-8">
          <div className="absolute top-4 left-1/4 animate-float">
            <Coins className="text-gold text-2xl opacity-60" size={24} />
          </div>
          <div className="absolute top-12 right-1/3 animate-bounce-subtle">
            <ChartLine className="text-success text-xl opacity-40" size={20} />
          </div>
          <div className="absolute -top-2 right-1/4 animate-pulse-slow">
            <DollarSign className="text-gold text-lg opacity-50" size={18} />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent leading-tight">
          INVESTAMANIA
        </h1>
        
        <div className="mb-8 p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
          <p className="text-xl md:text-2xl text-slate-300 mb-4 font-medium">
            Can you save your business empire from utter collapse?
          </p>
          <div className="flex items-center justify-center space-x-2 text-danger">
            <TriangleAlert size={16} />
            <span className="text-sm uppercase tracking-wide font-bold">Critical Mission</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={() => {
              soundManager.playButtonClick();
              onStart();
            }}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-12 py-5 rounded-xl text-xl font-bold uppercase tracking-wide hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-yellow-300"
            size="lg"
          >
            <Rocket className="mr-3" size={20} />
            Save Your Business
          </Button>
          
          <div className="text-center">
            <Link href="/leaderboard">
              <Button 
                variant="outline" 
                className="border-2 border-yellow-400 text-yellow-300 bg-yellow-900/30 hover:bg-yellow-400 hover:text-black transition-all duration-300 px-6 py-3 font-bold"
              >
                <Trophy className="mr-2" size={16} />
                View Leaderboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
