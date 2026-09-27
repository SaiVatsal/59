import { create } from 'zustand';

export const useStore = create((set, get) => ({
  user: {
    name: 'Eleanor Vance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    xp: 2840,
    level: 'Advanced Scholar',
    streakDays: 14,
    enrolledCourseIds: ['res-1', 'res-2', 'res-4']
  },

  activeTab: 'library', // 'library' | 'recommendations' | 'quizzes' | 'dashboard' | 'instructor'
  searchQuery: '',
  selectedCategory: 'All',

  categories: ['All', 'Computer Science', 'Design Systems', 'Data Science', 'Web Architecture'],

  resources: [
    {
      id: 'res-1',
      title: 'Modern Distributed Micro-Frontends & Module Federation',
      category: 'Web Architecture',
      type: 'Video Lecture',
      duration: '42 mins',
      author: 'Dr. Sarah Chen',
      enrolled: true,
      progress: 78,
      rating: 4.9,
      cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
      description: 'Master independent deployment pipelines and runtime webpack module federation for enterprise applications.'
    },
    {
      id: 'res-2',
      title: 'Lavender & Glassmorphic UI/UX Design Masterclass',
      category: 'Design Systems',
      type: 'Article + Assets',
      duration: '25 mins read',
      author: 'Julian Thorne',
      enrolled: true,
      progress: 100,
      rating: 4.95,
      cover: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80',
      description: 'Comprehensive guidelines on harmonic color palettes, soft shadows, rounded components, and typography hierarchy.'
    },
    {
      id: 'res-3',
      title: 'Deep Neural Networks & Transformer Self-Attention',
      category: 'Data Science',
      type: 'PDF Syllabus',
      duration: '85 pages',
      author: 'Prof. Alexei Rostova',
      enrolled: false,
      progress: 0,
      rating: 4.88,
      cover: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80',
      description: 'Mathematical intuition behind Multi-Head Attention mechanisms, Positional Encodings, and LLM scaling laws.'
    },
    {
      id: 'res-4',
      title: 'High-Throughput Concurrent Data Structures in Rust',
      category: 'Computer Science',
      type: 'Video Series',
      duration: '1h 15m',
      author: 'Marcus Brody',
      enrolled: true,
      progress: 45,
      rating: 4.92,
      cover: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80',
      description: 'Lock-free queues, atomic reference counting, and cache-line bouncing mitigation patterns.'
    }
  ],

  quizzes: [
    {
      id: 'quiz-1',
      title: 'Web Performance & Module Federation Mastery',
      courseRef: 'res-1',
      timeLimitMinutes: 10,
      questions: [
        {
          id: 'q1',
          question: 'What is the primary advantage of Webpack Module Federation?',
          options: [
            'Minifies HTML bundle sizes automatically',
            'Enables runtime dynamic sharing of remote vendor modules without rebuilding host',
            'Replaces all CSS with inline SVG styles',
            'Disables cross-origin resource sharing restrictions'
          ],
          correctIndex: 1
        },
        {
          id: 'q2',
          question: 'Which HTTP header is required for SharedArrayBuffer multithreading?',
          options: [
            'Cross-Origin-Opener-Policy: same-origin',
            'X-Frame-Options: DENY',
            'Content-Security-Policy: default-src self',
            'Access-Control-Allow-Origin: *'
          ],
          correctIndex: 0
        },
        {
          id: 'q3',
          question: 'In Zustand, how are re-renders minimized when selecting state?',
          options: [
            'Zustand renders everything on every tick',
            'By passing granular state slice selectors to the useStore hook',
            'Using manual window.location.reload()',
            'Writing state directly to localStorage'
          ],
          correctIndex: 1
        }
      ]
    },
    {
      id: 'quiz-2',
      title: 'Lavender Design Systems & WCAG Contrast Evaluation',
      courseRef: 'res-2',
      timeLimitMinutes: 5,
      questions: [
        {
          id: 'q4',
          question: 'What is the minimum WCAG AA contrast ratio for regular body text?',
          options: ['3:1', '4.5:1', '7:1', '10:1'],
          correctIndex: 1
        },
        {
          id: 'q5',
          question: 'Why are rounded corners (e.g. rounded-2xl) perceptually friendly in UX?',
          options: [
            'They guide visual foveal gaze smoothly toward central content',
            'They consume 50% fewer GPU triangles',
            'They enforce monochromatic grayscale rendering',
            'They prevent text overflow bugs'
          ],
          correctIndex: 0
        }
      ]
    }
  ],

  certificates: [
    {
      id: 'CERT-88492-LUMINA',
      courseTitle: 'Lavender & Glassmorphic UI/UX Design Masterclass',
      studentName: 'Eleanor Vance',
      issuedDate: 'September 24, 2026',
      instructor: 'Julian Thorne',
      score: '96%'
    }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),

  enrollInResource: (resId) => set((state) => ({
    resources: state.resources.map(r => r.id === resId ? { ...r, enrolled: true, progress: 5 } : r),
    user: {
      ...state.user,
      enrolledCourseIds: [...state.user.enrolledCourseIds, resId]
    }
  })),

  updateProgress: (resId, delta) => set((state) => {
    const updated = state.resources.map(r => {
      if (r.id === resId) {
        const next = Math.min(100, (r.progress || 0) + delta);
        return { ...r, progress: next };
      }
      return r;
    });
    return { resources: updated, user: { ...state.user, xp: state.user.xp + delta * 5 } };
  }),

  addCertificate: (cert) => set((state) => ({
    certificates: [cert, ...state.certificates]
  })),

  addResource: (newRes) => set((state) => {
    const created = {
      id: `res-${Date.now()}`,
      title: newRes.title,
      category: newRes.category || 'Computer Science',
      type: newRes.type || 'Article + Assets',
      duration: newRes.duration || '20 mins',
      author: newRes.author || 'Instructor Staff',
      enrolled: false,
      progress: 0,
      rating: 5.0,
      cover: newRes.cover || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
      description: newRes.description || 'Comprehensive learning module curated by faculty.'
    };
    return { resources: [created, ...state.resources] };
  })
}));
