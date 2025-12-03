import { 
  TrendingUp, 
  Building2, 
  Bitcoin, 
  PiggyBank, 
  Home, 
  CreditCard,
  GraduationCap,
  Wallet,
  LucideIcon
} from "lucide-react";

export interface InvestmentType {
  name: string;
  icon: LucideIcon;
  risk: 'Low' | 'Medium' | 'High' | 'Very High';
  color: string;
  minReturn: number;
  maxReturn: number;
  description: string;
  tooltip: {
    explanation: string;
    strategy: string;
    realWorldExample: string;
    warning?: string;
  };
}

export interface GameState {
  currentRound: number;
  portfolioValue: number;
}

export interface InvestmentResult {
  type: string;
  investment: InvestmentType;
  allocation: number;
  investmentAmount: number;
  returnRate: number;
  returnAmount: number;
  finalAmount: number;
}

export interface MarketEvent {
  title: string;
  description: string;
  impacts: { [investmentType: string]: number };
}

export const investmentTypes: Record<string, InvestmentType> = {
  'Stocks': { 
    name: 'Stocks',
    icon: TrendingUp, 
    risk: 'High', 
    color: 'bg-blue-600', 
    minReturn: -20, 
    maxReturn: 60,
    description: 'Equity investments with high volatility',
    tooltip: {
      explanation: "When you buy stocks, you're purchasing ownership shares in companies. Your returns depend on how well those companies perform and how other investors value them.",
      strategy: "Diversify across different sectors and company sizes. Consider both growth stocks (higher risk/reward) and dividend-paying stocks (steady income).",
      realWorldExample: "Apple stock has returned over 20% annually for the past decade, but it also dropped 50% during the 2008 financial crisis.",
      warning: "Stock prices can be very volatile. You could lose significant money in short periods, but historically they've provided the best long-term returns."
    }
  },
  'Bonds': { 
    name: 'Bonds',
    icon: Building2, 
    risk: 'Medium', 
    color: 'bg-green-600', 
    minReturn: -2, 
    maxReturn: 8,
    description: 'Fixed income securities',
    tooltip: {
      explanation: "Bonds are loans you make to governments or corporations. They pay you regular interest and return your principal at maturity.",
      strategy: "Use bonds to stabilize your portfolio. Government bonds are safest, corporate bonds pay more but have higher risk. Consider bond duration and interest rate environment.",
      realWorldExample: "U.S. Treasury bonds are considered virtually risk-free and currently yield around 4-5%. Corporate bonds might pay 6-8% but carry default risk.",
      warning: "Bond values decrease when interest rates rise. Inflation can erode the purchasing power of fixed payments."
    }
  },
  'Crypto': { 
    name: 'Crypto',
    icon: Bitcoin, 
    risk: 'Very High', 
    color: 'bg-orange-500', 
    minReturn: -50, 
    maxReturn: 120,
    description: 'Digital currency investments',
    tooltip: {
      explanation: "Cryptocurrencies are digital assets that use blockchain technology. Their value is driven by adoption, speculation, and technological developments.",
      strategy: "Only invest what you can afford to lose completely. Consider dollar-cost averaging to reduce timing risk. Research the technology and use cases.",
      realWorldExample: "Bitcoin reached $69,000 in 2021 but fell to $15,000 in 2022. Some altcoins have gained 1000%+ or lost 99% in single years.",
      warning: "Crypto is extremely volatile and largely unregulated. Prices can swing 20-50% in days. Many cryptocurrencies may become worthless."
    }
  },
  'Savings': { 
    name: 'Savings',
    icon: PiggyBank, 
    risk: 'Low', 
    color: 'bg-emerald-600', 
    minReturn: 1, 
    maxReturn: 2,
    description: 'Safe low-yield deposits',
    tooltip: {
      explanation: "Savings accounts, CDs, and money market funds keep your money safe and liquid while earning modest interest. Your principal is typically insured.",
      strategy: "Keep 3-6 months of expenses in savings for emergencies. Use high-yield savings accounts or CDs for better returns than traditional savings.",
      realWorldExample: "High-yield savings accounts currently offer around 4-5% APY, while traditional savings might only pay 0.1%.",
      warning: "Low returns may not keep pace with inflation over time, reducing your purchasing power."
    }
  },
  'Mortgages': { 
    name: 'Mortgages',
    icon: Home, 
    risk: 'Medium', 
    color: 'bg-purple-600', 
    minReturn: -5, 
    maxReturn: 20,
    description: 'Real estate backed securities',
    tooltip: {
      explanation: "Mortgage investments include REITs, mortgage-backed securities, and direct real estate. Returns come from property appreciation and rental income.",
      strategy: "Diversify across property types and geographic regions. Consider both residential and commercial real estate exposure through REITs.",
      realWorldExample: "REITs have historically returned 8-12% annually. Real estate can provide inflation protection and steady dividend income.",
      warning: "Real estate markets can be cyclical and illiquid. Interest rate changes significantly impact property values and mortgage securities."
    }
  },
  'Payment Plans': { 
    name: 'Payment Plans',
    icon: CreditCard, 
    risk: 'High', 
    color: 'bg-red-600', 
    minReturn: -15, 
    maxReturn: 35,
    description: 'Consumer debt investments',
    tooltip: {
      explanation: "These investments involve lending money to consumers through credit cards, personal loans, or buy-now-pay-later services. Returns come from interest payments.",
      strategy: "Diversify across many borrowers to reduce default risk. Higher interest rates compensate for greater risk of non-payment.",
      realWorldExample: "Peer-to-peer lending platforms like LendingClub have offered 5-15% returns, but with significant default risk during economic downturns.",
      warning: "Consumer defaults increase during recessions. Economic stress can cause significant losses in this sector."
    }
  },
  'Student Loans': { 
    name: 'Student Loans',
    icon: GraduationCap, 
    risk: 'Medium', 
    color: 'bg-indigo-600', 
    minReturn: -8, 
    maxReturn: 12,
    description: 'Educational debt securities',
    tooltip: {
      explanation: "Student loan investments involve funding education through government-backed or private loans. Returns come from interest payments over long repayment periods.",
      strategy: "Government-backed loans offer more stability. Private loans may offer higher returns but carry more risk. Consider borrower profiles and economic conditions.",
      realWorldExample: "Federal student loans typically yield 4-6%, while private student loans might offer 6-10% but with higher default risk.",
      warning: "Student loan forgiveness programs and changing education policies can impact returns. Economic stress affects graduates' ability to repay."
    }
  },
  'Lines of Credit': { 
    name: 'Lines of Credit',
    icon: Wallet, 
    risk: 'High', 
    color: 'bg-pink-600', 
    minReturn: -12, 
    maxReturn: 28,
    description: 'Revolving credit investments',
    tooltip: {
      explanation: "Lines of credit provide flexible borrowing for businesses and consumers. Returns come from interest on outstanding balances and fees.",
      strategy: "Focus on borrowers with strong credit profiles and stable income. Business lines of credit may offer higher returns than personal ones.",
      realWorldExample: "Business lines of credit typically charge 7-25% interest, while personal lines might be 10-20%, depending on creditworthiness.",
      warning: "Variable rate exposure and credit risk make this volatile. Economic downturns can lead to increased defaults and reduced utilization."
    }
  }
};

export const marketEvents: MarketEvent[] = [
  {
    title: "Crypto Hack",
    description: "A major exchange is hacked. Crypto investments tank.",
    impacts: { "Crypto": -30 }
  },
  {
    title: "Tech Rally",
    description: "Strong earnings push tech stocks up.",
    impacts: { "Stocks": 25 }
  },
  {
    title: "Housing Boom",
    description: "Real estate values jump.",
    impacts: { "Mortgages": 15 }
  },
  {
    title: "Regulatory Crackdown",
    description: "New laws shake up risky lending practices.",
    impacts: { "Payment Plans": -10, "Crypto": -10 }
  },
  {
    title: "Stimulus Package",
    description: "The government issues a surprise stimulus.",
    impacts: { "Stocks": 5, "Bonds": 5, "Crypto": 5, "Savings": 5, "Mortgages": 5, "Payment Plans": 5, "Student Loans": 5, "Lines of Credit": 5 }
  },
  {
    title: "Interest Rate Hike",
    description: "Central bank raises rates to fight inflation.",
    impacts: { "Bonds": 12, "Savings": 8, "Stocks": -8 }
  },
  {
    title: "Market Volatility",
    description: "Uncertainty causes widespread market swings.",
    impacts: { "Stocks": -15, "Crypto": -20, "Bonds": 6 }
  },
  {
    title: "Banking Crisis",
    description: "Major bank failures shake confidence.",
    impacts: { "Savings": -5, "Bonds": -12, "Payment Plans": -20 }
  },
  {
    title: "Innovation Breakthrough",
    description: "New technology promises massive returns.",
    impacts: { "Stocks": 35, "Crypto": 40 }
  },
  {
    title: "Economic Recession",
    description: "GDP contracts as consumer spending plummets.",
    impacts: { "Stocks": -25, "Bonds": 10, "Mortgages": -15, "Payment Plans": -25, "Student Loans": -20, "Lines of Credit": -30 }
  },
  {
    title: "Education Sector Boom",
    description: "Government increases education funding and loan programs.",
    impacts: { "Student Loans": 20, "Bonds": 5, "Stocks": 3 }
  },
  {
    title: "Credit Market Expansion",
    description: "Banks ease lending standards, credit becomes more accessible.",
    impacts: { "Lines of Credit": 18, "Payment Plans": 12, "Student Loans": 8, "Mortgages": 10 }
  }
];

export function createInitialGameState(): GameState {
  return {
    currentRound: 1,
    portfolioValue: 100_000_000 // $100 Million
  };
}

export function getRandomMarketEvent(): MarketEvent {
  return marketEvents[Math.floor(Math.random() * marketEvents.length)];
}

export function getRandomInvestmentOptions(): InvestmentType[] {
  const allTypes = Object.values(investmentTypes);
  const shuffled = allTypes.sort(() => Math.random() - 0.5);
  return shuffled; // Return all 8 investment types
}

export function calculateReturns(
  investments: InvestmentType[], 
  allocations: number[], 
  portfolioValue: number,
  roundNumber: number,
  marketEvent?: MarketEvent
): { results: InvestmentResult[], totalReturn: number } {
  const results: InvestmentResult[] = [];
  let totalReturn = 0;

  // Calculate concentration risk penalties
  const concentrationPenalty = calculateConcentrationPenalty(allocations, investments, roundNumber);

  investments.forEach((investment, index) => {
    const allocation = allocations[index];
    const investmentAmount = (portfolioValue * allocation) / 100;
    
    // Calculate random return within range
    let returnRate = Math.random() * (investment.maxReturn - investment.minReturn) + investment.minReturn;
    
    // Apply market event impact if applicable (amplified by round)
    if (marketEvent && marketEvent.impacts[investment.name]) {
      const eventAmplification = 1 + (roundNumber - 1) * 0.2; // 20% more impact per round
      returnRate += marketEvent.impacts[investment.name] * eventAmplification;
    }
    
    // Apply concentration penalty for high-risk investments
    if (investment.risk === 'Very High' || investment.risk === 'High') {
      const penalty = concentrationPenalty[investment.name] || 0;
      returnRate -= penalty;
    }
    
    // Apply progressive volatility scaling
    const volatilityMultiplier = 1 + (roundNumber - 1) * 0.15; // 15% more volatility per round
    if (investment.risk === 'Very High' || investment.risk === 'High') {
      const volatilityAdjustment = (Math.random() - 0.5) * 10 * volatilityMultiplier;
      returnRate += volatilityAdjustment;
    }
    
    const returnAmount = investmentAmount * (returnRate / 100);
    const finalAmount = investmentAmount + returnAmount;
    
    results.push({
      type: investment.name,
      investment: investment,
      allocation: allocation,
      investmentAmount: investmentAmount,
      returnRate: returnRate,
      returnAmount: returnAmount,
      finalAmount: finalAmount
    });
    
    totalReturn += returnAmount;
  });

  return { results, totalReturn };
}

// Calculate penalties for over-concentration in risky investments
function calculateConcentrationPenalty(
  allocations: number[], 
  investments: InvestmentType[], 
  roundNumber: number
): { [investmentName: string]: number } {
  const penalties: { [investmentName: string]: number } = {};
  
  investments.forEach((investment, index) => {
    const allocation = allocations[index];
    
    // Apply severe penalties for high allocations in very risky investments
    if (investment.risk === 'Very High' && allocation > 30) {
      const excessAllocation = allocation - 30;
      // Penalty grows exponentially and increases with round number
      const basePenalty = Math.pow(excessAllocation / 10, 1.5) * 5;
      const roundMultiplier = 1 + (roundNumber - 1) * 0.3;
      penalties[investment.name] = basePenalty * roundMultiplier;
    }
    
    if (investment.risk === 'High' && allocation > 50) {
      const excessAllocation = allocation - 50;
      const basePenalty = Math.pow(excessAllocation / 15, 1.3) * 3;
      const roundMultiplier = 1 + (roundNumber - 1) * 0.2;
      penalties[investment.name] = basePenalty * roundMultiplier;
    }
  });
  
  return penalties;
}

// Get investment restrictions based on round number
export function getInvestmentRestrictions(roundNumber: number): {
  maxAllocation: { [investmentName: string]: number };
  minDiversification: number;
  description: string;
} {
  switch (roundNumber) {
    case 1:
      return {
        maxAllocation: {},
        minDiversification: 0,
        description: "Tutorial Round - No restrictions, experiment freely!"
      };
    
    case 2:
      return {
        maxAllocation: {},
        minDiversification: 2,
        description: "Learning Phase - Must use at least 2 different investments for basic diversification"
      };
    
    case 3:
      return {
        maxAllocation: {
          'Crypto': 60
        },
        minDiversification: 2,
        description: "First Limit - Crypto capped at 60% to prevent extreme concentration"
      };
    
    case 4:
      return {
        maxAllocation: {
          'Crypto': 40,
          'Payment Plans': 50
        },
        minDiversification: 3,
        description: "Risk Controls - Crypto ≤40%, Payment Plans ≤50%. Must diversify across 3 investments"
      };
    
    case 5:
      return {
        maxAllocation: {
          'Crypto': 35,
          'Stocks': 45,
          'Lines of Credit': 40
        },
        minDiversification: 3,
        description: "Market Volatility - High-risk assets capped: Crypto ≤35%, Stocks ≤45%, Lines of Credit ≤40%"
      };
    
    case 6:
      return {
        maxAllocation: {
          'Crypto': 30,
          'Payment Plans': 30,
          'Lines of Credit': 35,
          'Savings': 60
        },
        minDiversification: 4,
        description: "Stability Focus - Most risky assets ≤30-35%. Savings can go up to 60% for safety. Need 4 investments"
      };
    
    case 7:
      return {
        maxAllocation: {
          'Crypto': 25,
          'Stocks': 40,
          'Payment Plans': 25,
          'Lines of Credit': 30
        },
        minDiversification: 4,
        description: "Tightening Controls - Crypto and Payment Plans ≤25%. Stocks ≤40%. Lines of Credit ≤30%"
      };
    
    case 8:
      return {
        maxAllocation: {
          'Crypto': 20,
          'Stocks': 35,
          'Payment Plans': 20,
          'Lines of Credit': 25,
          'Student Loans': 40
        },
        minDiversification: 4,
        description: "Conservative Approach - Very high risk ≤20%. High risk ≤35%. Student Loans favored at ≤40%"
      };
    
    case 9:
      return {
        maxAllocation: {
          'Crypto': 15,
          'Stocks': 30,
          'Payment Plans': 15,
          'Lines of Credit': 20,
          'Bonds': 50,
          'Mortgages': 45
        },
        minDiversification: 4,
        description: "Near Endgame - Extreme restrictions on volatility. Bonds and Mortgages preferred for stability"
      };
    
    case 10:
    default:
      return {
        maxAllocation: {
          'Crypto': 10,
          'Stocks': 25,
          'Payment Plans': 10,
          'Lines of Credit': 15,
          'Bonds': 60,
          'Savings': 70,
          'Mortgages': 50,
          'Student Loans': 35
        },
        minDiversification: 4,
        description: "Final Round - Maximum caution required. Crypto and Payment Plans ≤10%. Favor safe investments"
      };
  }
}

// Validate allocations against restrictions
export function validateAllocations(
  investments: InvestmentType[],
  allocations: number[],
  roundNumber: number
): { isValid: boolean; errors: string[] } {
  const restrictions = getInvestmentRestrictions(roundNumber);
  const errors: string[] = [];
  
  // Check individual investment limits
  investments.forEach((investment, index) => {
    const allocation = allocations[index];
    const maxAllowed = restrictions.maxAllocation[investment.name];
    
    if (maxAllowed && allocation > maxAllowed) {
      errors.push(`${investment.name}: ${allocation}% exceeds limit of ${maxAllowed}%`);
    }
  });
  
  // Check diversification requirement
  const nonZeroAllocations = allocations.filter(a => a > 0).length;
  if (nonZeroAllocations < restrictions.minDiversification) {
    errors.push(`Must use at least ${restrictions.minDiversification} different investments (currently using ${nonZeroAllocations})`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
