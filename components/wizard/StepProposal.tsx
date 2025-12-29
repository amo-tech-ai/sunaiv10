import React from 'react';
import { CheckSquare, Clock, User, CheckCircle2 } from 'lucide-react';
import { ProjectPlan } from '../../types';

interface StepProposalProps {
  plan: ProjectPlan;
  onRefine: () => void;
  onApprove: () => void;
}

export const StepProposal: React.FC<StepProposalProps> = ({ plan, onRefine, onApprove }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      <div>
        <h2 className="font-serif text-2xl text-sun-900 mb-2">Here is your Execution Blueprint.</h2>
        <p className="text-sun-500 text-sm">Review the proposed phases and launch the project.</p>
      </div>

      <div className="space-y-6 max-w-3xl">
        {plan.phases.map((phase, index) => (
           <div key={phase.id} className="bg-white border border-sun-200 rounded-xl overflow-hidden transition-all hover:border-sun-300 shadow-sm">
              <div className="px-6 py-4 bg-sun-50/50 border-b border-sun-100 flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-sun-900 text-white flex items-center justify-center text-xs font-bold">
                       {index + 1}
                    </div>
                    <h3 className="font-medium text-sun-900">{phase.title}</h3>
                 </div>
                 <div className="text-xs text-sun-500 font-medium">
                   {phase.tasks.length} Tasks
                 </div>
              </div>
              <div className="divide-y divide-sun-100">
                 {phase.tasks.map((task) => (
                    <div key={task.id} className="px-6 py-4 flex items-center justify-between group hover:bg-sun-50/30 transition-colors">
                       <div className="flex items-center gap-3">
                          <CheckSquare size={16} className="text-sun-400 group-hover:text-sun-600" />
                          <span className="text-sm text-sun-700">{task.title}</span>
                       </div>
                       <div className="flex items-center gap-4 text-xs text-sun-400">
                          <span className="flex items-center gap-1 group-hover:text-sun-600 transition-colors">
                             <Clock size={12} /> {task.duration}
                          </span>
                          <span className="flex items-center gap-1 group-hover:text-sun-600 transition-colors">
                             <User size={12} /> {task.role}
                          </span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        ))}
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-white/80 backdrop-blur-md border-t border-sun-200 flex justify-center items-center gap-4 z-20">
         <button 
           onClick={onRefine}
           className="px-6 py-3 rounded-lg text-sun-600 hover:bg-sun-50 font-medium text-sm flex items-center gap-2 transition-colors"
         >
           Refine Blueprint
         </button>
         <button 
           onClick={onApprove}
           className="px-12 py-3 rounded-lg bg-sun-900 text-white hover:bg-sun-800 font-medium text-sm flex items-center gap-2 shadow-lg shadow-sun-900/10 transition-colors hover:scale-[1.02] active:scale-[0.98]"
         >
           <CheckCircle2 size={18} />
           Approve & Launch Project
         </button>
      </div>
    </div>
  );
};
