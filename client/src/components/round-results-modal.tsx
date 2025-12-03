import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { soundManager } from "@/lib/sounds";
import { Trophy, TrendingUp, TrendingDown, Crown, Target } from "lucide-react";

interface RoundResultsModalProps {
  isOpen: boolean;
  roundNumber: number;
  startValue: number;
  endValue: number;
  gain: number;
  gainPercentage: number;
  isEarlyVictory?: boolean;
  onContinue: () => void;
}

export default function RoundResultsModal({ 
  isOpen, 
  roundNumber, 
  startValue, 
  endValue, 
  gain, 
  gainPercentage,
  isEarlyVictory = false,
  onContinue 
}: RoundResultsModalProps) {
  const isPositive = gain > 0;
  const isExcellent = gainPercentage > 15;
  const isGood = gainPercentage > 5;
  
  const getPerformanceRating = () => {
    if (gainPercentage > 20) return { text: "Exceptional!", color: "text-yellow-400", icon: Crown };
    if (gainPercentage > 15) return { text: "Excellent", color: "text-green-400", icon: Trophy };
    if (gainPercentage > 5) return { text: "Good", color: "text-blue-400", icon: TrendingUp };
    if (gainPercentage > -5) return { text: "Fair", color: "text-orange-400", icon: Target };
    return { text: "Poor", color: "text-red-400", icon: TrendingDown };
  };

  const performance = getPerformanceRating();
  const PerformanceIcon = performance.icon;

  if (isEarlyVictory) {
    return (
      <Dialog open={isOpen}>
        <DialogContent className="bg-slate-800 border-gold text-white max-w-lg">
          <DialogTitle className="sr-only">Early Victory Achievement</DialogTitle>
          <div className="text-center p-6">
            <div className="text-6xl mb-4">
              <Crown className="text-gold mx-auto animate-pulse" size={64} />
            </div>
            
            <h2 className="text-3xl font-bold mb-4 text-gold">
              🎉 EARLY VICTORY! 🎉
            </h2>
            
            <p className="text-xl text-slate-300 mb-6">
              Incredible! You've reached the $200M target in just {roundNumber} rounds!
            </p>
            
            <div className="bg-gradient-to-r from-gold/20 to-yellow-500/20 rounded-xl p-6 mb-6 border border-gold/30">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-slate-400">Round Completed</div>
                  <div className="text-2xl font-bold text-gold">{roundNumber}/10</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400">Final Portfolio</div>
                  <div className="text-2xl font-bold text-success">${(endValue / 1_000_000).toFixed(1)}M</div>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={() => {
                soundManager.playButtonClick();
                onContinue();
              }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-10 py-4 rounded-xl font-bold text-lg uppercase tracking-wide hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 border-2 border-yellow-300 shadow-lg"
            >
              Claim Victory
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-slate-800 border-slate-600 text-white max-w-lg">
        <DialogTitle className="sr-only">Round {roundNumber} Performance Results</DialogTitle>
        <div className="text-center p-6">
          <div className="text-4xl mb-4">
            <PerformanceIcon className={`${performance.color} mx-auto`} size={48} />
          </div>
          
          <h2 className={`text-2xl font-bold mb-2 ${performance.color}`}>
            Round {roundNumber} Complete
          </h2>
          
          <p className={`text-lg mb-6 ${performance.color} font-medium`}>
            Performance: {performance.text}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-700/50 rounded-xl p-4">
              <div className="text-slate-400 text-sm uppercase tracking-wide">Starting Value</div>
              <div className="text-xl font-bold text-white">${(startValue / 1_000_000).toFixed(1)}M</div>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-4">
              <div className="text-slate-400 text-sm uppercase tracking-wide">Ending Value</div>
              <div className="text-xl font-bold text-success">${(endValue / 1_000_000).toFixed(1)}M</div>
            </div>
          </div>
          
          <div className="bg-slate-700/30 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="text-slate-400 text-sm">Round Gain/Loss</div>
                <div className={`text-2xl font-bold ${isPositive ? 'text-success' : 'text-danger'}`}>
                  {isPositive ? '+' : ''}${(gain / 1_000_000).toFixed(1)}M
                </div>
              </div>
              <div className="text-center">
                <div className="text-slate-400 text-sm">Percentage Change</div>
                <div className={`text-2xl font-bold ${isPositive ? 'text-success' : 'text-danger'}`}>
                  {isPositive ? '+' : ''}{gainPercentage.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={() => {
              soundManager.playButtonClick();
              onContinue();
            }}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg uppercase tracking-wide hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 border-2 border-blue-400 shadow-lg"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}