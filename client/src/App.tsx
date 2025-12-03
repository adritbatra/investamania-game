import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import GamePage from "@/pages/game";
import LeaderboardPage from "@/pages/leaderboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={GamePage} />
      <Route path="/game" component={GamePage} />
      <Route path="/leaderboard" component={LeaderboardPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
