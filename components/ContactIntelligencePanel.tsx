
import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  MoreHorizontal, 
  Sparkles, 
  Globe, 
  TrendingUp, 
  TrendingDown, 
  Loader2,
  ArrowRight
} from 'lucide-react';
import { Contact } from '../types';
import { EmailDraftModal } from './EmailDraftModal';

interface ContactIntelligencePanelProps {
  contact: Contact | null;
}

export const ContactIntelligencePanel: React.FC<ContactIntelligencePanelProps> = ({ contact }) => {
  const [enriching, setEnriching] = useState(false);
  const [enrichedData, setEnrichedData] = useState<Contact['enrichedData'] | null>(null);
  
  const [scoring, setScoring] = useState(false);
  const [scoreData, setScoreData] = useState<{score: number, reason: string} | null>(null);

  const [showEmailModal, setShowEmailModal] = useState(false);

  // Reset state when contact changes
  useEffect(() => {
    setEnrichedData(null);
    setScoreData(null);
    setEnriching(false);
    setScoring(false);
    
    // Simulate automatic scoring when a contact is selected
    if (contact) {
      setScoring(true);
      const timer = setTimeout(() => {
        setScoreData({
          score: contact.id === '2' ? 45 : 82, // Hardcoded for demo: Sarah is at risk
          reason: contact.id === '2' 
            ? "Client expressed concern about timeline in last email (2 days ago). Engagement frequency dropped by 40%." 
            : "Strong engagement. Recent meeting notes indicate high satisfaction with Phase 1 deliverables."
        });
        setScoring(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [contact]);

  const handleEnrich = () => {
    if (!contact) return;
    setEnriching(true);
    // Simulate API call to Gemini 3 Pro + Google Search
    setTimeout(() => {
      setEnrichedData({
        industry: "AI & Automation Services",
        recentNews: `${contact.company} recently announced a Series A funding round led by Sequoia.`,
        location: "San Francisco, CA",
        source: "Google Search"
      });
      setEnriching(false);
    }, 2000);
  };

  if (!contact) {
    return (
      <div className="w-80 border-l border-sun-200 bg-sun-50/30 h-screen sticky top-0 right-0 flex flex-col items-center justify-center text-center p-8">
        <div className="w-12 h-12 rounded-full bg-sun-100 flex items-center justify-center mb-4 text-sun-300">
          <Sparkles size={20} />
        </div>
        <h3 className="font-serif text-lg text-sun-400">Context Intelligence</h3>
        <p className="text-xs text-sun-400 mt-2 max-w-[200px]">
          Select a contact to view AI-generated insights, relationship scoring, and enrichment data.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="w-80 border-l border-sun-200 bg-white h-screen overflow-y-auto sticky top-0 right-0 flex flex-col shadow-[0_0_40px_-10px_rgba(0,0,0,0.05)] z-20">
        
        {/* Header Section */}
        <div className="px-8 pt-10 pb-6 border-b border-sun-100 bg-white">
            <div className="flex justify-between items-start mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-sun-900 rounded-full flex items-center justify-center text-white font-serif text-2xl shadow-lg shadow-sun-900/10">
                  {contact.avatar}
                </div>
                {scoreData && (
                   <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow-sm ${scoreData.score < 50 ? 'bg-red-500' : 'bg-green-500'}`}>
                      {scoreData.score < 50 ? <TrendingDown size={12} className="text-white"/> : <TrendingUp size={12} className="text-white"/>}
                   </div>
                )}
              </div>
              <button className="text-sun-300 hover:text-sun-900 transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <h2 className="font-serif text-2xl text-sun-900 mb-1 leading-tight">{contact.name}</h2>
            <p className="text-sm text-sun-500 font-medium">{contact.role}, {contact.company}</p>
            
            <div className="flex gap-4 mt-6">
               <a href={`mailto:${contact.email}`} className="p-2 rounded-full border border-sun-200 text-sun-400 hover:text-sun-900 hover:border-sun-300 transition-colors">
                  <Mail size={16} />
               </a>
               <button className="p-2 rounded-full border border-sun-200 text-sun-400 hover:text-sun-900 hover:border-sun-300 transition-colors">
                  <Calendar size={16} />
               </button>
            </div>
        </div>

        {/* Intelligence Content */}
        <div className="p-8 space-y-10">
            
            {/* Phase 3: Relationship Health */}
            <section>
               <div className="flex items-center gap-2 mb-4">
                 <h3 className="text-xs font-bold text-sun-900 uppercase tracking-widest">Relationship Score</h3>
                 {scoring && <Loader2 size={10} className="animate-spin text-sun-400" />}
               </div>
               
               {scoreData ? (
                  <div className="animate-in fade-in duration-500">
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="font-serif text-4xl text-sun-900">{scoreData.score}</span>
                      <span className="text-sm text-sun-400">/100</span>
                    </div>
                    
                    <div className="w-full h-1 bg-sun-100 rounded-full overflow-hidden mb-4">
                      <div 
                        className={`h-full transition-all duration-1000 ${scoreData.score < 50 ? 'bg-red-400' : 'bg-sun-900'}`} 
                        style={{ width: `${scoreData.score}%` }}
                      ></div>
                    </div>

                    <div className="p-4 bg-sun-50 rounded-xl border border-sun-100">
                      <p className="text-xs text-sun-600 leading-relaxed italic">
                        "{scoreData.reason}"
                      </p>
                    </div>
                  </div>
               ) : (
                 <div className="h-20 bg-sun-50 animate-pulse rounded-xl"></div>
               )}
            </section>
            
            {/* Phase 2: Enrichment */}
            <section>
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xs font-bold text-sun-900 uppercase tracking-widest">Company Intelligence</h3>
               </div>

               {!enrichedData ? (
                   <div className="relative group">
                     <div className="absolute inset-0 bg-sun-900/5 rounded-xl transform rotate-1 transition-transform group-hover:rotate-2"></div>
                     <button 
                        onClick={handleEnrich}
                        disabled={enriching}
                        className="relative w-full py-6 bg-white border border-sun-200 rounded-xl flex flex-col items-center justify-center gap-3 text-sun-500 hover:border-sun-300 hover:text-sun-900 transition-all"
                      >
                        {enriching ? (
                          <>
                             <Loader2 size={20} className="animate-spin text-sun-accent" />
                             <span className="text-xs font-medium">Consulting Gemini...</span>
                          </>
                        ) : (
                          <>
                             <Sparkles size={20} className="text-sun-accent" />
                             <span className="text-xs font-medium">Enrich Profile</span>
                          </>
                        )}
                      </button>
                   </div>
               ) : (
                 <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div>
                      <span className="text-[10px] text-sun-400 uppercase tracking-wider font-semibold">Latest News</span>
                      <p className="text-sm text-sun-900 mt-1 leading-relaxed border-l-2 border-sun-200 pl-3">
                        {enrichedData.recentNews}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-3 bg-sun-50 rounded-lg">
                          <span className="text-[10px] text-sun-400 uppercase tracking-wider block mb-1">Industry</span>
                          <span className="text-xs font-medium text-sun-900">{enrichedData.industry}</span>
                       </div>
                       <div className="p-3 bg-sun-50 rounded-lg">
                          <span className="text-[10px] text-sun-400 uppercase tracking-wider block mb-1">Location</span>
                          <span className="text-xs font-medium text-sun-900">{enrichedData.location}</span>
                       </div>
                    </div>
                    
                    <div className="flex justify-end">
                       <span className="text-[10px] text-sun-300 flex items-center gap-1">
                         <Globe size={10} /> Sourced via Google
                       </span>
                    </div>
                 </div>
               )}
            </section>
        </div>
        
        {/* Phase 4: Sticky Action Footer */}
        <div className="mt-auto p-8 border-t border-sun-100 bg-white sticky bottom-0">
            <button 
              onClick={() => setShowEmailModal(true)}
              className="w-full py-3.5 bg-sun-900 text-white rounded-xl text-sm font-medium hover:bg-sun-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-sun-900/10 hover:shadow-sun-900/20 active:scale-[0.98]"
            >
              <Sparkles size={16} className="text-sun-accent" />
              Generate Follow-up
            </button>
        </div>
      </div>

      {showEmailModal && contact && (
        <EmailDraftModal contact={contact} onClose={() => setShowEmailModal(false)} />
      )}
    </>
  );
};
