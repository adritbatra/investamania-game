import { useState } from "react";
import WelcomeScreen from "@/components/welcome-screen";
import StoryScreen from "@/components/story-screen";
import InvestmentEducationSlideshow from "@/components/investment-education-slideshow";
import GameScreen from "@/components/game-screen";
import EndGameModal from "@/components/end-game-modal";
import { GameState, createInitialGameState } from "@/lib/game-logic";

export type GameScreenType = "welcome" | "story" | "education" | "game" | "end";

export default function GamePage() {
  const [currentScreen, setCurrentScreen] = useState<GameScreenType>("welcome");
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());
  const [showEndModal, setShowEndModal] = useState(false);

  const handleScreenChange = (screen: GameScreenType) => {
    setCurrentScreen(screen);
  };

  const handleStoryComplete = () => {
    setCurrentScreen("education");
  };

  const handleEducationComplete = () => {
    setCurrentScreen("game");
  };

  const handleGameStateChange = (newState: GameState) => {
    setGameState(newState);
  };

  const handleEndGame = (finalValue: number) => {
    setGameState(prev => ({ ...prev, portfolioValue: finalValue }));
    setShowEndModal(true);
  };

  const handleResetGame = () => {
    setGameState(createInitialGameState());
    setShowEndModal(false);
    setCurrentScreen("welcome");
  };

  return (
    <div className="min-h-screen">
      {currentScreen === "welcome" && (
        <WelcomeScreen onStart={() => handleScreenChange("story")} />
      )}
      
      {currentScreen === "story" && (
        <StoryScreen onContinue={handleStoryComplete} />
      )}
      
      {currentScreen === "education" && (
        <InvestmentEducationSlideshow onComplete={handleEducationComplete} />
      )}
      
      {currentScreen === "game" && (
        <GameScreen 
          gameState={gameState}
          onGameStateChange={handleGameStateChange}
          onEndGame={handleEndGame}
        />
      )}

      <EndGameModal
        isOpen={showEndModal}
        finalValue={gameState.portfolioValue}
        onPlayAgain={handleResetGame}
      />
    </div>
  );
}
