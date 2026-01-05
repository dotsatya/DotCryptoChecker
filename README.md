# 📈 DotCryptoChecker

A comprehensive cryptocurrency screening and analysis platform built with Next.js, featuring real-time price updates, advanced charting, currency conversion, and detailed market insights.

## 🚀 Features

### 📊 Dashboard Overview
- **Real-time Market Data**: Live cryptocurrency prices with WebSocket integration
- **Trending Coins**: Discover trending cryptocurrencies by market cap
- **Market Categories**: Explore coins by category (DeFi, Layer 1, Gaming, etc.)
- **Global Market Stats**: Current market capitalization and trading volumes

### 🔍 Advanced Search
- **Smart Coin Search**: Search by name or symbol with instant results
- **Real-time Price Updates**: Live price changes in search results
- **Keyboard Shortcuts**: Cmd/Ctrl + K to open search
- **Responsive Design**: Optimized for desktop and mobile

### 📈 Coin Detail Pages
- **Interactive Charts**: Advanced candlestick charts with multiple timeframes
- **Live Price Display**: Real-time price updates with connection status
- **Market Metrics**: 24h/30d performance, market cap rank, trading volume
- **Comprehensive Data**: Price history, market statistics, and project information

### 💱 Currency Converter
- **Multi-currency Support**: Convert between all supported fiat currencies
- **Real-time Rates**: Live exchange rates using CoinGecko API
- **Bidirectional Conversion**: Convert from crypto to fiat and vice versa
- **Dynamic Interface**: Adapts to current coin with available currencies

### 📊 Market Analysis Tools
- **Order Book**: Real-time buy/sell orders and market depth
- **Recent Trades**: Live trading activity and transaction history
- **Similar Coins**: Smart recommendations based on market cap ranking
- **Market Cap Rankings**: Global cryptocurrency rankings and positions

### 🎨 User Experience
- **Dark/Light Theme**: System-aware theme switching
- **Responsive Design**: Optimized for all device sizes
- **Fast Loading**: Server-side rendering with optimized performance
- **Accessibility**: Keyboard navigation and screen reader support

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Charts**: Lightweight Charts for advanced financial visualization
- **Data**: CoinGecko API for comprehensive cryptocurrency data
- **Real-time**: WebSocket integration for live price updates
- **State Management**: React hooks with optimized re-rendering

## 📁 Project Structure

```
crypto-dashboard/
├── app/                          # Next.js App Router
│   ├── coins/                    # Coin listing and detail pages
│   │   ├── page.tsx             # Coin listing with pagination
│   │   └── [id]/                # Dynamic coin detail pages
│   │       └── page.tsx
│   ├── globals.css              # Global styles and Tailwind
│   ├── layout.tsx               # Root layout with theme provider
│   └── page.tsx                 # Home dashboard
├── components/                   # Reusable React components
│   ├── layout/                  # Layout components (Header, Footer)
│   ├── home/                    # Home page components
│   ├── coindetails/             # Coin detail page components
│   ├── ui/                      # Radix UI components
│   ├── CandleStickChart.tsx     # Interactive price charts
│   ├── CurrencyConverter.tsx    # Multi-currency converter
│   ├── DataTable.tsx            # Sortable data tables
│   ├── LivePriceDisplay.tsx     # Real-time price component
│   ├── SearchBar.tsx            # Global search component
│   └── SimilarCoins.tsx         # Similar coin recommendations
├── hooks/                       # Custom React hooks
│   ├── useCoinGecoWebSocket.ts  # Individual coin WebSocket
│   └── useMultipleCoinsWebSocket.ts # Multiple coins WebSocket
├── lib/                         # Utility libraries
│   ├── api.actions.ts           # API client with retry logic
│   └── utils.ts                 # Formatting and helper functions
└── types/                       # TypeScript type definitions
    └── type.d.ts                # Global type declarations
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- CoinGecko API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dotsatya/DotCryptoChecker.git
   cd crypto-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with your API keys:
   ```env
   DOTCRYPTO_BASE_URL=https://api.coingecko.com/api/v3
   DOTCRYPTO_API_KEY=your_coingecko_api_key_here
   NEXT_PUBLIC_DOTCRYPTO_WS_URL=wss://your-websocket-url
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 API Integration

### CoinGecko API Endpoints Used
- `/coins/markets` - Market data for coin listings
- `/coins/{id}` - Detailed coin information
- `/coins/{id}/ohlc` - Price history for charting
- `/coins/{id}/similar` - Similar coin recommendations
- WebSocket streams for real-time price updates

### Rate Limiting & Error Handling
- Automatic retry logic for failed requests
- Exponential backoff for rate-limited calls
- Graceful fallbacks for API outages
- User-friendly error messages

## 🎯 Key Components

### SearchBar Component
```tsx
// Features real-time search with WebSocket updates
<SearchBar /> // Global search in header
```

### LivePriceDisplay Component
```tsx
// Shows real-time price with connection status
<LivePriceDisplay
  coinId="bitcoin"
  initialPrice={45000}
  initialChange24h={2.5}
/>
```

### CurrencyConverter Component
```tsx
// Multi-currency conversion with real-time rates
<CurrencyConverter
  coinId="ethereum"
  coinSymbol="ETH"
  coinPrice={3000}
  allPrices={/* all currency prices */}
/>
```

### CandleStickChart Component
```tsx
// Interactive financial charts
<CandleStickChart
  coinId="bitcoin"
  data={ohlcData}
  initialPeriod="monthly"
  height={400}
>
  {/* Custom chart overlay */}
</CandleStickChart>
```

## 🔧 Configuration

### Environment Variables
```env
# Required
DOTCRYPTO_BASE_URL=https://api.coingecko.com/api/v3
DOTCRYPTO_API_KEY=your_coingecko_api_key

# Optional - for WebSocket features
NEXT_PUBLIC_DOTCRYPTO_WS_URL=wss://stream.coingecko.com
```

### Theme Configuration
The app supports system-aware theming with manual override options.

## 📱 Responsive Design

- **Mobile-first approach** with Tailwind CSS breakpoints
- **Adaptive layouts** for phones, tablets, and desktops
- **Touch-friendly interfaces** for mobile interactions
- **Optimized performance** across all device sizes

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Environment Variables for Production
Ensure all environment variables are set in your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [CoinGecko API](https://www.coingecko.com/en/api) for cryptocurrency data
- [TradingView Lightweight Charts](https://www.tradingview.com/lightweight-charts/) for charting
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

**Built with ❤️ using Next.js and TypeScript**
