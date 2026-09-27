import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'jobs', // 'jobs' | 'freelancers' | 'contracts' | 'my-bids'
  selectedCategory: 'All',
  searchQuery: '',

  jobs: [
    {
      id: 'JOB-201',
      title: 'Architect Next-Gen Web3 Real-Time Trading Terminal',
      clientName: 'Vance Quantum Labs',
      clientRating: 4.96,
      budget: 8500,
      budgetType: 'Fixed Price',
      skills: ['React', 'TypeScript', 'WebSockets', 'TailwindCSS', 'Zustand'],
      description: 'Require a senior frontend systems engineer to build a sub-50ms latency orderbook visualization terminal with interactive depth charts and multi-wallet connectors.',
      proposalsCount: 8,
      deadlineDays: 21,
      status: 'Open'
    },
    {
      id: 'JOB-202',
      title: 'Design System & Micro-Interactions for Fintech SuperApp',
      clientName: 'Aegis Capital Group',
      clientRating: 5.0,
      budget: 6200,
      budgetType: 'Fixed Price',
      skills: ['Figma', 'UI/UX Design', 'Design Tokens', 'Framer Motion'],
      description: 'Comprehensive 120+ component design system in Figma with dark/light themes, WCAG AAA accessibility compliance, and production-ready token handoff.',
      proposalsCount: 14,
      deadlineDays: 14,
      status: 'Open'
    },
    {
      id: 'JOB-203',
      title: 'High-Concurrency Golang Microservices for Payment Gateway',
      clientName: 'Apex Settlement Corp',
      clientRating: 4.88,
      budget: 11000,
      budgetType: 'Fixed Price',
      skills: ['Go', 'PostgreSQL', 'Docker', 'gRPC', 'Redis'],
      description: 'Build idempotent transaction processing pipelines handling 10,000 req/sec with zero-loss distributed audit trails.',
      proposalsCount: 5,
      deadlineDays: 30,
      status: 'In Progress'
    }
  ],

  freelancers: [
    {
      id: 'FL-801',
      name: 'Dr. Evelyn Montgomery',
      title: 'Principal Distributed Systems & Rust Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      rating: 4.99,
      completedJobs: 42,
      hourlyRate: 140,
      earnings: '$380K+',
      skills: ['Rust', 'Go', 'Kubernetes', 'WebAssembly', 'Distributed Systems'],
      portfolio: [
        { title: 'Ultra-low Latency FIX Engine', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80' },
        { title: 'Decentralized Vault Validator', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=500&q=80' }
      ]
    },
    {
      id: 'FL-802',
      name: 'Kai Nakamura',
      title: 'Lead Frontend Engineer & Creative Technologist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      rating: 4.95,
      completedJobs: 67,
      hourlyRate: 115,
      earnings: '$290K+',
      skills: ['React', 'Three.js', 'TypeScript', 'TailwindCSS', 'Next.js'],
      portfolio: [
        { title: 'Spatial 3D Audio Visualizer', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80' },
        { title: 'Enterprise Analytics Suite', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80' }
      ]
    }
  ],

  proposals: [
    {
      id: 'PROP-901',
      jobId: 'JOB-201',
      jobTitle: 'Architect Next-Gen Web3 Real-Time Trading Terminal',
      freelancerId: 'FL-802',
      freelancerName: 'Kai Nakamura',
      bidAmount: 8000,
      deliveryDays: 18,
      coverLetter: 'I have previously delivered low-latency charting engines handling 50k candles/sec with WebGL shaders. I will scaffold modular WebSocket managers and Zustand stores.',
      status: 'Accepted'
    }
  ],

  contracts: [
    {
      id: 'CTR-4401',
      jobId: 'JOB-201',
      jobTitle: 'Architect Next-Gen Web3 Real-Time Trading Terminal',
      freelancerName: 'Kai Nakamura',
      clientName: 'Vance Quantum Labs',
      totalAmount: 8000,
      milestones: [
        { id: 'm1', title: 'Milestone 1: WebSockets Orderbook & Depth Chart UI', amount: 3000, status: 'Released' },
        { id: 'm2', title: 'Milestone 2: Execution Router & Latency Telemetry', amount: 3000, status: 'In Review' },
        { id: 'm3', title: 'Milestone 3: Production QA, Token Handoff & Docs', amount: 2000, status: 'Funded' }
      ],
      deliverables: [
        { id: 'd1', milestoneId: 'm1', title: 'GitHub PR #12: Orderbook Engine with WebGL canvas', date: '2026-09-24', status: 'Approved' },
        { id: 'd2', milestoneId: 'm2', title: 'Live Staging Build: Multi-exchange router preview', date: '2026-09-27', status: 'Under Client Review' }
      ]
    }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  setSearchQuery: (q) => set({ searchQuery: q }),

  postJob: (jobData) => set((state) => {
    const newJob = {
      id: `JOB-${Math.floor(204 + Math.random() * 800)}`,
      clientName: 'You (Enterprise Sponsor)',
      clientRating: 5.0,
      proposalsCount: 0,
      status: 'Open',
      ...jobData
    };
    return {
      jobs: [newJob, ...state.jobs],
      activeTab: 'jobs'
    };
  }),

  submitProposal: (proposalData) => set((state) => {
    const newProp = {
      id: `PROP-${Math.floor(902 + Math.random() * 900)}`,
      freelancerId: 'FL-802',
      freelancerName: 'Kai Nakamura (You)',
      status: 'Pending',
      ...proposalData
    };

    const updatedJobs = state.jobs.map(j =>
      j.id === proposalData.jobId ? { ...j, proposalsCount: j.proposalsCount + 1 } : j
    );

    return {
      proposals: [newProp, ...state.proposals],
      jobs: updatedJobs,
      activeTab: 'my-bids'
    };
  }),

  acceptProposal: (proposalId) => set((state) => {
    const prop = state.proposals.find(p => p.id === proposalId);
    if (!prop) return state;

    const newContract = {
      id: `CTR-${Math.floor(4402 + Math.random() * 900)}`,
      jobId: prop.jobId,
      jobTitle: prop.jobTitle,
      freelancerName: prop.freelancerName,
      clientName: 'Vance Quantum Labs',
      totalAmount: prop.bidAmount,
      milestones: [
        { id: 'm1', title: 'Milestone 1: Project Architecture & Core Engine', amount: Math.floor(prop.bidAmount * 0.5), status: 'Funded' },
        { id: 'm2', title: 'Milestone 2: Polish, Testing & Deployment', amount: Math.ceil(prop.bidAmount * 0.5), status: 'Funded' }
      ],
      deliverables: []
    };

    return {
      proposals: state.proposals.map(p => p.id === proposalId ? { ...p, status: 'Accepted' } : p),
      contracts: [newContract, ...state.contracts],
      activeTab: 'contracts'
    };
  }),

  submitDeliverable: (contractId, milestoneId, title) => set((state) => ({
    contracts: state.contracts.map(c => {
      if (c.id === contractId) {
        const newDel = {
          id: `d-${Date.now()}`,
          milestoneId,
          title,
          date: new Date().toISOString().split('T')[0],
          status: 'Under Client Review'
        };
        const updatedMilestones = c.milestones.map(m =>
          m.id === milestoneId ? { ...m, status: 'In Review' } : m
        );
        return {
          ...c,
          milestones: updatedMilestones,
          deliverables: [newDel, ...c.deliverables]
        };
      }
      return c;
    })
  })),

  releaseEscrowMilestone: (contractId, milestoneId) => set((state) => ({
    contracts: state.contracts.map(c => {
      if (c.id === contractId) {
        const updatedMilestones = c.milestones.map(m =>
          m.id === milestoneId ? { ...m, status: 'Released' } : m
        );
        return {
          ...c,
          milestones: updatedMilestones
        };
      }
      return c;
    })
  }))
}));
