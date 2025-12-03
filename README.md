# 🎮 InvestaMania

**Save Your Business Empire Through Strategic Investment**

InvestaMania is an interactive investment simulation game where players must grow their portfolio from $100M to $200M across 10 challenging rounds to save their failing tech empire from bankruptcy.

## 🎯 Play Now!

**🌐 Live Game: [https://investamania-game.onrender.com](https://investamania-game.onrender.com)**

*Start playing immediately - no installation required!*

![Game Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🎯 Game Overview

Your tech empire is on the brink of collapse. The only way to save it is to strategically invest your emergency fund and grow it to $200 million through 10 rounds of increasingly challenging market conditions.

### Key Features

- **10 Unique Themed Rounds** - Each with distinct visual themes and market conditions
- **Drag-and-Drop Investment System** - Intuitive interface for portfolio allocation
- **6 Investment Types** - From safe bonds to risky cryptocurrencies
- **Educational Tutorial** - Learn about each investment type before playing
- **Dynamic Market Events** - Random events that affect your returns
- **Performance Analytics** - Detailed feedback on each investment decision
- **Leaderboard System** - Compete with other players for the top spot
- **Custom Backgrounds** - Upload your own images for each round
- **Sound Effects** - Immersive audio feedback for every action

---

## 🎲 Gameplay

### Investment Types

1. **Government Bonds** (Low Risk) - Safe, stable returns of 1-2%
2. **Real Estate** (Low Risk) - Property investments with 2-3% returns
3. **Index Funds** (Medium Risk) - Diversified market exposure, 3-5% returns
4. **Individual Stocks** (High Risk) - Higher volatility, 6-10% returns
5. **Startups** (Very High Risk) - High growth potential, 12-15% returns
6. **Cryptocurrencies** (Very High Risk) - Extreme volatility, 15-20% returns

### Game Flow

1. **Welcome Screen** - Introduction to the game
2. **Story Screen** - Learn about your business crisis
3. **Investment Education** - Tutorial on each investment type
4. **10 Investment Rounds** - Allocate your portfolio each round
5. **Victory or Defeat** - Reach $200M or fall short

### Round Themes

Each round has a unique visual theme and atmosphere:

1. **Greyscale Startup World** - Monochrome beginnings
2. **Urban Debtown** - Gritty city streets
3. **Green Suburbia** - Stable residential markets
4. **Financial District** - Blue skyscrapers of high finance
5. **Golden Desert** - Harsh survival landscape
6. **Cosmic Markets** - Purple space trading
7. **Tropical Jungle** - Dense emerging markets
8. **Arctic Tundra** - Frozen conservative investments
9. **Storm Clouds** - Dark market volatility
10. **Volcanic Investibeast's Lair** - Final fiery confrontation

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Wouter** - Lightweight routing
- **Shadcn UI** - Component library
- **React Query** - API state management
- **Lucide React** - Icon library
- **Framer Motion** - Animations

### Backend
- **Express.js** - Node.js web framework
- **PostgreSQL** - Database (via Neon)
- **Drizzle ORM** - Type-safe database access
- **Zod** - Runtime validation

### Additional Features
- **Web Audio API** - Dynamic sound effects
- **LocalStorage API** - Custom background persistence
- **Drag & Drop API** - Investment card interactions

---

## 📁 Project Structure

```
investamania/
├── client/                    # Frontend React app
│   ├── index.html
│   └── src/
│       ├── components/        # React components
│       │   ├── ui/           # Shadcn UI components
│       │   ├── game-screen.tsx
│       │   ├── story-screen.tsx
│       │   └── ... (modals, cards, etc.)
│       ├── pages/            # Route pages
│       │   ├── game.tsx
│       │   └── leaderboard.tsx
│       ├── lib/              # Utilities
│       │   ├── game-logic.ts
│       │   ├── sounds.ts
│       │   ├── background-manager.ts
│       │   ├── queryClient.ts
│       │   └── utils.ts
│       ├── App.tsx           # App root
│       ├── main.tsx          # Entry point
│       └── index.css         # Global styles
│
├── server/                   # Backend Express server
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API routes
│   ├── storage.ts           # Database operations
│   ├── db.ts                # Database connection
│   └── vite.ts              # Dev server config
│
├── shared/                  # Shared types
│   └── schema.ts            # Database schema
│
├── migrations/              # Database migrations
└── ... (config files)
```

---

## 🌐 Live Demo

**Play the game now:** [https://investamania-game.onrender.com](https://investamania-game.onrender.com)

No installation needed - just click and start playing!

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Neon recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/investamania.git
   cd investamania
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in project root
   echo "DATABASE_URL=your_postgresql_url" > .env
   ```

4. **Initialize database**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:5000
   ```

---

## 🎮 How to Play

1. **Start the Game** - Click "Start Your Journey" on the welcome screen
2. **Learn the Story** - Understand your business crisis
3. **Complete Tutorial** - Learn about each investment type
4. **Make Investments** - Drag investment cards into slots
5. **Allocate Portfolio** - Set percentage for each investment
6. **Submit Decisions** - See how the market performs
7. **Review Results** - Get detailed feedback on your choices
8. **Repeat for 10 Rounds** - Try to reach $200M
9. **Victory or Defeat** - Save your empire or start over

### Tips for Success

- **Diversify** - Don't put all your money in one investment
- **Balance Risk** - Mix safe and risky investments
- **Watch Market Events** - They can boost or hurt specific investments
- **Learn from Feedback** - Each round provides detailed performance analysis
- **Early Victory** - Reach $200M before round 10 for a special achievement

---

## 🎨 Customization

### Custom Backgrounds

Upload your own images for each round:
1. Click the settings icon in-game
2. Open "Background Manager"
3. Upload images (1920x1080 recommended)
4. Images are saved locally in your browser

### Sound Toggle

Enable/disable sound effects in the game settings.

---

## 🏆 Leaderboard

- Top 10 players displayed by final portfolio value
- Only winners (≥$200M) appear on the leaderboard
- Completion date tracked
- Trophy icons for top 3 players

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Run production server
npm run check      # TypeScript type checking
npm run db:push    # Push database schema changes
```

### Project Commands

- **Development**: Runs on port 5000 with hot reload
- **Production**: Builds optimized bundles for deployment
- **Database**: Uses Drizzle Kit for migrations

---

## 📊 API Endpoints

### Game Results
- `POST /api/game-results` - Save a completed game
- `GET /api/game-results/:userId` - Get user's game history

### Leaderboard
- `GET /api/leaderboard` - Get top 10 winners

---

## 🎨 Design Highlights

- **10 Unique Round Themes** - Custom CSS gradients and animations
- **Dark Mode First** - Optimized for dark backgrounds
- **Mobile Responsive** - Plays well on all devices
- **Accessibility** - ARIA labels and keyboard navigation
- **Performance** - Optimized React rendering and lazy loading

---

## 🔧 Configuration

### Database Schema

Two main tables:

**Users**
- id, username, createdAt

**Game Results**
- id, userId, initialValue, finalValue, roundsPlayed, isWinner, completedAt

### Environment Variables

```env
DATABASE_URL=postgresql://user:pass@host:port/db
NODE_ENV=development|production
```

---

## 📝 License

MIT License - feel free to use this project for learning or building your own investment game!

---

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest new investment types
- Add new round themes
- Improve game balance
- Enhance UI/UX

---

## 🎓 Educational Purpose

InvestaMania is designed to teach:
- Investment diversification principles
- Risk vs. reward tradeoffs
- Portfolio allocation strategies
- Market volatility concepts
- Long-term thinking in investing

**Note**: This is a game for educational purposes. Real investment decisions should be made with professional financial advice.

---

## 🌟 Credits

**Built with**:
- React + TypeScript
- Tailwind CSS + Shadcn UI
- Express + Drizzle ORM
- Neon PostgreSQL
- Web Audio API

**Developed by**: Your Name/Team

---

**🎮 Ready to save your business empire? Start playing InvestaMania!**
