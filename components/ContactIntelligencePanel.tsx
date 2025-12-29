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
  Loader2 
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
      <div className="w-80 flex flex-col items-center justify-center h-screen text-sun-400 p-8 text-center border-l border-sun-200 bg-sun-50/50 flex-shrink-0 sticky top-0 right-0">
        <div className="w-16 h-16 rounded-full bg-sun-100 flex items-center justify-center mb-4">
          <User size={32} className="opacity-20 text-sun-900" />
        </div>
        <p className="text-sm font-medium text-sun-500">Select a contact</p>
        <p className="text-xs text-sun-400 mt-1">View AI intelligence and details</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-80 border-l border-sun-200 bg-sun-50/50 h-screen overflow-y-auto sticky top-0 right-0 flex flex-col flex-shrink-0">
        {/* Details Header */}
        <div className="p-8 border-b border-sun-200 bg-white">
            <div className="flex justify-between items-start mb-4">
              <div className="w-16 h-16 bg-sun-900 rounded-full flex items-center justify-center text-white font-serif text-2xl">
                {contact.avatar}
              </div>
              <button className="text-sun-400 hover:text-sun-600">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <h2 className="font-serif text-2xl text-sun-900 mb-1">{contact.name}</h2>
            <div className="flex items-center gap-2">
              <p className="text-sun-500 text-sm">{contact.role} at {contact.company}</p>
              <a href="#" className="text-sun-300 hover:text-[#0077b5]"><Globe size={12} /></a>
            </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
            {/* Metadata */}
            <div className="space-y-3 p-4 bg-white rounded-lg border border-sun-200 shadow-sm">
              <div className="flex items-center gap-3 text-sm text-sun-600">
                  <Mail size={14} className="text-sun-400" /> 
                  <span className="truncate">{contact.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-sun-600">
                  <Calendar size={14} className="text-sun-400" /> 
                  <span>Last contact: {contact.lastContact}</span>
              </div>
            </div>

            {/* Separator */}
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px flex-1 bg-sun-200"></div>
              <span className="text-[10px] uppercase tracking-widest text-sun-400 font-semibold">Intelligence</span>
              <div className="h-px flex-1 bg-sun-200"></div>
            </div>

            {/* Phase 3: The Scorer */}
            <div className="p-4 bg-white border border-sun-200 rounded-lg shadow-sm">
               <h3 className="text-xs font-semibold text-sun-400 uppercase tracking-wider mb-3">Relationship Health</h3>
               
               {scoring ? (
                  <div className="flex items-center gap-2 text-sun-400 text-sm">
                    <Loader2 size={14} className="animate-spin" />
                    <span>Analyzing interactions...</span>
                  </div>
               ) : scoreData ? (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <div className="flex items-end gap-2">
                      <span className={`text-3xl font-serif font-medium ${scoreData.score < 50 ? 'text-red-500' : 'text-sun-900'}`}>
                        {scoreData.score}
                      </span>
                      <span className="text-xs text-sun-400 mb-1.5">/ 100</span>
                      {scoreData.score < 50 ? (
                         <span className="ml-auto text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full flex items-center gap-1">
                            <TrendingDown size={10} /> At Risk
                         </span>
                      ) : (
                         <span className="ml-auto text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                            <TrendingUp size={10} /> Strong
                         </span>
                      )}
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-sun-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${scoreData.score < 50 ? 'bg-red-400' : 'bg-green-500'}`} 
                        style={{ width: `${scoreData.score}%` }}
                      ></div>
                    </div>

                    {/* Reasoning */}
                    <div className="pt-2 border-t border-sun-50">
                      <p className="text-xs text-sun-500 leading-relaxed">
                        <span className="font-semibold text-sun-700">Why: </span>
                        {scoreData.reason}
                      </p>
                    </div>
                  </div>
               ) : (
                 <p className="text-xs text-sun-400">Unable to calculate score.</p>
               )}
            </div>
            
            {/* Phase 2: The Researcher */}
            <div className="p-4 bg-white border border-sun-200 rounded-lg shadow-sm relative overflow-hidden">
               <div className="flex justify-between items-center mb-3">
                 <h3 className="text-xs font-semibold text-sun-400 uppercase tracking-wider">Enrichment</h3>
                 {enrichedData && <span className="text-[10px] text-sun-300 flex items-center gap-1"><Sparkles size={10}/> Google Search</span>}
               </div>

               {!enrichedData ? (
                 <div className="text-center py-4">
                   {enriching ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-1 w-12 bg-sun-200 rounded overflow-hidden">
                           <div className="h-full bg-sun-accent animate-progress"></div>
                        </div>
                        <span className="text-xs text-sun-500">Researching company...</span>
                      </div>
                   ) : (
                      <button 
                        onClick={handleEnrich}
                        className="text-xs font-medium text-sun-600 bg-sun-50 hover:bg-sun-100 px-3 py-2 rounded-md border border-sun-200 transition-colors flex items-center justify-center gap-2 w-full"
                      >
                        <Sparkles size={12} className="text-sun-accent" />
                        Auto-Enrich Profile
                      </button>
                   )}
                 </div>
               ) : (
                 <div className="space-y-3 animate-in fade-in duration-300">
                    <div>
                      <span className="text-[10px] text-sun-400 uppercase">Industry</span>
                      <p className="text-sm text-sun-800 font-medium">{enrichedData.industry}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-sun-400 uppercase">Latest News</span>
                      <p className="text-sm text-sun-600 leading-snug">{enrichedData.recentNews}</p>
                    </div>
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-1 text-[10px] text-sun-400 bg-sun-50 px-2 py-1 rounded">
                        <Globe size={10} /> {enrichedData.location}
                      </span>
                    </div>
                 </div>
               )}
            </div>
        </div>
        
        {/* Phase 4: Actions */}
        <div className="mt-auto p-6 border-t border-sun-200 bg-white">
            <button 
              onClick={() => setShowEmailModal(true)}
              className="w-full py-2 bg-sun-900 text-white rounded-lg text-sm font-medium hover:bg-sun-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-sun-900/10"
            >
              <Mail size={16} />
              Draft Follow-up
            </button>
        </div>
      </div>

      {showEmailModal && contact && (
        <EmailDraftModal contact={contact} onClose={() => setShowEmailModal(false)} />
      )}
    </>
  );
};