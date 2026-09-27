import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  LineChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Layers,
  Award,
  BookOpen,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  Sliders,
  Maximize2,
  RefreshCw,
  Zap,
  Shield,
  Briefcase
} from 'lucide-react';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedSymbol,
    setSelectedSymbol,
    cashBalance,
    realizedPnL,
    stocks,
    positions,
    orders,
    leaderboard,
    academyLessons,
    executeTrade
  } = useStore();

  const selectedStock = stocks.find((s) => s.symbol === selectedSymbol) || stocks[0];

  // Order Ticket state
  const [orderSide, setOrderSide] = useState('BUY');
  const [orderType, setOrderType] = useState('MARKET');
  const [orderShares, setOrderShares] = useState(10);
  const [tradeToast, setTradeToast] = useState(false);

  // Timeframe state
  const [timeframe, setTimeframe] = useState('1D');

  // Calculations
  const totalStockValue = positions.reduce((acc, pos) => {
    const s = stocks.find((st) => st.symbol === pos.symbol);
    const p = s ? s.price : pos.currentPrice;
    return acc + pos.shares * p;
  }, 0);

  const unrealizedPnL = positions.reduce((acc, pos) => {
    const s = stocks.find((st) => st.symbol === pos.symbol);
    const p = s ? s.price : pos.currentPrice;
    return acc + (p - pos.avgPrice) * pos.shares;
  }, 0);

  const netAssetValue = cashBalance + totalStockValue;

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!orderShares || Number(orderShares) <= 0) return;
    executeTrade(orderSide, selectedStock.symbol, orderShares, orderType);
    setTradeToast(true);
    setTimeout(() => setTradeToast(false), 1800);
  };

  return (
    <div className="min-h-screen bg-[#0c0f17] text-slate-100 font-mono text-xs flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* Top Terminal Status Header */}
      <header className="sticky top-0 z-40 bg-[#07090e] border-b border-slate-800 shadow-xl">
        <div className="bg-[#131b2e] px-4 py-1.5 flex items-center justify-between text-[11px] border-b border-slate-800">
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> QUANT_APEX LIVE MARKET FEED
            </span>
            <span className="text-slate-400 hidden sm:inline">NYSE / NASDAQ SYNCHRONIZED</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">
              CASH: <strong className="text-white">${cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
            </span>
            <span className="text-slate-400">
              NET LIQ (NAV): <strong className="text-cyan-400">${netAssetValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
            </span>
            <span className="text-slate-400 hidden md:inline">
              REALIZED P&L: <strong className="text-emerald-400">+${realizedPnL.toFixed(2)}</strong>
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('terminal')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-black font-black">
                <Activity className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-wider text-white">
                  QUANT<span className="text-emerald-400">APEX</span>
                </span>
                <span className="block text-[9px] text-slate-500 uppercase">
                  Terminal v4.8
                </span>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {[
                { id: 'terminal', label: 'Trading Desk' },
                { id: 'portfolio', label: 'Holdings & Allocation' },
                { id: 'orders', label: 'Trade Audit Log' },
                { id: 'leaderboard', label: 'Quant Leaderboard' },
                { id: 'academy', label: 'Trader Academy' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg font-bold uppercase transition ${
                    activeTab === tab.id
                      ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <span className="text-slate-400">Unrealized:</span>
              <span
                className={`font-bold ${
                  unrealizedPnL >= 0 ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {unrealizedPnL >= 0 ? '+' : ''}${unrealizedPnL.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* ================= TAB 1: TRADING DESK ================= */}
        {activeTab === 'terminal' && (
          <div className="space-y-6">
            {/* 3-Column Terminal Layout */}
            <div className="grid lg:grid-cols-12 gap-4 items-stretch">
              {/* Col 1: Watchlist & Stock Screener */}
              <div className="lg:col-span-3 bg-[#07090e] rounded-2xl border border-slate-800 p-4 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-[11px] font-bold text-slate-400">
                    <span>WATCHLIST</span>
                    <span>LAST / CHG</span>
                  </div>

                  <div className="divide-y divide-slate-900 mt-2 space-y-1">
                    {stocks.map((s) => (
                      <div
                        key={s.symbol}
                        onClick={() => setSelectedSymbol(s.symbol)}
                        className={`p-2.5 rounded-xl cursor-pointer transition flex items-center justify-between ${
                          selectedSymbol === s.symbol
                            ? 'bg-slate-800 border border-slate-700'
                            : 'hover:bg-slate-900/60'
                        }`}
                      >
                        <div>
                          <span className="font-bold text-white text-sm block">{s.symbol}</span>
                          <span className="text-[10px] text-slate-400 truncate max-w-[100px] block">
                            {s.name}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="font-bold text-white block">${s.price.toFixed(2)}</span>
                          <span
                            className={`text-[10px] font-bold flex items-center justify-end ${
                              s.change >= 0 ? 'text-emerald-400' : 'text-red-400'
                            }`}
                          >
                            {s.change >= 0 ? '+' : ''}
                            {s.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-500">
                  MARKET HOURS: 09:30 - 16:00 EST
                </div>
              </div>

              {/* Col 2: Interactive Chart & Technical Indicators */}
              <div className="lg:col-span-6 bg-[#07090e] rounded-2xl border border-slate-800 p-5 flex flex-col justify-between space-y-6">
                <div>
                  {/* Stock Header */}
                  <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold text-white">{selectedStock.symbol}</h1>
                        <span className="text-slate-400 text-xs">{selectedStock.name}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-3xl font-bold text-white">
                          ${selectedStock.price.toFixed(2)}
                        </span>
                        <span
                          className={`text-sm font-bold flex items-center ${
                            selectedStock.change >= 0 ? 'text-emerald-400' : 'text-red-400'
                          }`}
                        >
                          {selectedStock.change >= 0 ? '▲ +' : '▼ '}
                          {selectedStock.change.toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                      {['1D', '1W', '1M', '1Y', 'ALL'].map((tf) => (
                        <button
                          key={tf}
                          onClick={() => setTimeframe(tf)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                            timeframe === tf ? 'bg-emerald-500 text-black' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {tf}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Simulated Candle/Wave Chart Area */}
                  <div className="h-56 bg-slate-950/60 rounded-xl border border-slate-900 p-4 mt-4 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>SMA 20: ${(selectedStock.price * 0.98).toFixed(2)}</span>
                      <span>EMA 50: ${(selectedStock.price * 0.96).toFixed(2)}</span>
                      <span>RSI(14): 64.2 [NEUTRAL]</span>
                    </div>

                    {/* Visual Candlestick / Bars */}
                    <div className="flex items-end justify-between h-36 px-4 gap-2">
                      {selectedStock.sparkline.map((val, idx) => {
                        const height = Math.min(Math.max(((val - selectedStock.low) / (selectedStock.high - selectedStock.low + 0.1)) * 100, 20), 95);
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              className="w-full max-w-[28px] rounded-t transition-all duration-300 bg-emerald-500/80 border-t-2 border-emerald-400"
                              style={{ height: `${height}%` }}
                            />
                            <span className="text-[9px] text-slate-500">${val.toFixed(1)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Key Fundamental Metrics */}
                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-800 text-[10px]">
                  <div>
                    <span className="text-slate-500 block">OPEN</span>
                    <span className="font-bold text-white">${selectedStock.open.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">DAY HIGH</span>
                    <span className="font-bold text-emerald-400">${selectedStock.high.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">DAY LOW</span>
                    <span className="font-bold text-red-400">${selectedStock.low.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">MKT CAP</span>
                    <span className="font-bold text-white">{selectedStock.marketCap}</span>
                  </div>
                </div>
              </div>

              {/* Col 3: Order Execution Ticket */}
              <div className="lg:col-span-3 bg-[#07090e] rounded-2xl border border-slate-800 p-5 space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-sm">ORDER EXECUTION</h3>
                  <span className="text-[10px] text-slate-500">Live Paper Trading Engine</span>
                </div>

                {tradeToast && (
                  <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 p-2.5 rounded-xl text-center font-bold text-[11px] animate-bounce">
                    ✓ Order Filled: {orderSide} {orderShares} {selectedStock.symbol}
                  </div>
                )}

                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  {/* Buy / Sell Tabs */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setOrderSide('BUY')}
                      className={`py-2 rounded-lg font-bold transition ${
                        orderSide === 'BUY'
                          ? 'bg-emerald-500 text-black'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      BUY
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderSide('SELL')}
                      className={`py-2 rounded-lg font-bold transition ${
                        orderSide === 'SELL'
                          ? 'bg-red-500 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      SELL
                    </button>
                  </div>

                  {/* Order Type */}
                  <div>
                    <label className="text-slate-400 text-[10px] block mb-1">ORDER TYPE</label>
                    <select
                      value={orderType}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                    >
                      <option value="MARKET">Market (Instant Fill)</option>
                      <option value="LIMIT">Limit Order</option>
                      <option value="STOP">Stop Loss</option>
                    </select>
                  </div>

                  {/* Shares Input */}
                  <div>
                    <label className="text-slate-400 text-[10px] block mb-1">QUANTITY (SHARES)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={orderShares}
                      onChange={(e) => setOrderShares(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-bold text-base"
                    />
                    <div className="flex gap-1.5 mt-2">
                      {[10, 25, 50, 100].map((sh) => (
                        <button
                          key={sh}
                          type="button"
                          onClick={() => setOrderShares(sh)}
                          className="flex-1 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-300"
                        >
                          {sh}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Est. Total */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 space-y-1">
                    <div className="flex justify-between text-slate-400 text-[10px]">
                      <span>EXECUTION PRICE</span>
                      <span>${selectedStock.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-white text-xs pt-1 border-t border-slate-900">
                      <span>ESTIMATED TOTAL</span>
                      <span className="text-emerald-400">
                        ${(Number(orderShares || 0) * selectedStock.price).toLocaleString('en-US', {
                          minimumFractionDigits: 2
                        })}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3 rounded-xl font-bold text-xs tracking-wider transition ${
                      orderSide === 'BUY'
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20'
                        : 'bg-red-500 hover:bg-red-400 text-white shadow-lg shadow-red-500/20'
                    }`}
                  >
                    SUBMIT {orderSide} ORDER
                  </button>
                </form>
              </div>
            </div>

            {/* Active Portfolio Positions Table */}
            <div className="bg-[#07090e] rounded-2xl border border-slate-800 overflow-hidden shadow-xl p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="font-bold text-white text-sm">OPEN PORTFOLIO POSITIONS ({positions.length})</h3>
                <span className="text-[10px] text-slate-400">Mark-to-Market Real-Time Valuations</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3">Symbol</th>
                      <th className="px-4 py-3">Shares</th>
                      <th className="px-4 py-3">Avg Cost</th>
                      <th className="px-4 py-3">Current Price</th>
                      <th className="px-4 py-3">Position Value</th>
                      <th className="px-4 py-3">Unrealized P&L</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 font-medium">
                    {positions.map((p) => {
                      const stock = stocks.find((s) => s.symbol === p.symbol);
                      const current = stock ? stock.price : p.currentPrice;
                      const value = p.shares * current;
                      const pl = (current - p.avgPrice) * p.shares;
                      const plPercent = ((current - p.avgPrice) / p.avgPrice) * 100;

                      return (
                        <tr key={p.symbol} className="hover:bg-slate-900/60">
                          <td className="px-4 py-3 font-bold text-white">{p.symbol}</td>
                          <td className="px-4 py-3">{p.shares}</td>
                          <td className="px-4 py-3 text-slate-400">${p.avgPrice.toFixed(2)}</td>
                          <td className="px-4 py-3 text-white font-bold">${current.toFixed(2)}</td>
                          <td className="px-4 py-3 font-bold text-white">${value.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <span className={`font-bold ${pl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                              {pl >= 0 ? '+' : ''}${pl.toFixed(2)} ({plPercent.toFixed(2)}%)
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => executeTrade('SELL', p.symbol, p.shares)}
                              className="bg-red-500/20 hover:bg-red-500 hover:text-white text-red-400 text-[10px] px-3 py-1 rounded-lg transition font-bold"
                            >
                              Close All
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: PORTFOLIO ALLOCATION ================= */}
        {activeTab === 'portfolio' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-xl font-bold text-white">PORTFOLIO ASSET ALLOCATION & CAPITAL METRICS</h2>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-[#07090e] p-5 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase">Available Cash</span>
                <div className="text-2xl font-bold text-white">${cashBalance.toFixed(2)}</div>
                <span className="text-[10px] text-emerald-400 font-bold">Liquid Reserve</span>
              </div>
              <div className="bg-[#07090e] p-5 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase">Invested Equities</span>
                <div className="text-2xl font-bold text-white">${totalStockValue.toFixed(2)}</div>
                <span className="text-[10px] text-cyan-400 font-bold">{positions.length} Active Positions</span>
              </div>
              <div className="bg-[#07090e] p-5 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase">Net Portfolio NAV</span>
                <div className="text-2xl font-bold text-emerald-400">${netAssetValue.toFixed(2)}</div>
                <span className="text-[10px] text-slate-400 font-bold">Total Capital Base</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ORDER AUDIT LOG ================= */}
        {activeTab === 'orders' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-xl font-bold text-white">EXECUTED TRADE AUDIT LOG</h2>

            <div className="bg-[#07090e] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Order ID</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Side</th>
                    <th className="px-4 py-3">Symbol</th>
                    <th className="px-4 py-3">Shares</th>
                    <th className="px-4 py-3">Fill Price</th>
                    <th className="px-4 py-3">Total Cost</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900 font-medium">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-900/60">
                      <td className="px-4 py-3 font-bold text-slate-400">{o.id}</td>
                      <td className="px-4 py-3 text-slate-500">{o.timestamp}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            o.type === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {o.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-bold text-white">{o.symbol}</td>
                      <td className="px-4 py-3">{o.shares}</td>
                      <td className="px-4 py-3">${o.price.toFixed(2)}</td>
                      <td className="px-4 py-3 font-bold text-white">${o.total.toFixed(2)}</td>
                      <td className="px-4 py-3 text-emerald-400 font-bold">{o.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 4: LEADERBOARD ================= */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-xl font-bold text-white">GLOBAL PAPER TRADING LEADERBOARD</h2>

            <div className="bg-[#07090e] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Rank</th>
                    <th className="px-4 py-3">Trader Handle</th>
                    <th className="px-4 py-3">ROI (%)</th>
                    <th className="px-4 py-3">Portfolio NAV</th>
                    <th className="px-4 py-3">Badge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900 font-medium">
                  {leaderboard.map((trader) => (
                    <tr key={trader.rank} className="hover:bg-slate-900/60">
                      <td className="px-4 py-3 font-bold text-amber-400">#{trader.rank}</td>
                      <td className="px-4 py-3 font-bold text-white">{trader.handle}</td>
                      <td className="px-4 py-3 text-emerald-400 font-bold">+{trader.roi}%</td>
                      <td className="px-4 py-3 font-bold text-white">${trader.portfolioValue.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className="bg-slate-800 text-cyan-300 border border-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">
                          {trader.badge}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 5: ACADEMY ================= */}
        {activeTab === 'academy' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-xl font-bold text-white">QUANTITATIVE TRADING ACADEMY</h2>

            <div className="space-y-4">
              {academyLessons.map((l) => (
                <div
                  key={l.id}
                  className="bg-[#07090e] p-5 rounded-2xl border border-slate-800 shadow-lg flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] text-emerald-400 uppercase font-bold">{l.topic}</span>
                    <h3 className="font-bold text-white text-sm mt-0.5">{l.title}</h3>
                    <span className="text-slate-500 text-[10px]">Read time: {l.readTime} · Level: {l.level}</span>
                  </div>
                  <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition">
                    Start Module
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-[#07090e] text-slate-500 py-6 border-t border-slate-800 text-[10px]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white">QUANTAPEX TERMINAL</span> · Project 58 / 59
          </div>
          <div>Port 3058 · Virtual Paper Trading & Order Book Simulator</div>
        </div>
      </footer>
    </div>
  );
}
