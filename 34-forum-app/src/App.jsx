import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  MessageSquare,
  ChevronUp,
  ChevronDown,
  Pin,
  Lock,
  PlusCircle,
  Search,
  Sparkles,
  Flame,
  Clock,
  TrendingUp,
  ShieldCheck,
  Send,
  ArrowLeft,
  Eye,
  CornerDownRight,
  Share2
} from 'lucide-react';

function CommentNode({ comment, threadId, onReply }) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  const submitChildReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onReply(threadId, replyText);
    setReplyText('');
    setReplyOpen(false);
  };

  return (
    <div className="space-y-3 pt-3">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={comment.author.avatar}
              alt={comment.author.name}
              className="w-7 h-7 rounded-full object-cover border border-slate-200"
            />
            <div>
              <span className="font-bold text-xs text-slate-900">{comment.author.name}</span>
              <span className="text-[10px] text-slate-500 font-mono ml-1.5">{comment.author.handle}</span>
              {comment.author.badge && (
                <span className="text-[9px] bg-sky-50 text-sky-700 font-semibold px-1.5 py-0.5 rounded ml-2 border border-sky-200">
                  {comment.author.badge}
                </span>
              )}
            </div>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">{comment.time}</span>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed pl-9">{comment.content}</p>

        <div className="flex items-center gap-3 pl-9 pt-1 text-[11px] font-mono text-slate-500">
          <span className="font-semibold text-slate-700">+{comment.score} votes</span>
          <button
            onClick={() => setReplyOpen(!replyOpen)}
            className="text-sky-600 hover:text-sky-700 flex items-center gap-1 font-semibold"
          >
            <CornerDownRight className="w-3 h-3" /> Reply
          </button>
        </div>

        {/* In-place reply input */}
        {replyOpen && (
          <form onSubmit={submitChildReply} className="pl-9 pt-2 flex gap-2">
            <input
              type="text"
              placeholder="Write a technical response..."
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold"
            >
              Post
            </button>
          </form>
        )}
      </div>

      {/* Render nested replies with indentation */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="pl-6 border-l-2 border-slate-200 space-y-3">
          {comment.replies.map(r => (
            <CommentNode key={r.id} comment={r} threadId={threadId} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const {
    activeBoard,
    setActiveBoard,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    selectedThreadId,
    setSelectedThreadId,
    currentUser,
    boards,
    threads,
    voteThread,
    togglePin,
    toggleLock,
    createThread,
    addReply
  } = useStore();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBoard, setNewBoard] = useState('Distributed Systems');
  const [newContent, setNewContent] = useState('');
  const [mainReplyText, setMainReplyText] = useState('');

  const selectedThread = threads.find(t => t.id === selectedThreadId);

  const filteredThreads = threads.filter(t => {
    const matchesBoard = activeBoard === 'All Topics' ? true : t.board === activeBoard;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBoard && matchesSearch;
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    createThread({
      title: newTitle,
      board: newBoard,
      content: newContent
    });
    setNewTitle('');
    setNewContent('');
    setShowCreateModal(false);
  };

  const handleMainReplySubmit = (e) => {
    e.preventDefault();
    if (!mainReplyText.trim() || !selectedThread) return;
    addReply(selectedThread.id, mainReplyText);
    setMainReplyText('');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col selection:bg-sky-500 selection:text-white">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setSelectedThreadId(null)}>
            <div className="w-9 h-9 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold shadow-md shadow-sky-600/20">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base text-slate-900 block leading-tight">Nexus Discourse</span>
              <span className="text-[10px] text-sky-700 font-semibold uppercase tracking-wider">Systems & Kernel Engineering</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search discussions, kernel topics, Raft meshes..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition"
            />
          </div>

          {/* User info & Create Thread */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" /> New Discussion
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">{currentUser.name}</div>
                <div className="text-[10px] text-sky-600 font-mono">{currentUser.reputation} Rep • {currentUser.badge}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full flex flex-col md:flex-row gap-8">
        {/* SIDEBAR BOARDS */}
        <aside className="w-full md:w-64 space-y-6 shrink-0">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block px-2">
              Engineering Boards
            </span>
            <div className="space-y-1">
              {boards.map(b => (
                <button
                  key={b.id}
                  onClick={() => setActiveBoard(b.name)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                    activeBoard === b.name
                      ? 'bg-sky-50 text-sky-800 font-bold border border-sky-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{b.name}</span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {b.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-sky-900 text-sky-100 p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-300">
              <ShieldCheck className="w-4 h-4" /> Code of Conduct
            </div>
            <p className="text-[11px] leading-relaxed text-sky-200">
              Nexus Discourse requires peer-reviewed benchmarks, reproducibility artifacts, and respectful architectural debate.
            </p>
          </div>
        </aside>

        {/* MAIN FEED OR THREAD VIEW */}
        <div className="flex-1 space-y-6">
          {!selectedThreadId ? (
            /* THREAD FEED LIST */
            <div className="space-y-4">
              {/* Sort Tabs & Feed Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 flex-wrap gap-4">
                <div>
                  <h1 className="font-bold text-xl text-slate-900">{activeBoard}</h1>
                  <p className="text-xs text-slate-500 font-mono">Showing {filteredThreads.length} active discussions</p>
                </div>

                <div className="flex items-center bg-white border border-slate-200 p-1 rounded-xl text-xs font-mono">
                  <button
                    onClick={() => setSortBy('hot')}
                    className={`px-3 py-1 rounded-lg flex items-center gap-1 transition ${
                      sortBy === 'hot' ? 'bg-sky-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5" /> Hot
                  </button>
                  <button
                    onClick={() => setSortBy('top')}
                    className={`px-3 py-1 rounded-lg flex items-center gap-1 transition ${
                      sortBy === 'top' ? 'bg-sky-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5" /> Top
                  </button>
                  <button
                    onClick={() => setSortBy('new')}
                    className={`px-3 py-1 rounded-lg flex items-center gap-1 transition ${
                      sortBy === 'new' ? 'bg-sky-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" /> New
                  </button>
                </div>
              </div>

              {/* Thread Cards */}
              <div className="space-y-3">
                {filteredThreads.map(thr => (
                  <div
                    key={thr.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-sky-300 transition flex gap-4"
                  >
                    {/* Vote Column */}
                    <div className="flex flex-col items-center justify-start bg-slate-50 p-2 rounded-xl border border-slate-100 shrink-0">
                      <button
                        onClick={() => voteThread(thr.id, 1)}
                        className={`p-1 hover:bg-slate-200 rounded transition ${thr.userVote === 1 ? 'text-sky-600' : 'text-slate-400'}`}
                      >
                        <ChevronUp className="w-5 h-5 stroke-[2.5]" />
                      </button>
                      <span className="font-mono text-xs font-bold text-slate-800 my-0.5">{thr.score}</span>
                      <button
                        onClick={() => voteThread(thr.id, -1)}
                        className={`p-1 hover:bg-slate-200 rounded transition ${thr.userVote === -1 ? 'text-rose-600' : 'text-slate-400'}`}
                      >
                        <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                      </button>
                    </div>

                    {/* Content Column */}
                    <div className="flex-1 space-y-2 cursor-pointer" onClick={() => setSelectedThreadId(thr.id)}>
                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        <span className="font-bold text-slate-900">{thr.author.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{thr.author.handle}</span>
                        <span className="text-[10px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full border border-sky-200 font-semibold">
                          {thr.board}
                        </span>
                        {thr.isPinned && (
                          <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                            <Pin className="w-3 h-3" /> Pinned
                          </span>
                        )}
                        {thr.isLocked && (
                          <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Locked
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400 font-mono ml-auto">{thr.time}</span>
                      </div>

                      <h3 className="font-bold text-base text-slate-900 hover:text-sky-600 transition">
                        {thr.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {thr.content}
                      </p>

                      <div className="pt-2 flex items-center gap-4 text-xs font-mono text-slate-500">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5 text-sky-600" /> {thr.replies.length} replies
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-slate-400" /> {thr.views} views
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* THREAD DETAIL & THREADED COMMENTS VIEW */
            selectedThread && (
              <div className="space-y-6">
                <button
                  onClick={() => setSelectedThreadId(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-sky-700 hover:text-sky-800 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Discussions
                </button>

                {/* Main Post Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedThread.author.avatar}
                        alt={selectedThread.author.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-sm text-slate-900">{selectedThread.author.name}</div>
                        <div className="text-xs text-slate-500 font-mono">
                          {selectedThread.author.handle} • {selectedThread.author.badge}
                        </div>
                      </div>
                    </div>

                    {/* Moderation Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePin(selectedThread.id)}
                        className={`p-2 rounded-lg border text-xs font-mono flex items-center gap-1 transition ${
                          selectedThread.isPinned
                            ? 'bg-amber-50 border-amber-300 text-amber-700'
                            : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <Pin className="w-3.5 h-3.5" /> {selectedThread.isPinned ? 'Unpin' : 'Pin'}
                      </button>
                      <button
                        onClick={() => toggleLock(selectedThread.id)}
                        className={`p-2 rounded-lg border text-xs font-mono flex items-center gap-1 transition ${
                          selectedThread.isLocked
                            ? 'bg-rose-50 border-rose-300 text-rose-700'
                            : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <Lock className="w-3.5 h-3.5" /> {selectedThread.isLocked ? 'Unlock' : 'Lock'}
                      </button>
                    </div>
                  </div>

                  <h1 className="font-bold text-2xl text-slate-900 leading-tight">
                    {selectedThread.title}
                  </h1>

                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {selectedThread.content}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="bg-sky-50 text-sky-700 px-2.5 py-1 rounded-md font-semibold border border-sky-200">
                        {selectedThread.board}
                      </span>
                      <span>{selectedThread.time}</span>
                    </div>
                    <span>{selectedThread.score} Upvotes • {selectedThread.views} Views</span>
                  </div>
                </div>

                {/* Reply Form */}
                {!selectedThread.isLocked ? (
                  <form onSubmit={handleMainReplySubmit} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <span className="text-xs font-bold text-slate-900 block">Post a response</span>
                    <textarea
                      rows="3"
                      required
                      placeholder="Share your architectural perspective, benchmarks, or peer review..."
                      value={mainReplyText}
                      onChange={e => setMainReplyText(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-sky-500"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" /> Submit Reply
                    </button>
                  </form>
                ) : (
                  <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-700 text-center flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" /> This discussion has been locked by moderators.
                  </div>
                )}

                {/* Nested Comment Tree */}
                <div className="space-y-4">
                  <h3 className="font-bold text-base text-slate-900">
                    Discussion Threads ({selectedThread.replies.length})
                  </h3>

                  {selectedThread.replies.map(comment => (
                    <CommentNode
                      key={comment.id}
                      comment={comment}
                      threadId={selectedThread.id}
                      onReply={addReply}
                    />
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </main>

      {/* NEW THREAD MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <h3 className="font-bold text-lg text-slate-900">Start Technical Discussion</h3>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-slate-600 font-semibold">Engineering Board</label>
                <select
                  value={newBoard}
                  onChange={e => setNewBoard(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-sky-500"
                >
                  {boards.filter(b => b.id !== 'all').map(b => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 font-semibold">Thread Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zero-Copy Serialization Benchmarks: Cap'n Proto vs FlatBuffers"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 font-semibold">Technical Breakdown & Hypothesis</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Detail test setup, hardware environment, profiling metrics..."
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="w-1/2 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl shadow-md"
                >
                  Publish Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 text-center text-xs font-mono text-slate-500">
        NEXUS DISCOURSE • PEER-REVIEWED TECHNICAL FORUMS • DISTRIBUTED SYSTEMS & KERNEL ARCHITECTURE
      </footer>
    </div>
  );
}
