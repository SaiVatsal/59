import React, { useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  Award,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  PlayCircle,
  FileText,
  Upload,
  Search,
  Flame,
  Star,
  Clock,
  ArrowRight,
  ShieldCheck,
  Check,
  RotateCcw,
  Plus
} from 'lucide-react';
import { useStore } from './store/useStore';

export default function App() {
  const {
    user,
    activeTab,
    setActiveTab,
    resources,
    quizzes,
    certificates,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    enrollInResource,
    updateProgress,
    addCertificate,
    addResource
  } = useStore();

  // Quiz state
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  // Instructor Upload Form state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: 'Computer Science',
    type: 'Video Lecture',
    duration: '35 mins',
    author: 'Eleanor Vance',
    description: ''
  });

  // Certificate Modal
  const [viewCert, setViewCert] = useState(null);

  const filteredResources = resources.filter((res) => {
    const matchesCat = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAnswerSelect = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const submitQuiz = () => {
    if (!activeQuiz) return;
    let correct = 0;
    activeQuiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    const total = activeQuiz.questions.length;
    const percent = Math.round((correct / total) * 100);
    setQuizScore({ correct, total, percent });

    if (percent >= 70) {
      const relatedCourse = resources.find((r) => r.id === activeQuiz.courseRef);
      const newCert = {
        id: `CERT-${Math.floor(10000 + Math.random() * 90000)}-LUMINA`,
        courseTitle: relatedCourse ? relatedCourse.title : activeQuiz.title,
        studentName: user.name,
        issuedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        instructor: relatedCourse ? relatedCourse.author : 'Lumina Faculty',
        score: `${percent}%`
      };
      addCertificate(newCert);
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadForm.title.trim()) return;
    addResource(uploadForm);
    setShowUploadModal(false);
    setUploadForm({
      title: '',
      category: 'Computer Science',
      type: 'Video Lecture',
      duration: '35 mins',
      author: 'Eleanor Vance',
      description: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#faf5ff] text-slate-800 flex flex-col font-rounded selection:bg-purple-200">
      {/* Soft Lavender Top Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-purple-100 px-6 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-400 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-purple-950 block leading-tight">
                LuminaLearn // HUB
              </span>
              <span className="text-[11px] font-semibold text-purple-600">
                Resource Library • Quizzes • Verified Credentials
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex items-center gap-1 bg-purple-50/80 p-1.5 rounded-2xl border border-purple-100 text-xs font-semibold text-purple-700">
            {[
              { id: 'library', label: 'Resource Library', icon: BookOpen },
              { id: 'quizzes', label: 'Quiz Engine', icon: Sparkles },
              { id: 'dashboard', label: 'Progress & Streaks', icon: Flame },
              { id: 'certificates', label: 'Certificates', icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setActiveQuiz(null);
                    setQuizScore(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-sm shadow-purple-400'
                      : 'hover:bg-purple-100/70'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* User Profile Info */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold flex items-center gap-1.5 transition border border-purple-200"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Instructor Studio</span>
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-purple-100">
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border-2 border-purple-300" />
              <div className="hidden lg:block text-left text-xs">
                <span className="font-bold text-slate-800 block leading-tight">{user.name}</span>
                <span className="text-[10px] text-purple-600 font-semibold">{user.xp} XP</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8 w-full flex-1 space-y-8">
        {/* TAB 1: RESOURCE LIBRARY */}
        {activeTab === 'library' && (
          <div className="space-y-6">
            {/* Hero Banner with Lavender Wave Card */}
            <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 z-10 max-w-xl">
                <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur text-purple-100 text-xs font-bold px-3 py-1 rounded-full">
                  <Flame className="w-3.5 h-3.5 text-amber-300" /> {user.streakDays}-Day Learning Streak Active!
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  Expand Your Cognitive Horizons
                </h1>
                <p className="text-xs md:text-sm text-purple-100 leading-relaxed">
                  Interactive peer-reviewed articles, in-depth architectural video breakdowns, and downloadable syllabus packages.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur border border-white/20 p-5 rounded-2xl text-center space-y-1 z-10 flex-shrink-0">
                <span className="text-3xl font-extrabold text-white block">{resources.length}</span>
                <span className="text-xs text-purple-200 uppercase font-semibold tracking-wider">Available Modules</span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search syllabus, author, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      selectedCategory === cat
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Resource Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((res) => (
                <div
                  key={res.id}
                  className="bg-white border border-purple-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={res.cover}
                      alt={res.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-[11px] font-bold text-purple-900 border border-purple-200 flex items-center gap-1">
                      {res.type.includes('Video') ? <PlayCircle className="w-3.5 h-3.5 text-purple-600" /> : <FileText className="w-3.5 h-3.5 text-indigo-600" />}
                      {res.type}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {res.duration}
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
                        {res.category}
                      </span>
                      <h3 className="font-bold text-base text-slate-800 leading-snug group-hover:text-purple-700 transition">
                        {res.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {res.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-purple-50">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                        <span>By {res.author}</span>
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" /> {res.rating}
                        </span>
                      </div>

                      {/* Progress Bar Forward UI */}
                      {res.enrolled ? (
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[11px] font-bold text-purple-800">
                            <span>Progress</span>
                            <span>{res.progress}%</span>
                          </div>
                          <div className="w-full bg-purple-100 rounded-full h-2.5 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${res.progress}%` }}
                            />
                          </div>
                          <div className="flex gap-2 pt-1">
                            <button
                              onClick={() => updateProgress(res.id, 25)}
                              className="flex-1 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-xs font-bold transition"
                            >
                              +25% Study
                            </button>
                            <button
                              onClick={() => {
                                const matchedQuiz = quizzes.find(q => q.courseRef === res.id) || quizzes[0];
                                setActiveQuiz(matchedQuiz);
                                setActiveTab('quizzes');
                              }}
                              className="flex-1 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                            >
                              Take Exam <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => enrollInResource(res.id)}
                          className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 shadow-sm shadow-purple-300"
                        >
                          Enroll in Course
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: QUIZ ENGINE */}
        {activeTab === 'quizzes' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {!activeQuiz ? (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-bold text-purple-950">Interactive Certification Quizzes</h2>
                  <p className="text-xs text-purple-700 font-semibold">
                    Score ≥ 70% to automatically earn and mint your accredited digital completion credential.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {quizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm flex items-center justify-between gap-4 hover:border-purple-300 transition"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                          {quiz.questions.length} Questions • {quiz.timeLimitMinutes} Mins
                        </span>
                        <h3 className="font-bold text-lg text-slate-800">{quiz.title}</h3>
                        <p className="text-xs text-slate-500">Comprehensive objective knowledge assessment with instant feedback.</p>
                      </div>
                      <button
                        onClick={() => {
                          setActiveQuiz(quiz);
                          setSelectedAnswers({});
                          setQuizScore(null);
                        }}
                        className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-xs font-bold flex items-center gap-2 transition shadow-md shadow-purple-300"
                      >
                        Start Test <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-md space-y-6">
                <div className="flex items-center justify-between border-b border-purple-50 pb-4">
                  <div>
                    <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Assessment Console</span>
                    <h3 className="text-xl font-bold text-slate-900">{activeQuiz.title}</h3>
                  </div>
                  <button
                    onClick={() => {
                      setActiveQuiz(null);
                      setQuizScore(null);
                    }}
                    className="text-xs font-bold text-slate-400 hover:text-slate-600"
                  >
                    Back to Quizzes
                  </button>
                </div>

                {quizScore ? (
                  <div className="text-center py-8 space-y-4">
                    <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
                      quizScore.percent >= 70 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                    }`}>
                      {quizScore.percent >= 70 ? <CheckCircle2 className="w-8 h-8" /> : <RotateCcw className="w-8 h-8" />}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-slate-800">
                        {quizScore.percent >= 70 ? 'Test Passed with Honors!' : 'Keep Practicing!'}
                      </h4>
                      <p className="text-sm text-slate-500 font-semibold mt-1">
                        You scored {quizScore.correct} out of {quizScore.total} ({quizScore.percent}%)
                      </p>
                    </div>
                    {quizScore.percent >= 70 && (
                      <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 max-w-sm mx-auto text-xs text-purple-800 font-semibold">
                        🎉 Accredited certificate awarded and added to your credential vault!
                      </div>
                    )}
                    <div className="flex justify-center gap-3 pt-4">
                      <button
                        onClick={() => {
                          setSelectedAnswers({});
                          setQuizScore(null);
                        }}
                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
                      >
                        Retake Test
                      </button>
                      <button
                        onClick={() => setActiveTab('certificates')}
                        className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold"
                      >
                        View Credentials
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {activeQuiz.questions.map((q, idx) => (
                      <div key={q.id} className="space-y-3 p-4 bg-purple-50/50 rounded-2xl border border-purple-50">
                        <div className="font-bold text-sm text-slate-800 flex items-start gap-2">
                          <span className="w-6 h-6 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center text-xs flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span>{q.question}</span>
                        </div>
                        <div className="grid grid-cols-1 gap-2 pl-8">
                          {q.options.map((opt, optIdx) => (
                            <button
                              key={optIdx}
                              onClick={() => handleAnswerSelect(q.id, optIdx)}
                              className={`p-3 rounded-xl text-xs text-left font-semibold transition border ${
                                selectedAnswers[q.id] === optIdx
                                  ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                                  : 'bg-white text-slate-700 border-purple-100 hover:bg-purple-100/50'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 flex justify-end">
                      <button
                        onClick={submitQuiz}
                        disabled={Object.keys(selectedAnswers).length < activeQuiz.questions.length}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition shadow-md shadow-purple-300"
                      >
                        Submit Examination
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PROGRESS & STREAKS DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-2">
                <span className="text-xs font-bold text-purple-600 uppercase">Learning Velocity</span>
                <div className="flex items-center gap-3">
                  <Flame className="w-8 h-8 text-amber-500" />
                  <div>
                    <span className="text-3xl font-extrabold text-slate-900">{user.streakDays}</span>
                    <span className="text-xs text-slate-500 block">Consecutive Days</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-2">
                <span className="text-xs font-bold text-purple-600 uppercase">Knowledge Points</span>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-purple-500" />
                  <div>
                    <span className="text-3xl font-extrabold text-slate-900">{user.xp}</span>
                    <span className="text-xs text-slate-500 block">Total Earned XP</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-2">
                <span className="text-xs font-bold text-purple-600 uppercase">Certificates</span>
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-indigo-500" />
                  <div>
                    <span className="text-3xl font-extrabold text-slate-900">{certificates.length}</span>
                    <span className="text-xs text-slate-500 block">Issued Badges</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Streak Visualizer */}
            <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-slate-800">Weekly Activity Frequency</h3>
              <div className="grid grid-cols-7 gap-2 text-center">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                  <div key={day} className="p-3 bg-purple-50 rounded-2xl border border-purple-100 space-y-1">
                    <span className="text-[11px] font-bold text-slate-500">{day}</span>
                    <div className="w-6 h-6 mx-auto rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CERTIFICATES VAULT */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Verified Credentials & Diplomas</h2>
                <p className="text-xs text-slate-500">Cryptographically verifiable certificates issued upon passing formal quizzes.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl shadow-xl border border-purple-700/50 space-y-4 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
                  <div className="flex items-center justify-between border-b border-purple-800/80 pb-3">
                    <span className="text-[10px] font-mono text-purple-300">{cert.id}</span>
                    <span className="text-[10px] bg-purple-500/20 text-purple-200 px-2 py-0.5 rounded-full border border-purple-400/30">
                      Verified Grade: {cert.score}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-purple-400">Certificate of Completion</span>
                    <h3 className="text-lg font-bold text-white">{cert.courseTitle}</h3>
                    <p className="text-xs text-purple-200">Awarded to: <strong className="text-white">{cert.studentName}</strong></p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-purple-300 pt-2 border-t border-purple-800/80">
                    <span>Issued: {cert.issuedDate}</span>
                    <span>Instructor: {cert.instructor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* INSTRUCTOR STUDIO MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-purple-100 space-y-4">
            <div className="flex items-center justify-between border-b border-purple-50 pb-3">
              <h3 className="font-bold text-base text-slate-800">Publish Learning Material</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Course / Module Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced Rust Memory Safety"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  className="w-full p-2.5 bg-purple-50/50 border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Category</label>
                  <select
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                    className="w-full p-2.5 bg-purple-50/50 border border-purple-100 rounded-xl"
                  >
                    <option>Computer Science</option>
                    <option>Design Systems</option>
                    <option>Data Science</option>
                    <option>Web Architecture</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Format</label>
                  <select
                    value={uploadForm.type}
                    onChange={(e) => setUploadForm({ ...uploadForm, type: e.target.value })}
                    className="w-full p-2.5 bg-purple-50/50 border border-purple-100 rounded-xl"
                  >
                    <option>Video Lecture</option>
                    <option>Article + Assets</option>
                    <option>PDF Syllabus</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Description</label>
                <textarea
                  rows={3}
                  placeholder="Summarize the key learning objectives..."
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  className="w-full p-2.5 bg-purple-50/50 border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="w-1/2 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold"
                >
                  Publish Module
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-purple-100 bg-white py-6 text-center text-xs text-purple-600 font-semibold">
        © 2026 LUMINA OPEN KNOWLEDGE FEDERATION • FIREBASE FIRESTORE SYNCED
      </footer>
    </div>
  );
}
