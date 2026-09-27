import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  Trophy,
  Calendar,
  Flame,
  Award,
  Ticket,
  Shield,
  Clock,
  Play,
  CheckCircle2,
  AlertTriangle,
  Zap,
  ChevronRight,
  TrendingUp,
  Sliders,
  QrCode,
  Users
} from 'lucide-react';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedSeason,
    teams,
    standings,
    fixtures,
    topScorers,
    userTickets,
    recordLiveGoal,
    recordLiveCard,
    updateMatchMinute,
    bookTicket
  } = useStore();

  const [activeMatch, setActiveMatch] = useState(fixtures[0]);
  const [ticketModalMatch, setTicketModalMatch] = useState(null);
  const [selectedStand, setSelectedStand] = useState('East Grandstand');
  const [selectedTier, setSelectedTier] = useState('Standard Fan');
  const [ticketQty, setTicketQty] = useState(1);
  const [ticketSuccess, setTicketSuccess] = useState(false);

  // Referee input state
  const [refScorer, setRefScorer] = useState('Gabriel Sterling');
  const [refTeam, setRefTeam] = useState('home');
  const [refMinute, setRefMinute] = useState(76);

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    recordLiveGoal(activeMatch.id, refTeam, refScorer);
  };

  const handleCardSubmit = (color) => {
    recordLiveCard(activeMatch.id, refTeam, refScorer, color);
  };

  const handleTicketCheckout = (e) => {
    e.preventDefault();
    const price = selectedTier === 'VIP Premium Club' ? 120 : selectedTier === 'Club Executive' ? 75 : 45;
    bookTicket(ticketModalMatch.id, selectedStand, selectedTier, price, ticketQty);
    setTicketSuccess(true);
    setTimeout(() => {
      setTicketSuccess(false);
      setTicketModalMatch(null);
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-slate-100 font-sans flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Top Banner & Navigation */}
      <header className="sticky top-0 z-40 bg-[#071324]/90 backdrop-blur-md border-b border-[#233554] shadow-xl">
        {/* Live League Ticker Bar */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-black py-1.5 px-4 text-xs font-bold font-display uppercase tracking-widest flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            <span>LIVE MATCHDAY 25: TITAN CITY FC 2 - 1 VALHALLA UNITED (74') · SKYLINE ARENA</span>
          </div>
          <div className="hidden sm:block text-[11px] font-mono font-black">
            SEASON {selectedSeason} · APEX LEAGUE OFFICIAL
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveTab('standings')}
              className="flex items-center gap-3 text-left group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Trophy className="w-7 h-7" />
              </div>
              <div>
                <span className="text-2xl font-display font-black tracking-wider text-white">
                  APEX <span className="text-amber-400">PREMIER</span> LEAGUE
                </span>
                <span className="block text-[10px] font-mono text-slate-400 tracking-wider">
                  OFFICIAL LEAGUE & MATCHDAY CENTER
                </span>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {[
                { id: 'standings', label: 'Standings Table', icon: Trophy },
                { id: 'matches', label: 'Fixtures & Live Match', icon: Calendar },
                { id: 'referee-console', label: 'Scorekeeper Console', icon: Sliders },
                { id: 'stats', label: 'Golden Boot & Stats', icon: Award },
                { id: 'teams', label: 'Club Rosters', icon: Shield },
                { id: 'tickets', label: 'Matchday Passes', icon: Ticket }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase font-display tracking-wider transition-all flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'bg-[#1e293b] text-amber-400 border border-amber-400/40 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-[#112240]'
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('tickets')}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-display font-extrabold uppercase tracking-wider text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition active:scale-95 flex items-center gap-2"
            >
              <Ticket className="w-4 h-4" /> Buy Tickets ({userTickets.length})
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ================= TAB 1: STANDINGS ================= */}
        {activeTab === 'standings' && (
          <div className="space-y-8">
            {/* Spotlight Match Card */}
            <div className="bg-gradient-to-r from-[#112240] to-[#1e293b] rounded-3xl p-6 md:p-8 border border-[#233554] shadow-2xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-3xl">
                      🛡️
                    </div>
                    <span className="font-display font-bold text-sm mt-1 block">Titan City</span>
                  </div>

                  <div className="text-center px-4">
                    <span className="inline-flex items-center gap-1.5 bg-red-600/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full text-xs font-display font-bold uppercase tracking-wider mb-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" /> LIVE 74'
                    </span>
                    <div className="text-4xl sm:text-5xl font-display font-black text-amber-400 tracking-wider">
                      2 - 1
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">Skyline Arena</span>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-3xl">
                      ⚡
                    </div>
                    <span className="font-display font-bold text-sm mt-1 block">Valhalla Utd</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab('referee-console')}
                    className="bg-amber-500 hover:bg-amber-600 text-black font-display font-bold uppercase text-xs px-5 py-2.5 rounded-xl transition"
                  >
                    Open Live Score Console
                  </button>
                  <button
                    onClick={() => {
                      setTicketModalMatch(fixtures[0]);
                    }}
                    className="bg-[#233554] hover:bg-[#334b73] text-white font-display font-bold uppercase text-xs px-5 py-2.5 rounded-xl border border-slate-700 transition"
                  >
                    Book Matchday Pass
                  </button>
                </div>
              </div>
            </div>

            {/* Standings Table */}
            <div className="bg-[#112240] rounded-3xl border border-[#233554] overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-[#233554] flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-display font-black text-white tracking-wider">
                    LEAGUE STANDINGS · SEASON 2026/27
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5 font-mono">
                    Top 4 qualify for Champions Super Cup · Bottom 2 relegated
                  </p>
                </div>
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-display font-bold px-3 py-1 rounded-full uppercase">
                  Matchday 25 of 38
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#071324] text-slate-400 text-xs font-display font-bold uppercase tracking-wider border-b border-[#233554]">
                    <tr>
                      <th className="px-6 py-4">Pos</th>
                      <th className="px-6 py-4">Club</th>
                      <th className="px-4 py-4 text-center">MP</th>
                      <th className="px-4 py-4 text-center">W</th>
                      <th className="px-4 py-4 text-center">D</th>
                      <th className="px-4 py-4 text-center">L</th>
                      <th className="px-4 py-4 text-center">GF</th>
                      <th className="px-4 py-4 text-center">GA</th>
                      <th className="px-4 py-4 text-center">GD</th>
                      <th className="px-6 py-4 text-center font-black text-amber-400">PTS</th>
                      <th className="px-6 py-4 text-center">Recent Form</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#233554]/60 font-medium">
                    {standings.map((team) => (
                      <tr key={team.teamId} className="hover:bg-[#172a45] transition">
                        <td className="px-6 py-4 font-display font-bold text-base">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-display font-black text-xs ${
                              team.rank <= 2
                                ? 'bg-amber-500 text-black'
                                : team.rank <= 4
                                ? 'bg-blue-600 text-white'
                                : 'bg-[#1e293b] text-slate-300'
                            }`}
                          >
                            {team.rank}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-display font-bold text-base text-white">
                          {team.name}
                        </td>
                        <td className="px-4 py-4 text-center text-slate-300">{team.mp}</td>
                        <td className="px-4 py-4 text-center text-slate-300">{team.w}</td>
                        <td className="px-4 py-4 text-center text-slate-300">{team.d}</td>
                        <td className="px-4 py-4 text-center text-slate-300">{team.l}</td>
                        <td className="px-4 py-4 text-center text-slate-400">{team.gf}</td>
                        <td className="px-4 py-4 text-center text-slate-400">{team.ga}</td>
                        <td className="px-4 py-4 text-center font-mono font-bold text-emerald-400">
                          +{team.gd}
                        </td>
                        <td className="px-6 py-4 text-center font-display font-black text-xl text-amber-400">
                          {team.pts}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-1.5">
                            {team.form.map((res, i) => (
                              <span
                                key={i}
                                className={`w-5 h-5 rounded-md text-[10px] font-display font-black flex items-center justify-center ${
                                  res === 'W'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : res === 'D'
                                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                }`}
                              >
                                {res}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: FIXTURES & MATCH CENTER ================= */}
        {activeTab === 'matches' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-black text-white tracking-wider">
              MATCHDAY SCHEDULE & LIVE TIMELINE
            </h2>

            <div className="grid gap-6">
              {fixtures.map((f) => (
                <div
                  key={f.id}
                  className="bg-[#112240] rounded-3xl p-6 border border-[#233554] shadow-xl space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-[#233554] pb-3">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                      {f.round} · {f.stadium}
                    </span>
                    <span
                      className={`text-xs font-display font-bold uppercase px-3 py-1 rounded-full ${
                        f.status === 'Live'
                          ? 'bg-red-600/20 text-red-400 border border-red-500/30 animate-pulse'
                          : 'bg-[#1e293b] text-slate-400'
                      }`}
                    >
                      {f.status === 'Live' ? `LIVE MIN ${f.minute}'` : f.date}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 items-center text-center">
                    <div className="text-xl sm:text-2xl font-display font-bold text-white">
                      {f.homeTeam}
                    </div>
                    <div>
                      {f.homeScore !== null ? (
                        <div className="text-3xl sm:text-4xl font-display font-black text-amber-400">
                          {f.homeScore} - {f.awayScore}
                        </div>
                      ) : (
                        <div className="text-sm font-mono text-slate-400">VS</div>
                      )}
                    </div>
                    <div className="text-xl sm:text-2xl font-display font-bold text-white">
                      {f.awayTeam}
                    </div>
                  </div>

                  {/* Match events timeline */}
                  {f.events.length > 0 && (
                    <div className="pt-3 border-t border-[#233554] space-y-2">
                      <span className="text-[11px] font-mono text-slate-400 uppercase">
                        Key Events:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {f.events.map((ev, idx) => (
                          <span
                            key={idx}
                            className="bg-[#071324] border border-[#233554] text-xs px-3 py-1 rounded-xl text-slate-300 flex items-center gap-1.5"
                          >
                            <span className="font-mono text-amber-400 font-bold">{ev.minute}'</span>
                            {ev.type === 'goal' ? '⚽' : '🟨'} {ev.player} ({ev.team})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setTicketModalMatch(f)}
                      className="bg-amber-500 hover:bg-amber-600 text-black font-display font-bold uppercase text-xs px-4 py-2 rounded-xl transition"
                    >
                      Book Ticket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: REFEREE CONSOLE ================= */}
        {activeTab === 'referee-console' && (
          <div className="max-w-2xl mx-auto bg-[#112240] rounded-3xl p-8 border border-[#233554] shadow-2xl space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">
                Official Match Delegate & Scorekeeper
              </span>
              <h2 className="text-3xl font-display font-black text-white mt-1">
                LIVE SCORE & DISCIPLINE CONSOLE
              </h2>
            </div>

            <div className="bg-[#071324] rounded-2xl p-5 border border-[#233554] flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400 font-mono">Current Live Fixture</div>
                <div className="text-lg font-display font-bold text-white">
                  {fixtures[0].homeTeam} vs {fixtures[0].awayTeam}
                </div>
              </div>
              <div className="text-2xl font-display font-black text-amber-400">
                {fixtures[0].homeScore} - {fixtures[0].awayScore}
              </div>
            </div>

            <form onSubmit={handleGoalSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Scoring Side
                  </label>
                  <select
                    value={refTeam}
                    onChange={(e) => setRefTeam(e.target.value)}
                    className="w-full bg-[#1e293b] border border-[#233554] rounded-xl px-4 py-2.5 text-sm font-display font-bold text-white focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="home">{fixtures[0].homeTeam} (Home)</option>
                    <option value="away">{fixtures[0].awayTeam} (Away)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Goalscorer / Involved Player
                  </label>
                  <input
                    type="text"
                    required
                    value={refScorer}
                    onChange={(e) => setRefScorer(e.target.value)}
                    className="w-full bg-[#1e293b] border border-[#233554] rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-display font-black uppercase text-sm py-3 rounded-xl shadow-lg transition active:scale-95"
                >
                  ⚽ Record Goal (+1)
                </button>
                <button
                  type="button"
                  onClick={() => handleCardSubmit('yellow')}
                  className="bg-amber-500 hover:bg-amber-600 text-black font-display font-black uppercase text-xs px-5 py-3 rounded-xl transition"
                >
                  🟨 Yellow Card
                </button>
                <button
                  type="button"
                  onClick={() => handleCardSubmit('red')}
                  className="bg-red-600 hover:bg-red-700 text-white font-display font-black uppercase text-xs px-5 py-3 rounded-xl transition"
                >
                  🟥 Red Card
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= TAB 4: GOLDEN BOOT STATS ================= */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-black text-white tracking-wider">
              GOLDEN BOOT & TOP PERFORMERS
            </h2>

            <div className="bg-[#112240] rounded-3xl border border-[#233554] overflow-hidden shadow-xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#071324] text-slate-400 text-xs font-display font-bold uppercase tracking-wider border-b border-[#233554]">
                  <tr>
                    <th className="px-6 py-4">Rank</th>
                    <th className="px-6 py-4">Player</th>
                    <th className="px-6 py-4">Club</th>
                    <th className="px-4 py-4 text-center">Matches</th>
                    <th className="px-4 py-4 text-center font-black text-amber-400">Goals ⚽</th>
                    <th className="px-4 py-4 text-center">Assists 👟</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#233554]/60 font-medium">
                  {topScorers.map((p) => (
                    <tr key={p.rank} className="hover:bg-[#172a45] transition">
                      <td className="px-6 py-4 font-display font-bold text-base">
                        <span className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-black text-xs">
                          {p.rank}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-display font-bold text-base text-white">{p.name}</td>
                      <td className="px-6 py-4 text-slate-400">{p.team}</td>
                      <td className="px-4 py-4 text-center text-slate-300">{p.matches}</td>
                      <td className="px-4 py-4 text-center font-display font-black text-xl text-amber-400">
                        {p.goals}
                      </td>
                      <td className="px-4 py-4 text-center text-slate-300">{p.assists}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 5: CLUB SQUADS ================= */}
        {activeTab === 'teams' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-black text-white tracking-wider">
              OFFICIAL SQUAD ROSTERS
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((tm) => (
                <div
                  key={tm.id}
                  className="bg-[#112240] rounded-3xl p-6 border border-[#233554] shadow-xl space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{tm.logo}</span>
                    <div>
                      <h3 className="font-display font-black text-xl text-white">{tm.name}</h3>
                      <span className="text-xs text-slate-400 font-mono">
                        Manager: {tm.manager} · {tm.founded}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#233554]">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">
                      Key Squad Players:
                    </span>
                    {tm.squad.map((pl, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs bg-[#071324] p-2.5 rounded-xl border border-[#233554]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-amber-400">#{pl.number}</span>
                          <span className="font-bold text-white">{pl.name}</span>
                          <span className="text-[10px] bg-[#233554] px-1.5 py-0.5 rounded text-slate-300">
                            {pl.pos}
                          </span>
                        </div>
                        <span className="font-mono text-emerald-400 font-bold">
                          {pl.goals} G · ★ {pl.rating}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 6: TICKETS ================= */}
        {activeTab === 'tickets' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-display font-black text-white tracking-wider">
              MY DIGITAL MATCHDAY PASSES
            </h2>

            {userTickets.map((tck) => (
              <div
                key={tck.id}
                className="bg-gradient-to-r from-[#112240] to-[#1e293b] rounded-3xl p-6 border border-[#233554] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-amber-400">{tck.id}</span>
                  <h3 className="text-xl font-display font-black text-white">{tck.fixture}</h3>
                  <div className="text-xs text-slate-400 font-mono">
                    🏟️ {tck.stadium} · {tck.stand}
                  </div>
                  <div className="text-xs text-amber-400 font-bold font-display">
                    Tier: {tck.tier} · {tck.quantity} Pass(es)
                  </div>
                </div>

                <div className="bg-white p-3 rounded-2xl flex flex-col items-center">
                  <QrCode className="w-20 h-20 text-black" />
                  <span className="text-[10px] font-mono text-slate-800 font-bold mt-1">
                    {tck.qrCode}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ================= TICKET BOOKING MODAL ================= */}
      {ticketModalMatch && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#112240] rounded-3xl max-w-lg w-full p-8 border border-[#233554] shadow-2xl space-y-6">
            {ticketSuccess ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-2xl font-display font-black text-white">Pass Confirmed!</h3>
                <p className="text-xs text-slate-300">
                  Your official QR entry pass is ready in My Passes tab.
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center border-b border-[#233554] pb-4">
                  <div>
                    <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                      Official Ticket Vault
                    </span>
                    <h3 className="text-xl font-display font-black text-white">
                      {ticketModalMatch.homeTeam} vs {ticketModalMatch.awayTeam}
                    </h3>
                  </div>
                  <button
                    onClick={() => setTicketModalMatch(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleTicketCheckout} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Stadium Seating Section
                    </label>
                    <select
                      value={selectedStand}
                      onChange={(e) => setSelectedStand(e.target.value)}
                      className="w-full bg-[#1e293b] border border-[#233554] rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="East Grandstand">East Grandstand</option>
                      <option value="VIP Presidential Box">VIP Presidential Box</option>
                      <option value="North Supporter Curve">North Supporter Curve</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Hospitality Tier
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { name: 'Standard Fan', price: 45 },
                        { name: 'Club Executive', price: 75 },
                        { name: 'VIP Premium Club', price: 120 }
                      ].map((t) => (
                        <button
                          key={t.name}
                          type="button"
                          onClick={() => setSelectedTier(t.name)}
                          className={`p-3 rounded-xl border text-left transition ${
                            selectedTier === t.name
                              ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                              : 'bg-[#071324] border-[#233554] text-slate-300'
                          }`}
                        >
                          <div className="text-xs font-bold font-display">{t.name}</div>
                          <div className="text-sm font-black font-display mt-1">${t.price}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-display font-black uppercase text-sm py-3.5 rounded-xl shadow-lg transition active:scale-95"
                  >
                    Confirm & Purchase Pass ($
                    {selectedTier === 'VIP Premium Club' ? 120 : selectedTier === 'Club Executive' ? 75 : 45})
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto bg-[#071324] text-slate-500 py-8 border-t border-[#233554] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span className="font-display font-bold text-white">APEX PREMIER LEAGUE</span> · Project 55 / 59
          </div>
          <div className="font-mono">Port 3055 · Live Match Center & League Table Architecture</div>
        </div>
      </footer>
    </div>
  );
}
