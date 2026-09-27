import { create } from 'zustand';

export const useStore = create((set) => ({
  activeSection: 'work', // 'work' | 'skills' | 'writing' | 'resume' | 'seo' | 'contact'
  selectedProject: null,

  profile: {
    name: 'Kairos Thorne',
    title: 'Principal Distributed Systems Architect & Interface Designer',
    location: 'San Francisco, CA • Remote Global',
    availability: 'Available for Select Advisory & Core Architecture Contracts',
    summary: 'Bridging high-throughput distributed state machines with ultra-refined, kinetic human interfaces. 10+ years scaling low-latency infrastructure and engineering award-winning developer platforms.',
    stats: [
      { label: 'Production QPS Handled', value: '4.2M' },
      { label: 'OSS Contributions & Stars', value: '18.4k' },
      { label: 'Patents & Technical Papers', value: '6 Filed' },
      { label: 'Global Design Awards', value: '4 Awwwards' }
    ],
    socials: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      email: 'kairos.thorne.systems@gmail.com'
    }
  },

  projects: [
    {
      id: 'proj-01',
      title: 'Hyperion: Sub-Millisecond Event Streaming Mesh',
      category: 'Distributed Systems',
      year: '2026',
      heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      client: 'Apex Financial Technologies',
      stack: ['Rust', 'eBPF', 'Raft Consensus', 'WebAssembly', 'Tailwind'],
      summary: 'Ultra-low latency event mesh reducing inter-broker fan-out p99 latencies from 18ms to 320μs under 2.5M concurrent socket loads.',
      metrics: ['98.2% P99 Latency Reduction', '0.00% Packet Loss at 2.5M Concurrency', 'Zero-Allocation Parser in Rust'],
      challenge: 'Legacy Kafka architectures introduced uncontrollable GC pauses and TCP head-of-line blocking during market opening flash volume spikes.',
      solution: 'Architected a zero-copy lock-free ring-buffer pipeline leveraging Linux io_uring and custom vectorized SIMD deserializers.'
    },
    {
      id: 'proj-02',
      title: 'Vesper: Kinetic Spatial Audio & Synthesizer DAW',
      category: 'Creative Tooling',
      year: '2025',
      heroImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
      client: 'Vesper Labs',
      stack: ['React 18', 'Web Audio API', 'WebGPU', 'C++ Audio DSP', 'Zustand'],
      summary: 'Browser-native collaborative spatial workstation rendering 64-channel binaural acoustic fields with 60 FPS vector oscilloscope physics.',
      metrics: ['64 Concurrent Audio Tracks in Browser', '< 4.2ms Audio Buffer Latency', 'WebGPU Shader-Accelerated Waveforms'],
      challenge: 'Real-time multi-track phase cancellation and spatial convolution DSP traditionally required native desktop binaries (C++/VST3).',
      solution: 'Compiled custom C++ spatial impulse response algorithms into WebAssembly with SharedArrayBuffer multi-threading.'
    },
    {
      id: 'proj-03',
      title: 'Aethel: Zero-Knowledge Decentralized Vault',
      category: 'Cryptography & Security',
      year: '2025',
      heroImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
      client: 'Consortium Research',
      stack: ['Circom', 'snarkJS', 'TypeScript', 'Tailwind', 'Next.js'],
      summary: 'ZK-SNARK identity and custody protocol permitting blind institutional liquidity audits without disclosing underlying asset allocations.',
      metrics: ['Formal Verification with 0 Critical Findings', 'Sub-Second Proof Generation on Mobile', '$120M+ Custody Verified'],
      challenge: 'Institutions needed mathematical proof of reserves and solvency without leaking trade secrets or counterparty strategies.',
      solution: 'Devised a recursive Halo2 PLONK circuit aggregation tree enabling compressed instant client-side verification.'
    }
  ],

  skills: [
    { category: 'Architecture & Backend', items: ['Distributed Consensus (Raft/Paxos)', 'Rust & C++ Systems', 'Go Microservices', 'PostgreSQL & ClickHouse', 'gRPC & Protobuf', 'Redis & Vector DBs'] },
    { category: 'Frontend & UI Engineering', items: ['React 18 / Next.js', 'WebGPU / Three.js Shaders', 'Zustand / Redux Toolkit', 'TailwindCSS & Design Tokens', 'Web Audio & Canvas DSP', 'Micro-Interactions & Framer Motion'] },
    { category: 'Security & DevOps', items: ['Zero-Knowledge Proofs', 'Docker & Kubernetes', 'eBPF Kernel Probing', 'Terraform & AWS/GCP', 'Linux io_uring / Performance Profiling', 'CI/CD Automated Test Matrix'] }
  ],

  timeline: [
    { period: '2024 — Present', role: 'Chief Systems Architect', company: 'Apex Distributed Technologies', desc: 'Leading architecture for global streaming meshes and developer experience primitives.' },
    { period: '2022 — 2024', role: 'Staff UI & Platform Engineer', company: 'Synthetix Cloud', desc: 'Built real-time collaborative interfaces and high-throughput WebAssembly client runtimes.' },
    { period: '2019 — 2022', role: 'Senior Distributed Systems Engineer', company: 'Veridian Systems', desc: 'Designed multi-region Postgres replication and low-latency financial settlement engines.' }
  ],

  articles: [
    {
      id: 'art-01',
      title: 'Taming io_uring for WebScale Sockets: From Microseconds to Nanoseconds',
      date: 'Aug 14, 2026',
      readTime: '7 min read',
      tag: 'Kernel Engineering',
      snippet: 'Deep dive into zero-copy asynchronous I/O submission queues, kernel polling worker threads, and avoiding cache misses under high throughput.'
    },
    {
      id: 'art-02',
      title: 'Architecting Kinetic Design Systems with Pure CSS & Micro-State',
      date: 'May 28, 2026',
      readTime: '5 min read',
      tag: 'Frontend Architecture',
      snippet: 'Why separating state atoms from render trees allows 120fps fluid transitions without virtual DOM layout recalculation thrashing.'
    },
    {
      id: 'art-03',
      title: 'The Pragmatic Engineer’s Guide to Zero-Knowledge PLONK Verification',
      date: 'Jan 19, 2026',
      readTime: '9 min read',
      tag: 'Applied Cryptography',
      snippet: 'Demystifying polynomial commitments, grand products, and circuit evaluation with practical browser-side benchmarks.'
    }
  ],

  seoConfig: {
    pageTitle: 'Kairos Thorne — Principal Distributed Systems Architect',
    metaDescription: 'Portfolio of Kairos Thorne. High-throughput distributed infrastructure, zero-knowledge verification, and kinetic interface engineering.',
    ogImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    canonicalUrl: 'https://kairosthorne.dev',
    keywords: 'Distributed Systems, Rust, React, WebGPU, Architecture, High Throughput'
  },

  contactMessages: [],

  // Actions
  setActiveSection: (sec) => set({ activeSection: sec }),
  setSelectedProject: (proj) => set({ selectedProject: proj }),
  updateSeoConfig: (field, value) => set((state) => ({
    seoConfig: { ...state.seoConfig, [field]: value }
  })),
  sendContactMessage: (msg) => set((state) => ({
    contactMessages: [{ id: Date.now(), ...msg, timestamp: new Date().toLocaleString() }, ...state.contactMessages]
  }))
}));
