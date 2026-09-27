import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  Trello,
  Calendar,
  BarChart3,
  PlusCircle,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  User,
  Trash2,
  Search,
  ArrowRight,
  TrendingUp,
  Briefcase,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    applications,
    addApplication,
    moveApplicationStage,
    deleteApplication,
    addInterview,
    updateNotes
  } = useStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAppModal, setSelectedAppModal] = useState(null);
  const [newCompany, setNewCompany] = useState('');
  const [newPosition, setNewPosition] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [newStage, setNewStage] = useState('Applied');
  const [newDeadline, setNewDeadline] = useState('2026-10-15');
  const [newNotes, setNewNotes] = useState('');

  // Interview modal inside app detail
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewRound, setInterviewRound] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewerName, setInterviewerName] = useState('');

  const stages = ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'];

  const filteredApps = applications.filter(a =>
    a.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newCompany.trim() || !newPosition.trim()) return;

    addApplication({
      company: newCompany,
      position: newPosition,
      location: newLocation || 'Remote',
      salaryRange: newSalary || '$200,000 - $250,000',
      stage: newStage,
      deadline: newDeadline,
      notes: newNotes || 'Added to job tracker pipeline.'
    });

    setNewCompany('');
    setNewPosition('');
    setNewLocation('');
    setNewSalary('');
    setNewNotes('');
    setShowAddModal(false);
  };

  const handleInterviewSubmit = (e) => {
    e.preventDefault();
    if (!selectedAppModal || !interviewRound.trim()) return;

    addInterview(selectedAppModal.id, {
      round: interviewRound,
      date: interviewDate || '2026-10-08 14:00',
      interviewer: interviewerName || 'Hiring Lead'
    });

    setInterviewRound('');
    setInterviewDate('');
    setInterviewerName('');
    setShowInterviewModal(false);

    const updated = applications.find(a => a.id === selectedAppModal.id);
    setSelectedAppModal(updated || null);
  };

  // Analytics Computation
  const totalApps = applications.length;
  const interviewsCount = applications.filter(a => a.stage === 'Interview' || a.stage === 'Offer').length;
  const offersCount = applications.filter(a => a.stage === 'Offer').length;
  const interviewConversion = totalApps > 0 ? Math.round((interviewsCount / totalApps) * 100) : 0;
  const offerConversion = interviewsCount > 0 ? Math.round((offersCount / interviewsCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      {/* Slate & Gray-Blue Modern Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('kanban')}>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-600 text-white flex items-center justify-center shadow-md shadow-slate-900/20">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 font-mono">Job Pipeline & Offers</span>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">CareerPipeline</h1>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex space-x-1 sm:space-x-2">
              <button
                onClick={() => setActiveTab('kanban')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'kanban'
                    ? 'bg-slate-900 text-white shadow-sm shadow-slate-900/30'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Trello className="w-4 h-4" />
                <span>Kanban Pipeline ({applications.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'calendar'
                    ? 'bg-slate-900 text-white shadow-sm shadow-slate-900/30'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Interview Calendar</span>
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'analytics'
                    ? 'bg-slate-900 text-white shadow-sm shadow-slate-900/30'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Success Analytics</span>
              </button>
            </nav>

            {/* Add Job Action */}
            <button
              onClick={() => setShowAddModal(true)}
              className="hidden md:flex items-center space-x-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 rounded-xl text-xs font-bold transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-slate-700" />
              <span>Track Application</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: KANBAN PIPELINE BOARD */}
        {activeTab === 'kanban' && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by company name, title, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div className="text-xs text-slate-500 font-mono">
                {offersCount} Active Offer • {interviewsCount} in Late Rounds
              </div>
            </div>

            {/* Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
              {stages.map((stage) => {
                const stageApps = filteredApps.filter(a => a.stage === stage);
                return (
                  <div key={stage} className="bg-slate-100/80 rounded-2xl p-3.5 border border-slate-200 flex flex-col space-y-3 min-h-[500px]">
                    {/* Column Header */}
                    <div className="flex items-center justify-between px-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-black text-xs uppercase tracking-wider text-slate-700">
                          {stage}
                        </span>
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center font-mono">
                          {stageApps.length}
                        </span>
                      </div>
                    </div>

                    {/* Cards in Column */}
                    <div className="space-y-3">
                      {stageApps.map((app) => (
                        <div
                          key={app.id}
                          className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-2 cursor-pointer group"
                          onClick={() => setSelectedAppModal(app)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                              {app.id}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {app.appliedDate}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                              {app.position}
                            </h4>
                            <div className="flex items-center text-xs text-slate-600 font-semibold mt-0.5">
                              <Building2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
                              <span>{app.company}</span>
                            </div>
                          </div>

                          <div className="space-y-1 text-[11px] text-slate-500 font-mono pt-1 border-t border-slate-100">
                            <div className="flex items-center">
                              <DollarSign className="w-3 h-3 text-emerald-600 mr-1" />
                              <span className="text-slate-800 font-semibold">{app.salaryRange}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-3 h-3 text-slate-400 mr-1" />
                              <span>{app.location}</span>
                            </div>
                          </div>

                          {/* Move Stage Selector */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]" onClick={(e) => e.stopPropagation()}>
                            <span className="text-slate-400 font-bold uppercase">Move:</span>
                            <select
                              value={app.stage}
                              onChange={(e) => moveApplicationStage(app.id, e.target.value)}
                              className="p-1 rounded bg-slate-50 border border-slate-200 text-slate-700 font-semibold"
                            >
                              {stages.map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
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

        {/* TAB 2: INTERVIEW SCHEDULE & CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <h2 className="text-xl font-black text-slate-900">Upcoming Interview Schedule & Briefings</h2>
              <p className="text-xs text-slate-500">Coordinate technical architectural rounds, executive alignments, and live coding sessions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {applications.flatMap(a => (a.interviews || []).map(i => ({ ...i, company: a.company, position: a.position, appId: a.id }))).map((int, idx) => (
                <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex justify-between items-start space-y-2">
                  <div className="space-y-2">
                    <span className="bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {int.round}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900">{int.company}</h4>
                    <p className="text-xs text-slate-600 font-medium">{int.position}</p>
                    <div className="flex items-center space-x-4 text-xs font-mono text-slate-500 pt-1">
                      <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1 text-slate-700" /> {int.date}</span>
                      <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1 text-slate-700" /> {int.interviewer}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ANALYTICS & CONVERSION */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Application to Interview Rate</span>
                <div className="text-4xl font-black text-slate-900 font-mono mt-2">{interviewConversion}%</div>
                <span className="text-xs text-emerald-600 font-semibold mt-1 block">Industry benchmark: 12-18%</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Interview to Offer Rate</span>
                <div className="text-4xl font-black text-slate-900 font-mono mt-2">{offerConversion}%</div>
                <span className="text-xs text-slate-500 mt-1 block font-mono">{offersCount} offers from {interviewsCount} interview pipelines</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Tracked Pipeline</span>
                <div className="text-4xl font-black text-slate-900 font-mono mt-2">{totalApps}</div>
                <span className="text-xs text-slate-500 mt-1 block font-mono">100% custom resume & cover letter tracking</span>
              </div>
            </div>

            {/* Pipeline Stage Funnel Breakdown */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-black text-slate-900">Pipeline Stage Funnel Distribution</h3>
              <div className="space-y-3">
                {stages.map((stage) => {
                  const count = applications.filter(a => a.stage === stage).length;
                  const pct = totalApps > 0 ? Math.round((count / totalApps) * 100) : 0;
                  return (
                    <div key={stage} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <span>{stage}</span>
                        <span className="font-mono">{count} ({pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-slate-800 h-full rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl p-6 relative border border-slate-200">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="font-black text-xl text-slate-900 mb-1">Track New Job Opportunity</h3>
            <p className="text-xs text-slate-500 mb-4">Add role details, target salary, and deadline reminders.</p>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. OpenAI / Datadog"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Position Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Staff Distributed Systems Engineer"
                    value={newPosition}
                    onChange={(e) => setNewPosition(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Compensation</label>
                  <input
                    type="text"
                    placeholder="e.g. $250,000 - $300,000"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location / Remote Mode</label>
                  <input
                    type="text"
                    placeholder="e.g. San Francisco, CA (Hybrid)"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Initial Stage</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                  >
                    {stages.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Deadline / Next Action Date</label>
                  <input
                    type="date"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Application Notes & Referral Context</label>
                <textarea
                  rows="3"
                  placeholder="Record hiring manager details, technical stack, or prep materials..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-sm"
                >
                  Save to Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Application Detail Dossier Modal */}
      {selectedAppModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-xl w-full rounded-3xl shadow-2xl p-6 relative border border-slate-200 space-y-4">
            <button
              onClick={() => setSelectedAppModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 text-lg font-bold"
            >
              ✕
            </button>

            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                {selectedAppModal.id}
              </span>
              <span className="text-xs font-bold text-slate-600 bg-blue-50 text-blue-800 px-2 py-0.5 rounded-full border border-blue-200">
                {selectedAppModal.stage}
              </span>
            </div>

            <div>
              <h3 className="font-black text-xl text-slate-900">{selectedAppModal.position}</h3>
              <p className="text-sm font-semibold text-slate-600">{selectedAppModal.company} • {selectedAppModal.location}</p>
              <p className="text-xs font-mono font-bold text-emerald-700 mt-1">{selectedAppModal.salaryRange}</p>
            </div>

            {/* Attachments Section */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
              <h4 className="font-bold uppercase tracking-wider text-[10px] text-slate-500 font-mono">Linked Application Assets</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 flex items-center gap-1 font-mono text-[11px]">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  {selectedAppModal.resumeAttached}
                </span>
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 flex items-center gap-1 font-mono text-[11px]">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  {selectedAppModal.coverLetterAttached}
                </span>
              </div>
            </div>

            {/* Notes Section */}
            <div>
              <h4 className="font-bold text-xs text-slate-700 mb-1">Interview Prep Notes</h4>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                {selectedAppModal.notes}
              </p>
            </div>

            {/* Scheduled Rounds */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-xs text-slate-700">Interview Rounds</h4>
                <button
                  onClick={() => setShowInterviewModal(true)}
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  + Log Round
                </button>
              </div>

              <div className="space-y-1.5">
                {selectedAppModal.interviews?.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No interview rounds logged yet.</p>
                ) : (
                  selectedAppModal.interviews?.map((i, idx) => (
                    <div key={idx} className="bg-blue-50/60 p-2.5 rounded-xl border border-blue-100 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-slate-900">{i.round}</span>
                        <div className="text-[11px] text-slate-500 font-mono">{i.interviewer}</div>
                      </div>
                      <span className="font-mono text-blue-800 font-bold">{i.date}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
              <button
                onClick={() => {
                  deleteApplication(selectedAppModal.id);
                  setSelectedAppModal(null);
                }}
                className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                <span>Delete Entry</span>
              </button>

              <button
                onClick={() => setSelectedAppModal(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Log Interview Modal */}
      {showInterviewModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-6 relative border border-slate-200">
            <button
              onClick={() => setShowInterviewModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="font-black text-xl text-slate-900 mb-1">Schedule Interview Round</h3>
            <p className="text-xs text-slate-500 mb-4">{selectedAppModal?.company} — {selectedAppModal?.position}</p>

            <form onSubmit={handleInterviewSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Round Type & Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. System Design & Concurrency"
                  value={interviewRound}
                  onChange={(e) => setInterviewRound(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Interview Date & Time</label>
                <input
                  type="datetime-local"
                  required
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Interviewer Name & Role</label>
                <input
                  type="text"
                  placeholder="e.g. Principal Engineer / VP of Eng"
                  value={interviewerName}
                  onChange={(e) => setInterviewerName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInterviewModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-sm"
                >
                  Schedule Round
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 font-sans">
        <p className="font-bold text-slate-800">CareerPipeline Application Intelligence</p>
        <p className="text-[11px] text-slate-400 mt-0.5">Kanban Funnel Tracking • Interview Reminders • Conversion Analytics</p>
      </footer>
    </div>
  );
}
