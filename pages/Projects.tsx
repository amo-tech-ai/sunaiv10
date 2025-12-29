import React, { useState } from 'react';
import { Search, Filter, Plus, Briefcase } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Project, ProjectPlan } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectIntelligencePanel } from '../components/ProjectIntelligencePanel';

// --- Mock Data ---
const mockProjectsInitial: Project[] = [
  {
    id: '1',
    title: 'Alpha CRM Integration',
    client: 'StartupCo',
    status: 'At Risk',
    progress: 45,
    dueDate: '2025-10-24',
    team: ['SK', 'JL'],
    taskStats: { total: 24, completed: 10 },
    nextMilestone: { id: 'm1', title: 'Database Migration', dueDate: '2025-10-10', status: 'pending' },
    riskFactor: { level: 'High', reason: 'Scope Creep' }
  },
  {
    id: '2',
    title: 'Mobile App V2',
    client: 'TechFlow',
    status: 'On Track',
    progress: 72,
    dueDate: '2025-11-12',
    team: ['MC', 'ED', 'JL'],
    taskStats: { total: 40, completed: 29 },
    nextMilestone: { id: 'm2', title: 'User Testing', dueDate: '2025-10-15', status: 'pending' }
  },
  {
    id: '3',
    title: 'Website Redesign',
    client: 'Creative Inc',
    status: 'Delayed',
    progress: 20,
    dueDate: '2025-12-01',
    team: ['ED'],
    taskStats: { total: 15, completed: 3 },
    nextMilestone: { id: 'm3', title: 'Wireframe Approval', dueDate: '2025-09-30', status: 'blocked' }
  },
  {
    id: '4',
    title: 'Internal Analytics',
    client: 'Sun AI',
    status: 'On Track',
    progress: 90,
    dueDate: '2025-10-05',
    team: ['JL'],
    taskStats: { total: 10, completed: 9 },
    nextMilestone: { id: 'm4', title: 'Final Deployment', dueDate: '2025-10-05', status: 'pending' }
  }
];

const Projects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize projects with mock data AND any new project passed via router state
  const [projects, setProjects] = useState<Project[]>(() => {
    const initial = [...mockProjectsInitial];
    // Check for incoming project from Wizard
    if (location.state && location.state.newProject) {
      // Avoid duplicates if strict mode double-invokes or navigation persists
      if (!initial.some(p => p.id === location.state.newProject.id)) {
        initial.unshift(location.state.newProject);
      }
    }
    return initial;
  });

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Risk'>('All');
  
  // Planner State
  const [plannerState, setPlannerState] = useState<'idle' | 'generating' | 'review'>('idle');
  const [generatedPlan, setGeneratedPlan] = useState<ProjectPlan | null>(null);

  const selectedProject = projects.find(p => p.id === selectedProjectId) || null;

  // Filter Logic
  const filteredProjects = projects.filter(p => {
    if (filterStatus === 'Risk') return p.status === 'At Risk' || p.status === 'Delayed';
    if (filterStatus === 'Active') return p.status !== 'Completed';
    return true;
  });

  const handleApprovePlan = () => {
    if (!generatedPlan) return;
    
    // Create new project from internal planner (not wizard)
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      title: generatedPlan.goal.length > 30 ? generatedPlan.goal.substring(0, 30) + '...' : generatedPlan.goal,
      client: 'New Client', 
      status: 'On Track',
      progress: 0,
      dueDate: generatedPlan.deadline,
      team: ['ME'],
      taskStats: { total: generatedPlan.phases.reduce((acc, phase) => acc + phase.tasks.length, 0), completed: 0 },
      nextMilestone: { id: 'm-new', title: 'Phase 1: Kickoff', dueDate: 'Tomorrow', status: 'pending' }
    };

    setProjects([newProject, ...projects]);
    setPlannerState('idle');
    setGeneratedPlan(null);
    setSelectedProjectId(newProject.id); // Auto-select the new project
  };

  const handleDiscardPlan = () => {
    setPlannerState('idle');
    setGeneratedPlan(null);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Main Work Surface */}
      <div className="flex-1 flex flex-col min-w-0 bg-white h-screen overflow-hidden">
        
        {/* Header / Toolbar */}
        <div className="h-20 border-b border-sun-100 flex items-center justify-between px-8 flex-shrink-0 bg-white/50 backdrop-blur-sm z-10 sticky top-0">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-sun-100 text-sun-900 rounded-lg">
                 <Briefcase size={20} />
              </div>
              <h1 className="font-serif text-2xl text-sun-900">Projects</h1>
              <span className="px-2 py-0.5 bg-sun-50 text-sun-500 rounded-full text-xs font-medium border border-sun-100">
                {filteredProjects.length} Active
              </span>
           </div>

           <div className="flex items-center gap-3">
              <div className="relative">
                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-sun-400" />
                 <input 
                   type="text" 
                   placeholder="Search projects..." 
                   className="pl-9 pr-4 py-2 text-sm border border-sun-200 rounded-lg focus:outline-none focus:border-sun-400 w-64 bg-sun-50/50" 
                 />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 border border-sun-200 rounded-lg text-sm text-sun-600 hover:bg-sun-50 transition-colors bg-white">
                 <Filter size={16} /> Sort
              </button>
              <button 
                onClick={() => navigate('/projects/new')}
                className="flex items-center gap-2 px-4 py-2 bg-sun-900 text-white text-sm font-medium rounded-lg hover:bg-sun-800 transition-colors shadow-sm"
              >
                 <Plus size={16} /> New Project
              </button>
           </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-8 py-4 bg-white">
           <div className="flex gap-6 border-b border-sun-100">
              {['All', 'Active', 'Risk'].map((status) => (
                 <button 
                   key={status}
                   onClick={() => setFilterStatus(status as any)}
                   className={`pb-3 text-sm font-medium transition-colors relative ${
                     filterStatus === status 
                       ? 'text-sun-900' 
                       : 'text-sun-400 hover:text-sun-600'
                   }`}
                 >
                   {status} Projects
                   {filterStatus === status && (
                     <div className="absolute bottom-0 left-0 w-full h-0.5 bg-sun-900 rounded-t-full"></div>
                   )}
                 </button>
              ))}
           </div>
        </div>

        {/* Grid Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-sun-50/30">
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
              {filteredProjects.map(project => (
                 <ProjectCard 
                   key={project.id} 
                   project={project} 
                   isSelected={selectedProjectId === project.id}
                   onClick={() => {
                     setSelectedProjectId(project.id);
                     setPlannerState('idle'); // Exit planner mode if selecting existing project
                   }}
                 />
              ))}
           </div>
        </div>
      </div>

      {/* Right Intelligence Panel */}
      <ProjectIntelligencePanel 
        project={selectedProject} 
        plannerState={plannerState}
        generatedPlan={generatedPlan}
        onApprovePlan={handleApprovePlan}
        onDiscardPlan={handleDiscardPlan}
      />
    </div>
  );
};

export default Projects;