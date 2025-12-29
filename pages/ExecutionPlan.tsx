
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Bot, 
  Zap, 
  LayoutList, 
  Calendar, 
  Activity, 
  Terminal,
  MoreHorizontal
} from 'lucide-react';
import { ExecutionPlan as IExecutionPlan, ExecutionStatus } from '../types';

// --- MOCK DATA ---
const MOCK_PLAN: IExecutionPlan = {
  id: 'exec-v1',
  projectId: 'p1',
  version: 1,
  status: 'draft',
  startDate: new Date().toISOString().split('T')[0],
  owner: 'Jordan Lee',
  riskLevel: 'Low',
  tasks: [
    { id: 't1', title: 'Initialize Repository', status: 'done', assignedTo: 'Ops Agent', dueDate: 'Today', dependency: '' },
    { id: 't2', title: 'Draft Marketing Copy', status: 'in-progress', assignedTo: 'Comms Agent', dueDate: 'Tomorrow', dependency: 't1' },
    { id: 't3', title: 'Configure Stripe', status: 'pending', assignedTo: 'Dev Agent', dueDate: 'Oct 28', dependency: 't1' },
    { id: 't4', title: 'Client Review', status: 'blocked', assignedTo: 'Human', dueDate: 'Oct 30', dependency: 't2' },
  ],
  agents: [
    { id: 'a1', name: 'The Orchestrator', role: 'Coordination', status: 'idle' },
    { id: 'a2', name: 'The Comms Lead', role: 'Content Gen', status: 'idle' },
    { id: 'a3', name: 'The Ops Lead', role: 'Infrastructure', status: 'idle' },
  ],
  automations: [
    { id: 'au1', name: 'Auto-Assign Reviewers', trigger: 'PR Created', status: 'enabled' },
    { id: 'au2', name: 'Nudge Client', trigger: 'Review > 2 Days', status: 'disabled' },
  ]
};

// --- COMPONENTS ---

const StatusBadge = ({ status }: { status: ExecutionStatus }) => {
  const styles = {
    draft: 'bg-sun-100 text-sun-600 border-sun-200',
    active: 'bg-green-100 text-green-700 border-green-200 animate-pulse',
    paused: 'bg-orange-100 text-orange-700 border-orange-200',
    completed: 'bg-sun-900 text-white border-sun-900',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${styles[status]}`}>
      {status}
    </span>
  );
};

const TaskCard = ({ task }: { task: IExecutionPlan['tasks'][0] }) => (
  <div className="p-4 bg-white border border-sun-200 rounded-lg flex items-center justify-between hover:border-sun-300 transition-colors">
    <div className="flex items-center gap-4">
       <div className={`p-2 rounded-full ${
          task.status === 'done' ? 'bg-green-100 text-green-600' :
          task.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
          task.status === 'blocked' ? 'bg-red-100 text-red-600' : 'bg-sun-50 text-sun-400'
       }`}>
          {task.status === 'done' ? <CheckCircle2 size={16} /> : 
           task.status === 'in-progress' ? <Activity size={16} className="animate-pulse" /> :
           task.status === 'blocked' ? <ShieldAlert size={16} /> : <Clock size={16} />}
       </div>
       <div>
          <h4 className="text-sm font-medium text-sun-900">{task.title}</h4>
          <div className="flex items-center gap-3 text-xs text-sun-500 mt-1">
             <span className="flex items-center gap-1"><Bot size={12} /> {task.assignedTo}</span>
             {task.dependency && <span className="text-sun-400">Depends on {task.dependency}</span>}
          </div>
       </div>
    </div>
    <div className="text-right">
       <span className="text-xs font-medium text-sun-900 block">{task.dueDate}</span>
       <span className={`text-[10px] uppercase font-bold tracking-wider ${
          task.status === 'blocked' ? 'text-red-500' : 'text-sun-400'
       }`}>{task.status}</span>
    </div>
  </div>
);

const AgentCard = ({ agent }: { agent: IExecutionPlan['agents'][0] }) => {
  const isRunning = agent.status === 'running';
  
  return (
    <div className="p-5 bg-white border border-sun-200 rounded-xl relative overflow-hidden transition-all hover:shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isRunning ? 'bg-sun-900 text-white' : 'bg-sun-100 text-sun-400'}`}>
            <Bot size={20} />
          </div>
          <div>
            <h4 className="font-serif text-lg text-sun-900">{agent.name}</h4>
            <p className="text-xs text-sun-500">{agent.role}</p>
          </div>
        </div>
        <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
          isRunning ? 'bg-green-50 text-green-700 border-green-100' : 'bg-sun-50 text-sun-400 border-sun-100'
        }`}>
          {agent.status}
        </div>
      </div>
      
      {isRunning && (
        <div className="mt-4 p-2 bg-sun-50 rounded border border-sun-100">
            <div className="flex items-center gap-2 text-xs font-mono text-sun-600">
              <Activity size={12} className="text-green-500 animate-pulse" />
              <span>Processing event stream...</span>
            </div>
        </div>
      )}
    </div>
  );
};

const ExecutionPlan = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  
  const [plan, setPlan] = useState<IExecutionPlan>(MOCK_PLAN);
  const [activeTab, setActiveTab] = useState<'tasks' | 'agents' | 'automations' | 'timeline'>('tasks');
  const [logs, setLogs] = useState<{time: string, msg: string}[]>([]);

  // Simulation Logic
  useEffect(() => {
    if (plan.status === 'active') {
      const interval = setInterval(() => {
        const actions = [
          "Orchestrator checking dependencies...",
          "Comms Agent generating draft...",
          "Ops Agent verifying API status...",
          "Controller validating output schema...",
          "Planner re-evaluating critical path..."
        ];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        const newLog = { 
          time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' }), 
          msg: randomAction 
        };
        setLogs(prev => [newLog, ...prev].slice(0, 10)); // Keep last 10 logs
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [plan.status]);

  const togglePlanStatus = () => {
    const timestamp = new Date().toLocaleTimeString();
    
    if (plan.status === 'active') {
      // Pause Plan
      setPlan(p => ({ 
        ...p, 
        status: 'paused',
        // Set agents to idle when paused
        agents: p.agents.map(a => ({ ...a, status: 'idle' })) 
      }));
      setLogs(prev => [{ time: timestamp, msg: "Plan Paused by User. Agents suspending..." }, ...prev]);
    } else {
      // Activate Plan
      setPlan(p => ({ 
        ...p, 
        status: 'active',
        // Set agents to running when active
        agents: p.agents.map(a => ({ ...a, status: 'running' }))
      }));
      setLogs(prev => [{ time: timestamp, msg: "Plan Activated. Initializing Agent Swarm..." }, ...prev]);
    }
  };

  return (
    <div className="flex h-screen bg-white font-sans overflow-hidden">
      
      {/* PANEL 1: LEFT NAV */}
      <div className="w-64 border-r border-sun-200 bg-sun-50 flex flex-col p-6 flex-shrink-0 z-10">
        <button 
          onClick={() => navigate(`/projects/${projectId}/intelligence`)}
          className="flex items-center gap-2 text-sun-500 hover:text-sun-900 transition-colors mb-8 text-sm font-medium"
        >
          <ArrowLeft size={16} /> Back to Intelligence
        </button>

        <div className="mb-8">
          <h1 className="font-serif text-2xl text-sun-900 leading-tight mb-2">Execution Plan</h1>
          <p className="text-xs text-sun-500 mb-4">Version 1.0 • {plan.owner}</p>
          <StatusBadge status={plan.status} />
        </div>

        <div className="space-y-6 mt-6">
           <div>
              <div className="text-[10px] text-sun-400 uppercase tracking-wider font-bold mb-2">Risk Level</div>
              <div className="flex items-center gap-2 text-sm font-medium text-green-700 bg-green-50 px-3 py-2 rounded-lg border border-green-100">
                 <ShieldAlert size={16} /> {plan.riskLevel}
              </div>
           </div>
           
           <div>
              <div className="text-[10px] text-sun-400 uppercase tracking-wider font-bold mb-2">Version History</div>
              <div className="space-y-1">
                 <div className="text-sm text-sun-900 font-medium px-2 py-1 bg-white border border-sun-200 rounded">v1.0 (Current)</div>
                 <div className="text-sm text-sun-400 px-2 py-1">v0.9 (Draft)</div>
              </div>
           </div>
        </div>
      </div>

      {/* PANEL 2: CENTER CANVAS */}
      <div className="flex-1 flex flex-col min-w-0 bg-white relative">
        
        {/* Header Strip */}
        <div className="h-16 border-b border-sun-100 flex items-center justify-between px-8 bg-white z-10">
           <div className="flex items-center gap-2 text-sm text-sun-500">
              <span className="font-medium text-sun-900">Project Alpha</span>
              <span>/</span>
              <span>Execution</span>
           </div>
           <div className="text-xs text-sun-400 font-mono">ID: {plan.id}</div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-sun-200 px-8 flex gap-6 bg-sun-50/30">
           {[
             { id: 'tasks', label: 'Tasks', icon: LayoutList },
             { id: 'agents', label: 'Agents', icon: Bot },
             { id: 'automations', label: 'Automations', icon: Zap },
             { id: 'timeline', label: 'Timeline', icon: Calendar },
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-colors ${
                 activeTab === tab.id 
                   ? 'border-sun-900 text-sun-900' 
                   : 'border-transparent text-sun-500 hover:text-sun-800'
               }`}
             >
               <tab.icon size={16} /> {tab.label}
             </button>
           ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-sun-50/10">
           <div className="max-w-4xl mx-auto space-y-6">
              
              {activeTab === 'tasks' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-3">
                   {plan.tasks.map(task => <TaskCard key={task.id} task={task} />)}
                </div>
              )}

              {activeTab === 'agents' && (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                   {plan.agents.map(agent => (
                     <AgentCard key={agent.id} agent={agent} />
                   ))}
                </div>
              )}

              {activeTab === 'automations' && (
                 <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {plan.automations.map(auto => (
                       <div key={auto.id} className="p-4 bg-white border border-sun-200 rounded-lg flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="p-2 bg-sun-50 rounded text-sun-500"><Zap size={16} /></div>
                             <div>
                                <h4 className="text-sm font-medium text-sun-900">{auto.name}</h4>
                                <p className="text-xs text-sun-500">Trigger: {auto.trigger}</p>
                             </div>
                          </div>
                          <div className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded ${
                             auto.status === 'enabled' ? 'bg-green-50 text-green-700' : 'bg-sun-50 text-sun-400'
                          }`}>
                             {auto.status}
                          </div>
                       </div>
                    ))}
                 </div>
              )}

              {activeTab === 'timeline' && (
                 <div className="p-12 text-center text-sun-400 bg-white border border-sun-200 border-dashed rounded-xl animate-in fade-in">
                    <Calendar size={32} className="mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Gantt Visualization Placeholder</p>
                    <p className="text-xs mt-1">Gemini 3 Pro calculates critical paths here.</p>
                 </div>
              )}
           </div>
        </div>
      </div>

      {/* PANEL 3: CONTROL CENTER */}
      <div className="w-80 border-l border-sun-200 bg-white flex flex-col flex-shrink-0 z-20 shadow-[-10px_0_40px_-10px_rgba(0,0,0,0.05)]">
        
        {/* Sticky Actions */}
        <div className="p-8 border-b border-sun-100 bg-white">
           <h3 className="text-xs font-bold text-sun-400 uppercase tracking-widest mb-4">Control Actions</h3>
           
           <button 
             onClick={togglePlanStatus}
             className={`w-full py-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] ${
               plan.status === 'active' 
                 ? 'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100' 
                 : 'bg-sun-900 text-white hover:bg-sun-800 shadow-sun-900/10'
             }`}
           >
             {plan.status === 'active' ? (
                <><Pause size={18} /> Pause Execution</>
             ) : (
                <><Play size={18} /> Activate Plan</>
             )}
           </button>
           
           <div className="mt-4 flex gap-2">
              <button className="flex-1 py-2 border border-sun-200 rounded-lg text-xs font-medium text-sun-600 hover:bg-sun-50 flex items-center justify-center gap-2">
                 <RotateCcw size={14} /> Rollback
              </button>
              <button className="flex-1 py-2 border border-sun-200 rounded-lg text-xs font-medium text-sun-600 hover:bg-sun-50 flex items-center justify-center gap-2">
                 <MoreHorizontal size={14} /> More
              </button>
           </div>
           
           <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100 flex items-start gap-2">
              <ShieldAlert size={14} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-red-600 leading-relaxed">
                 <span className="font-bold">Warning:</span> Activation triggers live agents. Actions affect production systems.
              </p>
           </div>
        </div>

        {/* Live Audit Log */}
        <div className="flex-1 flex flex-col bg-sun-900 text-sun-300 font-mono text-xs overflow-hidden">
           <div className="p-4 border-b border-sun-800 bg-sun-950 flex items-center gap-2">
              <Terminal size={14} className="text-sun-accent" />
              <span className="uppercase tracking-wider font-bold text-[10px]">Live Audit Log</span>
              {plan.status === 'active' && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse ml-auto"></span>}
           </div>
           <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {logs.length === 0 && <span className="opacity-30 italic">System Idle...</span>}
              {logs.map((log, i) => (
                 <div key={i} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                    <span className="text-sun-600 shrink-0">[{log.time}]</span>
                    <span className="text-sun-100">{log.msg}</span>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutionPlan;
