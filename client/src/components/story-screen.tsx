import { Button } from "@/components/ui/button";
import { Building, Play, ArrowRight } from "lucide-react";

interface StoryScreenProps {
  onContinue: () => void;
}

export default function StoryScreen({ onContinue }: StoryScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-600 shadow-2xl">
          <div className="mb-8">
            <Building className="text-danger text-6xl mb-4 animate-pulse-slow mx-auto" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-100">The Crisis</h2>
          </div>
          
          <div className="space-y-6 text-lg md:text-xl text-slate-300 leading-relaxed">
            <p>
              Your tech empire is on the brink of <span className="text-danger font-bold">total collapse</span> and the only way to save it is to grow your emergency fund to <span className="text-gold font-bold">$200 Million</span> through strategic investments across ten critical rounds.
            </p>
            
            <div className="bg-slate-700/50 rounded-xl p-6 my-8">
              <div className="flex items-center justify-between text-sm md:text-base">
                <div className="text-center">
                  <div className="text-slate-400">Starting Capital</div>
                  <div className="text-2xl font-bold text-success">$100M</div>
                </div>
                <div className="text-gold text-3xl">
                  <ArrowRight />
                </div>
                <div className="text-center">
                  <div className="text-slate-400">Target Goal</div>
                  <div className="text-2xl font-bold text-gold">$200M</div>
                </div>
              </div>
            </div>
            
            <p className="text-base text-slate-400">
              You must navigate through ten challenging investment rounds across different market environments. Make wise choices, manage risk, and grow your portfolio to save your business empire!
            </p>
          </div>
          
          <Button 
            onClick={onContinue}
            className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-12 py-4 rounded-xl font-bold text-lg uppercase tracking-wide hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 border-2 border-blue-400 shadow-lg"
          >
            <Play className="mr-3" size={20} />
            Begin Investment Challenge
          </Button>
        </div>
      </div>
    </div>
  );
}
