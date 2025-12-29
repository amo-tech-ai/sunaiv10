import React from 'react';
import { Pencil, Layout, Smartphone, Megaphone, Database } from 'lucide-react';
import { WizardBlueprint } from '../../types';
import { formatCurrency } from '../../utils/wizardUtils';

interface StepReviewProps {
  blueprint: WizardBlueprint;
  onEditStep: (step: number) => void;
}

export const StepReview: React.FC<StepReviewProps> = ({ blueprint, onEditStep }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-serif text-2xl text-sun-900 mb-2">Review Blueprint</h2>
        <p className="text-sun-500 text-sm">Confirm details before the AI Architect builds the plan.</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Section 1: Identity */}
        <div className="bg-white border border-sun-200 rounded-xl p-6 relative group hover:border-sun-300 transition-colors">
          <button 
            onClick={() => onEditStep(1)}
            className="absolute top-4 right-4 p-2 text-sun-300 hover:text-sun-900 hover:bg-sun-50 rounded-full transition-colors"
          >
            <Pencil size={16} />
          </button>
          <h3 className="text-xs font-semibold text-sun-400 uppercase tracking-wider mb-4">Identity</h3>
          <div className="grid grid-cols-2 gap-4">
             <div>
               <p className="text-[10px] text-sun-400">Project Name</p>
               <p className="text-sm font-medium text-sun-900">{blueprint.identity.projectName || '—'}</p>
             </div>
             <div>
               <p className="text-[10px] text-sun-400">Client</p>
               <p className="text-sm font-medium text-sun-900">{blueprint.identity.clientName || '—'}</p>
             </div>
             {blueprint.identity.website && (
               <div className="col-span-2">
                 <p className="text-[10px] text-sun-400">Website</p>
                 <p className="text-sm font-medium text-sun-900 truncate">{blueprint.identity.website}</p>
               </div>
             )}
          </div>
        </div>

        {/* Section 2: Intent */}
        <div className="bg-white border border-sun-200 rounded-xl p-6 relative group hover:border-sun-300 transition-colors">
          <button 
            onClick={() => onEditStep(2)}
            className="absolute top-4 right-4 p-2 text-sun-300 hover:text-sun-900 hover:bg-sun-50 rounded-full transition-colors"
          >
            <Pencil size={16} />
          </button>
          <h3 className="text-xs font-semibold text-sun-400 uppercase tracking-wider mb-4">Intent</h3>
          <div className="grid grid-cols-2 gap-6">
             <div>
               <p className="text-[10px] text-sun-400">Type</p>
               <div className="flex items-center gap-2 mt-1">
                  {blueprint.intent.type === 'Web' && <Layout size={14} className="text-sun-500" />}
                  {blueprint.intent.type === 'Mobile' && <Smartphone size={14} className="text-sun-500" />}
                  {blueprint.intent.type === 'Marketing' && <Megaphone size={14} className="text-sun-500" />}
                  {blueprint.intent.type === 'Integration' && <Database size={14} className="text-sun-500" />}
                  <span className="text-sm font-medium text-sun-900">{blueprint.intent.type || '—'}</span>
               </div>
             </div>
             <div>
               <p className="text-[10px] text-sun-400">Industry</p>
               <p className="text-sm font-medium text-sun-900 mt-1">{blueprint.intent.industry || '—'}</p>
             </div>
             <div className="col-span-2">
               <p className="text-[10px] text-sun-400 mb-2">Goals</p>
               <div className="flex flex-wrap gap-2">
                 {blueprint.intent.goals.length > 0 ? blueprint.intent.goals.map(g => (
                   <span key={g} className="px-2 py-1 bg-sun-100 text-sun-700 rounded text-xs border border-sun-200">{g}</span>
                 )) : <span className="text-sm text-sun-300 italic">No goals defined</span>}
               </div>
             </div>
          </div>
        </div>

        {/* Section 3: Constraints */}
        <div className="bg-white border border-sun-200 rounded-xl p-6 relative group hover:border-sun-300 transition-colors">
          <button 
            onClick={() => onEditStep(3)}
            className="absolute top-4 right-4 p-2 text-sun-300 hover:text-sun-900 hover:bg-sun-50 rounded-full transition-colors"
          >
            <Pencil size={16} />
          </button>
          <h3 className="text-xs font-semibold text-sun-400 uppercase tracking-wider mb-4">Constraints</h3>
          <div className="grid grid-cols-3 gap-4">
             <div>
               <p className="text-[10px] text-sun-400">Budget</p>
               <p className="text-sm font-medium text-sun-900 mt-1">{formatCurrency(blueprint.constraints.budget)}</p>
             </div>
             <div>
               <p className="text-[10px] text-sun-400">Deadline</p>
               <p className="text-sm font-medium text-sun-900 mt-1">{blueprint.constraints.deadline || '—'}</p>
             </div>
             <div>
               <p className="text-[10px] text-sun-400">Urgency</p>
               <p className="text-sm font-medium text-sun-900 mt-1">{blueprint.constraints.urgency}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
