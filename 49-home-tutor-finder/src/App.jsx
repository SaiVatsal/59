import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  GraduationCap,
  Star,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  MessageCircle,
  Search,
  Filter,
  UserPlus,
  Send,
  Sparkles,
  BookOpen,
  Award,
  DollarSign
} from 'lucide-react';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedSubject,
    setSelectedSubject,
    selectedLocation,
    setSelectedLocation,
    searchQuery,
    setSearchQuery,
    tutors,
    bookings,
    messages,
    bookLesson,
    cancelBooking,
    sendMessage,
    registerTutor
  } = useStore();

  // Booking Modal State
  const [bookingTutor, setBookingTutor] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-10-02');
  const [lessonLocation, setLessonLocation] = useState('Student Home Residence');

  // Direct Message State
  const [activeMessageTutor, setActiveMessageTutor] = useState(null);
  const [chatInput, setChatInput] = useState('');

  // Register Tutor Modal
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [regName, setRegName] = useState('');
  const [regTitle, setRegTitle] = useState('');
  const [regSubjects, setRegSubjects] = useState('Calculus, Linear Algebra');
  const [regRate, setRegRate] = useState(65);
  const [regDegree, setRegDegree] = useState('M.S. in Education & Math');
  const [regUni, setRegUni] = useState('Columbia University');
  const [regLocation, setRegLocation] = useState('New York Metro');
  const [regBio, setRegBio] = useState('');

  const subjectsList = ['All', 'Calculus', 'Physics', 'Chemistry', 'Biology', 'French', 'SAT Math', 'Creative Writing'];
  const locationsList = ['All', 'Cambridge & Boston Metro', 'New York & Brooklyn', 'Chicago & Evanston'];

  const filteredTutors = tutors.filter(t => {
    const matchesSubj = selectedSubject === 'All' || t.subjects.some(s => s.toLowerCase().includes(selectedSubject.toLowerCase()));
    const matchesLoc = selectedLocation === 'All' || t.location.includes(selectedLocation);
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubj && matchesLoc && matchesSearch;
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingTutor || !studentName.trim() || !selectedSlot) return;

    bookLesson({
      tutorId: bookingTutor.id,
      tutorName: bookingTutor.name,
      subject: bookingTutor.subjects[0] || 'General Subject',
      studentName,
      date: selectedDate,
      timeSlot: selectedSlot,
      location: lessonLocation,
      rate: bookingTutor.hourlyRate,
      totalAmount: bookingTutor.hourlyRate * 1.5
    });

    setBookingTutor(null);
    setStudentName('');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!activeMessageTutor || !chatInput.trim()) return;
    sendMessage(activeMessageTutor.id, activeMessageTutor.name, chatInput.trim());
    setChatInput('');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName.trim()) return;

    registerTutor({
      name: regName,
      title: regTitle || 'Certified Private Instructor',
      subjects: regSubjects.split(',').map(s => s.trim()),
      hourlyRate: Number(regRate),
      degree: regDegree,
      university: regUni,
      location: regLocation,
      mode: 'In-Home & Online',
      bio: regBio || 'Passionate educator committed to customized student learning trajectories.'
    });

    setShowRegisterModal(false);
    setRegName('');
    setRegTitle('');
    setRegBio('');
  };

  const currentThread = activeMessageTutor
    ? messages.find(m => m.tutorId === activeMessageTutor.id)
    : messages[0];

  return (
    <div className="min-h-screen bg-[#fffaf5] text-stone-900 flex flex-col font-sans">
      {/* Orange Warm Header */}
      <header className="bg-white border-b border-orange-100 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('tutors')}>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-orange-600 font-mono">Verified Tutors</span>
                <h1 className="text-2xl font-black text-stone-900 tracking-tight">TutorMatch</h1>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex space-x-1 sm:space-x-2">
              <button
                onClick={() => setActiveTab('tutors')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'tutors'
                    ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30'
                    : 'text-stone-600 hover:bg-orange-50'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Find In-Home Tutors</span>
              </button>

              <button
                onClick={() => setActiveTab('my-bookings')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'my-bookings'
                    ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30'
                    : 'text-stone-600 hover:bg-orange-50'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>My Lessons ({bookings.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'messages'
                    ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30'
                    : 'text-stone-600 hover:bg-orange-50'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Messages</span>
              </button>
            </nav>

            {/* Become a Tutor CTA */}
            <button
              onClick={() => setShowRegisterModal(true)}
              className="hidden md:flex items-center space-x-1.5 px-4 py-2 bg-orange-100 text-orange-900 hover:bg-orange-200 border border-orange-200 rounded-xl text-xs font-bold transition-colors"
            >
              <UserPlus className="w-4 h-4 text-orange-700" />
              <span>Join as an Instructor</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: TUTOR DIRECTORY */}
        {activeTab === 'tutors' && (
          <div className="space-y-6">
            {/* Search and Subject Chips */}
            <div className="bg-white p-5 rounded-3xl border border-orange-100 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search by instructor name, subject, or academic field..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/60 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Location:</span>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="text-xs font-semibold p-2 rounded-xl border border-stone-200 bg-white"
                  >
                    {locationsList.map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subject Chips */}
              <div className="flex items-center gap-2 pt-2 border-t border-stone-100 overflow-x-auto">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Subject:</span>
                {subjectsList.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSubject(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                      selectedSubject === s
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'bg-orange-50 text-orange-950 hover:bg-orange-100 border border-orange-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Tutors Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className="bg-white rounded-3xl border border-orange-100 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="relative shrink-0">
                        <img
                          src={tutor.avatar}
                          alt={tutor.name}
                          className="w-20 h-20 rounded-2xl object-cover border-2 border-orange-200 shadow-sm"
                        />
                        {tutor.backgroundVerified && (
                          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full shadow-xs" title="Verified Background Check">
                            <CheckCircle className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center space-x-1 text-amber-500">
                          <Star className="w-4 h-4 fill-amber-400" />
                          <span className="font-black text-sm text-stone-900">{tutor.rating}</span>
                          <span className="text-xs text-stone-400">({tutor.reviewsCount} reviews)</span>
                        </div>
                        <h3 className="font-bold text-stone-900 text-base leading-tight">{tutor.name}</h3>
                        <p className="text-xs text-orange-700 font-semibold">{tutor.title}</p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
                      <div className="flex items-center text-stone-600">
                        <GraduationCap className="w-3.5 h-3.5 text-stone-400 mr-1.5 shrink-0" />
                        <span className="truncate">{tutor.degree} — <span className="font-semibold">{tutor.university}</span></span>
                      </div>
                      <div className="flex items-center text-stone-600">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 mr-1.5 shrink-0" />
                        <span>{tutor.location} • {tutor.mode}</span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 bg-stone-50/70 p-3 rounded-2xl border border-stone-100">
                      "{tutor.bio}"
                    </p>

                    {/* Subject Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {tutor.subjects.map(subj => (
                        <span key={subj} className="bg-orange-50 text-orange-900 text-[11px] font-bold px-2.5 py-0.5 rounded-lg border border-orange-200">
                          {subj}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action Footer */}
                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-stone-400 font-medium block">Lesson Tariff</span>
                      <span className="text-xl font-black text-stone-900 font-mono">${tutor.hourlyRate}</span>
                      <span className="text-xs text-stone-500"> / hr</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setActiveMessageTutor(tutor);
                          setActiveTab('messages');
                        }}
                        className="p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-colors"
                        title="Direct Message"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          setBookingTutor(tutor);
                          setSelectedSlot(tutor.availableSlots[0] || '');
                        }}
                        className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Session</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: MY BOOKINGS & SCHEDULE */}
        {activeTab === 'my-bookings' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-xs">
              <h2 className="text-xl font-black text-stone-900">Scheduled In-Home & Virtual Tutoring Sessions</h2>
              <p className="text-xs text-stone-500">Manage upcoming personalized lessons, lesson locations, and tutor confirmations.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {bookings.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-3xl border border-orange-100 text-stone-400">
                  No tutoring sessions currently booked.
                </div>
              ) : (
                bookings.map((b) => (
                  <div key={b.id} className="bg-white rounded-3xl border border-orange-100 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-orange-800 bg-orange-100 px-2 py-0.5 rounded">
                          {b.id}
                        </span>
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>{b.status}</span>
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-stone-900">{b.subject} with {b.tutorName}</h4>
                      <p className="text-xs text-stone-600">Student: <span className="font-bold text-stone-800">{b.studentName}</span></p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 font-mono pt-1">
                        <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1 text-orange-600" /> {b.date}</span>
                        <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-orange-600" /> {b.timeSlot}</span>
                        <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-orange-600" /> {b.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <span className="text-xs text-stone-400 font-medium block">Total (1.5 hrs)</span>
                        <span className="text-lg font-black text-stone-900 font-mono">${b.totalAmount.toFixed(2)}</span>
                      </div>
                      <button
                        onClick={() => cancelBooking(b.id)}
                        className="px-4 py-2 border border-rose-200 text-rose-700 hover:bg-rose-50 rounded-xl text-xs font-bold transition-colors"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: DIRECT MESSAGES */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-3xl border border-orange-100 shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-3 min-h-[550px]">
            {/* Thread List */}
            <div className="border-r border-orange-100 p-4 space-y-3 bg-stone-50/40">
              <h3 className="font-bold text-xs uppercase tracking-wider text-stone-500 px-2">Instructor Inquiries</h3>
              <div className="space-y-1">
                {tutors.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveMessageTutor(t)}
                    className={`w-full p-3 rounded-2xl text-left transition-all flex items-center space-x-3 ${
                      activeMessageTutor?.id === t.id
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'hover:bg-orange-50 text-stone-800'
                    }`}
                  >
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-sm truncate">{t.name}</h4>
                      <p className={`text-xs truncate ${activeMessageTutor?.id === t.id ? 'text-orange-100' : 'text-stone-500'}`}>
                        {t.subjects[0]}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="md:col-span-2 flex flex-col justify-between p-6">
              {currentThread ? (
                <>
                  <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                    <div>
                      <h3 className="font-bold text-base text-stone-900">{currentThread.tutorName}</h3>
                      <p className="text-xs text-emerald-600 font-semibold">● Active Instructor</p>
                    </div>
                  </div>

                  <div className="flex-1 py-6 space-y-4 overflow-y-auto max-h-[360px]">
                    {currentThread.chatHistory?.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col ${
                          msg.sender === 'student' ? 'items-end' : 'items-start'
                        }`}
                      >
                        <div
                          className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                            msg.sender === 'student'
                              ? 'bg-orange-600 text-white rounded-br-none'
                              : 'bg-stone-100 text-stone-800 rounded-bl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[10px] text-stone-400 font-mono mt-1 px-1">{msg.time}</span>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="pt-4 border-t border-stone-100 flex gap-2">
                    <input
                      type="text"
                      placeholder="Discuss syllabus topics or scheduling preferences..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-stone-400 text-xs">
                  Select a tutor to begin messaging.
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Booking Modal */}
      {bookingTutor && (
        <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl p-6 relative border border-orange-100">
            <button
              onClick={() => setBookingTutor(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="font-black text-xl text-stone-900 mb-1">Book Lesson with {bookingTutor.name}</h3>
            <p className="text-xs text-stone-500 mb-4">{bookingTutor.title} • ${bookingTutor.hourlyRate}/hour</p>

            <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Julian Thorne"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Lesson Date</label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Available Time Slot</label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50"
                  >
                    {bookingTutor.availableSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Lesson Modality & Address</label>
                <input
                  type="text"
                  value={lessonLocation}
                  onChange={(e) => setLessonLocation(e.target.value)}
                  placeholder="e.g. 142 Harvard St, Cambridge MA or Zoom Room"
                  className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 space-y-1">
                <div className="flex justify-between font-bold text-stone-800">
                  <span>Session Rate (1.5 hrs @ ${bookingTutor.hourlyRate}/hr)</span>
                  <span className="font-mono text-orange-900">${(bookingTutor.hourlyRate * 1.5).toFixed(2)}</span>
                </div>
                <p className="text-[11px] text-stone-500">100% Satisfaction Guarantee. Zero fees if cancelled 24 hours prior.</p>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setBookingTutor(null)}
                  className="px-4 py-2 border border-stone-200 rounded-xl text-xs font-bold text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs shadow-md shadow-orange-500/20"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Register Tutor Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl p-6 relative border border-orange-100">
            <button
              onClick={() => setShowRegisterModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="font-black text-xl text-stone-900 mb-1">Instructor Onboarding Portal</h3>
            <p className="text-xs text-stone-500 mb-4">Join our network of verified in-home and online private educators.</p>

            <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Arthur Pendelton"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Professional Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Organic Chemistry Instructor"
                    value={regTitle}
                    onChange={(e) => setRegTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Hourly Rate ($USD)</label>
                  <input
                    type="number"
                    min="20"
                    max="300"
                    value={regRate}
                    onChange={(e) => setRegRate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Highest Degree</label>
                  <input
                    type="text"
                    placeholder="e.g. Ph.D. in Physics"
                    value={regDegree}
                    onChange={(e) => setRegDegree(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Alma Mater University</label>
                  <input
                    type="text"
                    placeholder="e.g. Stanford University"
                    value={regUni}
                    onChange={(e) => setRegUni(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Teaching Subjects (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Calculus, AP Physics C, Linear Algebra"
                  value={regSubjects}
                  onChange={(e) => setRegSubjects(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Instructor Biography</label>
                <textarea
                  rows="3"
                  placeholder="Share your pedagogy, past student achievements, and academic credentials..."
                  value={regBio}
                  onChange={(e) => setRegBio(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-4 py-2 border border-stone-200 rounded-xl text-xs font-bold text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs shadow-sm"
                >
                  Submit Tutor Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-orange-100 bg-white py-6 text-center text-xs text-stone-500 font-sans">
        <p className="font-bold text-stone-800">TutorMatch Marketplace</p>
        <p className="text-[11px] text-stone-400 mt-0.5">Background-Checked Instructors • In-Home & Virtual Tutoring • Direct Student Messaging</p>
      </footer>
    </div>
  );
}
