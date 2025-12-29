
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Bot, 
  Zap, 
  Workflow, 
  Map, 
  BookOpen, 
  CheckCircle2, 
  Plus, 
  Minus, 
  Loader2,
  Cpu,
  Layers,
  Sparkles,
  Command,
  Layout,
  Target
} from 'lucide-react';
import { 
  IntelligenceAgent, 
  IntelligenceAutomation, 
  IntelligenceWorkflow, 
  IntelligenceJourney, 
  IntelligenceExample,
  IntelligenceItem
} from '../types';

// --- MOCK DATA GENERATORS ---
const generateAgents = (): IntelligenceAgent[] => [
  { id: 'a1', type: 'agent', name: 'The Researcher', role: 'Context Gathering', why: 'Continuous market analysis required.', produces: 'Weekly Competitor Briefs', confidence: 'High' },
  { id: 'a2', type: 'agent', name: 'The Scheduler', role: 'Ops Management', why: 'High volume of stakeholder meetings detected.', produces: 'Optimized Calendar', confidence: 'Medium' },
  { id: 'a3', type: 'agent', name: 'The QA Bot', role: 'Quality Assurance', why: 'Codebase complexity indicates risk of regression.', produces: 'Auto-Bug Reports', confidence: 'High' },
];

const generateAutomations = (): IntelligenceAutomation[] => [
  { id: 'au1', type: 'automation', trigger: 'New Lead in CRM', action: 'Enrich via Clearbit', outcome: 'Instant Sales Context', risk: 'Low' },
  { id: 'au2', type: 'automation', trigger: 'Invoice Overdue > 3 Days', action: 'Draft Reminder Email', outcome: 'Reduced Churn', risk: 'Medium' },
  { id: 'au3', type: 'automation', trigger: 'Deployment Success', action: 'Update Jira Tickets', outcome: 'Sync Engineering', risk: 'Low' },
];

const generateWorkflows = (): IntelligenceWorkflow[] => [
  { id: 'w1', type: 'workflow', name: 'Client Onboarding', stepCount: 5, outputs: 'Signed Contract, Slack, Email', whenToUse: 'New Deal Closed' },
  { id: 'w2', type: 'workflow', name: 'Incident Response', stepCount: 8, outputs: 'Status Page, RCA Draft', whenToUse: 'System Down Alert' },
];

const generateJourneys = (): IntelligenceJourney[] => [
  { id: 'j1', type: 'journey', actor: 'Admin User', steps: ['Login', 'Dashboard', 'View Reports', 'Export CSV'], value: 'Operational Visibility' },
  { id: 'j2', type: 'journey', actor: 'End Customer', steps: ['Landing Page', 'Sign Up', 'Onboarding Wizard', 'First Action'], value: 'Activation Rate' },
];

const generateExamples = (): IntelligenceExample[] => [
  { id: 'e1', type: 'example', scenario: 'FinTech MVP Launch', built: '3-Agent Swarm for KYC', outcome: 'Reduced manual review by 60%' },
  { id: 'e2', type: 'example', scenario: 'E-commerce Scaling', built: 'Inventory Auto-Reorder Workflow', outcome: 'Zero stockouts in Q4' },
];

const TabButton = ({ active, label, icon: Icon, onClick }: { active: boolean, label: string, icon: any, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all relative ${
      active 
        ? 'text-sun-900' 
        : 'text-sun-400 hover:text-sun-700 hover:bg-sun-50'
    }`}
  >
    <Icon size={16} className={active ? 'text-sun-accent' : 'text-current'} />
    {label}
    {active && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-sun-900"></div>}
  </button>
);

const ProjectIntelligence = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  
  const [activeTab, setActiveTab] = useState<'agents' | 'automations' | 'workflows' | 'journeys' | 'examples'>('agents');
  const [isLoading, setIsLoading] = useState(true);
  const [thinkingStep, setThinkingStep] = useState<string>('Initializing...');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  // Data State
  const [agents, setAgents] = useState<IntelligenceAgent[]>([]);
  const [automations, setAutomations] = useState<IntelligenceAutomation[]>([]);
  const [workflows, setWorkflows] = useState<IntelligenceWorkflow[]>([]);
  const [journeys, setJourneys] = useState<IntelligenceJourney[]>([]);
  const [examples, setExamples] = useState<IntelligenceExample[]>([]);

  useEffect(() => {
    let step = 0;
    const steps = [
      "Accessing Blueprint context...",
      "Analyzing integration constraints...",
      "Retrieving industry benchmarks...",
      "Synthesizing agent swarm architecture...",
      "Finalizing automation rules..."
    ];

    const thinkInterval = setInterval(() => {
      setThinkingStep(steps[step]);
      step++;
      if (step >= steps.length) clearInterval(thinkInterval);
    }, 400);

    const dataTimer = setTimeout(() => {
      setAgents(generateAgents());
      setAutomations(generateAutomations());
      setWorkflows(generateWorkflows());
      setJourneys(generateJourneys());
      setExamples(generateExamples());
      setIsLoading(false);
    }, 2500);

    return () => {
      clearTimeout(dataTimer);
      clearInterval(thinkInterval);
    };
  }, []);

  const toggleSelection = (id: string) => {
    const next = new Set(selectedItems);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedItems(next);
  };

  const handleConfirm = () => {
    const btn = document.getElementById('confirm-btn');
    if(btn) {
      btn.textContent = 'Saving Plan...';
      btn.setAttribute('disabled', 'true');
    }
    setTimeout(() => {
      navigate('/projects');
    }, 1000);
  };

  const getItemById = (id: string): IntelligenceItem | undefined => {
    return [...agents, ...automations, ...workflows, ...journeys, ...examples].find(i => i.id === id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-sun-50 flex-col gap-8 animate-in fade-in duration-500">
        <div className="relative">
          <div className="absolute inset-0 bg-sun-accent/10 blur-2xl rounded-full animate-pulse"></div>
          <Loader2 size={48} className="text-sun-900 animate-spin relative z-10" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl text-sun-900">Constructing Project Intelligence</h2>
          <div className="flex items-center gap-2 justify-center text-sm text-sun-500 font-mono bg-white px-4 py-2 rounded-full border border-sun-100 shadow-sm">
             <Cpu size={14} className="text-sun-accent" />
             <span className="animate-pulse">{thinkingStep}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white font-sans overflow-hidden">
      
      {/* PANEL 1: LEFT NAV */}
      <div className="w-64 border-r border-sun-200 bg-sun-50 flex flex-col p-6 flex-shrink-0 z-10">
        <button 
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 text-sun-500 hover:text-sun-900 transition-colors mb-8 text-sm font-medium"
        >
          <ArrowLeft size={16} /> Back to Projects
        </button>

        <div className="mb-10">
          <div className="w-10 h-10 bg-sun-900 rounded-lg flex items-center justify-center text-sun-accent mb-4 shadow-lg shadow-sun-900/20">
            <Sparkles size={20} />
          </div>
          <h1 className="font-serif text-2xl text-sun-900 leading-tight mb-2">Project Intelligence</h1>
          <p className="text-xs text-sun-500 leading-relaxed">
            AI-generated operational strategy based on your blueprint constraints.
          </p>
        </div>

        <div className="space-y-4 mt-auto">
           <div className="p-4 bg-white border border-sun-200 rounded-xl shadow-sm">
             <div className="flex items-center gap-2 mb-2">
               <Cpu size={14} className="text-sun-accent" />
               <span className="text-[10px] font-bold uppercase tracking-wider text-sun-500">Model Config</span>
             </div>
             <p className="text-sm font-medium text-sun-900">Gemini 3 Pro</p>
             <div className="mt-2 flex gap-1">
                <span className="text-[10px] bg-sun-50 px-2 py-1 rounded text-sun-600 border border-sun-100">Thinking: ON</span>
                <span className="text-[10px] bg-sun-50 px-2 py-1 rounded text-sun-600 border border-sun-100">Strict JSON</span>
             </div>
           </div>
        </div>
      </div>

      {/* PANEL 2: CENTER CANVAS */}
      <div className="flex-1 flex flex-col min-w-0 bg-white relative">
        
        {/* Header */}
        <div className="h-20 border-b border-sun-100 flex items-center px-8 gap-12 flex-shrink-0 bg-white z-10">
           <div>
             <span className="text-[10px] text-sun-400 uppercase tracking-wider block mb-0.5">Project Context</span>
             <span className="text-sm font-bold text-sun-900 flex items-center gap-2">
               <Command size={14} className="text-sun-400" />
               Alpha CRM Integration
             </span>
           </div>
           <div className="h-8 w-px bg-sun-100"></div>
           <div>
             <span className="text-[10px] text-sun-400 uppercase tracking-wider block mb-0.5">Primary Goal</span>
             <span className="text-sm font-medium text-sun-700">Increase Retention by 20%</span>
           </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-sun-200 px-8 flex gap-2 bg-white sticky top-0 z-10">
          <TabButton active={activeTab === 'agents'} label="Agents" icon={Bot} onClick={() => setActiveTab('agents')} />
          <TabButton active={activeTab === 'automations'} label="Automations" icon={Zap} onClick={() => setActiveTab('automations')} />
          <TabButton active={activeTab === 'workflows'} label="Workflows" icon={Workflow} onClick={() => setActiveTab('workflows')} />
          <TabButton active={activeTab === 'journeys'} label="Journeys" icon={Map} onClick={() => setActiveTab('journeys')} />
          <TabButton active={activeTab === 'examples'} label="Benchmarks" icon={BookOpen} onClick={() => setActiveTab('examples')} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-10 bg-sun-50/30">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'agents' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-8">
                  <h2 className="font-serif text-3xl text-sun-900 mb-2">Recommended Agent Swarm</h2>
                  <p className="text-sun-500 font-light">Autonomous agents suggested to handle ongoing operations.</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {agents.map(agent => (
                    <div key={agent.id} className={`group relative p-6 rounded-xl border transition-all duration-300 ${selectedItems.has(agent.id) ? 'bg-sun-900 border-sun-900 text-white shadow-xl' : 'bg-white border-sun-200 hover:border-sun-300 hover:shadow-md'}`}>
                      <div className="flex justify-between items-start">
                        <div className="flex gap-5">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${selectedItems.has(agent.id) ? 'bg-white/10 text-sun-accent' : 'bg-sun-50 text-sun-600 group-hover:bg-sun-100'}`}>
                            <Bot size={24} />
                          </div>
                          <div>
                             <h3 className={`text-lg font-serif font-medium mb-1 ${selectedItems.has(agent.id) ? 'text-white' : 'text-sun-900'}`}>{agent.name}</h3>
                             <p className={`text-xs uppercase tracking-wider font-semibold mb-3 ${selectedItems.has(agent.id) ? 'text-sun-300' : 'text-sun-400'}`}>{agent.role}</p>
                             <div className="space-y-1">
                                <p className={`text-sm ${selectedItems.has(agent.id) ? 'text-sun-200' : 'text-sun-600'}`}><span className="opacity-70">Why:</span> {agent.why}</p>
                                <p className={`text-sm ${selectedItems.has(agent.id) ? 'text-sun-200' : 'text-sun-600'}`}><span className="opacity-70">Output:</span> {agent.produces}</p>
                             </div>
                          </div>
                        </div>
                        <button 
                           onClick={() => toggleSelection(agent.id)}
                           className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                             selectedItems.has(agent.id) ? 'bg-white text-sun-900' : 'bg-sun-50 text-sun-900 hover:bg-sun-900 hover:text-white'
                           }`}
                         >
                           {selectedItems.has(agent.id) ? 'Selected' : 'Add to Plan'}
                         </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'automations' && (
               <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="mb-8">
                   <h2 className="font-serif text-3xl text-sun-900 mb-2">System Automations</h2>
                   <p className="text-sun-500 font-light">Event-driven triggers to reduce manual overhead.</p>
                 </div>
                 <div className="grid grid-cols-1 gap-4">
                   {automations.map(auto => (
                     <div key={auto.id} className={`p-6 rounded-xl border transition-all ${selectedItems.has(auto.id) ? 'bg-sun-50 border-sun-900 shadow-inner' : 'bg-white border-sun-200 hover:border-sun-300'}`}>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <div className="flex items-center gap-3 text-sm font-medium text-sun-900">
                                 <span className="px-3 py-1.5 bg-white border border-sun-200 rounded shadow-sm">{auto.trigger}</span>
                                 <Zap size={14} className="text-sun-400" />
                                 <span className="px-3 py-1.5 bg-white border border-sun-200 rounded shadow-sm">{auto.action}</span>
                              </div>
                           </div>
                           <div className="flex items-center gap-8">
                              <div className="text-right">
                                 <p className="text-[10px] font-bold text-sun-400 uppercase tracking-wider">Outcome</p>
                                 <p className="text-sm text-sun-700">{auto.outcome}</p>
                              </div>
                              <button 
                                 onClick={() => toggleSelection(auto.id)}
                                 className={`w-28 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                                   selectedItems.has(auto.id) ? 'bg-sun-900 text-white' : 'border border-sun-200 text-sun-600 hover:border-sun-900 hover:text-sun-900'
                                 }`}
                               >
                                 {selectedItems.has(auto.id) ? 'Enabled' : 'Enable'}
                               </button>
                           </div>
                        </div>
                     </div>
                   ))}
                 </div>
               </div>
            )}

            {/* Other tabs follow similar pattern but condensed for brevity */}
            {activeTab === 'workflows' && (
               <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="mb-8">
                   <h2 className="font-serif text-3xl text-sun-900 mb-2">Operational Workflows</h2>
                   <p className="text-sun-500 font-light">Standard Operating Procedures (SOPs) for key processes.</p>
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    {workflows.map(wf => (
                      <div key={wf.id} className={`p-6 rounded-xl border transition-all flex flex-col justify-between h-48 ${selectedItems.has(wf.id) ? 'bg-sun-900 text-white border-sun-900' : 'bg-white border-sun-200 hover:border-sun-300'}`}>
                         <div>
                            <div className="flex justify-between items-start mb-4">
                               <Layout size={24} className={selectedItems.has(wf.id) ? 'text-sun-accent' : 'text-sun-300'} />
                               <span className={`text-[10px] uppercase tracking-wider font-bold ${selectedItems.has(wf.id) ? 'text-sun-400' : 'text-sun-400'}`}>{wf.stepCount} Steps</span>
                            </div>
                            <h3 className="font-serif text-xl mb-1">{wf.name}</h3>
                            <p className={`text-xs ${selectedItems.has(wf.id) ? 'text-sun-300' : 'text-sun-500'}`}>{wf.outputs}</p>
                         </div>
                         <button 
                           onClick={() => toggleSelection(wf.id)}
                           className={`w-full py-2 rounded-lg text-xs font-bold uppercase tracking-wider mt-4 ${
                             selectedItems.has(wf.id) ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-sun-50 text-sun-900 hover:bg-sun-100'
                           }`}
                         >
                           {selectedItems.has(wf.id) ? 'Selected' : 'Select Workflow'}
                         </button>
                      </div>
                    ))}
                 </div>
               </div>
            )}
            
            {activeTab === 'journeys' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-8">
                  <h2 className="font-serif text-3xl text-sun-900 mb-2">User Journeys</h2>
                  <p className="text-sun-500 font-light">Read-only critical paths generated from your blueprint.</p>
                </div>
                {journeys.map(j => (
                   <div key={j.id} className="p-8 bg-white border border-sun-200 rounded-xl">
                      <div className="flex items-center gap-3 mb-6">
                         <span className="px-3 py-1 bg-sun-900 text-white text-xs font-bold rounded uppercase tracking-wider">{j.actor}</span>
                         <span className="text-sun-400 text-sm">/</span>
                         <span className="text-sm font-medium text-sun-900">Primary Flow</span>
                      </div>
                      <div className="flex items-center gap-4 relative">
                         {/* Connector Line */}
                         <div className="absolute top-1/2 left-0 w-full h-px bg-sun-200 -z-10"></div>
                         
                         {j.steps.map((step, idx) => (
                            <div key={idx} className="flex-1 bg-white border border-sun-200 p-3 rounded-lg text-center shadow-sm">
                               <span className="text-xs font-semibold text-sun-700">{step}</span>
                            </div>
                         ))}
                      </div>
                   </div>
                ))}
              </div>
            )}

            {activeTab === 'examples' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="mb-8">
                  <h2 className="font-serif text-3xl text-sun-900 mb-2">Industry Benchmarks</h2>
                  <p className="text-sun-500 font-light">Real-world performance data grounded in Google Search.</p>
                </div>
                {examples.map(ex => (
                   <div key={ex.id} className="flex items-center justify-between p-6 bg-white border border-sun-200 rounded-xl">
                      <div>
                         <h3 className="font-serif text-lg text-sun-900">{ex.scenario}</h3>
                         <p className="text-sm text-sun-500 mt-1">Implemented: {ex.built}</p>
                      </div>
                      <div className="text-right">
                         <div className="text-[10px] text-sun-400 uppercase tracking-wider mb-1">Result</div>
                         <div className="inline-block px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded text-sm font-medium">
                            {ex.outcome}
                         </div>
                      </div>
                   </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PANEL 3: RIGHT SIDEBAR */}
      <div className="w-80 border-l border-sun-200 bg-white flex flex-col flex-shrink-0 z-20 shadow-[0_0_40px_-10px_rgba(0,0,0,0.05)]">
         
         {/* Zone A: Context */}
         <div className="p-8 border-b border-sun-100">
            <h3 className="text-xs font-bold text-sun-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Layers size={14} /> Blueprint Snapshot
            </h3>
            
            <div className="space-y-5">
               <div>
                  <div className="text-[10px] text-sun-400 font-semibold mb-1">Platform Intent</div>
                  <div className="flex flex-wrap gap-2">
                     <span className="px-2 py-1 bg-sun-50 text-sun-700 text-xs rounded border border-sun-100">SaaS Platform</span>
                     <span className="px-2 py-1 bg-sun-50 text-sun-700 text-xs rounded border border-sun-100">Web</span>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] text-sun-400 font-semibold mb-1">Budget</div>
                    <div className="text-sm font-serif text-sun-900">$50,000</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-sun-400 font-semibold mb-1">Deadline</div>
                    <div className="text-sm font-serif text-sun-900">Oct 24</div>
                  </div>
               </div>
            </div>
         </div>

         {/* Zone B: Actions */}
         <div className="flex-1 flex flex-col bg-sun-50/30">
            <div className="p-6 border-b border-sun-200/50">
               <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-sun-900 uppercase tracking-widest">Execution Plan</span>
                  <span className="text-xs font-medium text-sun-500">{selectedItems.size} Selected</span>
               </div>
               <div className="w-full bg-sun-200 h-1 rounded-full overflow-hidden">
                  <div className="h-full bg-sun-900 transition-all duration-300" style={{ width: `${Math.min((selectedItems.size / 5) * 100, 100)}%` }}></div>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {selectedItems.size === 0 ? (
                   <div className="text-center py-12 opacity-40">
                      <Target size={32} className="mx-auto text-sun-300 mb-3" />
                      <p className="text-xs text-sun-500 font-medium leading-relaxed px-4">
                        Select Agents, Automations, or Workflows from the center panel to build your plan.
                      </p>
                   </div>
                ) : (
                   Array.from(selectedItems).map(id => {
                     const item = getItemById(id);
                     if (!item) return null;
                     return (
                        <div key={id} className="p-3 bg-white border border-sun-200 rounded-lg flex justify-between items-center shadow-sm animate-in slide-in-from-right-4 duration-300">
                           <div className="min-w-0 pr-3">
                              <span className="text-[10px] font-bold text-sun-400 uppercase block mb-0.5">{item.type}</span>
                              <span className="text-sm font-medium text-sun-900 truncate block">
                                 {'name' in item ? item.name : (item as IntelligenceAutomation).trigger}
                              </span>
                           </div>
                           <button onClick={() => toggleSelection(id)} className="text-sun-300 hover:text-red-500 transition-colors p-1">
                              <Minus size={14} />
                           </button>
                        </div>
                     );
                   })
                )}
            </div>

            <div className="p-8 border-t border-sun-200 bg-white">
                <button 
                  id="confirm-btn"
                  onClick={handleConfirm}
                  disabled={selectedItems.size === 0}
                  className="w-full py-4 bg-sun-900 text-white rounded-xl text-sm font-medium hover:bg-sun-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-sun-900/10 active:scale-[0.98]"
                >
                  <CheckCircle2 size={16} />
                  Confirm & Execute
                </button>
                <div className="mt-4 text-center">
                   <button 
                     onClick={() => setSelectedItems(new Set())}
                     disabled={selectedItems.size === 0}
                     className="text-xs text-sun-400 hover:text-sun-900 transition-colors disabled:opacity-0"
                   >
                     Clear Selection
                   </button>
                </div>
            </div>
         </div>

      </div>
    </div>
  );
};

export default ProjectIntelligence;
