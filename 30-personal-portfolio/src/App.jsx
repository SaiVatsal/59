import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  Code2,
  Terminal,
  Cpu,
  Layers,
  ArrowUpRight,
  Sparkles,
  BookOpen,
  FileText,
  Send,
  CheckCircle2,
  Search,
  ExternalLink,
  ShieldAlert,
  Globe,
  Mail,
  Github,
  Twitter,
  Linkedin,
  Clock,
  Compass,
  Zap
} from 'lucide-react';

export default function App() {
  const {
    activeSection,
    setActiveSection,
    profile,
    projects,
    skills,
    timeline,
    articles,
    selectedProject,
    setSelectedProject,
    seoConfig,
    updateSeoConfig,
    sendContactMessage,
    contactMessages
  } = useStore();

  // Contact form state
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaSuccess, setCaptchaSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (captchaAnswer.trim() !== '14') {
      alert('Security verification failed. Please answer the math challenge: 9 + 5 = ?');
      return;
    }
    sendContactMessage({
      name: senderName,
      email: senderEmail,
      body: messageBody
    });
    setSubmitted(true);
    setSenderName('');
    setSenderEmail('');
    setMessageBody('');
    setCaptchaAnswer('');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans grain flex flex-col selection:bg-violet-600 selection:text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center font-display font-black text-white text-base shadow-lg shadow-violet-600/30">
              KT
            </div>
            <div>
              <span className="font-display font-bold text-sm tracking-wide text-white block">KAIROS THORNE</span>
              <span className="text-[10px] font-mono text-zinc-400">DISTRIBUTED SYSTEMS // UI</span>
            </div>
          </div>

          <nav className="flex items-center gap-1 bg-zinc-900/90 border border-zinc-800 p-1 rounded-xl text-xs font-mono">
            {['work', 'skills', 'writing', 'resume', 'seo', 'contact'].map(sec => (
              <button
                key={sec}
                onClick={() => setActiveSection(sec)}
                className={`px-3 py-1.5 rounded-lg uppercase transition tracking-wider ${
                  activeSection === sec
                    ? 'bg-violet-600 text-white font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {sec}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Header */}
      <div className="border-b border-zinc-800/60 bg-gradient-to-b from-zinc-950 to-[#09090b]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 lg:py-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-800/70 text-violet-300 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping"></span>
            {profile.availability}
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl">
            Engineering low-latency <span className="text-violet-400 underline decoration-violet-600/60">distributed engines</span> with kinetic UI.
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl font-light leading-relaxed">
            {profile.summary}
          </p>

          {/* Key Stat Blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {profile.stats.map(s => (
              <div key={s.label} className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-xl">
                <div className="font-display font-black text-2xl text-white tracking-tight">{s.value}</div>
                <div className="text-[11px] font-mono text-zinc-400 uppercase mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full space-y-12">
        {/* SELECTED WORK SECTION */}
        {activeSection === 'work' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div>
                <h2 className="font-display text-2xl font-black text-white">Featured Case Studies</h2>
                <p className="text-xs font-mono text-zinc-400">Deep-dive architectural retrospectives & verifiable production benchmarks</p>
              </div>
              <span className="text-xs font-mono text-violet-400 font-bold">{projects.length} Architectures</span>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-violet-600/60 transition group flex flex-col lg:flex-row"
                >
                  <div className="lg:w-1/2 relative h-64 lg:h-auto bg-zinc-950 overflow-hidden">
                    <img
                      src={proj.heroImage}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute top-4 left-4 font-mono text-xs bg-black/80 px-2.5 py-1 rounded border border-zinc-700 text-zinc-300">
                      {proj.category} • {proj.year}
                    </div>
                  </div>

                  <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <div className="text-xs font-mono text-violet-400 uppercase tracking-wider">{proj.client}</div>
                      <h3 className="font-display font-bold text-xl lg:text-2xl text-white group-hover:text-violet-300 transition">
                        {proj.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {proj.summary}
                      </p>

                      {/* Stack pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proj.stack.map(st => (
                          <span key={st} className="px-2.5 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                            {st}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-zinc-800">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {proj.metrics.map(m => (
                          <div key={m} className="p-2 rounded bg-zinc-950 border border-zinc-800/80 text-[10px] font-mono text-zinc-300">
                            ✓ {m}
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => setSelectedProject(proj)}
                        className="w-full py-2.5 px-4 bg-violet-600/20 hover:bg-violet-600 border border-violet-600/40 hover:border-violet-600 text-violet-300 hover:text-white rounded-xl text-xs font-mono font-bold transition flex items-center justify-center gap-2"
                      >
                        Inspect Full Architectural Specification <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SKILLS & TIMELINE */}
        {activeSection === 'skills' && (
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-3">
                <h2 className="font-display text-2xl font-black text-white">Technical Core & Mastery</h2>
                <p className="text-xs font-mono text-zinc-400">Hard systems engineering, mathematical cryptosystems, and interactive primitives</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skills.map(sk => (
                  <div key={sk.category} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl space-y-4">
                    <h3 className="font-display font-bold text-base text-violet-400 flex items-center gap-2">
                      <Cpu className="w-4 h-4" /> {sk.category}
                    </h3>
                    <ul className="space-y-2 text-xs font-mono text-zinc-300">
                      {sk.items.map(it => (
                        <li key={it} className="flex items-center gap-2 p-1.5 rounded bg-zinc-950 border border-zinc-800/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Timeline */}
            <div className="space-y-6 pt-4">
              <div className="border-b border-zinc-800 pb-3">
                <h2 className="font-display text-2xl font-black text-white">Career Trajectory</h2>
                <p className="text-xs font-mono text-zinc-400">Staff and principal engineering leadership across high-growth ventures</p>
              </div>

              <div className="space-y-4">
                {timeline.map((item, idx) => (
                  <div key={item.period} className="p-5 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-violet-400">{item.period}</div>
                      <div className="font-bold text-white text-base">{item.role} • <span className="text-zinc-400 font-normal">{item.company}</span></div>
                      <p className="text-xs text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* WRITING & ESSAYS */}
        {activeSection === 'writing' && (
          <div className="space-y-6">
            <div className="border-b border-zinc-800 pb-3">
              <h2 className="font-display text-2xl font-black text-white">Technical Essays & Dev Notes</h2>
              <p className="text-xs font-mono text-zinc-400">Deep dives into kernel I/O, WebGPU shaders, and formal cryptosystems</p>
            </div>

            <div className="space-y-4">
              {articles.map(art => (
                <article key={art.id} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition space-y-3">
                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                    <span className="px-2 py-0.5 rounded bg-violet-950 border border-violet-800 text-violet-300 font-semibold">{art.tag}</span>
                    <span>{art.date}</span>
                    <span>• {art.readTime}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-white hover:text-violet-300 transition cursor-pointer">
                    {art.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {art.snippet}
                  </p>
                  <div className="pt-2">
                    <span className="text-xs font-mono text-violet-400 flex items-center gap-1 hover:underline cursor-pointer">
                      Read Full Whitepaper <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* RESUME / CURRICULUM VITAE */}
        {activeSection === 'resume' && (
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-10 space-y-8 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800 gap-4">
              <div>
                <h2 className="font-display text-3xl font-black text-white">KAIROS THORNE</h2>
                <p className="text-xs font-mono text-violet-400 mt-1">PRINCIPAL ARCHITECT • SYSTEMS & INTERFACES</p>
              </div>
              <a
                href="#contact"
                onClick={() => setActiveSection('contact')}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-mono font-bold transition self-start flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" /> Request Full Advisory Dossier
              </a>
            </div>

            <div className="space-y-6 text-sm">
              <div>
                <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-bold mb-2">Executive Summary</h3>
                <p className="text-zinc-300 leading-relaxed">
                  Principal architect specializing in low-latency distributed event streaming, zero-knowledge verification protocols, and high-performance WebGPU/React client runtimes. Track record designing resilient mission-critical infrastructure serving millions of transactions per second.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-bold mb-3">Education & Credentials</h3>
                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-1">
                  <div className="font-bold text-white">B.S. in Computer Science & Applied Mathematics</div>
                  <div className="text-xs font-mono text-zinc-400">Stanford University • Focus: Distributed Systems & Cryptography</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LIVE SEO METADATA INSPECTOR */}
        {activeSection === 'seo' && (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
            <div className="border-b border-zinc-800 pb-3">
              <h2 className="font-display text-2xl font-black text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-violet-400" /> Real-Time OpenGraph & SEO Inspector
              </h2>
              <p className="text-xs font-mono text-zinc-400">Live preview of search crawlers, social cards, and JSON-LD schema tags.</p>
            </div>

            {/* Editable metadata inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-zinc-400">Page Meta Title</label>
                <input
                  type="text"
                  value={seoConfig.pageTitle}
                  onChange={e => updateSeoConfig('pageTitle', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400">Canonical URL</label>
                <input
                  type="text"
                  value={seoConfig.canonicalUrl}
                  onChange={e => updateSeoConfig('canonicalUrl', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-zinc-400">Meta Description</label>
                <textarea
                  rows="2"
                  value={seoConfig.metaDescription}
                  onChange={e => updateSeoConfig('metaDescription', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            {/* Live Social Card Preview */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">Live Social Preview (Twitter / X & LinkedIn Card)</span>
              <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950 max-w-lg">
                <img src={seoConfig.ogImage} alt="OG Preview" className="w-full h-44 object-cover" />
                <div className="p-4 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">{seoConfig.canonicalUrl}</span>
                  <div className="font-bold text-sm text-white">{seoConfig.pageTitle}</div>
                  <div className="text-xs text-zinc-400 line-clamp-2">{seoConfig.metaDescription}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ENCRYPTED CONTACT & SPAM PROTECTION */}
        {activeSection === 'contact' && (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 max-w-2xl mx-auto">
            <div className="border-b border-zinc-800 pb-3">
              <h2 className="font-display text-2xl font-black text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-violet-400" /> Initiate Advisory Dispatch
              </h2>
              <p className="text-xs font-mono text-zinc-400">Send an inquiry with verification and spam protection.</p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-xl bg-violet-950/40 border border-violet-800/80 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-violet-400 mx-auto" />
                <div className="font-bold text-white text-base">Transmission Successfully Queued</div>
                <p className="text-xs text-zinc-400">Your message has been logged. Response time is typically within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-zinc-800 text-xs font-mono text-zinc-200 rounded-lg hover:bg-zinc-700"
                >
                  Send Another Dispatch
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-mono">
                <div className="space-y-1">
                  <label className="text-zinc-300">Your Name / Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Eleanor Sterling, Apex Capital"
                    value={senderName}
                    onChange={e => setSenderName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-200 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-300">Contact Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@organization.com"
                    value={senderEmail}
                    onChange={e => setSenderEmail(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-200 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-300">Project Scope or Advisory Inquiry</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Describe your architecture requirements, timeline, or consultation goals..."
                    value={messageBody}
                    onChange={e => setMessageBody(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-200 focus:outline-none focus:border-violet-500"
                  />
                </div>

                {/* Spam Protection Math Captcha */}
                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                    <ShieldAlert className="w-4 h-4 text-violet-400" />
                    <span>Security Challenge: What is <strong>9 + 5</strong>?</span>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Enter answer (e.g. 14)"
                    value={captchaAnswer}
                    onChange={e => setCaptchaAnswer(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-zinc-200 font-mono text-xs focus:outline-none focus:border-violet-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl shadow-lg shadow-violet-600/30 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Encrypted Transmission
                </button>
              </form>
            )}
          </div>
        )}
      </main>

      {/* PROJECT CASE STUDY MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs font-mono text-violet-400 uppercase">{selectedProject.client}</span>
                <h3 className="font-display font-bold text-xl text-white">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-zinc-400 hover:text-white text-xs font-mono px-3 py-1 bg-zinc-800 rounded-lg"
              >
                ✕ Close
              </button>
            </div>

            <img
              src={selectedProject.heroImage}
              alt={selectedProject.title}
              className="w-full h-56 object-cover rounded-xl border border-zinc-800"
            />

            <div className="space-y-4 text-xs font-mono">
              <div>
                <span className="text-zinc-400 uppercase tracking-wider block font-bold mb-1">The Engineering Bottleneck</span>
                <p className="text-zinc-300 font-sans text-sm">{selectedProject.challenge}</p>
              </div>

              <div>
                <span className="text-zinc-400 uppercase tracking-wider block font-bold mb-1">Architectural Solution</span>
                <p className="text-zinc-300 font-sans text-sm">{selectedProject.solution}</p>
              </div>

              <div className="pt-2">
                <span className="text-zinc-400 uppercase tracking-wider block font-bold mb-2">Verified Production Benchmarks</span>
                <div className="space-y-1.5">
                  {selectedProject.metrics.map(m => (
                    <div key={m} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-emerald-400">
                      ✓ {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-black/80 py-6 px-4 text-center text-xs font-mono text-zinc-500">
        KAIROS THORNE • CRAFTED WITH REACT 18, VITE & TAILWIND • ALL ARCHITECTURES VERIFIED
      </footer>
    </div>
  );
}
