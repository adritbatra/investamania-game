import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import InvestmentCard from "./investment-card";
import InvestmentSlot from "./investment-slot";
import MarketEventModal from "./market-event-modal";
import RoundResultsModal from "./round-results-modal";
import InvestmentFeedbackModal from "./investment-feedback-modal";


import { GameState, InvestmentType, calculateReturns, getRandomInvestmentOptions, getRandomMarketEvent, MarketEvent, getInvestmentRestrictions, validateAllocations } from "@/lib/game-logic";
import { soundManager } from "@/lib/sounds";
import { backgroundManager } from "@/lib/background-manager";
import { Calculator, ArrowRight, Trophy, Volume2, VolumeX } from "lucide-react";

interface GameScreenProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
  onEndGame: (finalValue: number) => void;
}

export default function GameScreen({ gameState, onGameStateChange, onEndGame }: GameScreenProps) {
  const [availableInvestments, setAvailableInvestments] = useState<InvestmentType[]>([]);
  const [selectedInvestments, setSelectedInvestments] = useState<(InvestmentType | null)[]>([null, null, null, null]);
  const [allocations, setAllocations] = useState<number[]>([0, 0, 0, 0]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [totalReturn, setTotalReturn] = useState(0);
  const [showMarketEvent, setShowMarketEvent] = useState(false);
  const [currentMarketEvent, setCurrentMarketEvent] = useState<MarketEvent | null>(null);
  const [showRoundResults, setShowRoundResults] = useState(false);
  const [showInvestmentFeedback, setShowInvestmentFeedback] = useState(false);



  const [roundPerformance, setRoundPerformance] = useState<{
    roundNumber: number;
    startValue: number;
    endValue: number;
    gain: number;
    gainPercentage: number;
  } | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const roundData = [
    {
      title: "Greyscale Startup World",
      subtitle: "Begin your journey in the monochrome world of early-stage ventures",
      bgClass: "round-1"
    },
    {
      title: "Urban Debtown",
      subtitle: "Navigate the gritty city streets where fortunes are made and lost",
      bgClass: "round-2"
    },
    {
      title: "Green Suburbia",
      subtitle: "Explore stable residential markets and traditional investments",
      bgClass: "round-3"
    },
    {
      title: "Financial District",
      subtitle: "Enter the towering blue skyscrapers of high finance",
      bgClass: "round-4"
    },
    {
      title: "Golden Desert",
      subtitle: "Traverse the harsh landscape where only the strong survive",
      bgClass: "round-5"
    },
    {
      title: "Cosmic Markets",
      subtitle: "Venture into the mysterious purple void of space trading",
      bgClass: "round-6"
    },
    {
      title: "Tropical Jungle",
      subtitle: "Navigate the dense green wilderness of emerging markets",
      bgClass: "round-7"
    },
    {
      title: "Arctic Tundra",
      subtitle: "Brave the frozen wasteland of conservative investments",
      bgClass: "round-8"
    },
    {
      title: "Storm Clouds",
      subtitle: "Weather the dark tempest of market volatility",
      bgClass: "round-9"
    },
    {
      title: "Volcanic Investibeast's Lair",
      subtitle: "Final confrontation in the fiery depths of ultimate risk",
      bgClass: "round-10"
    }
  ];

  const currentRoundData = roundData[gameState.currentRound - 1];
  const backgroundStyle = backgroundManager.getRoundBackgroundStyle(gameState.currentRound);
  const restrictions = getInvestmentRestrictions(gameState.currentRound);

  useEffect(() => {
    // Generate new investment options for the round, but keep existing selections
    setAvailableInvestments(getRandomInvestmentOptions());
    
    // Only reset investments on first round
    if (gameState.currentRound === 1) {
      setSelectedInvestments([null, null, null, null]);
      setAllocations([0, 0, 0, 0]);
    }
    
    setShowResults(false);
    setResults([]);
    setTotalReturn(0);
    setShowRoundResults(false);
    setShowInvestmentFeedback(false);
  }, [gameState.currentRound]);

  const handleDrop = (slotIndex: number, investment: InvestmentType) => {
    const newSelected = [...selectedInvestments];
    newSelected[slotIndex] = investment;
    setSelectedInvestments(newSelected);
    soundManager.playInvestmentDrop();
  };

  const handleAllocationChange = (slotIndex: number, value: number) => {
    const newAllocations = [...allocations];
    newAllocations[slotIndex] = value;
    setAllocations(newAllocations);
    soundManager.playAllocationChange();
  };

  const canCalculate = () => {
    const hasAllInvestments = selectedInvestments.every(inv => inv !== null);
    const hasAllAllocations = allocations.every(alloc => alloc > 0);
    const totalAllocation = allocations.reduce((sum, alloc) => sum + alloc, 0);
    return hasAllInvestments && hasAllAllocations && totalAllocation === 100;
  };

  const handleCalculateReturns = () => {
    // Validate against restrictions
    const validation = validateAllocations(
      selectedInvestments.filter(inv => inv !== null) as InvestmentType[],
      allocations,
      gameState.currentRound
    );

    if (!validation.isValid) {
      alert(`Investment restrictions violated:\n\n${validation.errors.join('\n')}`);
      return;
    }

    // Generate random market event
    const marketEvent = getRandomMarketEvent();
    setCurrentMarketEvent(marketEvent);
    setShowMarketEvent(true);
    soundManager.playCalculating();
  };

  const handleMarketEventContinue = () => {
    setShowMarketEvent(false);
    soundManager.playMarketEvent();
    
    const startValue = gameState.portfolioValue;
    
    // Calculate returns with market event impact
    const calculationResults = calculateReturns(
      selectedInvestments.filter(inv => inv !== null) as InvestmentType[],
      allocations,
      gameState.portfolioValue,
      gameState.currentRound,
      currentMarketEvent || undefined
    );
    
    setResults(calculationResults.results);
    setTotalReturn(calculationResults.totalReturn);
    
    // Update portfolio value
    const newPortfolioValue = gameState.portfolioValue + calculationResults.totalReturn;
    const gain = calculationResults.totalReturn;
    const gainPercentage = (gain / startValue) * 100;
    
    // Set round performance data
    setRoundPerformance({
      roundNumber: gameState.currentRound,
      startValue,
      endValue: newPortfolioValue,
      gain,
      gainPercentage
    });
    
    onGameStateChange({
      ...gameState,
      portfolioValue: newPortfolioValue
    });
    
    // Show investment feedback first
    setShowInvestmentFeedback(true);
    
    // Play sound based on performance
    if (gain > 0) {
      soundManager.playPositiveGain();
    } else {
      soundManager.playNegativeGain();
    }
    
    // Check for early victory
    if (newPortfolioValue >= 200_000_000) {
      soundManager.playEarlyVictory();
    } else {
      soundManager.playRoundComplete();
    }
  };

  const handleNextRound = () => {
    setShowRoundResults(false);
    
    // Check for early victory
    if (gameState.portfolioValue >= 200_000_000) {
      onEndGame(gameState.portfolioValue);
      return;
    }
    
    if (gameState.currentRound >= 10) {
      onEndGame(gameState.portfolioValue);
      return;
    }
    
    onGameStateChange({
      ...gameState,
      currentRound: gameState.currentRound + 1
    });
  };

  const handleRoundResultsContinue = () => {
    setShowRoundResults(false);
    setShowResults(true);
  };

  const handleInvestmentFeedbackContinue = () => {
    setShowInvestmentFeedback(false);
    
    // Check if early victory after feedback
    if (roundPerformance && roundPerformance.endValue >= 200_000_000) {
      setShowRoundResults(true);
    } else {
      setShowResults(true);
    }
  };

  const progress = Math.min((gameState.portfolioValue / 200_000_000) * 100, 100);
  const totalAllocation = allocations.reduce((sum, alloc) => sum + alloc, 0);

  return (
    <div 
      className={`min-h-screen p-4 ${backgroundStyle.className || ''} ${backgroundStyle.style ? 'custom-background-overlay' : ''}`.trim()}
      style={backgroundStyle.style}
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Sound Toggle */}
        <div className="absolute top-0 right-0 z-10">
          <Button
            onClick={() => {
              const newState = soundManager.toggleSound();
              setSoundEnabled(newState);
              if (newState) soundManager.playButtonClick();
            }}
            variant="outline"
            size="sm"
            className="bg-white/90 border-slate-300 hover:bg-white text-slate-800 hover:text-slate-900 shadow-lg"
            title="Toggle Sound Effects"
          >
            {soundManager.isActive() ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </Button>
        </div>

        {/* Round Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-slate-800 px-6 py-2 rounded-full border border-slate-600 mb-4">
            <span className="text-gold font-bold">Round {gameState.currentRound}</span> / 10
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{currentRoundData.title}</h2>
          <p className="text-white text-lg">{currentRoundData.subtitle}</p>
        </div>

        {/* Portfolio Status */}
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-slate-600">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">Current Portfolio</div>
              <div className="text-3xl font-bold text-success">${(gameState.portfolioValue / 1_000_000).toFixed(1)}M</div>
            </div>
            <div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">Goal Target</div>
              <div className="text-3xl font-bold text-gold">$200M</div>
            </div>
            <div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">Progress</div>
              <div className="flex items-center justify-center mt-1">
                <div className="w-32">
                  <Progress value={progress} className="h-3 bg-slate-700" />
                </div>
                <span className="ml-3 text-sm font-medium">{progress.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Restrictions */}
        {gameState.currentRound > 1 && (
          <div className={`backdrop-blur-sm rounded-2xl p-6 mb-8 border ${
            gameState.currentRound === 2 
              ? 'bg-blue-900/80 border-blue-500' 
              : gameState.currentRound === 3
              ? 'bg-yellow-900/80 border-yellow-500'
              : 'bg-red-900/80 border-red-500'
          }`}>
            <div className="text-center">
              <h3 className={`text-xl font-bold mb-3 ${
                gameState.currentRound === 2 
                  ? 'text-blue-200' 
                  : gameState.currentRound === 3
                  ? 'text-yellow-200'
                  : 'text-red-200'
              }`}>
                {gameState.currentRound === 2 ? '📚' : gameState.currentRound === 3 ? '⚠️' : '🚨'} Round {gameState.currentRound} Restrictions
              </h3>
              <p className={`mb-4 ${
                gameState.currentRound === 2 
                  ? 'text-blue-100' 
                  : gameState.currentRound === 3
                  ? 'text-yellow-100'
                  : 'text-red-100'
              }`}>
                {restrictions.description}
              </p>
              {Object.keys(restrictions.maxAllocation).length > 0 && (
                <div className={`rounded-lg p-3 inline-block ${
                  gameState.currentRound === 2 
                    ? 'bg-blue-800/50' 
                    : gameState.currentRound === 3
                    ? 'bg-yellow-800/50'
                    : 'bg-red-800/50'
                }`}>
                  <div className={`text-sm font-medium ${
                    gameState.currentRound === 2 
                      ? 'text-blue-100' 
                      : gameState.currentRound === 3
                      ? 'text-yellow-100'
                      : 'text-red-100'
                  }`}>
                    <strong>Investment Limits:</strong>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
                      {Object.entries(restrictions.maxAllocation).map(([name, limit]) => (
                        <span key={name} className="bg-black/20 rounded px-2 py-1 text-xs">
                          {name}: ≤{limit}%
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {restrictions.minDiversification > 0 && (
                <div className={`mt-3 text-sm font-medium ${
                  gameState.currentRound === 2 
                    ? 'text-blue-200' 
                    : gameState.currentRound === 3
                    ? 'text-yellow-200'
                    : 'text-red-200'
                }`}>
                  Must use at least {restrictions.minDiversification} different investments
                </div>
              )}
            </div>
          </div>
        )}

        {/* Investment Options Pool */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-center">Available Investment Options</h3>
          <p className="text-center text-white mb-6">Drag 4 investments from the options below into your portfolio slots</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
            {availableInvestments.map((investment, index) => (
              <InvestmentCard key={index} investment={investment} isDraggable />
            ))}
          </div>
        </div>

        {/* Investment Slots */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-center">Your Investment Portfolio</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedInvestments.map((investment, index) => (
              <InvestmentSlot
                key={index}
                slotNumber={index + 1}
                investment={investment}
                allocation={allocations[index]}
                onDrop={(inv) => handleDrop(index, inv)}
                onAllocationChange={(value) => handleAllocationChange(index, value)}
              />
            ))}
          </div>
        </div>

        {/* Allocation Feedback */}
        {totalAllocation > 0 && totalAllocation !== 100 && (
          <div className="text-center mb-4">
            <div className={`inline-block p-3 rounded-lg ${
              totalAllocation < 100 
                ? 'bg-yellow-900/50 border border-yellow-600 text-yellow-300'
                : 'bg-red-900/50 border border-red-600 text-red-300'
            }`}>
              {totalAllocation < 100 
                ? `You have ${100 - totalAllocation}% remaining to allocate`
                : `Over-allocated by ${totalAllocation - 100}%. Total must equal 100%`
              }
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center mb-8">
          <Button 
            onClick={() => {
              soundManager.playButtonClick();
              handleCalculateReturns();
            }}
            disabled={!canCalculate()}
            className={`px-10 py-4 rounded-xl font-bold text-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg ${
              canCalculate() 
                ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 border-2 border-emerald-400 hover:border-emerald-300' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed border-2 border-gray-500'
            }`}
          >
            <Calculator className="mr-3" size={20} />
            Calculate Returns
          </Button>
        </div>

        {/* Results Panel */}
        {showResults && (
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-600">
            <h3 className="text-2xl font-bold mb-6 text-center">Investment Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {results.map((result, index) => (
                <div key={index} className={`p-4 rounded-xl border ${
                  result.returnAmount >= 0 
                    ? 'results-positive border-emerald-600' 
                    : 'results-negative border-red-600'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className={`${result.investment.color} w-8 h-8 rounded-full flex items-center justify-center mr-3`}>
                        <result.investment.icon className="text-white text-sm" />
                      </div>
                      <div>
                        <h4 className="font-bold">{result.type}</h4>
                        <p className="text-xs opacity-80">{result.allocation}% allocation</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`flex items-center ${
                        result.returnAmount >= 0 ? 'text-emerald-300' : 'text-red-300'
                      }`}>
                        <span className="font-bold">{result.returnRate.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm opacity-90">
                    <div className="flex justify-between">
                      <span>Invested:</span>
                      <span>${result.investmentAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Return:</span>
                      <span className={result.returnAmount >= 0 ? 'text-emerald-300' : 'text-red-300'}>
                        {result.returnAmount >= 0 ? '+' : ''}${result.returnAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold border-t border-gray-600 pt-1 mt-1">
                      <span>Total:</span>
                      <span>${result.finalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-slate-600 pt-6">
              <div className="text-center">
                <div className="text-slate-400 text-sm uppercase tracking-wide">Round Total</div>
                <div className={`text-3xl font-bold mb-4 ${
                  totalReturn >= 0 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {totalReturn >= 0 ? '+' : ''}${totalReturn.toFixed(2)}
                </div>
                
                <Button 
                  onClick={() => {
                    soundManager.playButtonClick();
                    handleNextRound();
                  }}
                  className={`px-8 py-4 rounded-xl font-bold text-lg uppercase tracking-wide hover:scale-105 transition-all duration-300 border-2 shadow-lg ${
                    gameState.currentRound >= 3
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 border-yellow-300'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 border-blue-400'
                  }`}
                >
                  {gameState.currentRound >= 3 ? (
                    <>
                      <Trophy className="mr-2" size={16} />
                      View Final Results
                    </>
                  ) : (
                    <>
                      Next Round
                      <ArrowRight className="ml-2" size={16} />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Market Event Modal */}
      <MarketEventModal
        isOpen={showMarketEvent}
        marketEvent={currentMarketEvent}
        onContinue={handleMarketEventContinue}
      />

      {/* Investment Feedback Modal */}
      <InvestmentFeedbackModal
        isOpen={showInvestmentFeedback}
        results={results}
        totalReturn={totalReturn}
        roundNumber={gameState.currentRound}
        onContinue={handleInvestmentFeedbackContinue}
      />

      {/* Round Results Modal */}
      {roundPerformance && (
        <RoundResultsModal
          isOpen={showRoundResults}
          roundNumber={roundPerformance.roundNumber}
          startValue={roundPerformance.startValue}
          endValue={roundPerformance.endValue}
          gain={roundPerformance.gain}
          gainPercentage={roundPerformance.gainPercentage}
          isEarlyVictory={roundPerformance.endValue >= 200_000_000}
          onContinue={handleRoundResultsContinue}
        />
      )}

    </div>
  );
}
