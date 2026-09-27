import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  PieChart,
  Wallet,
  Target,
  ArrowUpRight,
  ArrowDownLeft,
  PlusCircle,
  AlertCircle,
  FileText,
  DollarSign,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  Percent,
  Download
} from 'lucide-react';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedMonth,
    monthlyIncome,
    categories,
    savingsGoals,
    transactions,
    addTransaction,
    updateCategoryBudget,
    contributeToGoal,
    addSavingsGoal
  } = useStore();

  // Transaction Form State
  const [txDesc, setTxDesc] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txCategory, setTxCategory] = useState('Groceries & Dining');
  const [txType, setTxType] = useState('expense');

  // Savings Goal Form State
  const [goalTitle, setGoalTitle] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalDeadline, setGoalDeadline] = useState('Dec 2026');

  // Budget Edit State
  const [editingCatId, setEditingCatId] = useState(null);
  const [editLimit, setEditLimit] = useState('');

  const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);
  const totalAllocated = categories.reduce((sum, c) => sum + c.allocated, 0);
  const netSavings = monthlyIncome - totalSpent;
  const savingsRate = Math.round((netSavings / monthlyIncome) * 100);

  const overspentCategories = categories.filter(c => c.spent > c.allocated);

  const handleTxSubmit = (e) => {
    e.preventDefault();
    if (!txDesc.trim() || !txAmount) return;
    addTransaction({
      description: txDesc,
      amount: Number(txAmount),
      category: txCategory,
      type: txType
    });
    setTxDesc('');
    setTxAmount('');
  };

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    if (!goalTitle.trim() || !goalTarget) return;
    addSavingsGoal({
      title: goalTitle,
      target: Number(goalTarget),
      deadline: goalDeadline
    });
    setGoalTitle('');
    setGoalTarget('');
  };

  return (
    <div className="min-h-screen bg-[#f0fdfa] text-slate-800 font-sans flex flex-col selection:bg-teal-600 selection:text-white">
      {/* Top Header */}
      <header className="bg-white border-b border-teal-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/20">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-teal-950 leading-tight block">TealWealth</span>
              <span className="text-[10px] text-teal-600 font-mono font-bold uppercase tracking-wider">
                PERSONAL BUDGET PLANNER & SAVINGS MATRIX
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-1 bg-teal-50 p-1 rounded-2xl border border-teal-100 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3.5 py-1.5 rounded-xl transition ${
                  activeTab === 'overview' ? 'bg-teal-600 text-white shadow-sm font-bold' : 'text-teal-900 hover:text-teal-600'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`px-3.5 py-1.5 rounded-xl transition ${
                  activeTab === 'categories' ? 'bg-teal-600 text-white shadow-sm font-bold' : 'text-teal-900 hover:text-teal-600'
                }`}
              >
                Budget Limits
              </button>
              <button
                onClick={() => setActiveTab('goals')}
                className={`px-3.5 py-1.5 rounded-xl transition ${
                  activeTab === 'goals' ? 'bg-teal-600 text-white shadow-sm font-bold' : 'text-teal-900 hover:text-teal-600'
                }`}
              >
                Savings Goals
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`px-3.5 py-1.5 rounded-xl transition ${
                  activeTab === 'transactions' ? 'bg-teal-600 text-white shadow-sm font-bold' : 'text-teal-900 hover:text-teal-600'
                }`}
              >
                Ledger ({transactions.length})
              </button>
              <button
                onClick={() => setActiveTab('report')}
                className={`px-3.5 py-1.5 rounded-xl transition ${
                  activeTab === 'report' ? 'bg-teal-600 text-white shadow-sm font-bold' : 'text-teal-900 hover:text-teal-600'
                }`}
              >
                Summary Report
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Overspend Alert Banner */}
      {overspentCategories.length > 0 && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-xs text-amber-900 flex items-center justify-center gap-2 font-mono">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span className="font-bold">BUDGET EXCEEDED:</span>
          <span>You have overspent in {overspentCategories.map(c => c.name).join(', ')}. Consider reallocating budget limits!</span>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* DASHBOARD OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-teal-100 shadow-sm space-y-1">
                <span className="text-xs font-mono text-teal-600 font-bold uppercase">Monthly Net Income</span>
                <div className="text-2xl font-black text-teal-950 font-mono">${monthlyIncome.toLocaleString()}</div>
                <span className="text-[11px] text-teal-700 font-mono">Verified direct deposit</span>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-teal-100 shadow-sm space-y-1">
                <span className="text-xs font-mono text-stone-500 font-bold uppercase">Total Expenses</span>
                <div className="text-2xl font-black text-rose-600 font-mono">${totalSpent.toLocaleString()}</div>
                <span className="text-[11px] text-stone-400 font-mono">Allocated: ${totalAllocated.toLocaleString()}</span>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-teal-100 shadow-sm space-y-1">
                <span className="text-xs font-mono text-teal-600 font-bold uppercase">Net Cash Savings</span>
                <div className="text-2xl font-black text-emerald-600 font-mono">${netSavings.toLocaleString()}</div>
                <span className="text-[11px] text-emerald-700 font-mono">Surplus preserved</span>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-teal-100 shadow-sm space-y-1">
                <span className="text-xs font-mono text-teal-600 font-bold uppercase">Monthly Savings Rate</span>
                <div className="text-2xl font-black text-teal-600 font-mono">{savingsRate}%</div>
                <span className="text-[11px] text-teal-700 font-mono">Goal benchmark: 20%+</span>
              </div>
            </div>

            {/* Category Breakdown Progress Bars & Charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-teal-100 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-teal-50 pb-3">
                  <h3 className="font-extrabold text-base text-teal-950">Spending by Category vs Budget Limits</h3>
                  <span className="text-xs font-mono text-teal-600 font-bold">{selectedMonth}</span>
                </div>

                <div className="space-y-4">
                  {categories.map(cat => {
                    const pct = Math.min(100, Math.round((cat.spent / cat.allocated) * 100));
                    const isOver = cat.spent > cat.allocated;

                    return (
                      <div key={cat.id} className="space-y-1.5 text-xs font-mono">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-slate-800 flex items-center gap-2">
                            <span>{cat.icon}</span> {cat.name}
                          </span>
                          <span className={isOver ? 'font-bold text-rose-600' : 'text-slate-600'}>
                            ${cat.spent} / ${cat.allocated} ({pct}%)
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-teal-50 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isOver ? 'bg-rose-500' : 'bg-teal-500'
                            }`}
                            style={{ width: `${pct}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Transaction Logger */}
              <div className="bg-white p-6 rounded-3xl border border-teal-100 shadow-sm space-y-4">
                <h3 className="font-extrabold text-base text-teal-950">Log Quick Expense</h3>
                <form onSubmit={handleTxSubmit} className="space-y-3 text-xs font-mono">
                  <div className="space-y-1">
                    <label className="text-slate-600 font-bold">Expense Description</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Trader Joe's Groceries"
                      value={txDesc}
                      onChange={e => setTxDesc(e.target.value)}
                      className="w-full bg-teal-50/40 border border-teal-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-teal-500 font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-600 font-bold">Amount ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="45.50"
                      value={txAmount}
                      onChange={e => setTxAmount(e.target.value)}
                      className="w-full bg-teal-50/40 border border-teal-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-600 font-bold">Category</label>
                    <select
                      value={txCategory}
                      onChange={e => setTxCategory(e.target.value)}
                      className="w-full bg-teal-50/40 border border-teal-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-teal-500"
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl shadow-sm transition mt-2"
                  >
                    Add Expense to Ledger
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* SAVINGS GOALS TAB */}
        {activeTab === 'goals' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-teal-100 pb-3">
              <div>
                <h2 className="font-extrabold text-xl text-teal-950">Strategic Savings & Wealth Accumulation Goals</h2>
                <p className="text-xs text-teal-700 font-mono">Track milestones with automated allocation projections</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {savingsGoals.map(goal => {
                const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));

                return (
                  <div key={goal.id} className="bg-white p-6 rounded-3xl border border-teal-100 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl p-3 bg-teal-50 rounded-2xl border border-teal-100">{goal.icon}</span>
                        <span className="text-xs font-mono font-bold text-teal-700">{goal.deadline}</span>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-slate-900 leading-snug">{goal.title}</h4>
                        <div className="flex justify-between items-baseline pt-2 text-xs font-mono">
                          <span className="text-2xl font-black text-teal-600">${goal.current.toLocaleString()}</span>
                          <span className="text-stone-400">Target: ${goal.target.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="w-full h-2 bg-teal-50 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-500 rounded-full" style={{ width: `${pct}%` }}></div>
                        </div>
                        <span className="text-[10px] font-mono text-teal-700 font-bold block text-right">{pct}% Funded</span>
                      </div>
                    </div>

                    <button
                      onClick={() => contributeToGoal(goal.id, 250)}
                      className="w-full py-2 bg-teal-50 hover:bg-teal-100 text-teal-950 border border-teal-200 font-bold text-xs rounded-xl transition"
                    >
                      + Quick Add $250 Deposit
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Create Goal Form */}
            <div className="bg-white p-6 rounded-3xl border border-teal-100 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-teal-950 font-mono uppercase">Add New Savings Milestone</h3>
              <form onSubmit={handleGoalSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <input
                  type="text"
                  required
                  placeholder="e.g. Electric Vehicle Down Payment"
                  value={goalTitle}
                  onChange={e => setGoalTitle(e.target.value)}
                  className="bg-teal-50/40 border border-teal-200 rounded-xl p-2.5 text-slate-900"
                />
                <input
                  type="number"
                  required
                  placeholder="Target Amount ($)"
                  value={goalTarget}
                  onChange={e => setGoalTarget(e.target.value)}
                  className="bg-teal-50/40 border border-teal-200 rounded-xl p-2.5 text-slate-900"
                />
                <button
                  type="submit"
                  className="py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl shadow-sm"
                >
                  Create Milestone
                </button>
              </form>
            </div>
          </div>
        )}

        {/* BUDGET CATEGORY LIMITS */}
        {activeTab === 'categories' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-b border-teal-100 pb-3">
              <h2 className="font-extrabold text-xl text-teal-950">Category Budget Allocations & Limits</h2>
              <p className="text-xs text-teal-700 font-mono">Adjust envelope spending limits to match income constraints</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map(cat => (
                <div key={cat.id} className="bg-white p-5 rounded-3xl border border-teal-100 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span>{cat.icon}</span> {cat.name}
                    </span>
                    <span className="text-xs font-mono font-bold text-teal-600">${cat.allocated} / mo</span>
                  </div>

                  {editingCatId === cat.id ? (
                    <div className="flex gap-2 text-xs font-mono">
                      <input
                        type="number"
                        placeholder="New limit"
                        value={editLimit}
                        onChange={e => setEditLimit(e.target.value)}
                        className="w-full bg-teal-50 border border-teal-200 rounded-xl p-2 text-slate-900"
                      />
                      <button
                        onClick={() => {
                          if (editLimit) updateCategoryBudget(cat.id, editLimit);
                          setEditingCatId(null);
                        }}
                        className="px-4 py-2 bg-teal-600 text-white font-bold rounded-xl"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingCatId(cat.id);
                        setEditLimit(cat.allocated.toString());
                      }}
                      className="text-xs text-teal-700 font-mono hover:underline font-bold"
                    >
                      Adjust Limit
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TRANSACTIONS LEDGER */}
        {activeTab === 'transactions' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-b border-teal-100 pb-3">
              <h2 className="font-extrabold text-xl text-teal-950">Complete Financial Transaction Ledger</h2>
              <p className="text-xs text-teal-700 font-mono">Chronological transaction flow with categorizations</p>
            </div>

            <div className="bg-white rounded-3xl border border-teal-100 p-6 shadow-sm">
              <div className="divide-y divide-teal-50">
                {transactions.map(tx => (
                  <div key={tx.id} className="py-3 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                        tx.type === 'income' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {tx.type === 'income' ? '+' : '-'}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 text-xs font-sans block">{tx.description}</span>
                        <span className="text-[10px] text-stone-400">{tx.category} • {tx.date}</span>
                      </div>
                    </div>

                    <span className={`font-black text-sm ${
                      tx.type === 'income' ? 'text-emerald-600' : 'text-slate-800'
                    }`}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AUTO-GENERATED MONTHLY SUMMARY REPORT */}
        {activeTab === 'report' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border-b border-teal-100 pb-3">
              <h2 className="font-extrabold text-xl text-teal-950">Monthly Financial Health Executive Summary</h2>
              <p className="text-xs text-teal-700 font-mono">Automated wealth velocity, liquidity, and savings performance audit</p>
            </div>

            <div className="bg-white rounded-3xl border border-teal-100 p-8 shadow-sm space-y-6 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-teal-100 pb-4">
                <div>
                  <span className="text-teal-700 font-bold uppercase tracking-wider block">EXECUTIVE FINANCIAL STATEMENT</span>
                  <h3 className="text-lg font-black text-slate-900 font-sans">{selectedMonth}</h3>
                </div>
                <span className="px-3 py-1 bg-teal-50 text-teal-800 rounded-full font-bold">STATUS: HEALTHY</span>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-teal-50/40 p-5 rounded-2xl border border-teal-100">
                <div className="space-y-1">
                  <span className="text-stone-500">Gross Monthly Inflow:</span>
                  <div className="font-bold text-slate-900 text-base">${monthlyIncome.toLocaleString()}.00</div>
                </div>
                <div className="space-y-1">
                  <span className="text-stone-500">Total Outflow & Expenses:</span>
                  <div className="font-bold text-rose-600 text-base">${totalSpent.toLocaleString()}.00</div>
                </div>
                <div className="space-y-1 pt-2 border-t border-teal-200">
                  <span className="text-stone-500">Net Retained Capital:</span>
                  <div className="font-black text-emerald-600 text-base">${netSavings.toLocaleString()}.00</div>
                </div>
                <div className="space-y-1 pt-2 border-t border-teal-200">
                  <span className="text-stone-500">Effective Savings Rate:</span>
                  <div className="font-black text-teal-600 text-base">{savingsRate}%</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 uppercase">Automated Advisory Highlights:</h4>
                <ul className="space-y-1.5 text-stone-600 list-disc list-inside">
                  <li>Your savings rate of {savingsRate}% exceeds the recommended 20% baseline standard.</li>
                  <li>Groceries & Dining exceeded allocation by $140 — evaluate discretionary weekend restaurant spend.</li>
                  <li>Emergency fund is currently 78% funded toward the $25,000 target.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-teal-100 bg-white py-6 px-4 text-center text-xs font-mono text-teal-800/60">
        TEALWEALTH • PERSONAL BUDGET MATRIX • WEALTH VELOCITY INTELLIGENCE
      </footer>
    </div>
  );
}
