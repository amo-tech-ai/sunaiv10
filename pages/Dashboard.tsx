import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  AlertCircle, 
  CheckCircle2, 
  Zap, 
  FileText, 
  Calendar,
  MoreHorizontal,
  ArrowRight,
  RefreshCw,
  Sparkles,
  Command
} from 'lucide-react';
import { IntelligenceInsight } from '../types';
import { useLocation } from 'react-router-dom';

// Mock Data
const insights: IntelligenceInsight[] = [
  {
    id: '1',
    type: 'risk',
    title: 'Timeline Pressure',
    description: 'Project Alpha is trending 3 days behind schedule due to frontend delays.',
    why: 'Velocity dropped 15% last sprint.',
    actionLabel: 'Review Mitigation Plan'
  },
  {
    id: '2',
    type: 'recommendation',
    title: 'Re-sequence Phase 2',
    description: 'Move "Database Migration" to next week to unblock the mobile team.',
    impact: 'Will recover 2 days of slack.',
    actionLabel: 'View Schedule Impact'
  },
  {
    id: '3',
    type: 'action',
    title: 'Next Best Action',
    description: 'Review and approve milestones for Project Alpha to release funds.',
    actionLabel: 'Review Milestones'
  }
];

const KPICard = ({ label, value, sub, alert, highlighted }: { label: string, value: string, sub?: string, alert?: boolean, highlighted?: boolean }) => (
  <div className={`p-6 rounded-xl border bg-white transition-all duration-300 ${highlighted ? 'border-sun-accent shadow-lg shadow-sun-accent/10 scale-105' : 'border-sun-200 hover:border-sun-300'}`}>
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-sm font-medium text-sun-500">{label}</h3>
      {alert && <div className="h-2 w-2 rounded-full bg-sun-accent animate-pulse" />}
    </div>
    <div className="flex items-baseline gap-2">
      <span className="font-serif text-3xl font-medium text-sun-900">{value}</span>
      {sub && <span className="text-sm text-sun-400 font-normal">{sub}</span>}
    </div>
  </div>
);

const TimelineItem = ({ title, type, time }: { title: string, type: string, time: string }) => (
  <div className="flex gap-4 group">
    <div className="flex flex-col items-center">
      <div className={`w-2 h-2 rounded-full mt-2 ring-4 ring-white ${type === 'alert' ? 'bg-sun-accent' : 'bg-sun-300'}`} />
      <div className="w-px h-full bg-sun-100 group-last:hidden -mb-4 mt-1" />
    </div>
    <div className="pb-8">
      <p className="text-sm font-medium text-sun-900">{title}</p>
      <p className="text-xs text-sun-400 mt-1">{time}</p>
    </div>
  </div>
);

const IntelligencePanel = ({ onAction }: { onAction: (insight: IntelligenceInsight) => void }) => {
  return (
    <div className="w-80 border-l border-sun-200 bg-sun-50/50 h-screen overflow-y-auto sticky top-0 right-0 p-6 flex flex-col">
      <div className="mb-8">
        <h2 className="font-serif text-lg text-sun-900 flex items-center gap-2">
          <Sparkles size={16} className="text-sun-accent" />
          Today's Intelligence
        </h2>
        <p className="text-xs text-sun-500 mt-2 leading-relaxed">
          Real-time analysis based on your active Blueprints and team velocity.
        </p>
      </div>

      <div className="space-y-6">
        {insights.map((item) => (
          <div key={item.id} className="group">
            <div className="flex items-center gap-2 mb-2">
              {item.type === 'risk' && <AlertCircle size={14} className="text-sun-accent" />}
              {item.type === 'recommendation' && <Zap size={14} className="text-sun-600" />}
              {item.type === 'action' && <CheckCircle2 size={14} className="text-sun-600" />}
              <span className="text-xs font-semibold uppercase tracking-wider text-sun-500">{item.type}</span>
            </div>
            
            <div className="p-4 bg-white border border-sun-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-medium text-sun-900 mb-2 font-serif">{item.title}</h3>
              <p className="text-sm text-sun-600 mb-3 leading-relaxed">{item.description}</p>
              
              {(item.why || item.impact) && (
                <div className="mb-4 pt-3 border-t border-sun-100">
                  {item.why && (
                    <div className="flex gap-2 text-xs">
                      <span className="text-sun-400 w-12 shrink-0">Why:</span>
                      <span className="text-sun-700">{item.why}</span>
                    </div>
                  )}
                  {item.impact && (
                    <div className="flex gap-2 text-xs">
                      <span className="text-sun-400 w-12 shrink-0">Impact:</span>
                      <span className="text-sun-700">{item.impact}</span>
                    </div>
                  )}
                </div>
              )}

              <button 
                onClick={() => onAction(item)}
                className="w-full py-2 px-3 flex items-center justify-center gap-2 bg-sun-50 hover:bg-sun-100 text-sun-700 text-xs font-medium rounded-md border border-sun-200 transition-colors"
              >
                {item.actionLabel}
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-auto pt-8 text-center">
        <p className="text-[10px] text-sun-400">Sun AI Model v2.1 • Last analyzed 2m ago</p>
      </div>
    </div>
  );
};

const ApprovalModal = ({ insight, onClose }: { insight: IntelligenceInsight, onClose: () => void }) => (
  <div className="mb-8 p-6 bg-sun-900 rounded-xl text-white shadow-xl animate-in fade-in slide-in-from-top-4 duration-500">
    <div className="flex justify-between items-start mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white/10 rounded-lg">
          <Sparkles className="text-sun-accent" size={20} />
        </div>
        <div>
          <h2 className="font-serif text-xl">Review Proposal</h2>
          <p className="text-sun-400 text-sm mt-1">AI Suggestion for {insight.title}</p>
        </div>
      </div>
      <button onClick={onClose} className="text-sun-400 hover:text-white">
        <MoreHorizontal size={20} />
      </button>
    </div>

    <div className="grid grid-cols-2 gap-8 mb-8">
      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
        <span className="text-xs uppercase tracking-widest text-sun-400 mb-2 block">Current State</span>
        <p className="text-sm leading-relaxed text-sun-200">
          Project Alpha Phase 2 is currently sequenced linearly. Frontend resources are blocked waiting for Backend schema finalization.
        </p>
      </div>
      <div className="p-4 bg-white/5 rounded-lg border border-sun-accent/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-1 bg-sun-accent/20 rounded-bl-lg text-[10px] text-sun-accent font-bold px-2">PROPOSED</div>
        <span className="text-xs uppercase tracking-widest text-sun-400 mb-2 block">AI Modification</span>
        <p className="text-sm leading-relaxed text-white">
          Parallelize "Schema Setup" with "UI Shell Implementation". Shift "Database Migration" to Sprint 4 start.
        </p>
        <div className="mt-3 flex items-center gap-2 text-green-400 text-xs font-medium">
          <ArrowUpRight size={12} />
          <span>Velocity +15% Forecasted</span>
        </div>
      </div>
    </div>

    <div className="flex justify-end gap-3">
      <button 
        onClick={onClose}
        className="px-5 py-2.5 rounded-lg text-sm font-medium text-sun-300 hover:text-white hover:bg-white/5 transition-colors"
      >
        Dismiss
      </button>
      <button 
        onClick={onClose}
        className="px-5 py-2.5 rounded-lg text-sm font-medium bg-white text-sun-900 hover:bg-sun-50 transition-colors flex items-center gap-2"
      >
        <CheckCircle2 size={16} className="text-sun-accent" />
        Approve & Execute
      </button>
    </div>
  </div>
);

const Dashboard = () => {
  const [activeProposal, setActiveProposal] = useState<IntelligenceInsight | null>(null);
  const location = useLocation();
  const [highlightBlueprint, setHighlightBlueprint] = useState<string | null>(null);

  useEffect(() => {
    // Check for navigation state from CRM
    const state = location.state as { highlightBlueprintId?: string };
    if (state?.highlightBlueprintId) {
      setHighlightBlueprint(state.highlightBlueprintId);
      // Remove highlight after 2 seconds for a nice visual cue effect
      const timer = setTimeout(() => setHighlightBlueprint(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleAction = (insight: IntelligenceInsight) => {
    setActiveProposal(insight);
    // Smooth scroll to top to see modal
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="flex-1 min-w-[800px] flex flex-col h-screen overflow-y-auto">
        {/* Top Sticky Header (Optional per prompt, but good for title) */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 border-b border-sun-100 px-8 py-4 flex justify-between items-center">
          <h1 className="font-serif text-2xl font-medium text-sun-900">Dashboard</h1>
          <div className="text-sm text-sun-500 font-medium">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>

        <div className="p-8 pb-20">
          
          {/* Conditional Proposal Modal (triggered by Right Panel) */}
          {activeProposal && (
            <ApprovalModal insight={activeProposal} onClose={() => setActiveProposal(null)} />
          )}

          {/* 1. KPI Summary Cards */}
          <div className="grid grid-cols-4 gap-6 mb-12">
            <KPICard 
              label="Active Blueprints" 
              value="3" 
              sub="2 Stable" 
              highlighted={!!highlightBlueprint} 
            />
            <KPICard label="Active Projects" value="2" sub="On Track" />
            <KPICard label="Tasks Due" value="7" sub="This week" />
            <KPICard label="Overall Risk" value="Med" alert={true} />
          </div>

          <div className="flex gap-12">
            {/* 2. Recent Activity Timeline */}
            <div className="flex-1">
              <div className="flex justify-between items-end mb-6">
                <h2 className="font-serif text-xl text-sun-900">Recent Activity</h2>
                <button className="text-sm text-sun-500 hover:text-sun-900">View all</button>
              </div>
              <div className="pl-2">
                <TimelineItem title="Blueprint generated for Startup CRM" type="normal" time="2 hours ago" />
                <TimelineItem title="Project Alpha created" type="normal" time="5 hours ago" />
                <TimelineItem title="Risk Detected: Velocity Drop" type="alert" time="Yesterday" />
                <TimelineItem title="Task 'Set up Supabase schema' completed" type="normal" time="Yesterday" />
                <TimelineItem title="Monthly Report generated" type="normal" time="2 days ago" />
              </div>
            </div>

            {/* 3. Quick Actions */}
            <div className="w-72 flex-shrink-0">
              <h2 className="font-serif text-xl text-sun-900 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <button className={`w-full text-left px-4 py-4 rounded-lg border bg-white transition-all flex items-center justify-between group ${highlightBlueprint ? 'border-sun-accent shadow-md' : 'border-sun-200 hover:border-sun-300 hover:shadow-sm'}`}>
                  <span className="text-sm font-medium text-sun-700">View Blueprint</span>
                  <FileText size={16} className={`group-hover:text-sun-600 ${highlightBlueprint ? 'text-sun-accent' : 'text-sun-400'}`} />
                </button>
                <button className="w-full text-left px-4 py-4 rounded-lg border border-sun-200 bg-white hover:border-sun-300 hover:shadow-sm transition-all flex items-center justify-between group">
                  <span className="text-sm font-medium text-sun-700">Generate Update</span>
                  <RefreshCw size={16} className="text-sun-400 group-hover:text-sun-600" />
                </button>
                <button 
                  onClick={() => alert("Simulating AI Inquiry...")}
                  className="w-full text-left px-4 py-4 rounded-lg border border-sun-200 bg-gradient-to-br from-sun-50 to-white hover:border-sun-300 hover:shadow-sm transition-all flex items-center justify-between group"
                >
                  <span className="text-sm font-medium text-sun-900">Ask AI</span>
                  <Sparkles size={16} className="text-sun-accent" />
                </button>
              </div>
            </div>
          </div>

          {/* Additional visual filler for 'Work Canvas' feel */}
          <div className="mt-12 pt-8 border-t border-sun-100">
             <div className="flex items-center gap-4 mb-6">
                <h2 className="font-serif text-xl text-sun-900">Project Velocity</h2>
                <span className="px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">+12% vs last week</span>
             </div>
             {/* Abstract CSS Chart to represent data visualization without heavy library */}
             <div className="h-48 flex items-end gap-2">
                {[40, 65, 45, 80, 55, 70, 85].map((h, i) => (
                   <div key={i} className="flex-1 bg-sun-100 hover:bg-sun-200 transition-colors rounded-t-sm relative group" style={{ height: `${h}%` }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-sun-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {h}%
                      </div>
                   </div>
                ))}
             </div>
             <div className="flex justify-between mt-2 text-xs text-sun-400 font-sans">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
             </div>
          </div>
        </div>
      </div>
      
      {/* Right Intelligence Panel */}
      <IntelligencePanel onAction={handleAction} />
    </>
  );
};

export default Dashboard;