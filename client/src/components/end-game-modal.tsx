import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { soundManager } from "@/lib/sounds";
import { Trophy, Skull } from "lucide-react";

interface EndGameModalProps {
  isOpen: boolean;
  finalValue: number;
  onPlayAgain: () => void;
}

export default function EndGameModal({ isOpen, finalValue, onPlayAgain }: EndGameModalProps) {
  const isSuccess = finalValue >= 200_000_000;
  
  // Play sound effect when modal opens
  if (isOpen && finalValue) {
    if (isSuccess) {
      soundManager.playGameComplete();
    } else {
      soundManager.playGameFail();
    }
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-slate-800 border-slate-600 text-white max-w-md">
        <div className="text-center p-4">
          <div className="text-6xl mb-4">
            {isSuccess ? (
              <Trophy className="text-gold mx-auto" size={64} />
            ) : (
              <Skull className="text-red-400 mx-auto" size={64} />
            )}
          </div>
          
          <h2 className={`text-3xl font-bold mb-4 ${
            isSuccess ? 'text-gold' : 'text-red-400'
          }`}>
            {isSuccess ? '🎉 Congratulations!' : '💸 Business Collapsed'}
          </h2>
          
          <p className="text-lg text-slate-300 mb-6">
            {isSuccess 
              ? 'Your business is saved! You successfully grew your portfolio to meet the $200M target goal.'
              : 'Your portfolio didn\'t reach the $200M target. Your business empire has fallen, but you can try again!'
            }
          </p>
          
          <div className="mb-6">
            <div className="text-slate-400 text-sm uppercase tracking-wide">Final Portfolio Value</div>
            <div className="text-4xl font-bold text-gold">${(finalValue / 1_000_000).toFixed(1)}M</div>
          </div>
          
          <Button 
            onClick={() => {
              soundManager.playButtonClick();
              onPlayAgain();
            }}
            className="bg-gradient-to-r from-gold to-yellow-500 text-slate-900 px-8 py-3 rounded-full font-bold uppercase tracking-wide hover:from-yellow-500 hover:to-gold transition-all duration-300 transform hover:scale-105"
          >
            Play Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
