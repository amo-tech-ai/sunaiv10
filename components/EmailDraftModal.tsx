import React, { useState, useEffect } from 'react';
import { Sparkles, X, RefreshCw, Copy, CheckCircle2, Loader2 } from 'lucide-react';
import { Contact } from '../types';

export const EmailDraftModal = ({ contact, onClose }: { contact: Contact, onClose: () => void }) => {
  const [step, setStep] = useState<'thinking' | 'drafting' | 'review'>('thinking');
  const [draft, setDraft] = useState('');

  useEffect(() => {
    // Simulate AI Agent Lifecycle
    const timer1 = setTimeout(() => setStep('drafting'), 1500);
    const timer2 = setTimeout(() => {
      setDraft(`Subject: Re: Timeline updates for ${contact.blueprintName}

Hi ${contact.name.split(' ')[0]},

I wanted to quickly circle back on our last conversation regarding the integration timeline. 

I've reviewed the latest velocity metrics from Blueprint #102, and I'm confident we can pull in the Phase 2 delivery by 3 days if we approve the parallel schema migration we discussed.

Let me know if you have 10 mins to review the updated Gantt chart this week.

Best,
[Your Name]`);
      setStep('review');
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [contact]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-sun-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-sun-100 flex justify-between items-center bg-sun-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sun-900 rounded-lg text-white">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="font-serif text-lg text-sun-900">The Comms Lead</h3>
              <p className="text-xs text-sun-500">Drafting follow-up for {contact.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-sun-400 hover:text-sun-900">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Context */}
          <div className="w-1/3 bg-sun-50 border-r border-sun-200 p-6 overflow-y-auto">
            <h4 className="text-xs font-semibold text-sun-400 uppercase tracking-wider mb-4">Context Awareness</h4>
            
            <div className="space-y-4">
              <div className="p-3 bg-white border border-sun-200 rounded-lg shadow-sm">
                <p className="text-xs text-sun-500 mb-1">Last Interaction</p>
                <p className="text-sm text-sun-800">"Concerned about backend delays affecting the mobile launch date."</p>
                <p className="text-xs text-sun-400 mt-2 text-right">2 days ago • Call</p>
              </div>

              <div className="p-3 bg-white border border-sun-200 rounded-lg shadow-sm">
                <p className="text-xs text-sun-500 mb-1">Goal</p>
                <p className="text-sm text-sun-800">Reassure client with data-backed solution (Parallel Migration).</p>
              </div>

               <div className="p-3 bg-white border border-sun-200 rounded-lg shadow-sm">
                <p className="text-xs text-sun-500 mb-1">Tone</p>
                <p className="text-sm text-sun-800">Confident, Concise, Action-Oriented.</p>
              </div>
            </div>
          </div>

          {/* Right: The Draft */}
          <div className="flex-1 p-8 flex flex-col relative">
            {step === 'thinking' && (
              <div className="flex-1 flex flex-col items-center justify-center text-sun-400">
                <Loader2 size={32} className="animate-spin mb-4 text-sun-accent" />
                <p className="text-sm">Analyzing last 5 emails...</p>
              </div>
            )}

            {step === 'drafting' && (
              <div className="flex-1 flex flex-col items-center justify-center text-sun-400">
                <Sparkles size={32} className="animate-pulse mb-4 text-sun-900" />
                <p className="text-sm">Generating draft with Gemini 3 Flash...</p>
              </div>
            )}

            {step === 'review' && (
              <div className="flex-1 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">Draft Ready</span>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-sun-50 rounded text-sun-400 hover:text-sun-600" title="Regenerate">
                      <RefreshCw size={16} />
                    </button>
                    <button className="p-2 hover:bg-sun-50 rounded text-sun-400 hover:text-sun-600" title="Copy">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
                <textarea 
                  className="w-full h-[300px] p-6 text-sm text-sun-800 bg-white border border-sun-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-sun-300 resize-none font-sans leading-relaxed shadow-inner"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                />
              </div>
            )}

            {step === 'review' && (
              <div className="mt-6 flex justify-end gap-3">
                 <button 
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-sun-500 hover:text-sun-900"
                >
                  Discard
                </button>
                <button 
                  onClick={() => { alert("Sent via Gmail API"); onClose(); }}
                  className="px-6 py-2 bg-sun-900 text-white rounded-lg text-sm font-medium hover:bg-sun-800 transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 size={16} />
                  Approve & Send
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};