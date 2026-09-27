import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  Kanban,
  CheckSquare,
  Users,
  Clock,
  PlusCircle,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Tag,
  ShieldCheck,
  Sparkles,
  BarChart3,
  Flame
} from 'lucide-react';

function getPriorityBadge(priority) {
  switch (priority) {
    case 'Urgent':
      return 'bg-rose-100 text-rose-800 border-rose-200';
    case 'High':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Medium':
      return 'bg-sky-100 text-sky-800 border-sky-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
}

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedPriority,
    setSelectedPriority,
    columns,
    tasks,
    teamMembers,
    auditLog,
    moveTask,
    toggleSubtask,
    addTask
  } = useStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [newTaskDue, setNewTaskDue] = useState('Oct 15');

  const filteredTasks = tasks.filter(t =>
    selectedPriority === 'All' ? true : t.priority === selectedPriority
  );

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTask({
      title: newTaskTitle,
      priority: newTaskPriority,
      dueDate: newTaskDue
    });
    setNewTaskTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/20">
              <Kanban className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 leading-tight block">SprintFlow</span>
              <span className="text-[10px] text-indigo-700 font-mono font-semibold uppercase">
                AGILE KANBAN & WORKLOAD MATRIX
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View tabs */}
            <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab('kanban')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  activeTab === 'kanban' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Board
              </button>
              <button
                onClick={() => setActiveTab('workload')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  activeTab === 'workload' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Team Workload
              </button>
              <button
                onClick={() => setActiveTab('audit')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  activeTab === 'audit' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Activity Audit
              </button>
            </nav>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" /> New Task
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {/* KANBAN VIEW */}
        {activeTab === 'kanban' && (
          <div className="space-y-6">
            {/* Priority Filter */}
            <div className="flex items-center justify-between flex-wrap gap-4 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500">Filter Priority:</span>
                {['All', 'Urgent', 'High', 'Medium', 'Low'].map(p => (
                  <button
                    key={p}
                    onClick={() => setSelectedPriority(p)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                      selectedPriority === p
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <span className="text-xs font-mono text-slate-500">{filteredTasks.length} Active Work Items</span>
            </div>

            {/* Kanban Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
              {columns.map((col, colIdx) => {
                const colTasks = filteredTasks.filter(t => t.column === col);

                return (
                  <div key={col} className="bg-slate-100/80 border border-slate-200 rounded-2xl p-3.5 space-y-3 min-h-[500px]">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                      <span className="font-bold text-xs text-slate-900 uppercase font-mono tracking-wider">{col}</span>
                      <span className="w-5 h-5 rounded-full bg-white text-slate-700 text-[10px] font-mono font-bold flex items-center justify-center border border-slate-200">
                        {colTasks.length}
                      </span>
                    </div>

                    {/* Task Cards */}
                    <div className="space-y-3">
                      {colTasks.map(task => {
                        const completedSubs = task.subtasks.filter(s => s.completed).length;
                        const totalSubs = task.subtasks.length;
                        const percent = totalSubs > 0 ? (completedSubs / totalSubs) * 100 : 0;

                        return (
                          <div
                            key={task.id}
                            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3 hover:border-indigo-300 transition"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[10px] text-slate-400 font-bold">{task.id}</span>
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${getPriorityBadge(task.priority)}`}>
                                {task.priority}
                              </span>
                            </div>

                            <h4 className="font-bold text-xs text-slate-900 leading-snug">{task.title}</h4>

                            {/* Subtask progress */}
                            {totalSubs > 0 && (
                              <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                                  <span>Subtasks</span>
                                  <span>{completedSubs}/{totalSubs}</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${percent}%` }}></div>
                                </div>
                              </div>
                            )}

                            {/* Subtask checklist */}
                            <div className="space-y-1 pt-1 border-t border-slate-100">
                              {task.subtasks.map((st, sIdx) => (
                                <div
                                  key={sIdx}
                                  onClick={() => toggleSubtask(task.id, sIdx)}
                                  className="flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer hover:text-indigo-600"
                                >
                                  <input
                                    type="checkbox"
                                    checked={st.completed}
                                    onChange={() => {}}
                                    className="accent-indigo-600 rounded cursor-pointer"
                                  />
                                  <span className={st.completed ? 'line-through text-slate-400' : ''}>{st.text}</span>
                                </div>
                              ))}
                            </div>

                            {/* Assignee & Controls */}
                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <img src={task.assignee.avatar} alt={task.assignee.name} className="w-6 h-6 rounded-full object-cover border border-slate-200" />
                                <span className="text-[10px] font-mono text-slate-500">{task.dueDate}</span>
                              </div>

                              <div className="flex items-center gap-1">
                                {colIdx > 0 && (
                                  <button
                                    onClick={() => moveTask(task.id, columns[colIdx - 1])}
                                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700"
                                    title="Move left"
                                  >
                                    <ArrowLeft className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                {colIdx < columns.length - 1 && (
                                  <button
                                    onClick={() => moveTask(task.id, columns[colIdx + 1])}
                                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700"
                                    title="Move right"
                                  >
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TEAM WORKLOAD VIEW */}
        {activeTab === 'workload' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="font-bold text-xl text-slate-900">Engineering Capacity & Workload Allocation</h2>
              <p className="text-xs text-slate-500 font-mono">Real-time distribution of urgent vs standard sprint backlog items</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamMembers.map(member => {
                const assigned = tasks.filter(t => t.assignee.name === member.name);
                const urgentCount = assigned.filter(t => t.priority === 'Urgent').length;

                return (
                  <div key={member.name} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center gap-3">
                      <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500" />
                      <div>
                        <h3 className="font-bold text-sm text-slate-900">{member.name}</h3>
                        <span className="text-[11px] text-slate-500 font-mono">{member.role}</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Active Tasks</span>
                        <span className="font-bold text-indigo-700">{assigned.length} Tasks</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Urgent Criticals</span>
                        <span className="font-bold text-rose-600">{urgentCount} High-Priority</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ACTIVITY AUDIT LOG */}
        {activeTab === 'audit' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="font-bold text-xl text-slate-900">Sprint Activity Audit Trail</h2>
              <p className="text-xs text-slate-500 font-mono">Chronological transaction log of state changes & task creations</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              {auditLog.map(log => (
                <div key={log.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-mono">
                  <span className="text-slate-700">{log.text}</span>
                  <span className="text-slate-400">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* NEW TASK MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="font-bold text-base text-slate-900">Create Sprint Task</h3>
            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-slate-600 font-semibold">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Implement distributed WAL compaction worker"
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-600 font-semibold">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={e => setNewTaskPriority(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-600 font-semibold">Target Due Date</label>
                  <input
                    type="text"
                    value={newTaskDue}
                    onChange={e => setNewTaskDue(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-md"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 text-center text-xs font-mono text-slate-500">
        SPRINTFLOW • MULTI-LANE KANBAN MATRIX • TEAM WORKLOAD INTELLIGENCE
      </footer>
    </div>
  );
}
