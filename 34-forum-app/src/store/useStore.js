import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeBoard: 'All Topics',
  sortBy: 'hot', // 'hot' | 'top' | 'new'
  searchQuery: '',
  selectedThreadId: null,

  currentUser: {
    name: 'Devon Vance',
    handle: '@dvance_eng',
    reputation: 3420,
    badge: 'Staff Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },

  boards: [
    { id: 'all', name: 'All Topics', count: 128 },
    { id: 'dist', name: 'Distributed Systems', count: 42 },
    { id: 'kernel', name: 'Kernel & Rust', count: 31 },
    { id: 'ui', name: 'Frontend Architecture', count: 35 },
    { id: 'crypto', name: 'AI & Cryptography', count: 20 }
  ],

  threads: [
    {
      id: 'thr-101',
      title: 'Comparing io_uring vs Epoll in High-Throughput WebSocket Broadcast Meshes',
      board: 'Kernel & Rust',
      author: {
        name: 'Elena Vance',
        handle: '@elena_kernel',
        badge: 'Core Contributor',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
      },
      time: '2 hours ago',
      score: 142,
      userVote: 1,
      isPinned: true,
      isLocked: false,
      views: 1890,
      content: 'We benchmarked io_uring fixed buffers against traditional non-blocking epoll for fan-out messaging exceeding 2M concurrent TCP sockets. P99 latency dropped from 14.2ms to 380μs when removing context-switch overhead.',
      replies: [
        {
          id: 'rep-01',
          author: {
            name: 'Marcus Sterling',
            handle: '@msterling',
            badge: 'Systems Veteran',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
          },
          time: '1 hour ago',
          score: 38,
          content: 'Did you hit any SQPOLL thread contention limits when scaling beyond 32 NUMA nodes on Linux 6.8 kernels?',
          replies: [
            {
              id: 'rep-01-1',
              author: {
                name: 'Elena Vance',
                handle: '@elena_kernel',
                badge: 'Core Contributor',
                avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
              },
              time: '45 mins ago',
              score: 19,
              content: 'Yes! Pinning SQPOLL ring threads to isolated cores via CPU affinity masks was mandatory to prevent cross-NUMA bus saturation.',
              replies: []
            }
          ]
        },
        {
          id: 'rep-02',
          author: {
            name: 'Sarah Chen',
            handle: '@schen_dist',
            badge: 'Member',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
          },
          time: '30 mins ago',
          score: 12,
          content: 'Great writeup. Would love to see the Raft heartbeat synchronization metrics under simulated packet drops.',
          replies: []
        }
      ]
    },
    {
      id: 'thr-102',
      title: 'State Architecture in React 18: Why Micro-Stores Beat Mega-Contexts',
      board: 'Frontend Architecture',
      author: {
        name: 'Liam Zhang',
        handle: '@liamz_ui',
        badge: 'UI Specialist',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
      },
      time: '4 hours ago',
      score: 98,
      userVote: 0,
      isPinned: false,
      isLocked: false,
      views: 1240,
      content: 'Mega Context providers force whole-tree reconciliation whenever an isolated atom changes. Moving to fine-grained subscription selectors (Zustand/Jotai) preserves 120 FPS kinetic physics without layout thrashing.',
      replies: [
        {
          id: 'rep-03',
          author: {
            name: 'Devon Vance (You)',
            handle: '@dvance_eng',
            badge: 'Staff Architect',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
          },
          time: '3 hours ago',
          score: 24,
          content: 'Completely agree. Combining transient subscriber refs for canvas/WebGPU visualizers with selective UI state eliminates 95% of render cycles.',
          replies: []
        }
      ]
    },
    {
      id: 'thr-103',
      title: 'Practical Zero-Knowledge Rollup Settlement on L1: Gas Optimization Analysis',
      board: 'AI & Cryptography',
      author: {
        name: 'Dr. Arthur Sterling',
        handle: '@asterling_zk',
        badge: 'Cryptographer',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
      },
      time: '6 hours ago',
      score: 84,
      userVote: 0,
      isPinned: false,
      isLocked: false,
      views: 940,
      content: 'Detailed cost breakdown of Groth16 pairing checks vs Halo2 PLONK recursive aggregation on EVM smart contracts.',
      replies: []
    }
  ],

  // Actions
  setActiveBoard: (board) => set({ activeBoard: board, selectedThreadId: null }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedThreadId: (id) => set({ selectedThreadId: id }),

  // Vote on thread
  voteThread: (threadId, direction) => set((state) => ({
    threads: state.threads.map(t => {
      if (t.id === threadId) {
        const currentVote = t.userVote;
        let newVote = direction;
        let scoreDiff = direction;
        if (currentVote === direction) {
          newVote = 0;
          scoreDiff = -direction;
        } else if (currentVote !== 0) {
          scoreDiff = direction * 2;
        }
        return { ...t, userVote: newVote, score: t.score + scoreDiff };
      }
      return t;
    })
  })),

  // Toggle Pin
  togglePin: (threadId) => set((state) => ({
    threads: state.threads.map(t =>
      t.id === threadId ? { ...t, isPinned: !t.isPinned } : t
    )
  })),

  // Toggle Lock
  toggleLock: (threadId) => set((state) => ({
    threads: state.threads.map(t =>
      t.id === threadId ? { ...t, isLocked: !t.isLocked } : t
    )
  })),

  // Add new thread
  createThread: (threadData) => set((state) => {
    const newThread = {
      id: `thr-${Date.now()}`,
      title: threadData.title,
      board: threadData.board || 'Distributed Systems',
      author: state.currentUser,
      time: 'Just now',
      score: 1,
      userVote: 1,
      isPinned: false,
      isLocked: false,
      views: 1,
      content: threadData.content,
      replies: []
    };
    return {
      threads: [newThread, ...state.threads],
      selectedThreadId: newThread.id
    };
  }),

  // Add reply to thread
  addReply: (threadId, text) => set((state) => {
    const newReply = {
      id: `rep-${Date.now()}`,
      author: state.currentUser,
      time: 'Just now',
      score: 1,
      content: text,
      replies: []
    };

    return {
      threads: state.threads.map(t => {
        if (t.id === threadId) {
          return {
            ...t,
            replies: [...t.replies, newReply]
          };
        }
        return t;
      })
    };
  })
}));
