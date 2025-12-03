import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { MarketEvent } from "@/lib/game-logic";

interface MarketEventModalProps {
  isOpen: boolean;
  marketEvent: MarketEvent | null;
  onContinue: () => void;
}

export default function MarketEventModal({ isOpen, marketEvent, onContinue }: MarketEventModalProps) {
  if (!marketEvent) return null;

  const getImpactIcon = (impact: number) => {
    if (impact > 0) return <TrendingUp className="text-green-400" size={20} />;
    if (impact < 0) return <TrendingDown className="text-red-400" size={20} />;
    return <Activity className="text-yellow-400" size={20} />;
  };

  const getImpactColor = (impact: number) => {
    if (impact > 0) return "text-green-400";
    if (impact < 0) return "text-red-400";
    return "text-yellow-400";
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-slate-800 border-slate-600 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4 flex items-center justify-center">
            <Activity className="mr-2 text-gold" size={24} />
            📈 Market Update
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gold mb-2">{marketEvent.title}</h3>
            <p className="text-slate-300 leading-relaxed">{marketEvent.description}</p>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="font-bold mb-3 text-slate-200">Impact on Investments:</h4>
            <div className="space-y-2">
              {Object.entries(marketEvent.impacts).map(([investment, impact]) => (
                <div key={investment} className="flex items-center justify-between">
                  <span className="text-slate-300">{investment}</span>
                  <div className="flex items-center space-x-2">
                    {getImpactIcon(impact)}
                    <span className={`font-bold ${getImpactColor(impact)}`}>
                      {impact > 0 ? '+' : ''}{impact}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center pt-4">
            <Button 
              onClick={onContinue}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg uppercase tracking-wide hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 border-2 border-blue-400 shadow-lg hover:scale-105"
            >
              Continue to Results
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}