import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, Trash2 } from 'lucide-react';
import { WizardBlueprint, ProjectPlan, Project } from '../types';
import { generateProjectPlan } from '../services/plannerAgent';
import { calculateFeasibility } from '../utils/wizardUtils';
import { saveWizardDraft, loadWizardDraft, clearWizardDraft } from '../services/storage';

// Components
import { StepBasics } from '../components/wizard/StepBasics';
import { StepOverview } from '../components/wizard/StepOverview';
import { StepConstraints } from '../components/wizard/StepConstraints';
import { StepReview } from '../components/wizard/StepReview';
import { StepArchitecting } from '../components/wizard/StepArchitecting';
import { StepProposal } from '../components/wizard/StepProposal';
import { WizardSidebar } from '../components/wizard/WizardSidebar';
import { LiveBlueprintPreview } from '../components/wizard/LiveBlueprintPreview';

const INITIAL_BLUEPRINT: WizardBlueprint = {
  identity: { projectName: '', clientName: '', website: '' },
  intent: { type: '', industry: '', goals: [], integrations: [] },
  constraints: { budget: 15000, currency: 'USD', deadline: '', urgency: 'Medium' },
  meta: { step: 1, lastUpdated: new Date().toISOString(), status: 'draft' }
};

const ProjectWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // AI State
  const [generatedPlan, setGeneratedPlan] = useState<ProjectPlan | null>(null);
  const [thoughts, setThoughts] = useState<string[]>([]);

  // Blueprint State
  const [blueprint, setBlueprint] = useState<WizardBlueprint>(INITIAL_BLUEPRINT);

  // 1. Load Draft on Mount
  useEffect(() => {
    const draft = loadWizardDraft();
    if (draft) {
      setBlueprint(draft);
      
      // Restore generated plan if it exists in artifacts
      if (draft.artifacts?.wbs) {
        setGeneratedPlan({
          goal: draft.intent.goals[0] || draft.identity.projectName,
          deadline: draft.constraints.deadline,
          phases: draft.artifacts.wbs
        });
        
        // If we have a plan, allow restoring to step 6, otherwise clamp to 4
        const savedStep = draft.meta.step || 1;
        setCurrentStep(savedStep === 6 ? 6 : Math.min(savedStep, 4));
      } else {
        // No plan? Clamp to max step 4 (Review)
        const safeStep = Math.max(1, Math.min(draft.meta.step || 1, 4)); 
        setCurrentStep(safeStep);
      }
    }
    setIsLoaded(true);
  }, []);

  // 2. Autosave Effect (Debounced)
  useEffect(() => {
    if (!isLoaded) return; // Don't save before initial load

    const timer = setTimeout(() => {
      setIsAutoSaving(true);
      
      const updatedBlueprint = {
        ...blueprint,
        meta: {
          ...blueprint.meta,
          step: currentStep,
          lastUpdated: new Date().toISOString()
        }
      };

      saveWizardDraft(updatedBlueprint);
      
      // Update local state timestamp without triggering loop (ref check handled by logic)
      setBlueprint(prev => ({ 
        ...prev, 
        meta: { ...prev.meta, lastUpdated: new Date().toISOString() } 
      }));

      setTimeout(() => setIsAutoSaving(false), 800);
    }, 2000);

    return () => clearTimeout(timer);
    // Dependencies: Only save when ACTUAL data changes, not every render
  }, [
    blueprint.identity, 
    blueprint.intent, 
    blueprint.constraints, 
    blueprint.artifacts, // Include artifacts in dependency to save plan
    currentStep, 
    isLoaded
  ]);

  // Calculate Feasibility (Memoized)
  const feasibilityScore = useMemo(() => 
    calculateFeasibility(
      blueprint.constraints.budget, 
      blueprint.constraints.deadline, 
      blueprint.constraints.urgency
    ), 
    [blueprint.constraints]
  );

  // Handlers
  const updateIdentity = (field: string, value: string) => {
    setBlueprint(prev => ({
      ...prev,
      identity: { ...prev.identity, [field]: value }
    }));
  };

  const updateIntent = (field: string, value: any) => {
    setBlueprint(prev => ({
      ...prev,
      intent: { ...prev.intent, [field]: value }
    }));
  };

  const updateConstraints = (field: string, value: any) => {
    setBlueprint(prev => ({
      ...prev,
      constraints: { ...prev.constraints, [field]: value }
    }));
  };

  const handleDiscard = () => {
    if (window.confirm('Are you sure you want to discard this draft? This cannot be undone.')) {
      clearWizardDraft();
      setBlueprint(INITIAL_BLUEPRINT);
      setCurrentStep(1);
      setGeneratedPlan(null);
    }
  };

  // Generate Plan Handler
  const handleGeneratePlan = async () => {
    setCurrentStep(5);
    setThoughts([]);
    
    try {
      // Simulate thinking stream
      const plan = await generateProjectPlan(
        blueprint.intent.goals[0] || blueprint.identity.projectName,
        blueprint.constraints.deadline,
        (thought) => setThoughts(prev => [...prev, thought])
      );
      
      setGeneratedPlan(plan);
      
      // Save generated plan to blueprint artifacts so it persists on reload
      setBlueprint(prev => ({
        ...prev,
        artifacts: {
          ...prev.artifacts,
          wbs: plan.phases,
          estimatedTimeline: 30 // Mock estimate
        }
      }));

      // Add small delay to let user see final thought
      setTimeout(() => {
        setCurrentStep(6); 
      }, 1000);
    } catch (error) {
      console.error("Planning failed:", error);
      alert("The AI Architect encountered an error. Please try again.");
      setCurrentStep(4); // Go back to review
    }
  };

  // Approval Handler
  const handleApprove = () => {
    if (!generatedPlan) return;

    // Convert Wizard Artifacts into a Production Project Entity
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: blueprint.identity.projectName,
      client: blueprint.identity.clientName || 'Internal',
      status: 'On Track',
      progress: 0,
      dueDate: blueprint.constraints.deadline,
      team: ['AI', 'ME'], // Initial team
      taskStats: {
        total: generatedPlan.phases.reduce((acc, p) => acc + p.tasks.length, 0),
        completed: 0
      },
      nextMilestone: {
        id: generatedPlan.phases[0]?.id || 'm-init',
        title: generatedPlan.phases[0]?.title || 'Project Kickoff',
        dueDate: new Date().toISOString().split('T')[0], 
        status: 'pending'
      }
    };

    // Clean up storage before navigating
    clearWizardDraft();

    // Navigate to Projects page with the new project in state
    navigate('/projects', { state: { newProject } });
  };

  // Stats Calculation for Step 6 Right Panel
  const finalStats = useMemo(() => {
    if (!generatedPlan) return null;
    
    // Calculate total tasks
    const totalTasks = generatedPlan.phases.reduce((acc, phase) => acc + phase.tasks.length, 0);
    
    // Calculate unique roles (approx team size)
    const uniqueRoles = new Set<string>();
    generatedPlan.phases.forEach(p => p.tasks.forEach(t => uniqueRoles.add(t.role)));
    
    // Calculate est weeks (rough duration)
    const deadlineDate = new Date(generatedPlan.deadline);
    const today = new Date();
    // Default to 4 weeks if date is invalid or in past/too close
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const weeks = timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 60 * 60 * 24 * 7)) : 4;

    return {
      tasks: totalTasks,
      teamSize: uniqueRoles.size,
      durationWeeks: weeks,
      budget: blueprint.constraints.budget
    };
  }, [generatedPlan, blueprint.constraints.budget]);

  // Validation Logic
  const canProceed = () => {
    if (currentStep === 1) return !!blueprint.identity.projectName;
    if (currentStep === 2) return !!blueprint.intent.type;
    if (currentStep === 3) return !!blueprint.constraints.deadline && blueprint.constraints.budget > 0;
    if (currentStep === 4) return true; // Review step acts as confirmation
    return false;
  };

  if (!isLoaded) return null; // Prevent flash of default state before load

  return (
    <div className="flex h-screen bg-sun-50 text-sun-900 font-sans">
      
      {/* 1. Left Nav (Progress) */}
      <WizardSidebar 
        currentStep={currentStep} 
        isAutoSaving={isAutoSaving} 
        lastUpdated={blueprint.meta.lastUpdated} 
      />

      {/* 2. Center Canvas (Form) */}
      <div className="flex-1 flex flex-col relative">
         <div className="flex-1 overflow-y-auto p-8 md:p-12 pb-32">
            <div className="max-w-2xl mx-auto h-full">
               {currentStep === 1 && (
                  <StepBasics 
                    data={blueprint.identity} 
                    onChange={updateIdentity} 
                    onScanning={setIsScanning}
                  />
               )}
               {currentStep === 2 && (
                  <StepOverview 
                    data={blueprint.intent} 
                    onChange={updateIntent}
                  />
               )}
               {currentStep === 3 && (
                 <StepConstraints 
                   data={blueprint.constraints}
                   onChange={updateConstraints}
                 />
               )}
               {currentStep === 4 && (
                 <StepReview 
                   blueprint={blueprint}
                   onEditStep={setCurrentStep}
                 />
               )}
               {currentStep === 5 && (
                 <StepArchitecting thoughts={thoughts} />
               )}
               {currentStep === 6 && generatedPlan && (
                 <StepProposal 
                   plan={generatedPlan}
                   onRefine={() => setCurrentStep(2)}
                   onApprove={handleApprove}
                 />
               )}
            </div>
         </div>

         {/* Navigation Bar (Hidden on Step 6 as it uses custom Floating Action Bar) */}
         {currentStep < 5 && (
           <div className="absolute bottom-0 left-0 w-full p-6 bg-white/80 backdrop-blur-md border-t border-sun-200 flex justify-between items-center z-10">
              <div className="flex gap-4">
                <button 
                   onClick={() => currentStep > 1 ? setCurrentStep(c => c - 1) : navigate('/projects')}
                   className="px-6 py-2.5 rounded-lg text-sun-600 hover:bg-sun-50 font-medium text-sm flex items-center gap-2 transition-colors"
                >
                   <ArrowLeft size={16} /> Back
                </button>
                {currentStep > 1 && (
                  <button 
                     onClick={handleDiscard}
                     className="px-4 py-2.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 font-medium text-sm flex items-center gap-2 transition-colors"
                     title="Discard Draft"
                  >
                     <Trash2 size={16} />
                  </button>
                )}
              </div>
              
              <button 
                 onClick={() => currentStep === 4 ? handleGeneratePlan() : setCurrentStep(c => c + 1)}
                 className="px-8 py-2.5 rounded-lg bg-sun-900 text-white hover:bg-sun-800 font-medium text-sm flex items-center gap-2 shadow-lg shadow-sun-900/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                 disabled={!canProceed()}
              >
                 {currentStep === 4 ? (
                   <>
                     <Sparkles size={16} /> Generate Execution Plan
                   </>
                 ) : (
                   <>Next Step <ArrowRight size={16} /></>
                 )}
              </button>
           </div>
         )}
      </div>

      {/* 3. Right Preview (Live Blueprint) */}
      <LiveBlueprintPreview 
        currentStep={currentStep}
        blueprint={blueprint}
        isScanning={isScanning}
        feasibilityScore={feasibilityScore}
        finalStats={finalStats}
      />
    </div>
  );
};

export default ProjectWizard;