import React, { useRef, useEffect } from 'react';
import { Loader2, Cpu } from 'lucide-react';

interface StepArchitectingProps {
  thoughts: string[];
}

export const StepArchitecting: React.FC<StepArchitectingProps> = ({ thoughts }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [thoughts]);

  return (
    <div className="h-full flex flex-col items-center justify-center animate-in fade-in duration-700">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-sun-accent/10 rounded-full blur-2xl animate-pulse"></div>
        <Loader2 size={64} className="text-sun-900 animate-spin relative z-10" />
      </div>

      <h2 className="font-serif text-3xl text-sun-900 mb-3 text-center">Architecting Solution...</h2>
      <p className="text-sun-500 text-sm mb-8 text-center max-w-md">
        The Planner is analyzing your constraints and structuring the optimal execution path.
      </p>

      {/* Thoughts Console */}
      <div className="w-full max-w-lg bg-sun-900 rounded-xl p-6 shadow-2xl overflow-hidden border border-sun-800">
        <div className="flex items-center gap-2 mb-4 border-b border-sun-700 pb-2">
           <Cpu size={14} className="text-sun-accent" />
           <span className="text-xs font-mono text-sun-300 uppercase tracking-wider">Gemini 3 Pro // Thinking Chain</span>
        </div>
        <div 
          ref={scrollRef}
          className="h-32 overflow-y-auto space-y-2 font-mono text-xs scroll-smooth"
        >
          {thoughts.length === 0 && <span className="text-sun-600 animate-pulse">Initializing...</span>}
          {thoughts.map((t, i) => (
            <div key={i} className="flex gap-2 animate-in fade-in slide-in-from-left-2 text-sun-100">
              <span className="text-sun-600">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
