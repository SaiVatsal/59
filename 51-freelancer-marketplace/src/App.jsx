import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  Briefcase,
  Users,
  ShieldCheck,
  Send,
  PlusCircle,
  Star,
  Clock,
  DollarSign,
  CheckCircle2,
  Lock,
  Unlock,
  FileCode2,
  Search,
  Filter,
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    jobs,
    freelancers,
    proposals,
    contracts,
    postJob,
    submitProposal,
    acceptProposal,
    submitDeliverable,
    releaseEscrowMilestone
  } = useStore();

  // Job Posting Modal
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobBudget, setJobBudget] = useState(5000);
  const [jobSkills, setJobSkills] = useState('React, TypeScript, TailwindCSS');
  const [jobDesc, setJobDesc] = useState('');
  const [jobDays, setJobDays] = useState(14);

  // Submit Proposal Modal
  const [biddingJob, setBiddingJob] = useState(null);
  const [bidAmount, setBidAmount] = useState(4500);
  const [bidDays, setBidDays] = useState(10);
  const [bidCover, setBidCover] = useState('');

  // Deliverable Submission State
  const [deliverableModal, setDeliverableModal] = useState(null);
  const [deliverableText, setDeliverableText] = useState('');

  const skillsFilter = ['All', 'React', 'TypeScript', 'Rust', 'Go', 'Figma', 'UI/UX Design', 'PostgreSQL'];

  const filteredJobs = jobs.filter(j => {
    const matchesSkill = selectedCategory === 'All' || j.skills.includes(selectedCategory);
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          j.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          j.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSkill && matchesSearch;
  });

  const handlePostJobSubmit = (e) => {
    e.preventDefault();
    if (!jobTitle.trim()) return;

    postJob({
      title: jobTitle,
      budget: Number(jobBudget),
      budgetType: 'Fixed Price',
      skills: jobSkills.split(',').map(s => s.trim()),
      description: jobDesc || 'Require expert implementation with unit tests and clear API documentation.',
      deadlineDays: Number(jobDays)
    });

    setJobTitle('');
    setJobDesc('');
    setShowPostJobModal(false);
  };

  const handleProposalSubmit = (e) => {
    e.preventDefault();
    if (!biddingJob) return;

    submitProposal({
      jobId: biddingJob.id,
      jobTitle: biddingJob.title,
      bidAmount: Number(bidAmount),
      deliveryDays: Number(bidDays),
      coverLetter: bidCover || 'I have deep expertise building high-performance systems and can deliver ahead of schedule.'
    });

    setBiddingJob(null);
    setBidCover('');
  };

  const handleDeliverableSubmit = (e) => {
    e.preventDefault();
    if (!deliverableModal || !deliverableText.trim()) return;

    submitDeliverable(deliverableModal.contractId, deliverableModal.milestoneId, deliverableText.trim());
    setDeliverableModal(null);
    setDeliverableText('');
  };

  return (
    <div className="min-h-screen bg-[#eef2ff]/30 text-slate-900 flex flex-col font-sans">
      {/* Indigo High-End Header */}
      <header className="bg-white border-b border-indigo-100 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('jobs')}>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-700 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-600 font-mono">Escrow Verified</span>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">TalentSphere</h1>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex space-x-1 sm:space-x-2">
              <button
                onClick={() => setActiveTab('jobs')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'jobs'
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'text-slate-600 hover:bg-indigo-50'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Job Openings ({jobs.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('freelancers')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'freelancers'
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'text-slate-600 hover:bg-indigo-50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Top Talent</span>
              </button>

              <button
                onClick={() => setActiveTab('contracts')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'contracts'
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'text-slate-600 hover:bg-indigo-50'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Escrow Contracts ({contracts.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('my-bids')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'my-bids'
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'text-slate-600 hover:bg-indigo-50'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>My Proposals ({proposals.length})</span>
              </button>
            </nav>

            {/* Post Job Action */}
            <button
              onClick={() => setShowPostJobModal(true)}
              className="hidden md:flex items-center space-x-1.5 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 rounded-xl text-xs font-bold transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-indigo-600" />
              <span>Post a Project</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: JOB BOARD */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            {/* Search & Skill Chips */}
            <div className="bg-white p-5 rounded-3xl border border-indigo-100 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by job title, stack, or deliverables..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="text-xs text-slate-500 font-mono">
                  Showing <span className="font-bold text-indigo-900">{filteredJobs.length}</span> Verified Enterprise Listings
                </div>
              </div>

              {/* Skills Filter */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100 overflow-x-auto">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Skill:</span>
                {skillsFilter.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedCategory(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === s
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-indigo-50 text-indigo-900 hover:bg-indigo-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Jobs Stream */}
            <div className="grid grid-cols-1 gap-5">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-3xl border border-indigo-100 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                          {job.id}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center">
                          Client: <span className="font-bold text-slate-800 ml-1">{job.clientName}</span>
                          <span className="text-amber-500 ml-1 flex items-center font-bold">★ {job.clientRating}</span>
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-black text-slate-900 font-mono">
                          ${job.budget.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">({job.budgetType})</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 hover:text-indigo-600 cursor-pointer">
                      {job.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {job.skills.map(sk => (
                        <span key={sk} className="bg-indigo-50/80 text-indigo-900 border border-indigo-200/60 text-[11px] font-bold px-2.5 py-0.5 rounded-lg">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center space-x-4 text-slate-500 font-mono">
                      <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-indigo-600" /> {job.deadlineDays} Days Delivery</span>
                      <span>•</span>
                      <span>{job.proposalsCount} Proposals Submitted</span>
                    </div>

                    <button
                      onClick={() => {
                        setBiddingJob(job);
                        setBidAmount(job.budget);
                      }}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xs transition-colors flex items-center space-x-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Escrow Proposal</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: FREELANCER DIRECTORY */}
        {activeTab === 'freelancers' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-indigo-100 shadow-xs">
              <h2 className="text-xl font-black text-slate-900">Vetted Principal Engineers & Product Architects</h2>
              <p className="text-xs text-slate-500">Contract directly with top 1% global engineering and design consultants with escrow safety.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {freelancers.map(fl => (
                <div key={fl.id} className="bg-white rounded-3xl border border-indigo-100 p-6 shadow-xs flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex gap-4 items-start">
                      <img src={fl.avatar} alt={fl.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-100 shadow-sm" />
                      <div>
                        <div className="flex items-center space-x-1 text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="font-black text-sm text-slate-900">{fl.rating}</span>
                          <span className="text-xs text-slate-400">({fl.completedJobs} projects completed)</span>
                        </div>
                        <h3 className="font-bold text-base text-slate-900">{fl.name}</h3>
                        <p className="text-xs text-indigo-700 font-semibold">{fl.title}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-xs font-mono text-slate-600 mt-3 bg-indigo-50/50 p-2.5 rounded-xl">
                      <span>Rate: <strong className="text-slate-900">${fl.hourlyRate}/hr</strong></span>
                      <span>Total Earned: <strong className="text-slate-900">{fl.earnings}</strong></span>
                    </div>

                    <div className="mt-3">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Featured Case Studies</span>
                      <div className="grid grid-cols-2 gap-2">
                        {fl.portfolio.map((p, i) => (
                          <div key={i} className="group relative rounded-xl overflow-hidden aspect-video border border-slate-200">
                            <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                              <span className="text-[10px] text-white font-bold truncate">{p.title}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {fl.skills.map(sk => (
                        <span key={sk} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ESCROW CONTRACTS & MILESTONES */}
        {activeTab === 'contracts' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-indigo-100 shadow-xs">
              <h2 className="text-xl font-black text-slate-900">Active Milestone Escrow Vault & Deliverables</h2>
              <p className="text-xs text-slate-500">Funds are locked in cryptographically guaranteed escrow until clients inspect deliverables.</p>
            </div>

            <div className="space-y-6">
              {contracts.map(contract => (
                <div key={contract.id} className="bg-white rounded-3xl border border-indigo-100 p-6 shadow-xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold bg-indigo-100 text-indigo-900 px-2.5 py-0.5 rounded">
                          {contract.id}
                        </span>
                        <h3 className="text-base font-bold text-slate-900">{contract.jobTitle}</h3>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Client: <strong className="text-slate-800">{contract.clientName}</strong> • Freelancer: <strong className="text-slate-800">{contract.freelancerName}</strong>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-400 font-medium block">Total Contract Value</span>
                      <span className="text-xl font-black text-indigo-900 font-mono">${contract.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Milestones Stepper */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Contract Milestones Breakdown</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {contract.milestones.map((m, idx) => (
                        <div key={m.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-mono text-[10px] text-slate-500">Stage {idx + 1}</span>
                              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                m.status === 'Released'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : m.status === 'In Review'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-indigo-100 text-indigo-800'
                              }`}>
                                {m.status === 'Released' ? 'Paid & Released' : m.status === 'In Review' ? 'Under Review' : 'Locked in Escrow'}
                              </span>
                            </div>
                            <h5 className="font-bold text-xs text-slate-900 leading-snug">{m.title}</h5>
                            <span className="text-sm font-black font-mono text-indigo-950 mt-1 block">${m.amount.toLocaleString()}</span>
                          </div>

                          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                            {m.status === 'Funded' && (
                              <button
                                onClick={() => setDeliverableModal({ contractId: contract.id, milestoneId: m.id, title: m.title })}
                                className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors"
                              >
                                Submit Deliverables
                              </button>
                            )}

                            {m.status === 'In Review' && (
                              <button
                                onClick={() => releaseEscrowMilestone(contract.id, m.id)}
                                className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1"
                              >
                                <Unlock className="w-3.5 h-3.5" />
                                <span>Release Escrow Funds</span>
                              </button>
                            )}

                            {m.status === 'Released' && (
                              <span className="text-xs text-emerald-700 font-bold flex items-center">
                                <CheckCircle2 className="w-4 h-4 mr-1" /> Payment Disbursed
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submitted Deliverables Log */}
                  {contract.deliverables.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Deliverables Audit Log</h4>
                      <div className="space-y-1.5">
                        {contract.deliverables.map(d => (
                          <div key={d.id} className="bg-indigo-50/60 p-3 rounded-xl border border-indigo-100 flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <FileCode2 className="w-4 h-4 text-indigo-600" />
                              <span className="font-bold text-slate-900">{d.title}</span>
                              <span className="text-slate-400 font-mono">({d.date})</span>
                            </div>
                            <span className="font-semibold text-indigo-800">{d.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MY PROPOSALS & BIDS */}
        {activeTab === 'my-bids' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-indigo-100 shadow-xs">
              <h2 className="text-xl font-black text-slate-900">Submitted Proposals & Tender Applications</h2>
              <p className="text-xs text-slate-500">Track client proposal reviews, negotiate milestones, and initiate escrow agreements.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {proposals.map(prop => (
                <div key={prop.id} className="bg-white rounded-3xl border border-indigo-100 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold bg-indigo-50 text-indigo-900 px-2 py-0.5 rounded">
                        {prop.id}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        prop.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {prop.status}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">{prop.jobTitle}</h4>
                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
                      "{prop.coverLetter}"
                    </p>
                    <div className="flex items-center space-x-4 text-xs font-mono text-slate-500 pt-1">
                      <span>Bid: <strong className="text-slate-900">${prop.bidAmount.toLocaleString()}</strong></span>
                      <span>Delivery: <strong className="text-slate-900">{prop.deliveryDays} Days</strong></span>
                    </div>
                  </div>

                  <div>
                    {prop.status === 'Pending' ? (
                      <button
                        onClick={() => acceptProposal(prop.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                      >
                        Simulate Client Acceptance
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-emerald-700 flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-1" /> Active in Escrow
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Post Job Modal */}
      {showPostJobModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl p-6 relative border border-indigo-100">
            <button
              onClick={() => setShowPostJobModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="font-black text-xl text-slate-900 mb-1">Post a Technical Project</h3>
            <p className="text-xs text-slate-500 mb-4">Attract principal freelancers with guaranteed milestone escrow funding.</p>

            <form onSubmit={handlePostJobSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Project Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Build Real-Time Solana Staking Telemetry UI"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Escrow Budget ($USD)</label>
                  <input
                    type="number"
                    min="500"
                    max="50000"
                    value={jobBudget}
                    onChange={(e) => setJobBudget(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Delivery Time (Days)</label>
                  <input
                    type="number"
                    min="3"
                    max="120"
                    value={jobDays}
                    onChange={(e) => setJobDays(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Required Skills (comma separated)</label>
                <input
                  type="text"
                  placeholder="React, TypeScript, TailwindCSS, Rust"
                  value={jobSkills}
                  onChange={(e) => setJobSkills(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Technical Specifications</label>
                <textarea
                  rows="3"
                  placeholder="Describe architectural expectations, API contracts, and QA criteria..."
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPostJobModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-500/20"
                >
                  Publish & Lock Escrow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bid / Proposal Modal */}
      {biddingJob && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl p-6 relative border border-indigo-100">
            <button
              onClick={() => setBiddingJob(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="font-black text-xl text-slate-900 mb-1">Submit Proposal Tender</h3>
            <p className="text-xs text-slate-500 mb-4">{biddingJob.title} • Client Budget: ${biddingJob.budget.toLocaleString()}</p>

            <form onSubmit={handleProposalSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Total Bid ($USD)</label>
                  <input
                    type="number"
                    min="100"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Delivery Time (Days)</label>
                  <input
                    type="number"
                    min="1"
                    value={bidDays}
                    onChange={(e) => setBidDays(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Cover Pitch & Execution Strategy</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Explain your approach, tech stack choices, and reference similar past projects..."
                  value={bidCover}
                  onChange={(e) => setBidCover(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setBiddingJob(null)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-sm"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Deliverable Upload Modal */}
      {deliverableModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-6 relative border border-indigo-100">
            <button
              onClick={() => setDeliverableModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="font-black text-xl text-slate-900 mb-1">Submit Deliverable</h3>
            <p className="text-xs text-slate-500 mb-4">{deliverableModal.title}</p>

            <form onSubmit={handleDeliverableSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Deliverable Link / Artifact Details</label>
                <textarea
                  rows="3"
                  required
                  placeholder="e.g. GitHub Pull Request URL, Figma prototype, staging deploy link..."
                  value={deliverableText}
                  onChange={(e) => setDeliverableText(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDeliverableModal(null)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-sm"
                >
                  Submit for Client Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-indigo-100 bg-white py-6 text-center text-xs text-slate-500 font-sans">
        <p className="font-bold text-slate-800">TalentSphere Global Escrow Marketplace</p>
        <p className="text-[11px] text-slate-400 mt-0.5">Milestone Escrow Locking • Vetted Engineering Profiles • Zero-Loss Settlement</p>
      </footer>
    </div>
  );
}
