import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { soundManager } from "@/lib/sounds";
import { TrendingUp, TrendingDown, Target, Star, AlertCircle, CheckCircle2 } from "lucide-react";
import { InvestmentResult } from "@/lib/game-logic";

interface InvestmentFeedbackModalProps {
  isOpen: boolean;
  results: InvestmentResult[];
  totalReturn: number;
  roundNumber: number;
  onContinue: () => void;
}

export default function InvestmentFeedbackModal({ 
  isOpen, 
  results, 
  totalReturn, 
  roundNumber,
  onContinue 
}: InvestmentFeedbackModalProps) {
  
  const getInvestmentFeedback = (result: InvestmentResult) => {
    const returnPercentage = result.returnRate;
    
    if (returnPercentage > 15) {
      return {
        icon: Star,
        color: "text-yellow-400",
        bgColor: "bg-yellow-900/30",
        borderColor: "border-yellow-600",
        title: "Excellent Choice!",
        message: "Outstanding returns! This investment performed exceptionally well."
      };
    } else if (returnPercentage > 5) {
      return {
        icon: CheckCircle2,
        color: "text-green-400",
        bgColor: "bg-green-900/30",
        borderColor: "border-green-600",
        title: "Good Pick",
        message: "Solid performance. This investment delivered positive returns."
      };
    } else if (returnPercentage > -5) {
      return {
        icon: Target,
        color: "text-blue-400",
        bgColor: "bg-blue-900/30",
        borderColor: "border-blue-600",
        title: "Neutral Result",
        message: "Average performance. Market conditions affected this investment."
      };
    } else {
      return {
        icon: AlertCircle,
        color: "text-red-400",
        bgColor: "bg-red-900/30",
        borderColor: "border-red-600",
        title: "Tough Break",
        message: "This investment faced challenges this round. Consider diversification."
      };
    }
  };

  const getOverallFeedback = () => {
    const totalInvested = results.reduce((sum, result) => sum + result.investmentAmount, 0);
    const overallReturn = (totalReturn / totalInvested) * 100;
    
    if (overallReturn > 10) {
      return {
        title: "Portfolio Mastery!",
        message: "Your investment strategy this round was exceptional. You've demonstrated excellent market timing and diversification.",
        color: "text-gold",
        icon: Star
      };
    } else if (overallReturn > 3) {
      return {
        title: "Solid Strategy",
        message: "Good work! Your portfolio showed positive growth. Keep refining your approach for even better results.",
        color: "text-green-400",
        icon: TrendingUp
      };
    } else if (overallReturn > -3) {
      return {
        title: "Learning Experience",
        message: "Markets can be unpredictable. Your choices weren't bad, but market conditions affected performance.",
        color: "text-blue-400",
        icon: Target
      };
    } else {
      return {
        title: "Tough Market",
        message: "This was a challenging round. Consider adjusting your risk tolerance and diversification strategy.",
        color: "text-orange-400",
        icon: TrendingDown
      };
    }
  };

  const overallFeedback = getOverallFeedback();
  const OverallIcon = overallFeedback.icon;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-slate-800 border-slate-600 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogTitle className="sr-only">Round {roundNumber} Investment Analysis</DialogTitle>
        
        <div className="p-6">
          {/* Overall Performance Header */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">
              <OverallIcon className={`${overallFeedback.color} mx-auto`} size={48} />
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${overallFeedback.color}`}>
              {overallFeedback.title}
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              {overallFeedback.message}
            </p>
          </div>

          {/* Portfolio Summary */}
          <div className="bg-slate-700/50 rounded-xl p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-slate-400 text-sm uppercase tracking-wide">Total Return</div>
                <div className={`text-2xl font-bold ${totalReturn >= 0 ? 'text-success' : 'text-danger'}`}>
                  {totalReturn >= 0 ? '+' : ''}${(totalReturn / 1_000_000).toFixed(1)}M
                </div>
              </div>
              <div>
                <div className="text-slate-400 text-sm uppercase tracking-wide">Round</div>
                <div className="text-2xl font-bold text-gold">{roundNumber}/10</div>
              </div>
            </div>
          </div>

          {/* Individual Investment Feedback */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold mb-3 text-center">Investment Analysis</h3>
            {results.map((result, index) => {
              const feedback = getInvestmentFeedback(result);
              const FeedbackIcon = feedback.icon;
              
              return (
                <div key={index} className={`${feedback.bgColor} ${feedback.borderColor} border rounded-lg p-4`}>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <FeedbackIcon className={feedback.color} size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{result.investment.name}</h4>
                        <div className={`text-sm font-medium ${result.returnRate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {result.returnRate >= 0 ? '+' : ''}{result.returnRate.toFixed(1)}%
                        </div>
                      </div>
                      <p className={`text-sm ${feedback.color} font-medium mb-1`}>
                        {feedback.title}
                      </p>
                      <p className="text-xs text-slate-300">
                        {feedback.message}
                      </p>
                      <div className="flex justify-between text-xs text-slate-400 mt-2">
                        <span>Invested: ${(result.investmentAmount / 1_000_000).toFixed(1)}M</span>
                        <span>Return: {result.returnAmount >= 0 ? '+' : ''}${(result.returnAmount / 1_000_000).toFixed(1)}M</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Button 
              onClick={() => {
                soundManager.playButtonClick();
                onContinue();
              }}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg uppercase tracking-wide hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 border-2 border-blue-400 shadow-lg"
            >
              Continue to Results
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}