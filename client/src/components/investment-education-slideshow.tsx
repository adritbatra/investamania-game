import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { investmentTypes } from "@/lib/game-logic";
import { Button } from "@/components/ui/button";

interface InvestmentEducationSlideshowProps {
  onComplete: () => void;
}

export default function InvestmentEducationSlideshow({ onComplete }: InvestmentEducationSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const investments = Object.values(investmentTypes);

  const nextSlide = () => {
    if (currentSlide < investments.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const currentInvestment = investments[currentSlide];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'High': return 'text-orange-400';
      case 'Very High': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getRiskWarning = (risk: string) => {
    switch (risk) {
      case 'Low': return 'Stable returns, minimal loss risk';
      case 'Medium': return 'Moderate volatility expected';
      case 'High': return 'Significant value fluctuations';
      case 'Very High': return 'Extreme volatility, major losses possible';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Investment Education
          </h1>
          <p className="text-xl text-slate-300">
            Learn about each investment type before you start playing
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            {investments.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? 'bg-purple-400' : 'bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Slide Content */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`${currentInvestment.color} w-16 h-16 rounded-full flex items-center justify-center`}>
                <currentInvestment.icon className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">{currentInvestment.name}</h2>
                <p className={`text-lg font-medium ${getRiskColor(currentInvestment.risk)}`}>
                  {currentInvestment.risk} Risk
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-sm">Slide {currentSlide + 1} of {investments.length}</p>
            </div>
          </div>

          {/* Risk Warning */}
          <div className={`mb-6 p-4 rounded-lg border ${
            currentInvestment.risk === 'Very High' ? 'bg-red-950/50 border-red-800' :
            currentInvestment.risk === 'High' ? 'bg-orange-950/50 border-orange-800' :
            currentInvestment.risk === 'Medium' ? 'bg-yellow-950/50 border-yellow-800' :
            'bg-green-950/50 border-green-800'
          }`}>
            <p className={`font-medium ${getRiskColor(currentInvestment.risk)}`}>
              {getRiskWarning(currentInvestment.risk)}
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-6">
            {/* What is this investment? */}
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-300 mb-3 flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                What is {currentInvestment.name}?
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {currentInvestment.tooltip.explanation}
              </p>
            </div>

            {/* Strategy */}
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-300 mb-3 flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                Investment Strategy
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {currentInvestment.tooltip.strategy}
              </p>
            </div>

            {/* Real World Example */}
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-300 mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                Real World Example
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {currentInvestment.tooltip.realWorldExample}
              </p>
            </div>

            {/* Warning (if exists) */}
            {currentInvestment.tooltip.warning && (
              <div className="bg-red-950/50 rounded-lg p-6 border border-red-800">
                <h3 className="text-xl font-bold text-red-300 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  Important Warning
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {currentInvestment.tooltip.warning}
                </p>
              </div>
            )}

            {/* Return Range */}
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-300 mb-3 flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                Expected Returns
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Typical returns range from {currentInvestment.minReturn}% to {currentInvestment.maxReturn}% per round.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              variant="outline"
              className="flex items-center space-x-2 bg-slate-700 border-slate-600 hover:bg-slate-600 text-white disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            <div className="flex space-x-2">
              {investments.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-purple-400' : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextSlide}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white"
            >
              <span>{currentSlide === investments.length - 1 ? 'Start Playing' : 'Next'}</span>
              {currentSlide === investments.length - 1 ? (
                <Play className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}