import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'pipeline', // 'pipeline' | 'contacts' | 'activities' | 'campaigns' | 'forecast'

  leads: [
    {
      id: 'lead-01',
      name: 'Victoria Sterling',
      title: 'VP of Engineering',
      company: 'Apex Cloud Architecture',
      email: 'v.sterling@apexcloud.io',
      phone: '+1 (415) 890-2134',
      stage: 'proposal', // 'lead', 'discovery', 'evaluation', 'proposal', 'won', 'lost'
      value: 120000,
      probability: 75,
      tier: 'Enterprise',
      owner: 'Julian Mercer',
      lastContact: '2026-09-24'
    },
    {
      id: 'lead-02',
      name: 'Darius Vance',
      title: 'Chief Technology Officer',
      company: 'OmniVanguard Fintech',
      email: 'dvance@omnivanguard.com',
      phone: '+1 (212) 554-9981',
      stage: 'evaluation',
      value: 85000,
      probability: 60,
      tier: 'Enterprise',
      owner: 'Julian Mercer',
      lastContact: '2026-09-25'
    },
    {
      id: 'lead-03',
      name: 'Aria Takahashi',
      title: 'Head of Infrastructure',
      company: 'Solstice Robotics',
      email: 'a.takahashi@solstice-bot.jp',
      phone: '+81 3 5555 0192',
      stage: 'discovery',
      value: 45000,
      probability: 40,
      tier: 'Mid-Market',
      owner: 'Elena Rostova',
      lastContact: '2026-09-26'
    },
    {
      id: 'lead-04',
      name: 'Marcus Brody',
      title: 'Principal Architect',
      company: 'Krypton Data Labs',
      email: 'mbrody@krypton-data.com',
      phone: '+1 (312) 441-2099',
      stage: 'won',
      value: 210000,
      probability: 100,
      tier: 'Enterprise Tier 1',
      owner: 'Julian Mercer',
      lastContact: '2026-09-21'
    }
  ],

  activities: [
    {
      id: 'act-1',
      leadId: 'lead-01',
      type: 'Demo Call',
      timestamp: '2026-09-24 14:30',
      author: 'Julian Mercer',
      notes: 'Delivered executive architecture demo. Victoria requested security SLA questionnaire and SOC2 Type II compliance audit packet.'
    },
    {
      id: 'act-2',
      leadId: 'lead-02',
      type: 'Technical Review',
      timestamp: '2026-09-25 10:15',
      author: 'Julian Mercer',
      notes: 'Addressed PostgreSQL multi-region latency benchmarks. CTO agreed to schedule commercial terms negotiation.'
    }
  ],

  campaigns: [
    {
      id: 'cmp-01',
      name: 'Q4 Enterprise Architecture Outbound',
      targetTier: 'Enterprise (ARR > $100k)',
      enrolledLeads: 48,
      openRate: '68.4%',
      replyRate: '24.1%',
      status: 'Active Running'
    },
    {
      id: 'cmp-02',
      name: 'Post-Demo Executive Follow-up Cadence',
      targetTier: 'Proposal & Technical Review',
      enrolledLeads: 19,
      openRate: '88.2%',
      replyRate: '52.6%',
      status: 'Active Running'
    }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),

  updateLeadStage: (leadId, newStage) => set((state) => {
    const probabilityMap = {
      lead: 20,
      discovery: 40,
      evaluation: 60,
      proposal: 75,
      won: 100,
      lost: 0
    };

    return {
      leads: state.leads.map(l =>
        l.id === leadId ? { ...l, stage: newStage, probability: probabilityMap[newStage] ?? l.probability } : l
      )
    };
  }),

  addLead: (leadData) => set((state) => {
    const newLead = {
      id: `lead-${Date.now()}`,
      name: leadData.name,
      title: leadData.title || 'Decision Maker',
      company: leadData.company || 'Enterprise Prospect',
      email: leadData.email,
      phone: leadData.phone || '+1 (555) 019-2831',
      stage: 'lead',
      value: Number(leadData.value || 50000),
      probability: 20,
      tier: leadData.tier || 'Enterprise',
      owner: 'Julian Mercer',
      lastContact: new Date().toISOString().slice(0, 10)
    };
    return { leads: [newLead, ...state.leads] };
  }),

  logActivity: (actData) => set((state) => ({
    activities: [
      {
        id: `act-${Date.now()}`,
        leadId: actData.leadId,
        type: actData.type || 'Meeting Notes',
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
        author: 'Julian Mercer',
        notes: actData.notes
      },
      ...state.activities
    ]
  }))
}));
