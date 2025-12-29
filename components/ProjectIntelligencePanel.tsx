import React, { useState, useEffect } from 'react';
import { 
  Folder, 
  AlertTriangle, 
  TrendingDown, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Loader2,
  Calendar,
  Layers,
  Clock,
  User,
  Upload,
  Link as LinkIcon
} from 'lucide-react';
import { Project, ProjectPlan } from '../types';

interface ProjectIntelligencePanelProps {
  project: Project | null;
  plannerState?: 'idle' | 'generating' | 'review';
  generatedPlan?: ProjectPlan | null;
  onApprovePlan?: () => void;
  onDiscardPlan?: () => void;
}

export const ProjectIntelligencePanel: React.FC<ProjectIntelligencePanelProps> = ({ 
  project, 
  plannerState = 'idle',
  generatedPlan,
  onApprovePlan,
  onDiscardPlan
}) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<'intelligence' | 'documents'>('intelligence');
  
  // Simulate AI Analysis on selection (only if NOT in planner mode)
  useEffect(() => {
    if (project && plannerState === 'idle') {
      setAnalyzing(true);
      setActiveTab('intelligence'); // Reset to intelligence on new project selection
      const timer = setTimeout(() => setAnalyzing(false), 1000); 
      return () => clearTimeout(timer);
    }
  }, [project, plannerState]);

  // --- Render: Planner Mode (Generating) ---
  if (plannerState === 'generating') {
    return (
      <div className="w-80 border-l border-sun-200 bg-sun-50/50 h-screen overflow-y-auto sticky top-0 right-0 flex flex-col flex-shrink-0 items-center justify-center p-8 text-center">
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-sun-accent/20 rounded-full blur-xl animate-pulse"></div>
          <Loader2 size={48} className="text-sun-900 animate-spin relative z-10" />
        </div>
        <h3 className="font-serif text-xl text-sun-900 mb-2">The Planner is thinking...</h3>
        <p className="text-sm text-sun-500 max-w-[200px] leading-relaxed">
          Breaking down dependencies, estimating resources, and constructing the Work Breakdown Structure.
        </p>
      </div>
    );
  }

  // --- Render: Planner Mode (Review) ---
  if (plannerState === 'review' && generatedPlan) {
    return (
      <div className="w-80 border-l border-sun-200 bg-sun-50/50 h-screen overflow-y-auto sticky top-0 right-0 flex flex-col flex-shrink-0 animate-in slide-in-from-right-4 duration-500">
        <div className="p-6 border-b border-sun-200 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2 mb-2">
             <div className="p-1.5 bg-sun-900 text-white rounded">
               <Layers size={14} />
             </div>
             <span className="text-xs font-semibold text-sun-500 uppercase tracking-wider">Proposed Plan</span>
          </div>
          <h2 className="font-serif text-xl text-sun-900 leading-tight mb-2">Execution Strategy</h2>
          <div className="flex items-center gap-2 text-xs text-sun-500">
             <Calendar size={12} />
             <span>Deadline: {generatedPlan.deadline}</span>
          </div>
        </div>

        <div className="p-6 space-y-6 flex-1">
          {generatedPlan.phases.map((phase, index) => (
             <div key={phase.id} className="relative pl-4 border-l-2 border-sun-200 pb-2 last:border-0 last:pb-0">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-sun-100 border-2 border-white flex items-center justify-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-sun-400"></div>
                </div>
                <h3 className="text-sm font-bold text-sun-900 mb-3">Phase {index + 1}: {phase.title}</h3>
                <div className="space-y-3">
                   {phase.tasks.map(task => (
                      <div key={task.id} className="p-3 bg-white border border-sun-200 rounded-lg shadow-sm">
                         <p className="text-xs font-medium text-sun-800 mb-2">{task.title}</p>
                         <div className="flex justify-between items-center text-[10px] text-sun-400">
                            <span className="flex items-center gap-1"><Clock size={10} /> {task.duration}</span>
                            <span className="flex items-center gap-1"><User size={10} /> {task.role}</span>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          ))}
        </div>

        <div className="p-6 border-t border-sun-200 bg-white sticky bottom-0 z-10 shadow-lg shadow-sun-900/5">
           <div className="flex gap-3">
              <button 
                onClick={onDiscardPlan}
                className="flex-1 py-2 text-xs font-medium text-sun-500 hover:text-sun-900 hover:bg-sun-50 rounded-lg transition-colors"
              >
                Refine
              </button>
              <button 
                onClick={onApprovePlan}
                className="flex-[2] py-2 bg-sun-900 text-white rounded-lg text-xs font-medium hover:bg-sun-800 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={14} />
                Approve & Create
              </button>
           </div>
        </div>
      </div>
    );
  }

  // --- Render: Default Project Detail ---
  if (!project) {
    return (
      <div className="w-80 flex flex-col items-center justify-center h-screen text-sun-400 p-8 text-center border-l border-sun-200 bg-sun-50/50 flex-shrink-0 sticky top-0 right-0">
        <div className="w-16 h-16 rounded-full bg-sun-100 flex items-center justify-center mb-4">
          <Folder size={32} className="opacity-20 text-sun-900" />
        </div>
        <p className="text-sm font-medium text-sun-500">Select a project</p>
        <p className="text-xs text-sun-400 mt-1">View risk analysis & status</p>
      </div>
    );
  }

  return (
    <div className="w-80 border-l border-sun-200 bg-sun-50/50 h-screen overflow-y-auto sticky top-0 right-0 flex flex-col flex-shrink-0">
      <div className="p-8 pb-0 bg-white">
        <div className="flex items-center gap-2 mb-2">
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
            project.status === 'At Risk' ? 'bg-red-50 text-red-700' : 'bg-sun-100 text-sun-600'
          }`}>
            {project.status}
          </span>
        </div>
        <h2 className="font-serif text-2xl text-sun-900 leading-tight mb-6">{project.title}</h2>
        
        {/* Tabs */}
        <div className="flex gap-6 border-b border-sun-100">
           <button 
             onClick={() => setActiveTab('intelligence')}
             className={`pb-3 text-xs font-medium uppercase tracking-wider transition-colors relative ${
               activeTab === 'intelligence' ? 'text-sun-900' : 'text-sun-400 hover:text-sun-600'
             }`}
           >
             Intelligence
             {activeTab === 'intelligence' && (
               <div className="absolute bottom-0 left-0 w-full h-0.5 bg-sun-900 rounded-t-full"></div>
             )}
           </button>
           <button 
             onClick={() => setActiveTab('documents')}
             className={`pb-3 text-xs font-medium uppercase tracking-wider transition-colors relative ${
               activeTab === 'documents' ? 'text-sun-900' : 'text-sun-400 hover:text-sun-600'
             }`}
           >
             Documents
             {activeTab === 'documents' && (
               <div className="absolute bottom-0 left-0 w-full h-0.5 bg-sun-900 rounded-t-full"></div>
             )}
           </button>
        </div>
      </div>

      <div className="p-6 space-y-6 flex-1">
        
        {activeTab === 'intelligence' && (
          <>
            {analyzing ? (
              <div className="p-8 text-center">
                <Loader2 size={24} className="animate-spin text-sun-400 mx-auto mb-2" />
                <p className="text-xs text-sun-500">Analyzing velocity & risks...</p>
              </div>
            ) : (
              <>
                {/* Risk Card */}
                {project.status === 'At Risk' ? (
                  <div className="p-4 bg-red-50/50 border border-red-100 rounded-lg animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="flex items-center gap-2 mb-3 text-red-700">
                        <AlertTriangle size={16} />
                        <h3 className="text-sm font-semibold">Scope Creep Detected</h3>
                    </div>
                    <p className="text-xs text-red-800/80 leading-relaxed mb-3">
                        <span className="font-semibold">Why:</span> 3 new features added to the current sprint after lock-in.
                    </p>
                    <button className="w-full py-2 bg-white border border-red-200 rounded text-xs font-medium text-red-700 hover:bg-red-50 transition-colors">
                        Review Impact
                    </button>
                  </div>
                ) : (
                  <div className="p-4 bg-green-50/50 border border-green-100 rounded-lg animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="flex items-center gap-2 mb-3 text-green-700">
                        <CheckCircle2 size={16} />
                        <h3 className="text-sm font-semibold">Execution Optimal</h3>
                    </div>
                    <p className="text-xs text-green-800/80 leading-relaxed">
                        Velocity is consistent. Predicted to finish milestone 2 days early.
                    </p>
                  </div>
                )}

                {/* Recommendations */}
                <div className="space-y-3">
                  <h4 className="text-xs font-medium text-sun-400 uppercase">Recommendations</h4>
                  
                  <div className="p-3 bg-white border border-sun-200 rounded-lg shadow-sm hover:border-sun-300 transition-colors group cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 bg-sun-100 text-sun-600 rounded mt-0.5 group-hover:text-sun-900 group-hover:bg-sun-200 transition-colors">
                            <Zap size={14} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-sun-900">Re-baseline Schedule</p>
                            <p className="text-xs text-sun-500 mt-1">Adjust for recent delays.</p>
                        </div>
                      </div>
                  </div>

                  <div className="p-3 bg-white border border-sun-200 rounded-lg shadow-sm hover:border-sun-300 transition-colors group cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 bg-sun-100 text-sun-600 rounded mt-0.5 group-hover:text-sun-900 group-hover:bg-sun-200 transition-colors">
                            <FileText size={14} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-sun-900">Generate Status Report</p>
                            <p className="text-xs text-sun-500 mt-1">Draft update for {project.client}.</p>
                        </div>
                      </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-300">
            {/* Mock Documents List */}
             <div className="space-y-2">
                <div className="p-3 bg-white border border-sun-200 rounded-lg flex items-center gap-3 hover:border-sun-300 transition-colors cursor-pointer group">
                    <div className="p-2 bg-sun-50 text-sun-500 rounded group-hover:bg-sun-100 group-hover:text-sun-900 transition-colors">
                        <FileText size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-sun-900 truncate">Project Brief.pdf</p>
                        <p className="text-[10px] text-sun-400">2.4 MB • Added 2 days ago</p>
                    </div>
                </div>

                <div className="p-3 bg-white border border-sun-200 rounded-lg flex items-center gap-3 hover:border-sun-300 transition-colors cursor-pointer group">
                    <div className="p-2 bg-sun-50 text-sun-500 rounded group-hover:bg-sun-100 group-hover:text-sun-900 transition-colors">
                        <FileText size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-sun-900 truncate">API Specification v1.0</p>
                        <p className="text-[10px] text-sun-400">Google Doc • Added yesterday</p>
                    </div>
                </div>

                <div className="p-3 bg-white border border-sun-200 rounded-lg flex items-center gap-3 hover:border-sun-300 transition-colors cursor-pointer group">
                    <div className="p-2 bg-sun-50 text-sun-500 rounded group-hover:bg-sun-100 group-hover:text-sun-900 transition-colors">
                        <FileText size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-sun-900 truncate">Design Assets.zip</p>
                        <p className="text-[10px] text-sun-400">145 MB • Added 1 week ago</p>
                    </div>
                </div>
             </div>

             {/* Actions */}
             <div className="grid grid-cols-2 gap-3 pt-2">
                <button className="flex flex-col items-center justify-center gap-2 p-4 border border-dashed border-sun-300 rounded-lg text-sun-500 hover:bg-sun-50 hover:border-sun-400 hover:text-sun-900 transition-all group">
                    <Upload size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                    <span className="text-xs font-medium">Upload File</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 p-4 border border-dashed border-sun-300 rounded-lg text-sun-500 hover:bg-sun-50 hover:border-sun-400 hover:text-sun-900 transition-all group">
                    <LinkIcon size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                    <span className="text-xs font-medium">Link External</span>
                </button>
             </div>
          </div>
        )}
      </div>

      <div className="mt-auto p-6 border-t border-sun-200 bg-white">
        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-sun-900 text-white rounded-lg text-sm font-medium hover:bg-sun-800 transition-colors">
           View Project Details <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};