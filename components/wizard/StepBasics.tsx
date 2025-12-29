import React from 'react';
import { Globe, Sparkles } from 'lucide-react';
import { WizardBlueprint } from '../../types';

interface StepBasicsProps {
  data: WizardBlueprint['identity'];
  onChange: (field: string, value: string) => void;
  onScanning: (scanning: boolean) => void;
}

export const StepBasics: React.FC<StepBasicsProps> = ({ data, onChange, onScanning }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-serif text-2xl text-sun-900 mb-2">Let's start with the basics.</h2>
        <p className="text-sun-500 text-sm">Who are we building this for?</p>
      </div>

      <div className="space-y-4 max-w-lg">
        <div>
          <label className="block text-xs font-semibold text-sun-500 uppercase tracking-wider mb-2">Project Name</label>
          <input 
            type="text" 
            value={data.projectName}
            onChange={(e) => onChange('projectName', e.target.value)}
            className="w-full px-4 py-3 bg-white border border-sun-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sun-900 transition-all font-serif text-lg text-sun-900 placeholder:text-sun-300"
            placeholder="e.g. Project Alpha"
            autoFocus
          />
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-sun-500 uppercase tracking-wider mb-2">Client / Company</label>
          <input 
            type="text" 
            value={data.clientName}
            onChange={(e) => onChange('clientName', e.target.value)}
            className="w-full px-4 py-3 bg-white border border-sun-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sun-900 transition-all text-sun-900 placeholder:text-sun-300"
            placeholder="e.g. Acme Corp"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-sun-500 uppercase tracking-wider mb-2">Website (Optional)</label>
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-sun-400" size={18} />
            <input 
              type="url" 
              value={data.website}
              onChange={(e) => onChange('website', e.target.value)}
              onBlur={() => {
                if (data.website) {
                   onScanning(true);
                   setTimeout(() => onScanning(false), 2000); // Simulate Retriever
                }
              }}
              className="w-full pl-11 pr-4 py-3 bg-white border border-sun-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sun-900 transition-all text-sun-900 placeholder:text-sun-300"
              placeholder="https://..."
            />
          </div>
          <p className="text-[10px] text-sun-400 mt-2 flex items-center gap-1">
             <Sparkles size={10} /> The Retriever will scan this for context.
          </p>
        </div>
      </div>
    </div>
  );
};
