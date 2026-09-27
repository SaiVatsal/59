import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'feedbacks', // 'feedbacks' | 'submit-portal' | 'builder' | 'analytics'
  selectedCategory: 'All',
  selectedSentiment: 'All',
  searchQuery: '',

  surveys: [
    {
      id: 'SURV-01',
      title: 'Post-Checkout Satisfaction & Product Quality',
      category: 'E-Commerce Experience',
      active: true,
      responsesCount: 42,
      description: 'Gauges checkout friction, packaging condition, and product fidelity.',
      fields: [
        { id: 'f1', label: 'Overall Purchase Experience', type: 'rating', required: true },
        { id: 'f2', label: 'Likelihood to recommend to colleagues (0-10)', type: 'nps', required: true },
        { id: 'f3', label: 'What could we improve?', type: 'textarea', required: false }
      ]
    },
    {
      id: 'SURV-02',
      title: 'Customer Support Interaction CSAT',
      category: 'Support Services',
      active: true,
      responsesCount: 29,
      description: 'Post-ticket feedback measuring agent helpfulness and resolution speed.',
      fields: [
        { id: 'f1', label: 'Agent Competence & Helpfulness', type: 'rating', required: true },
        { id: 'f2', label: 'Did we resolve your issue on first contact?', type: 'select', options: ['Yes, fully', 'Partially', 'No, unresolved'], required: true },
        { id: 'f3', label: 'Additional comments or feedback', type: 'textarea', required: false }
      ]
    }
  ],

  feedbacks: [
    {
      id: 'FB-901',
      surveyId: 'SURV-01',
      surveyTitle: 'Post-Checkout Satisfaction & Product Quality',
      customerName: 'Sarah Jenkins',
      customerEmail: 'sarah.j@techcorp.io',
      channel: 'Web In-App Modal',
      rating: 5,
      npsScore: 10,
      category: 'Platform Usability',
      comment: 'The checkout was instantaneous with Apple Pay and delivery arrived a day early. Unbelievable polish!',
      sentiment: 'Positive',
      status: 'Resolved',
      createdAt: '2026-09-26 14:20',
      replies: [
        { id: 'r1', text: 'Thank you Sarah! We are thrilled you had such a seamless experience.', time: '2026-09-26 15:00', author: 'Customer Success Team' }
      ]
    },
    {
      id: 'FB-902',
      surveyId: 'SURV-02',
      surveyTitle: 'Customer Support Interaction CSAT',
      customerName: 'Marcus Aurelius Sterling',
      customerEmail: 'msterling@vancecapital.com',
      channel: 'Post-Ticket Email',
      rating: 1,
      npsScore: 2,
      category: 'Billing & Invoicing',
      comment: 'Double-charged for my enterprise subscription tier. The billing agent took 48 hours to reply. Need immediate refund.',
      sentiment: 'Urgent',
      status: 'Under Review',
      createdAt: '2026-09-27 08:45',
      replies: [
        { id: 'r1', text: 'Marcus, escalating this directly to VP of Finance for manual ledger reversal.', time: '2026-09-27 09:15', author: 'Duty Lead (You)' }
      ]
    },
    {
      id: 'FB-903',
      surveyId: 'SURV-01',
      surveyTitle: 'Post-Checkout Satisfaction & Product Quality',
      customerName: 'Elena Rostova',
      customerEmail: 'elena.rostova@designlab.de',
      channel: 'Mobile App',
      rating: 3,
      npsScore: 6,
      category: 'Feature Request',
      comment: 'The core product works nicely, but the lack of Dark Mode and CSV export for invoice receipts is frustrating.',
      sentiment: 'Neutral',
      status: 'New',
      createdAt: '2026-09-27 10:10',
      replies: []
    },
    {
      id: 'FB-904',
      surveyId: 'SURV-02',
      surveyTitle: 'Customer Support Interaction CSAT',
      customerName: 'David K. O’Connor',
      customerEmail: 'david.oc@dublin-logistics.ie',
      channel: 'Web In-App Modal',
      rating: 2,
      npsScore: 4,
      category: 'Performance & Speed',
      comment: 'Dashboard loading latency has spiked over the past week during peak hours.',
      sentiment: 'Negative',
      status: 'New',
      createdAt: '2026-09-27 11:30',
      replies: []
    }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  setSelectedSentiment: (s) => set({ selectedSentiment: s }),
  setSearchQuery: (q) => set({ searchQuery: q }),

  submitFeedback: (payload) => set((state) => {
    // Automated sentiment heuristics
    let sentiment = 'Neutral';
    if (payload.rating >= 4 || payload.npsScore >= 9) sentiment = 'Positive';
    else if (payload.rating <= 2 || payload.npsScore <= 4) {
      sentiment = payload.comment.toLowerCase().includes('refund') || payload.comment.toLowerCase().includes('urgent') || payload.comment.toLowerCase().includes('crash') ? 'Urgent' : 'Negative';
    }

    const newFeedback = {
      id: `FB-${Math.floor(905 + Math.random() * 900)}`,
      status: 'New',
      sentiment,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      replies: [],
      ...payload
    };

    return {
      feedbacks: [newFeedback, ...state.feedbacks],
      activeTab: 'feedbacks'
    };
  }),

  updateStatus: (feedbackId, newStatus) => set((state) => ({
    feedbacks: state.feedbacks.map(f => f.id === feedbackId ? { ...f, status: newStatus } : f)
  })),

  addReply: (feedbackId, message) => set((state) => ({
    feedbacks: state.feedbacks.map(f => {
      if (f.id === feedbackId) {
        return {
          ...f,
          status: 'Resolved',
          replies: [
            ...f.replies,
            {
              id: `r-${Date.now()}`,
              text: message,
              time: new Date().toISOString().replace('T', ' ').substring(0, 16),
              author: 'Customer Success Specialist'
            }
          ]
        };
      }
      return f;
    })
  })),

  createSurvey: (surveyData) => set((state) => {
    const survey = {
      id: `SURV-${Math.floor(10 + Math.random() * 90)}`,
      responsesCount: 0,
      active: true,
      ...surveyData
    };
    return {
      surveys: [survey, ...state.surveys],
      activeTab: 'submit-portal'
    };
  }),

  toggleSurveyStatus: (surveyId) => set((state) => ({
    surveys: state.surveys.map(s => s.id === surveyId ? { ...s, active: !s.active } : s)
  }))
}));
