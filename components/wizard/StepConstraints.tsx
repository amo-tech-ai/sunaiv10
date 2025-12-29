import React from 'react';
import { Calendar } from 'lucide-react';
import { WizardBlueprint } from '../../types';
import { formatCurrency } from '../../utils/wizardUtils';

interface StepConstraintsProps {
  data: WizardBlueprint['constraints'];
  onChange: (field: string, value: any) => void;
}

export const StepConstraints: React.FC<StepConstraintsProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-serif text-2xl text-sun-900 mb-2">Constraints & Logistics</h2>
        <p className="text-sun-500 text-sm">Set the boundaries for the AI Architect.</p>
      </div>

      {/* Budget Slider */}
      <div className="max-w-lg space-y-4">
        <label className="flex justify-between items-center text-xs font-semibold text-sun-500 uppercase tracking-wider">
          <span>Estimated Budget</span>
          <span className="text-sun-900 text-sm bg-sun-100 px-2 py-1 rounded">
            {formatCurrency(data.budget)}
          </span>
        </label>
        <div className="relative pt-6 pb-2">
           <input
             type="range"
             min="5000"
             max="100000"
             step="5000"
             value={data.budget}
             onChange={(e) => onChange('budget', Number(e.target.value))}
             className="w-full h-2 bg-sun-200 rounded-lg appearance-none cursor-pointer accent-sun-900"
           />
           <div className="flex justify-between text-[10px] text-sun-400 mt-2 font-medium">
             <span>$5k</span>
             <span>$50k</span>
             <span>$100k+</span>
           </div>
        </div>
      </div>

      {/* Deadline Picker */}
      <div className="max-w-md">
        <label className="block text-xs font-semibold text-sun-500 uppercase tracking-wider mb-2">Target Deadline</label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-sun-400" size={18} />
          <input
            type="date"
            value={data.deadline}
            onChange={(e) => onChange('deadline', e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-sun-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sun-900 transition-all text-sun-900 text-sm"
          />
        </div>
      </div>

      {/* Urgency Toggle */}
      <div className="max-w-lg">
        <label className="block text-xs font-semibold text-sun-500 uppercase tracking-wider mb-3">Project Urgency</label>
        <div className="grid grid-cols-3 gap-3">
          {['Low', 'Medium', 'High'].map((level) => (
            <button
              key={level}
              onClick={() => onChange('urgency', level)}
              className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all ${
                data.urgency === level 
                  ? 'bg-sun-900 border-sun-900 text-white shadow-md' 
                  : 'bg-white border-sun-200 text-sun-500 hover:bg-sun-50'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        <p className="text-xs text-sun-400 mt-2 italic">
          {data.urgency === 'Low' && "Prioritizing quality and scope over speed."}
          {data.urgency === 'Medium' && "Balanced approach to timeline and deliverables."}
          {data.urgency === 'High' && "Prioritizing speed. MVP scope recommended."}
        </p>
      </div>
    </div>
  );
};
