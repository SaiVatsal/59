import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'kanban', // 'kanban' | 'workload' | 'audit'
  selectedPriority: 'All',

  columns: ['Backlog', 'To Do', 'In Progress', 'In Review', 'Done'],

  teamMembers: [
    { name: 'Alex Rivera', role: 'Staff Backend Lead', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
    { name: 'Marcus Chen', role: 'Distributed Systems Eng', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
    { name: 'Elena Rostova', role: 'Principal UI Architect', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' }
  ],

  tasks: [
    {
      id: 'TASK-101',
      title: 'Implement zero-copy io_uring buffer pools in Rust socket mesh',
      column: 'In Progress',
      priority: 'Urgent',
      assignee: { name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      dueDate: 'Tomorrow',
      tags: ['Kernel', 'Rust', 'Performance'],
      subtasks: [
        { text: 'Allocate fixed mmap memory rings', completed: true },
        { text: 'Benchmark SQPOLL context switches', completed: true },
        { text: 'Handle kernel error buffer overflows', completed: false }
      ]
    },
    {
      id: 'TASK-102',
      title: 'Formal verification of Raft leader election partition tolerance',
      column: 'In Review',
      priority: 'High',
      assignee: { name: 'Marcus Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      dueDate: 'Oct 02',
      tags: ['Consensus', 'Formal Proofs'],
      subtasks: [
        { text: 'Simulate 5-node asymmetric network split', completed: true },
        { text: 'Verify monotonic log term invariants', completed: true }
      ]
    },
    {
      id: 'TASK-103',
      title: 'WebGPU vector oscilloscope shaders for audio visualizer',
      column: 'To Do',
      priority: 'Medium',
      assignee: { name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
      dueDate: 'Oct 05',
      tags: ['Frontend', 'WebGPU', 'DSP'],
      subtasks: [
        { text: 'Write WGSL compute shader for FFT bins', completed: false },
        { text: 'Render bloom glow pass at 120 FPS', completed: false }
      ]
    },
    {
      id: 'TASK-104',
      title: 'Automate Kubernetes multi-region failover smoke tests',
      column: 'Backlog',
      priority: 'Low',
      assignee: { name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      dueDate: 'Oct 12',
      tags: ['DevOps', 'CI/CD'],
      subtasks: [
        { text: 'Script DNS latency healthchecks', completed: false }
      ]
    }
  ],

  auditLog: [
    { id: 'log-1', text: 'Alex Rivera moved TASK-101 to In Progress', time: '10 mins ago' },
    { id: 'log-2', text: 'Marcus Chen completed subtask on TASK-102', time: '1 hour ago' }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedPriority: (p) => set({ selectedPriority: p }),

  moveTask: (taskId, targetColumn) => set((state) => {
    const task = state.tasks.find(t => t.id === taskId);
    if (!task) return state;

    const newLog = {
      id: `log-${Date.now()}`,
      text: `Moved ${taskId} from "${task.column}" to "${targetColumn}"`,
      time: 'Just now'
    };

    return {
      tasks: state.tasks.map(t => t.id === taskId ? { ...t, column: targetColumn } : t),
      auditLog: [newLog, ...state.auditLog]
    };
  }),

  toggleSubtask: (taskId, subtaskIdx) => set((state) => ({
    tasks: state.tasks.map(t => {
      if (t.id === taskId) {
        const updatedSubs = t.subtasks.map((s, idx) =>
          idx === subtaskIdx ? { ...s, completed: !s.completed } : s
        );
        return { ...t, subtasks: updatedSubs };
      }
      return t;
    })
  })),

  addTask: (taskData) => set((state) => {
    const newTask = {
      id: `TASK-${Math.floor(105 + Math.random() * 90)}`,
      title: taskData.title,
      column: 'Backlog',
      priority: taskData.priority || 'Medium',
      assignee: state.teamMembers[0],
      dueDate: taskData.dueDate || 'Next Sprint',
      tags: taskData.tags || ['Feature'],
      subtasks: [
        { text: 'Initial technical spike & RFC', completed: false },
        { text: 'Core implementation & tests', completed: false }
      ]
    };
    const newLog = {
      id: `log-${Date.now()}`,
      text: `Created new task ${newTask.id}: "${newTask.title}"`,
      time: 'Just now'
    };
    return {
      tasks: [newTask, ...state.tasks],
      auditLog: [newLog, ...state.auditLog]
    };
  })
}));
