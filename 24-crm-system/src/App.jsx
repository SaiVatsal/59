import React, { useState } from 'react';
import {
  Users,
  Kanban,
  TrendingUp,
  Mail,
  Phone,
  FileText,
  DollarSign,
  PlusCircle,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Search,
  Filter,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { useStore } from './store/useStore';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    leads,
    activities,
    campaigns,
    updateLeadStage,
    addLead,
    logActivity
  } = useStore();

  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedLeadForLog, setSelectedLeadForLog] = useState(leads[0]?.id || '');
  const [logNotes, setLogNotes] = useState('');
  const [logType, setLogType] = useState('Call Notes');

  const [leadForm, setLeadForm] = useState({
    name: '',
    title: 'VP of Technology',
    company: '',
    email: '',
    phone: '',
    value: 60000,
    tier: 'Enterprise'
  });

  const [searchTerm, setSearchTerm] = useState('');

  const stages = [
    { id: 'lead', label: 'Lead In / Inbound', color: 'border-slate-500' },
    { id: 'discovery', label: 'Discovery Call', color: 'border-blue-500' },
    { id: 'evaluation', label: 'Technical Evaluation', color: 'border-indigo-500' },
    { id: 'proposal', label: 'Proposal & Commercials', color: 'border-amber-500' },
    { id: 'won', label: 'Closed / Won', color: 'border-emerald-500' }
  ];

  const totalPipelineValue = leads.reduce((acc, l) => acc + (l.stage !== 'lost' ? l.value : 0), 0);
  const weightedPipeline = leads.reduce((acc, l) => acc + (l.value * (l.probability / 100)), 0);

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.company) return;
    addLead(leadForm);
    setShowAddLeadModal(false);
    setLeadForm({
      name: '',
      title: 'VP of Technology',
      company: '',
      email: '',
      phone: '',
      value: 60000,
      tier: 'Enterprise'
    });
  };

  const handleLogSubmit = (e) => {
    e.preventDefault();
    if (!logNotes.trim()) return;
    logActivity({
      leadId: selectedLeadForLog,
      type: logType,
      notes: logNotes
    });
    setShowLogModal(false);
    setLogNotes('');
  };

  const filteredLeads = leads.filter((l) =>
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col font-sans">
      {/* Slate Blue Header */}
      <header className="sticky top-0 z-40 bg-[#1e293b]/95 backdrop-blur border-b border-slate-800 px-6 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight block leading-none">
                PIPELINE.OS // ENTERPRISE CRM
              </span>
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                Opportunity Forecasting • Deal Stages • Executive Accounts
              </span>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="hidden md:flex items-center gap-1 bg-[#0f172a] p-1 rounded-xl border border-slate-800 text-xs font-semibold text-slate-400">
            {[
              { id: 'pipeline', label: 'Kanban Pipeline', icon: Kanban },
              { id: 'contacts', label: 'Account Directory', icon: Users },
              { id: 'activities', label: 'Activity Logs', icon: FileText },
              { id: 'campaigns', label: 'Email Cadences', icon: Mail },
              { id: 'forecast', label: 'ARR Forecast', icon: BarChart3 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddLeadModal(true)}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create Opportunity</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 w-full flex-1 space-y-6">
        {/* VIEW 1: KANBAN PIPELINE */}
        {activeTab === 'pipeline' && (
          <div className="space-y-6">
            {/* Pipeline Header Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#1e293b] border border-slate-800 p-4 rounded-2xl">
                <span className="text-[11px] text-slate-400 uppercase font-bold">Unweighted Pipeline Total</span>
                <div className="text-2xl font-bold text-white mt-1">${totalPipelineValue.toLocaleString()}</div>
              </div>
              <div className="bg-[#1e293b] border border-slate-800 p-4 rounded-2xl">
                <span className="text-[11px] text-blue-400 uppercase font-bold">Weighted Expected Revenue</span>
                <div className="text-2xl font-bold text-blue-400 mt-1">${Math.round(weightedPipeline).toLocaleString()}</div>
              </div>
              <div className="bg-[#1e293b] border border-slate-800 p-4 rounded-2xl">
                <span className="text-[11px] text-emerald-400 uppercase font-bold">Active Opportunities</span>
                <div className="text-2xl font-bold text-emerald-400 mt-1">{leads.length} Enterprise Deals</div>
              </div>
            </div>

            {/* Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
              {stages.map((stage) => {
                const stageLeads = leads.filter((l) => l.stage === stage.id);
                const stageTotal = stageLeads.reduce((acc, l) => acc + l.value, 0);

                return (
                  <div
                    key={stage.id}
                    className="bg-[#1e293b]/70 border border-slate-800 rounded-2xl p-4 flex flex-col min-w-[240px] space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-bold text-slate-200">{stage.label}</span>
                      <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-bold">
                        {stageLeads.length}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-slate-400">
                      ${stageTotal.toLocaleString()}
                    </div>

                    {/* Cards */}
                    <div className="space-y-3 flex-1">
                      {stageLeads.map((lead) => (
                        <div
                          key={lead.id}
                          className="p-3.5 bg-[#0f172a] border border-slate-800 hover:border-blue-500/50 rounded-xl space-y-2 shadow-sm transition"
                        >
                          <div className="flex items-start justify-between gap-1">
                            <div>
                              <h4 className="font-bold text-sm text-white">{lead.company}</h4>
                              <p className="text-xs text-slate-400">{lead.name}</p>
                            </div>
                            <span className="text-xs font-bold font-mono text-emerald-400">
                              ${(lead.value / 1000).toFixed(0)}k
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800/80">
                            <span>Win: {lead.probability}%</span>
                            <span className="text-blue-400">{lead.tier}</span>
                          </div>

                          {/* Stage Mover Selector */}
                          <div className="pt-2">
                            <select
                              value={lead.stage}
                              onChange={(e) => updateLeadStage(lead.id, e.target.value)}
                              className="w-full text-[10px] bg-slate-900 border border-slate-700 text-slate-300 rounded-lg p-1"
                            >
                              <option value="lead">Move → Lead</option>
                              <option value="discovery">Move → Discovery</option>
                              <option value="evaluation">Move → Technical Eval</option>
                              <option value="proposal">Move → Proposal</option>
                              <option value="won">Move → Closed Won</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: ACCOUNT & CONTACT DIRECTORY */}
        {activeTab === 'contacts' && (
          <div className="space-y-4">
            <div className="bg-[#1e293b] p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search contacts, accounts, emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#0f172a] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => setShowLogModal(true)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
              >
                <FileText className="w-3.5 h-3.5" /> Log Interaction Note
              </button>
            </div>

            <div className="bg-[#1e293b] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#0f172a] border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="p-4">Contact</th>
                      <th className="p-4">Account & Tier</th>
                      <th className="p-4">Deal Value</th>
                      <th className="p-4">Stage</th>
                      <th className="p-4">Account Owner</th>
                      <th className="p-4 text-right">Direct Communications</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredLeads.map((l) => (
                      <tr key={l.id} className="hover:bg-slate-800/40 transition">
                        <td className="p-4">
                          <div className="font-bold text-white">{l.name}</div>
                          <div className="text-[11px] text-slate-400">{l.title}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-slate-200">{l.company}</div>
                          <span className="text-[10px] text-blue-400 bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-800/40">
                            {l.tier}
                          </span>
                        </td>
                        <td className="p-4 font-mono font-bold text-white">
                          ${l.value.toLocaleString()}
                        </td>
                        <td className="p-4 uppercase font-bold text-[10px] text-slate-300">
                          {l.stage} ({l.probability}%)
                        </td>
                        <td className="p-4 text-slate-400">{l.owner}</td>
                        <td className="p-4 text-right space-x-2">
                          <a href={`mailto:${l.email}`} className="inline-block p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg">
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                          <a href={`tel:${l.phone}`} className="inline-block p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg">
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: ACTIVITIES */}
        {activeTab === 'activities' && (
          <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-base text-white">Executive Activity & Call Logging Stream</h3>
            <div className="space-y-3">
              {activities.map((act) => {
                const matchedLead = leads.find((l) => l.id === act.leadId);
                return (
                  <div key={act.id} className="p-4 bg-[#0f172a] border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-blue-400">{act.type} • {matchedLead?.company || 'Enterprise Account'}</span>
                      <span className="text-slate-500 font-mono text-[11px]">{act.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{act.notes}</p>
                    <div className="text-[10px] text-slate-500 pt-1">Logged by: {act.author}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 4: CAMPAIGNS */}
        {activeTab === 'campaigns' && (
          <div className="space-y-4">
            <h3 className="font-bold text-base text-white">Automated Enterprise Outbound Cadences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {campaigns.map((c) => (
                <div key={c.id} className="bg-[#1e293b] border border-slate-800 p-5 rounded-2xl shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      {c.status}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{c.enrolledLeads} Enrolled</span>
                  </div>
                  <h4 className="font-bold text-base text-white">{c.name}</h4>
                  <p className="text-xs text-slate-400">Target Audience: {c.targetTier}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs bg-[#0f172a] p-3 rounded-xl font-mono">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Open Rate</span>
                      <strong className="text-blue-400 text-sm">{c.openRate}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Reply Rate</span>
                      <strong className="text-emerald-400 text-sm">{c.replyRate}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: ARR FORECAST */}
        {activeTab === 'forecast' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-[#1e293b] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase">Q4 Projected ARR</span>
                <div className="text-3xl font-extrabold text-blue-400">${Math.round(weightedPipeline).toLocaleString()}</div>
                <p className="text-xs text-slate-500">Based on deal probability models</p>
              </div>
              <div className="bg-[#1e293b] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase">Closed / Won YTD</span>
                <div className="text-3xl font-extrabold text-emerald-400">$210,000</div>
                <p className="text-xs text-slate-500">100% quota attainment</p>
              </div>
              <div className="bg-[#1e293b] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase">Average Sales Cycle</span>
                <div className="text-3xl font-extrabold text-indigo-400">34 Days</div>
                <p className="text-xs text-slate-500">From Lead-In to Commercial Close</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* CREATE LEAD MODAL */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1e293b] rounded-2xl p-6 max-w-md w-full border border-slate-700 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">Create Enterprise Opportunity</h3>
              <button onClick={() => setShowAddLeadModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Company / Organization</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme HyperScale Corp"
                  value={leadForm.company}
                  onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                  className="w-full p-2.5 bg-[#0f172a] border border-slate-700 rounded-xl text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Contact Full Name</label>
                  <input
                    type="text"
                    required
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    className="w-full p-2.5 bg-[#0f172a] border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Executive Title</label>
                  <input
                    type="text"
                    value={leadForm.title}
                    onChange={(e) => setLeadForm({ ...leadForm, title: e.target.value })}
                    className="w-full p-2.5 bg-[#0f172a] border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Email Address</label>
                  <input
                    type="email"
                    required
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="w-full p-2.5 bg-[#0f172a] border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Deal ARR ($ USD)</label>
                  <input
                    type="number"
                    value={leadForm.value}
                    onChange={(e) => setLeadForm({ ...leadForm, value: e.target.value })}
                    className="w-full p-2.5 bg-[#0f172a] border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="w-1/2 py-2.5 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold"
                >
                  Save Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ACTIVITY NOTE LOG MODAL */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1e293b] rounded-2xl p-6 max-w-md w-full border border-slate-700 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">Log Interaction Notes</h3>
              <button onClick={() => setShowLogModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleLogSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Associated Account</label>
                <select
                  value={selectedLeadForLog}
                  onChange={(e) => setSelectedLeadForLog(e.target.value)}
                  className="w-full p-2.5 bg-[#0f172a] border border-slate-700 rounded-xl text-white"
                >
                  {leads.map((l) => (
                    <option key={l.id} value={l.id}>{l.company} ({l.name})</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Interaction Type</label>
                <select
                  value={logType}
                  onChange={(e) => setLogType(e.target.value)}
                  className="w-full p-2.5 bg-[#0f172a] border border-slate-700 rounded-xl text-white"
                >
                  <option>Demo Call</option>
                  <option>Technical Review</option>
                  <option>Commercial Negotiation</option>
                  <option>Security Questionnaire</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Executive Meeting Notes</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Summarize key decision criteria and next action items..."
                  value={logNotes}
                  onChange={(e) => setLogNotes(e.target.value)}
                  className="w-full p-2.5 bg-[#0f172a] border border-slate-700 rounded-xl text-white"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="w-1/2 py-2.5 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold"
                >
                  Log Interaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#0f172a] py-6 text-center text-xs text-slate-500 font-mono">
        © 2026 PIPELINE.OS • SUPABASE / POSTGRES ENTERPRISE RELATIONAL ENGINE
      </footer>
    </div>
  );
}
