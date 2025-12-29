import React from 'react';
import { Layout, Globe, Smartphone, Megaphone, Database, AlertTriangle, Sparkles, Activity, Layers, Gauge } from 'lucide-react';
import { WizardBlueprint } from '../../types';
import { formatCurrency } from '../../utils/wizardUtils';

interface LiveBlueprintPreviewProps {
  currentStep: number;
  blueprint: WizardBlueprint;
  isScanning: boolean;
  feasibilityScore: number;
  finalStats: {
    budget: number;
    durationWeeks: number;
    teamSize: number;
  } | null;
}

export const LiveBlueprintPreview: React.FC<LiveBlueprintPreviewProps> = ({ 
  currentStep, 
  blueprint, 
  isScanning, 
  feasibilityScore,
  finalStats
}) => {
  return (
    <div className="w-80 border-l border-sun-200 bg-sun-50/50 p-6 overflow-y-auto hidden xl:block">
      {currentStep === 5 ? (
        // Agent Swarm Activity View (Step 5)
        <div className="animate-in fade-in duration-500">
          <div className="mb-6 flex items-center gap-2 text-sun-900">
            <Activity size={18} className="text-sun-accent animate-pulse" />
            <h3 className="font-serif font-medium">Agent Swarm Active</h3>
          </div>
          <div className="space-y-3">
              <div className="p-3 bg-white border border-sun-200 rounded-lg flex items-center justify-between">
                <span className="text-xs font-semibold text-sun-700">The Planner</span>
                <span className="text-[10px] text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full animate-pulse">Active</span>
              </div>
              <div className="p-3 bg-white/50 border border-sun-200 rounded-lg flex items-center justify-between">
                <span className="text-xs font-semibold text-sun-400">Risk Analyst</span>
                <span className="text-[10px] text-sun-400 font-medium">Pending Output...</span>
              </div>
              <div className="p-3 bg-white/50 border border-sun-200 rounded-lg flex items-center justify-between">
                <span className="text-xs font-semibold text-sun-400">Resource Lead</span>
                <span className="text-[10px] text-sun-400 font-medium">Pending Output...</span>
              </div>
          </div>
        </div>
      ) : currentStep === 6 && finalStats ? (
        // Final Stats View (Step 6)
        <div className="animate-in fade-in duration-500">
          <div className="mb-6 flex items-center gap-2 text-sun-900">
            <Layers size={18} className="text-sun-900" />
            <h3 className="font-serif font-medium">Execution Snapshot</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-white border border-sun-200 rounded-xl shadow-sm">
              <p className="text-[10px] text-sun-400 uppercase tracking-wider mb-1">Total Estimated Cost</p>
              <p className="text-2xl font-serif text-sun-900">{formatCurrency(finalStats.budget)}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-sun-200 rounded-xl shadow-sm">
                <p className="text-[10px] text-sun-400 uppercase tracking-wider mb-1">Timeline</p>
                <p className="text-lg font-serif text-sun-900">{finalStats.durationWeeks} <span className="text-xs font-sans text-sun-500">Weeks</span></p>
              </div>
              <div className="p-4 bg-white border border-sun-200 rounded-xl shadow-sm">
                <p className="text-[10px] text-sun-400 uppercase tracking-wider mb-1">Team Size</p>
                <p className="text-lg font-serif text-sun-900">{finalStats.teamSize} <span className="text-xs font-sans text-sun-500">Roles</span></p>
              </div>
            </div>

            <div className="p-4 bg-sun-900 text-white rounded-xl shadow-md mt-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-sun-accent" />
                <span className="text-xs font-bold uppercase tracking-wider">Ready to Launch</span>
              </div>
              <p className="text-xs text-sun-300 leading-relaxed">
                The Planner has optimized this schedule for maximum efficiency. Approving now will instantiate the project dashboard.
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Standard Preview
        <>
          <div className="mb-6 flex items-center gap-2 text-sun-900">
            <Layout size={18} />
            <h3 className="font-serif font-medium">Blueprint Preview</h3>
          </div>

          <div className="space-y-4">
            {/* Identity Card */}
            <div className="bg-white border border-sun-200 rounded-lg p-4 shadow-sm transition-all duration-300">
                <div className="text-[10px] uppercase tracking-wider text-sun-400 font-semibold mb-2">Identity</div>
                {blueprint.identity.projectName ? (
                  <div className="animate-in fade-in slide-in-from-left-2">
                      <div className="font-serif text-lg text-sun-900 leading-tight mb-1">{blueprint.identity.projectName}</div>
                      <div className="text-sm text-sun-500">{blueprint.identity.clientName || 'No Client'}</div>
                      
                      {blueprint.identity.website && (
                        <div className="mt-3 pt-3 border-t border-sun-50 flex items-center gap-2 text-xs text-sun-500">
                            <Globe size={12} />
                            {isScanning ? (
                              <span className="text-sun-accent animate-pulse">Scanning website...</span>
                            ) : (
                              <span className="truncate max-w-[180px]">{blueprint.identity.website}</span>
                            )}
                        </div>
                      )}
                  </div>
                ) : (
                  <div className="text-sm text-sun-300 italic">Pending input...</div>
                )}
            </div>

            {/* Intent Card */}
            <div className={`bg-white border border-sun-200 rounded-lg p-4 shadow-sm transition-all duration-500 ${currentStep < 2 ? 'opacity-50 grayscale' : ''}`}>
                <div className="text-[10px] uppercase tracking-wider text-sun-400 font-semibold mb-2">Intent</div>
                
                {blueprint.intent.type || blueprint.intent.industry ? (
                  <div className="space-y-3 animate-in fade-in slide-in-from-left-2">
                      {blueprint.intent.type && (
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-sun-100 text-sun-700 rounded text-xs font-medium">
                            {blueprint.intent.type === 'Web' && <Layout size={12} />}
                            {blueprint.intent.type === 'Mobile' && <Smartphone size={12} />}
                            {blueprint.intent.type === 'Marketing' && <Megaphone size={12} />}
                            {blueprint.intent.type === 'Integration' && <Database size={12} />}
                            {blueprint.intent.type} Project
                        </div>
                      )}
                      
                      {blueprint.intent.industry && (
                        <div>
                            <div className="text-[10px] text-sun-400">Industry</div>
                            <div className="text-sm text-sun-900">{blueprint.intent.industry}</div>
                        </div>
                      )}

                      {blueprint.intent.goals.length > 0 && (
                        <div>
                            <div className="text-[10px] text-sun-400 mb-1">Goals</div>
                            <div className="flex flex-wrap gap-1.5">
                              {blueprint.intent.goals.map(g => (
                                  <span key={g} className="text-[10px] px-1.5 py-0.5 border border-sun-200 rounded text-sun-600">
                                    {g}
                                  </span>
                              ))}
                            </div>
                        </div>
                      )}
                  </div>
                ) : (
                  <div className="text-sm text-sun-300 italic">Pending input...</div>
                )}
            </div>

              {/* Constraints Card (Delivery Snapshot) */}
              <div className={`bg-white border border-sun-200 rounded-lg p-4 shadow-sm transition-all duration-500 ${currentStep < 3 ? 'opacity-50 grayscale' : ''}`}>
                <div className="text-[10px] uppercase tracking-wider text-sun-400 font-semibold mb-2">Delivery Snapshot</div>
                {blueprint.constraints.budget > 0 || blueprint.constraints.deadline ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-left-2">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-[10px] text-sun-400">Budget</p>
                          <p className="text-sm font-medium text-sun-900">{formatCurrency(blueprint.constraints.budget)}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-sun-400">Urgency</p>
                          <p className="text-sm font-medium text-sun-900">{blueprint.constraints.urgency}</p>
                        </div>
                    </div>

                    {/* Feasibility Indicator */}
                    <div className="pt-3 border-t border-sun-50">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-medium text-sun-500 flex items-center gap-1">
                            <Gauge size={10} /> Feasibility
                          </span>
                          <span className={`text-xs font-bold ${
                            feasibilityScore > 70 ? 'text-green-600' : 
                            feasibilityScore > 40 ? 'text-orange-600' : 'text-red-600'
                          }`}>
                            {feasibilityScore}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-sun-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${
                            feasibilityScore > 70 ? 'bg-green-500' : 
                            feasibilityScore > 40 ? 'bg-orange-500' : 'bg-red-500'
                            }`} 
                            style={{ width: `${feasibilityScore}%` }}
                          />
                        </div>
                        {feasibilityScore < 50 && (
                          <div className="mt-2 text-[10px] text-red-500 flex items-start gap-1 leading-tight">
                            <AlertTriangle size={10} className="shrink-0 mt-0.5" />
                            <span>Timeline is aggressive for this budget.</span>
                          </div>
                        )}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-sun-300 italic">Pending input...</div>
                )}
              </div>
          </div>
          
          <div className="mt-8 p-4 bg-sun-100/50 rounded-lg border border-sun-200">
            <div className="flex items-center gap-2 mb-2 text-sun-600">
                <Sparkles size={14} className="text-sun-accent" />
                <span className="text-xs font-bold uppercase tracking-wider">AI Architect</span>
            </div>
            <p className="text-xs text-sun-500 leading-relaxed">
                {currentStep === 4 
                  ? "I have reviewed your inputs. Click 'Generate Execution Plan' to let me architect the project."
                  : "I am passively observing. I will only construct the execution plan once you confirm all inputs in Step 4."
                }
            </p>
          </div>
        </>
      )}
    </div>
  );
};
