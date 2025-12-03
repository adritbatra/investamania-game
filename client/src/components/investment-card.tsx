import { InvestmentType } from "@/lib/game-logic";

interface InvestmentCardProps {
  investment: InvestmentType;
  isDraggable?: boolean;
}

export default function InvestmentCard({ investment, isDraggable = false }: InvestmentCardProps) {
  const getRiskDisplay = (risk: string) => {
    switch (risk) {
      case 'Low': return { color: 'text-emerald-400', warning: 'Safe: 1-2% returns' };
      case 'Medium': return { color: 'text-yellow-400', warning: 'Moderate: 3-5% returns' };
      case 'High': return { color: 'text-orange-400', warning: 'Risky: 6-10% returns' };
      case 'Very High': return { color: 'text-red-400', warning: 'Extreme: 12-20% returns' };
      default: return { color: 'text-gray-400', warning: 'Unknown risk' };
    }
  };

  const riskInfo = getRiskDisplay(investment.risk);

  const handleDragStart = (e: React.DragEvent) => {
    if (isDraggable) {
      e.dataTransfer.setData('text/plain', investment.name);
    }
  };

  return (
    <div className="relative">
      <div
        className={`
          bg-gradient-to-br from-slate-800 to-slate-900 
          border-2 border-slate-700 
          rounded-xl p-4 text-center 
          transition-all duration-300 
          hover:border-purple-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20
          ${isDraggable ? 'cursor-grab active:cursor-grabbing' : ''}
        `}
        draggable={isDraggable}
        onDragStart={handleDragStart}
      >
        <div className="mb-3">
          <div className={`${investment.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2`}>
            <investment.icon className="text-white text-lg" />
          </div>
          <h4 className="font-bold text-white">{investment.name}</h4>
          <p className={`text-xs ${riskInfo.color} font-medium`}>{investment.risk} Risk</p>
          <p className={`text-xs ${riskInfo.color} mt-1`}>{riskInfo.warning}</p>
        </div>
        <p className="text-xs text-slate-400">{investment.description}</p>
        {investment.risk === 'Very High' && (
          <div className="mt-2 text-xs text-red-400 font-semibold">
            ⚠️ High volatility expected
          </div>
        )}
      </div>
    </div>
  );
}