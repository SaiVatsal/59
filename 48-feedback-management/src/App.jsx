import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  MessageSquare,
  Star,
  TrendingUp,
  PlusCircle,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Send,
  Filter,
  Search,
  Sliders,
  Smile,
  Meh,
  Frown,
  Flame,
  BarChart2,
  Mail,
  User,
  Sparkles
} from 'lucide-react';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
    selectedSentiment,
    setSelectedSentiment,
    searchQuery,
    setSearchQuery,
    feedbacks,
    surveys,
    submitFeedback,
    updateStatus,
    addReply,
    createSurvey,
    toggleSurveyStatus
  } = useStore();

  // Selected feedback for reply drawer
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');

  // Customer Survey Submission state
  const [selectedSurveyId, setSelectedSurveyId] = useState(surveys[0]?.id || 'SURV-01');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [ratingVal, setRatingVal] = useState(5);
  const [npsVal, setNpsVal] = useState(9);
  const [surveyComment, setSurveyComment] = useState('');
  const [surveyCategory, setSurveyCategory] = useState('Platform Usability');

  // Form Builder state
  const [newSurveyTitle, setNewSurveyTitle] = useState('');
  const [newSurveyDesc, setNewSurveyDesc] = useState('');
  const [newSurveyCategory, setNewSurveyCategory] = useState('Product Experience');

  const categories = ['All', 'Platform Usability', 'Billing & Invoicing', 'Support Services', 'Feature Request', 'Performance & Speed'];
  const sentiments = ['All', 'Positive', 'Neutral', 'Negative', 'Urgent'];

  const filteredFeedbacks = feedbacks.filter(f => {
    const matchesCat = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesSent = selectedSentiment === 'All' || f.sentiment === selectedSentiment;
    const matchesSearch = f.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSent && matchesSearch;
  });

  // Analytics Computation
  const totalCount = feedbacks.length;
  const avgRating = totalCount > 0 ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / totalCount).toFixed(1) : '5.0';
  const promoters = feedbacks.filter(f => f.npsScore >= 9).length;
  const detractors = feedbacks.filter(f => f.npsScore <= 6).length;
  const npsScore = totalCount > 0 ? Math.round(((promoters - detractors) / totalCount) * 100) : 0;

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!selectedFeedback || !replyMessage.trim()) return;
    addReply(selectedFeedback.id, replyMessage.trim());
    setReplyMessage('');
    // refresh selected feedback
    const updated = feedbacks.find(f => f.id === selectedFeedback.id);
    setSelectedFeedback(updated || null);
  };

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim()) return;
    const currentSurv = surveys.find(s => s.id === selectedSurveyId);
    submitFeedback({
      surveyId: selectedSurveyId,
      surveyTitle: currentSurv?.title || 'General Customer Pulse',
      customerName,
      customerEmail,
      channel: 'Web In-App Portal',
      rating: Number(ratingVal),
      npsScore: Number(npsVal),
      category: surveyCategory,
      comment: surveyComment || 'No additional written commentary provided.'
    });

    setCustomerName('');
    setCustomerEmail('');
    setSurveyComment('');
    setRatingVal(5);
    setNpsVal(9);
  };

  const handleCreateSurveySubmit = (e) => {
    e.preventDefault();
    if (!newSurveyTitle.trim()) return;
    createSurvey({
      title: newSurveyTitle,
      description: newSurveyDesc || 'Continuous feedback collection instrument.',
      category: newSurveyCategory,
      fields: [
        { id: 'f1', label: 'Satisfaction Rating (1-5 Stars)', type: 'rating', required: true },
        { id: 'f2', label: 'Net Promoter Score (0-10 Scale)', type: 'nps', required: true },
        { id: 'f3', label: 'Detailed Suggestions & Notes', type: 'textarea', required: false }
      ]
    });
    setNewSurveyTitle('');
    setNewSurveyDesc('');
  };

  const getSentimentBadge = (sentiment) => {
    switch (sentiment) {
      case 'Positive':
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Smile className="w-3 h-3 text-emerald-600" /> Positive</span>;
      case 'Neutral':
        return <span className="bg-slate-100 text-slate-700 border border-slate-300 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Meh className="w-3 h-3 text-slate-500" /> Neutral</span>;
      case 'Negative':
        return <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Frown className="w-3 h-3 text-amber-600" /> Negative</span>;
      case 'Urgent':
        return <span className="bg-rose-100 text-rose-800 border border-rose-300 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse"><Flame className="w-3 h-3 text-rose-600" /> Urgent Triage</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff]/50 text-slate-900 flex flex-col font-sans">
      {/* Sky-Blue Modern Header */}
      <header className="bg-white border-b border-sky-100 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('feedbacks')}>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 text-white flex items-center justify-center shadow-md shadow-sky-500/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-sky-600 font-mono">Pulse & NPS Suite</span>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">PulseFeedback</h1>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex space-x-1 sm:space-x-2">
              <button
                onClick={() => setActiveTab('feedbacks')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'feedbacks'
                    ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30'
                    : 'text-slate-600 hover:bg-sky-50'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Feedback Feed ({feedbacks.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('submit-portal')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'submit-portal'
                    ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30'
                    : 'text-slate-600 hover:bg-sky-50'
                }`}
              >
                <Star className="w-4 h-4" />
                <span>Customer Survey Portal</span>
              </button>

              <button
                onClick={() => setActiveTab('builder')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'builder'
                    ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30'
                    : 'text-slate-600 hover:bg-sky-50'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Survey Builder</span>
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'analytics'
                    ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30'
                    : 'text-slate-600 hover:bg-sky-50'
                }`}
              >
                <BarChart2 className="w-4 h-4" />
                <span>Trend Analytics</span>
              </button>
            </nav>

            {/* Quick NPS Metric */}
            <div className="hidden lg:flex items-center space-x-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Live NPS Score</span>
                <span className="text-lg font-black text-sky-600 font-mono">{npsScore > 0 ? `+${npsScore}` : npsScore}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                {avgRating}★
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: FEEDBACK FEED & TRIAGE */}
        {activeTab === 'feedbacks' && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by customer name, keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Sentiment Pill Filters */}
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sentiment:</span>
                  {sentiments.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSentiment(s)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        selectedSentiment === s
                          ? 'bg-sky-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100 overflow-x-auto">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category:</span>
                {categories.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === c
                        ? 'bg-sky-100 text-sky-800 font-bold border border-sky-200'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Feedbacks Stream */}
            <div className="grid grid-cols-1 gap-4">
              {filteredFeedbacks.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-2xl border border-sky-100 text-slate-400 font-medium">
                  No customer feedback matches the active criteria.
                </div>
              ) : (
                filteredFeedbacks.map((fb) => (
                  <div
                    key={fb.id}
                    className={`bg-white rounded-2xl p-6 border transition-all shadow-xs hover:shadow-md ${
                      fb.sentiment === 'Urgent' ? 'border-rose-300 ring-1 ring-rose-200' : 'border-sky-100'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-100 to-sky-200 text-sky-800 flex items-center justify-center font-bold text-sm">
                          {fb.customerName.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-bold text-slate-900 text-base">{fb.customerName}</h3>
                            <span className="text-xs text-slate-400 font-mono">({fb.customerEmail})</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-slate-500 mt-0.5">
                            <span className="font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono text-[10px]">
                              {fb.channel}
                            </span>
                            <span>•</span>
                            <span>{fb.surveyTitle}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {getSentimentBadge(fb.sentiment)}

                        {/* Star Rating Display */}
                        <div className="flex items-center bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-lg font-bold text-xs">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                          <span>{fb.rating} / 5</span>
                        </div>

                        {/* NPS Score Display */}
                        <div className="bg-sky-50 text-sky-900 border border-sky-200 px-2.5 py-1 rounded-lg font-bold text-xs font-mono">
                          NPS: {fb.npsScore}/10
                        </div>
                      </div>
                    </div>

                    {/* Feedback Comment Body */}
                    <div className="py-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                          {fb.category}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{fb.createdAt}</span>
                      </div>
                      <p className="text-slate-800 text-sm leading-relaxed font-normal bg-slate-50/60 p-3.5 rounded-xl border border-slate-100">
                        "{fb.comment}"
                      </p>
                    </div>

                    {/* Replies Thread */}
                    {fb.replies.length > 0 && (
                      <div className="mb-4 pl-4 border-l-2 border-sky-400 space-y-2">
                        {fb.replies.map(r => (
                          <div key={r.id} className="bg-sky-50/80 p-3 rounded-xl border border-sky-100 text-xs">
                            <div className="flex justify-between font-bold text-sky-950 mb-1">
                              <span>{r.author}</span>
                              <span className="text-slate-400 font-mono text-[10px]">{r.time}</span>
                            </div>
                            <p className="text-slate-700">{r.text}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Status & Resolution Controls */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Triage Status:</span>
                        <select
                          value={fb.status}
                          onChange={(e) => updateStatus(fb.id, e.target.value)}
                          className={`text-xs font-bold rounded-lg px-2.5 py-1 border transition-colors ${
                            fb.status === 'Resolved'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : fb.status === 'Under Review'
                              ? 'bg-sky-50 text-sky-800 border-sky-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          <option value="New">New Unread</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Resolved">Resolved & Closed</option>
                        </select>
                      </div>

                      <button
                        onClick={() => setSelectedFeedback(fb)}
                        className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Customer Follow-Up</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOMER SURVEY SUBMISSION PORTAL */}
        {activeTab === 'submit-portal' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-sky-100 shadow-sm space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 mx-auto flex items-center justify-center">
                  <Star className="w-6 h-6 fill-sky-500 text-sky-500" />
                </div>
                <h2 className="text-2xl font-black text-slate-900">Share Your Experience</h2>
                <p className="text-xs text-slate-500">Your real-time feedback directly impacts roadmap development and service quality.</p>
              </div>

              <form onSubmit={handleCustomerSubmit} className="space-y-5 text-sm">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Select Active Survey Campaign</label>
                  <select
                    value={selectedSurveyId}
                    onChange={(e) => setSelectedSurveyId(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-medium"
                  >
                    {surveys.map(s => (
                      <option key={s.id} value={s.id}>{s.title} ({s.category})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Samantha Vance"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. s.vance@acme.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                {/* 5-Star Interactive Rating */}
                <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-100 text-center space-y-2">
                  <label className="block font-bold text-slate-800">Overall Satisfaction (CSAT)</label>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRatingVal(star)}
                        className="p-1 hover:scale-125 transition-transform"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= ratingVal
                              ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-sky-800">
                    {ratingVal === 5 ? 'Exceptional (5/5)' : ratingVal >= 4 ? 'Great (4/5)' : ratingVal === 3 ? 'Average (3/5)' : 'Needs Improvement'}
                  </span>
                </div>

                {/* NPS 0-10 Scale */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold text-slate-700">Net Promoter Score (NPS)</label>
                    <span className="font-mono font-bold text-sky-600 bg-sky-100 px-2 py-0.5 rounded text-xs">
                      {npsVal} / 10
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={npsVal}
                    onChange={(e) => setNpsVal(e.target.value)}
                    className="w-full accent-sky-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>0 (Not Likely)</span>
                    <span>5 (Neutral)</span>
                    <span>10 (Extremely Likely)</span>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Topic Category</label>
                  <select
                    value={surveyCategory}
                    onChange={(e) => setSurveyCategory(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Detailed Remarks & Feedback</label>
                  <textarea
                    rows="3"
                    value={surveyComment}
                    onChange={(e) => setSurveyComment(e.target.value)}
                    placeholder="Tell us what worked well or what we should fix..."
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white font-bold rounded-2xl shadow-md shadow-sky-500/25 transition-all text-sm flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Survey Response</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: SURVEY BUILDER */}
        {activeTab === 'builder' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-xs space-y-5">
              <div>
                <h3 className="text-lg font-black text-slate-900">Custom Survey Instrument Builder</h3>
                <p className="text-xs text-slate-500">Deploy targeted survey campaigns with automated multi-channel routing.</p>
              </div>

              <form onSubmit={handleCreateSurveySubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Survey Campaign Title</label>
                  <input
                    type="text"
                    required
                    value={newSurveyTitle}
                    onChange={(e) => setNewSurveyTitle(e.target.value)}
                    placeholder="e.g. Mobile App v3.4 Beta Feedback"
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Category</label>
                  <select
                    value={newSurveyCategory}
                    onChange={(e) => setNewSurveyCategory(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Survey Description & Objectives</label>
                  <textarea
                    rows="2"
                    value={newSurveyDesc}
                    onChange={(e) => setNewSurveyDesc(e.target.value)}
                    placeholder="Provide context on audience and goals..."
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs shadow-sm flex items-center justify-center space-x-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish Survey Campaign</span>
                </button>
              </form>
            </div>

            {/* Active Survey Instruments List */}
            <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-xs space-y-4">
              <h3 className="text-lg font-black text-slate-900">Active Live Survey Instruments</h3>
              <div className="space-y-3">
                {surveys.map(s => (
                  <div key={s.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded">
                          {s.id}
                        </span>
                        <span className="font-bold text-slate-900 text-sm">{s.title}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{s.description}</p>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 block">Category: {s.category}</span>
                    </div>

                    <button
                      onClick={() => toggleSurveyStatus(s.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        s.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {s.active ? 'Live Active' : 'Paused'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TREND ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average CSAT Rating</span>
                <div className="text-4xl font-black text-slate-900 font-mono mt-2 flex items-center">
                  {avgRating} <span className="text-amber-400 text-2xl ml-2">★</span>
                </div>
                <span className="text-xs text-emerald-600 font-semibold mt-1 block">↑ +0.3 vs last month</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Net Promoter Score (NPS)</span>
                <div className="text-4xl font-black text-sky-600 font-mono mt-2">
                  {npsScore > 0 ? `+${npsScore}` : npsScore}
                </div>
                <span className="text-xs text-slate-500 mt-1 block font-mono">{promoters} Promoters / {detractors} Detractors</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Feedback Logs</span>
                <div className="text-4xl font-black text-slate-900 font-mono mt-2">
                  {totalCount}
                </div>
                <span className="text-xs text-slate-500 mt-1 block">100% automated sentiment classification</span>
              </div>
            </div>

            {/* Sentiment Breakdown */}
            <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-xs space-y-4">
              <h3 className="text-base font-black text-slate-900">Sentiment Distribution Overview</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {['Positive', 'Neutral', 'Negative', 'Urgent'].map(sent => {
                  const count = feedbacks.filter(f => f.sentiment === sent).length;
                  const pct = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
                  return (
                    <div key={sent} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                        <span>{sent}</span>
                        <span>{pct}% ({count})</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            sent === 'Positive' ? 'bg-emerald-500' :
                            sent === 'Neutral' ? 'bg-slate-400' :
                            sent === 'Negative' ? 'bg-amber-500' : 'bg-rose-600'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Follow-up / Reply Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl p-6 relative border border-sky-100">
            <button
              onClick={() => setSelectedFeedback(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="font-black text-lg text-slate-900 mb-1">Customer Dispatch Follow-Up</h3>
            <p className="text-xs text-slate-500 mb-4">
              Replying to <span className="font-bold text-slate-800">{selectedFeedback.customerName}</span> ({selectedFeedback.customerEmail})
            </p>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 italic mb-4">
              "{selectedFeedback.comment}"
            </div>

            <form onSubmit={handleReplySubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Resolution Response Message</label>
                <textarea
                  rows="4"
                  required
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type official support or executive response..."
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedFeedback(null)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs shadow-sm flex items-center space-x-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Response</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-sky-100 bg-white py-6 text-center text-xs text-slate-500 font-sans">
        <p className="font-bold text-slate-800">PulseFeedback Enterprise Platform</p>
        <p className="text-[11px] text-slate-400 mt-0.5">Automated Sentiment Tagging • Star CSAT Metrics • In-App Customer Triage</p>
      </footer>
    </div>
  );
}
