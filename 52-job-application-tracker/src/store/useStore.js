import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'kanban', // 'kanban' | 'calendar' | 'analytics'
  searchQuery: '',
  selectedStage: 'All',

  applications: [
    {
      id: 'APP-701',
      company: 'Anthropic AI Systems',
      position: 'Staff Systems Infrastructure Engineer',
      stage: 'Interview',
      location: 'San Francisco, CA (Hybrid)',
      salaryRange: '$280,000 - $340,000 + Equity',
      appliedDate: '2026-09-12',
      deadline: '2026-10-05',
      resumeAttached: 'Vatsal_Principal_Infrastructure_2026.pdf',
      coverLetterAttached: 'Anthropic_Alignment_Letter.pdf',
      notes: 'Reviewed distributed agentic runtime scaling papers. Prepared deep-dive on sub-5ms scheduler locks.',
      contacts: [
        { name: 'Elena Rostova', role: 'Staff Technical Recruiter', email: 'e.rostova@anthropic-systems.ai' }
      ],
      interviews: [
        { id: 'int-1', round: 'Distributed Architecture & KV Caching', date: '2026-10-03 14:00', interviewer: 'Dr. Marcus Webb (Lead Architect)' }
      ]
    },
    {
      id: 'APP-702',
      company: 'Vance Quantum Ledger',
      position: 'Lead Frontend Performance Architect',
      stage: 'Offer',
      location: 'New York, NY (Remote)',
      salaryRange: '$260,000 Base + $80,000 Bonus',
      appliedDate: '2026-09-02',
      deadline: '2026-09-30',
      resumeAttached: 'Vatsal_Senior_React_Performance.pdf',
      coverLetterAttached: 'Vance_Trading_UI_Pitch.pdf',
      notes: 'Final offer letter received. Reviewing signing bonus and 401(k) match vesting schedules.',
      contacts: [
        { name: 'Harrison Vance', role: 'Chief Executive Officer', email: 'harrison@vance-quantum.io' }
      ],
      interviews: [
        { id: 'int-2', round: 'Executive Culture Alignment', date: '2026-09-22 11:00', interviewer: 'Harrison Vance' }
      ]
    },
    {
      id: 'APP-703',
      company: 'Stripe Global Payments',
      position: 'Senior Software Engineer, Core Ledger',
      stage: 'Screening',
      location: 'Seattle, WA (Remote)',
      salaryRange: '$225,000 - $275,000',
      appliedDate: '2026-09-20',
      deadline: '2026-10-10',
      resumeAttached: 'Vatsal_Distributed_Systems.pdf',
      coverLetterAttached: 'Stripe_Fintech_Experience.pdf',
      notes: 'Initial recruiter screen passed. Preparing for live coding round on concurrency and rate limiting.',
      contacts: [
        { name: 'Claire Dubois', role: 'Senior Talent Partner', email: 'claire@stripe-hiring.com' }
      ],
      interviews: [
        { id: 'int-3', round: 'Technical Screen & Concurrency', date: '2026-10-06 16:30', interviewer: 'Senior Staff Engineer' }
      ]
    },
    {
      id: 'APP-704',
      company: 'Linear App Corp',
      position: 'Product Engineer, Desktop Experience',
      stage: 'Applied',
      location: 'San Francisco, CA (Remote)',
      salaryRange: '$210,000 - $250,000',
      appliedDate: '2026-09-25',
      deadline: '2026-10-15',
      resumeAttached: 'Vatsal_Product_UI_2026.pdf',
      coverLetterAttached: 'Linear_Keyboard_First_Philosophy.pdf',
      notes: 'Application submitted through referral. Follow-up email scheduled for Monday.',
      contacts: [],
      interviews: []
    }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setSelectedStage: (s) => set({ selectedStage: s }),

  addApplication: (appData) => set((state) => {
    const newApp = {
      id: `APP-${Math.floor(705 + Math.random() * 900)}`,
      appliedDate: new Date().toISOString().split('T')[0],
      contacts: [],
      interviews: [],
      resumeAttached: 'Senior_Software_Engineer_Master.pdf',
      coverLetterAttached: 'Custom_Cover_Letter.pdf',
      ...appData
    };
    return {
      applications: [newApp, ...state.applications],
      activeTab: 'kanban'
    };
  }),

  moveApplicationStage: (appId, newStage) => set((state) => ({
    applications: state.applications.map(a => a.id === appId ? { ...a, stage: newStage } : a)
  })),

  deleteApplication: (appId) => set((state) => ({
    applications: state.applications.filter(a => a.id !== appId)
  })),

  addInterview: (appId, interviewData) => set((state) => ({
    applications: state.applications.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          stage: 'Interview',
          interviews: [
            ...a.interviews,
            { id: `int-${Date.now()}`, ...interviewData }
          ]
        };
      }
      return a;
    })
  })),

  updateNotes: (appId, notes) => set((state) => ({
    applications: state.applications.map(a => a.id === appId ? { ...a, notes } : a)
  }))
}));
