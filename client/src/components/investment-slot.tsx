import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InvestmentType, investmentTypes } from "@/lib/game-logic";
import InvestmentCard from "./investment-card";
import { Plus } from "lucide-react";

interface InvestmentSlotProps {
  slotNumber: number;
  investment: InvestmentType | null;
  allocation: number;
  onDrop: (investment: InvestmentType) => void;
  onAllocationChange: (value: number) => void;
}

export default function InvestmentSlot({ 
  slotNumber, 
  investment, 
  allocation, 
  onDrop, 
  onAllocationChange 
}: InvestmentSlotProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const investmentName = e.dataTransfer.getData('text/plain');
    // Find the investment from the game logic
    const droppedInvestment = getInvestmentByName(investmentName);
    if (droppedInvestment) {
      onDrop(droppedInvestment);
    }
  };

  const handleAllocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
    onAllocationChange(value);
  };

  return (
    <div 
      className={`drop-zone bg-slate-700/50 border-2 border-dashed rounded-xl p-6 text-center min-h-[200px] flex flex-col justify-center transition-all ${
        isDragOver ? 'border-gold bg-gold/10 scale-102' : 'border-slate-600'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {!investment ? (
        <div className="empty-slot">
          <Plus className="text-slate-500 text-3xl mb-2 mx-auto" />
          <p className="text-slate-500 font-medium">Investment #{slotNumber}</p>
          <p className="text-xs text-slate-600 mt-1">Drag an option here</p>
        </div>
      ) : (
        <div className="filled-slot">
          <div className="investment-content mb-4 scale-75">
            <InvestmentCard investment={investment} />
          </div>
          <div className="allocation-input">
            <Label className="block text-xs text-slate-400 mb-1">Allocation %</Label>
            <Input 
              type="number" 
              min="0" 
              max="100" 
              value={allocation || ''}
              onChange={handleAllocationChange}
              className="w-full bg-slate-800 border-slate-600 text-center font-bold text-white"
              placeholder="0"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to get investment by name
function getInvestmentByName(name: string): InvestmentType | null {
  return Object.values(investmentTypes).find((inv: any) => inv.name === name) || null;
}
