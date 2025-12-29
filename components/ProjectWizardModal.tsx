import React, { useState } from 'react';
import { X, Sparkles, Calendar, Target } from 'lucide-react';

interface ProjectWizardModalProps {
  onClose: () => void;
  onGenerate: (goal: string, deadline: string) => void;
}

export const ProjectWizardModal: React.FC<ProjectWizardModalProps> = ({ onClose, onGenerate }) => {
  const [goal, setGoal] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal && deadline) {
      onGenerate(goal, deadline);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-sun-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-sun-100 flex justify-between items-center bg-sun-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sun-900 rounded-lg text-white">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="font-serif text-lg text-sun-900">The Planner</h3>
              <p className="text-xs text-sun-500">Initialize a new project with AI</p>
            </div>
          </div>
          <button onClick={onClose} className="text-sun-400 hover:text-sun-900">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-xs font-semibold text-sun-500 uppercase tracking-wider mb-2">
              Project Goal
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 text-sun-400">
                <Target size={16} />
              </div>
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm border border-sun-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sun-900 focus:border-sun-900 h-24 resize-none bg-sun-50/30"
                placeholder="e.g. Launch an e-commerce platform for Maison Laurent..."
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-sun-500 uppercase tracking-wider mb-2">
              Target Deadline
            </label>
            <div className="relative">
              <div className="absolute top-1/2 -translate-y-1/2 left-3 text-sun-400">
                <Calendar size={16} />
              </div>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm border border-sun-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sun-900 focus:border-sun-900 bg-sun-50/30"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-sun-900 text-white rounded-lg text-sm font-medium hover:bg-sun-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-sun-900/10"
            >
              <Sparkles size={16} />
              Generate Execution Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};