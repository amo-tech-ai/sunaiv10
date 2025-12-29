import React, { useState } from 'react';
import { Layout, Smartphone, Megaphone, Database, X } from 'lucide-react';
import { WizardBlueprint } from '../../types';

interface StepOverviewProps {
  data: WizardBlueprint['intent'];
  onChange: (field: string, value: any) => void;
}

export const StepOverview: React.FC<StepOverviewProps> = ({ data, onChange }) => {
  const [tagInput, setTagInput] = useState('');

  const handleTagAdd = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!data.goals.includes(tagInput.trim())) {
        onChange('goals', [...data.goals, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    onChange('goals', data.goals.filter(t => t !== tag));
  };

  const types = [
    { id: 'Web', icon: Layout, label: 'Web Platform' },
    { id: 'Mobile', icon: Smartphone, label: 'Mobile App' },
    { id: 'Marketing', icon: Megaphone, label: 'Campaign' },
    { id: 'Integration', icon: Database, label: 'Integration' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-serif text-2xl text-sun-900 mb-2">Project Overview</h2>
        <p className="text-sun-500 text-sm">Define the scope and high-level intent.</p>
      </div>

      {/* App Type */}
      <div className="space-y-3">
         <label className="block text-xs font-semibold text-sun-500 uppercase tracking-wider">Project Type</label>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {types.map(t => (
               <button
                 key={t.id}
                 onClick={() => onChange('type', t.id)}
                 className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${
                   data.type === t.id 
                     ? 'bg-sun-900 border-sun-900 text-white shadow-lg scale-105' 
                     : 'bg-white border-sun-200 text-sun-500 hover:border-sun-400 hover:bg-sun-50'
                 }`}
               >
                  <t.icon size={24} className={data.type === t.id ? 'text-sun-accent' : 'text-current'} />
                  <span className="text-xs font-medium">{t.label}</span>
               </button>
            ))}
         </div>
      </div>

      {/* Industry */}
      <div className="max-w-md">
         <label className="block text-xs font-semibold text-sun-500 uppercase tracking-wider mb-2">Industry / Vertical</label>
         <input 
            type="text" 
            value={data.industry}
            onChange={(e) => onChange('industry', e.target.value)}
            className="w-full px-4 py-3 bg-white border border-sun-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sun-900 transition-all text-sun-900 placeholder:text-sun-300 text-sm"
            placeholder="e.g. FinTech, Healthcare, E-commerce..."
         />
      </div>

      {/* Goals */}
      <div className="max-w-lg">
         <label className="block text-xs font-semibold text-sun-500 uppercase tracking-wider mb-2">Primary Goals</label>
         <div className="p-2 bg-white border border-sun-200 rounded-lg focus-within:ring-1 focus-within:ring-sun-900 flex flex-wrap gap-2 min-h-[50px]">
            {data.goals.map(tag => (
               <span key={tag} className="bg-sun-100 text-sun-700 text-xs px-2 py-1 rounded-md flex items-center gap-1">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-sun-900"><X size={12} /></button>
               </span>
            ))}
            <input 
               type="text" 
               value={tagInput}
               onChange={(e) => setTagInput(e.target.value)}
               onKeyDown={handleTagAdd}
               className="flex-1 min-w-[120px] outline-none text-sm p-1 placeholder:text-sun-300"
               placeholder="Type goal & Press Enter"
            />
         </div>
      </div>
    </div>
  );
};
