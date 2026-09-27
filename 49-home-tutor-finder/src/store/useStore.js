import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'tutors', // 'tutors' | 'my-bookings' | 'messages' | 'register-tutor'
  selectedSubject: 'All',
  selectedLocation: 'All',
  searchQuery: '',

  tutors: [
    {
      id: 'TUT-101',
      name: 'Dr. Clara Zimmerman',
      title: 'AP Calculus BC & Advanced Physics Specialist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      subjects: ['Calculus', 'Physics', 'Linear Algebra', 'SAT Math'],
      hourlyRate: 75,
      rating: 4.98,
      reviewsCount: 86,
      degree: 'Ph.D. in Applied Mathematics',
      university: 'MIT',
      location: 'Cambridge & Boston Metro',
      mode: 'In-Home & Online',
      backgroundVerified: true,
      experienceYears: 9,
      bio: 'Former Olympiad medalist with 9+ years helping students achieve 5s on AP exams and admission to Ivy League STEM programs.',
      availableSlots: ['Mon 16:00 - 17:30', 'Wed 17:00 - 18:30', 'Sat 10:00 - 11:30']
    },
    {
      id: 'TUT-102',
      name: 'Alexander Sterling, M.Sc.',
      title: 'Organic Chemistry & MCAT Prep Coach',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      subjects: ['Chemistry', 'Biology', 'MCAT Prep', 'Biochemistry'],
      hourlyRate: 85,
      rating: 4.94,
      reviewsCount: 62,
      degree: 'M.Sc. in Chemical Biology',
      university: 'Johns Hopkins',
      location: 'New York & Brooklyn',
      mode: 'In-Home & Online',
      backgroundVerified: true,
      experienceYears: 7,
      bio: 'Dedicated pre-med advisor specializing in mechanism-based organic synthesis breakdowns and high-yield MCAT strategies.',
      availableSlots: ['Tue 15:00 - 16:30', 'Thu 16:30 - 18:00', 'Sun 14:00 - 15:30']
    },
    {
      id: 'TUT-103',
      name: 'Genevieve Dupond',
      title: 'Native French & Comparative Literature Educator',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      subjects: ['French', 'AP Literature', 'Creative Writing', 'History'],
      hourlyRate: 60,
      rating: 4.96,
      reviewsCount: 44,
      degree: 'M.A. in Romance Languages & Literature',
      university: 'Sorbonne & Oxford',
      location: 'Chicago & Evanston',
      mode: 'In-Home & Online',
      backgroundVerified: true,
      experienceYears: 6,
      bio: 'Bilingual educator focusing on immersive conversational fluency, DELF certification, and analytical essay structuring.',
      availableSlots: ['Wed 16:00 - 17:30', 'Fri 17:00 - 18:30', 'Sat 13:00 - 14:30']
    }
  ],

  bookings: [
    {
      id: 'BK-501',
      tutorId: 'TUT-101',
      tutorName: 'Dr. Clara Zimmerman',
      subject: 'AP Calculus BC',
      studentName: 'Julian Thorne',
      date: '2026-09-30',
      timeSlot: 'Wed 17:00 - 18:30',
      location: 'Student Home (Cambridge, MA)',
      status: 'Confirmed',
      rate: 75,
      totalAmount: 112.50
    }
  ],

  messages: [
    {
      tutorId: 'TUT-101',
      tutorName: 'Dr. Clara Zimmerman',
      chatHistory: [
        { sender: 'student', text: 'Hello Dr. Zimmerman, do you have availability to review Taylor Series and Multivariable limits this Wednesday?', time: '10:15 AM' },
        { sender: 'tutor', text: 'Hi Julian! Yes, the 17:00 slot is open. Please bring your class syllabus problem sets and graphing calculator.', time: '10:22 AM' }
      ]
    }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedSubject: (subj) => set({ selectedSubject: subj }),
  setSelectedLocation: (loc) => set({ selectedLocation: loc }),
  setSearchQuery: (q) => set({ searchQuery: q }),

  bookLesson: (bookingData) => set((state) => {
    const newBooking = {
      id: `BK-${Math.floor(502 + Math.random() * 900)}`,
      status: 'Confirmed',
      ...bookingData
    };
    return {
      bookings: [newBooking, ...state.bookings],
      activeTab: 'my-bookings'
    };
  }),

  cancelBooking: (bookingId) => set((state) => ({
    bookings: state.bookings.filter(b => b.id !== bookingId)
  })),

  sendMessage: (tutorId, tutorName, text) => set((state) => {
    const existingIndex = state.messages.findIndex(m => m.tutorId === tutorId);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (existingIndex >= 0) {
      const updated = [...state.messages];
      updated[existingIndex].chatHistory.push({ sender: 'student', text, time });
      // Simulate tutor auto-reply
      setTimeout(() => {
        set(s => {
          const u = [...s.messages];
          if (u[existingIndex]) {
            u[existingIndex].chatHistory.push({
              sender: 'tutor',
              text: 'Thanks for your inquiry! I received your message and will confirm our lesson details shortly.',
              time: 'Just now'
            });
          }
          return { messages: u };
        });
      }, 800);
      return { messages: updated };
    } else {
      const newThread = {
        tutorId,
        tutorName,
        chatHistory: [
          { sender: 'student', text, time }
        ]
      };
      return { messages: [newThread, ...state.messages] };
    }
  }),

  registerTutor: (tutorData) => set((state) => {
    const newTutor = {
      id: `TUT-${Math.floor(104 + Math.random() * 900)}`,
      rating: 5.0,
      reviewsCount: 1,
      backgroundVerified: true,
      avatar: tutorData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      availableSlots: ['Mon 16:00', 'Thu 17:00', 'Sat 11:00'],
      ...tutorData
    };
    return {
      tutors: [newTutor, ...state.tutors],
      activeTab: 'tutors'
    };
  })
}));
