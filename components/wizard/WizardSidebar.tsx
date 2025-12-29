import React from 'react';
import { Command, CheckCircle2, Save, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WizardSidebarProps {
  currentStep: number;
  isAutoSaving: boolean;
  lastUpdated: string;
}

export const WizardSidebar: React.FC<WizardSidebarProps> = ({ currentStep, isAutoSaving, lastUpdated }) => {
  const navigate = useNavigate();

  return (
    <div className="w-64 border-r border-sun-200 bg-white flex flex-col p-8 hidden md:flex">
      <div className="flex items-center gap-2 mb-12 cursor-pointer" onClick={() => navigate('/projects')}>
        <div className="w-8 h-8 bg-sun-900 rounded-lg flex items-center justify-center text-white">
          <Command size={16} />
        </div>
        <span className="font-serif font-bold">Wizard</span>
      </div>

      <nav className="space-y-6 flex-1">
        {[
            { num: 1, label: 'Basics' },
            { num: 2, label: 'Overview' },
            { num: 3, label: 'Constraints' },
            { num: 4, label: 'Review' },
            { num: 5, label: 'Architecting' },
            { num: 6, label: 'Proposal' },
        ].map(step => (
            <div key={step.num} className="flex items-center gap-4 group">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentStep === step.num ? 'bg-sun-900 text-white' :
                  currentStep > step.num ? 'bg-green-100 text-green-700' :
                  'bg-sun-100 text-sun-400'
              }`}>
                  {currentStep > step.num ? <CheckCircle2 size={16} /> : step.num}
              </div>
              <span className={`text-sm font-medium transition-colors ${
                  currentStep === step.num ? 'text-sun-900' : 'text-sun-400'
              }`}>
                  {step.label}
              </span>
            </div>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-sun-100">
        <div className="flex items-center gap-2 text-xs text-sun-400">
            {isAutoSaving ? <RefreshCw size={12} className="animate-spin" /> : <Save size={12} />}
            {isAutoSaving ? 'Saving...' : `Saved ${new Date(lastUpdated).toLocaleTimeString()}`}
        </div>
      </div>
    </div>
  );
};
