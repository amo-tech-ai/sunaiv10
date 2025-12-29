import { ProjectPlan, ProjectPhase } from '../types';

/**
 * PRODUCTION NOTE:
 * This service simulates the behavior of the Gemini 3 Pro model.
 * In a real backend, this would make a POST request to your API.
 */

// Sequence of AI "Thoughts" to display in the UI during processing
const THINKING_STEPS = [
  "Analyzing semantic intent...",
  "Retrieving industry templates...",
  "Identifying core phases...",
  "Estimating critical path dependencies...",
  "Optimizing resource allocation...",
  "Finalizing Work Breakdown Structure..."
];

/**
 * Simulates the Gemini 3 Pro "Thinking" process and Structured JSON Output.
 * Includes a callback for streaming "thoughts" to the UI.
 */
export const generateProjectPlan = async (
  goal: string, 
  deadline: string,
  onThought?: (thought: string) => void
): Promise<ProjectPlan> => {
  return new Promise((resolve, reject) => {
    // Basic validation
    if (!goal || !deadline) {
      reject(new Error("Missing goal or deadline"));
      return;
    }

    let step = 0;

    const interval = setInterval(() => {
      // 10% random chance of simulated network stutter (adds realism)
      if (Math.random() > 0.9) return; 

      if (step < THINKING_STEPS.length) {
        if (onThought) onThought(THINKING_STEPS[step]);
        step++;
      } else {
        clearInterval(interval);
        // Finalize
        const plan = constructPlanFromContext(goal, deadline);
        resolve(plan);
      }
    }, 800); 
  });
};

/**
 * Contextual Logic to simulate LLM understanding of different industries.
 * This function acts as the "Mock LLM".
 */
const constructPlanFromContext = (goal: string, deadline: string): ProjectPlan => {
  const lowerGoal = goal.toLowerCase();
  let phases: ProjectPhase[] = [];

  // 1. Software / Tech Context
  if (lowerGoal.match(/(app|software|platform|website|tech|api|saas)/)) {
    phases = [
      {
        id: 'p1',
        title: 'Discovery & Architecture',
        tasks: [
          { id: 't1', title: 'Technical Requirements Doc', duration: '5 days', role: 'Tech Lead' },
          { id: 't2', title: 'Database Schema Design', duration: '3 days', role: 'Backend Engineer' },
          { id: 't3', title: 'UI/UX Wireframes', duration: '1 week', role: 'Product Designer' }
        ]
      },
      {
        id: 'p2',
        title: 'Development Sprint 1',
        tasks: [
          { id: 't4', title: 'Authentication System', duration: '4 days', role: 'Backend Engineer' },
          { id: 't5', title: 'Frontend Component Library', duration: '1 week', role: 'Frontend Engineer' },
          { id: 't6', title: 'API Integration', duration: '3 days', role: 'Full Stack Dev' }
        ]
      },
      {
        id: 'p3',
        title: 'QA & Deployment',
        tasks: [
          { id: 't7', title: 'Unit Testing & Bug Fixes', duration: '3 days', role: 'QA Specialist' },
          { id: 't8', title: 'Production Deployment', duration: '1 day', role: 'DevOps Engineer' }
        ]
      }
    ];
  } 
  // 2. Marketing / Creative Context
  else if (lowerGoal.match(/(marketing|campaign|brand|launch|video|content)/)) {
    phases = [
      {
        id: 'p1',
        title: 'Strategy & Concept',
        tasks: [
          { id: 't1', title: 'Market Research & Persona Dev', duration: '1 week', role: 'Strategist' },
          { id: 't2', title: 'Campaign Key Messaging', duration: '3 days', role: 'Copywriter' },
          { id: 't3', title: 'Moodboard & Visual Direction', duration: '2 days', role: 'Art Director' }
        ]
      },
      {
        id: 'p2',
        title: 'Content Production',
        tasks: [
          { id: 't4', title: 'Social Media Asset Design', duration: '1 week', role: 'Designer' },
          { id: 't5', title: 'Video Scripting & Storyboard', duration: '4 days', role: 'Creative Lead' },
          { id: 't6', title: 'Blog & Email Copy', duration: '3 days', role: 'Copywriter' }
        ]
      },
      {
        id: 'p3',
        title: 'Distribution & Analytics',
        tasks: [
          { id: 't7', title: 'Ad Manager Setup', duration: '2 days', role: 'Growth Marketer' },
          { id: 't8', title: 'Launch Day Coordination', duration: '1 day', role: 'Project Manager' }
        ]
      }
    ];
  } 
  // 3. Generic / Operations Context
  else {
    phases = [
      {
        id: 'p1',
        title: 'Planning & Initiation',
        tasks: [
          { id: 't1', title: 'Define Objectives & KPIs', duration: '2 days', role: 'Project Manager' },
          { id: 't2', title: 'Stakeholder Kickoff Meeting', duration: '1 day', role: 'Project Manager' },
          { id: 't3', title: 'Resource Allocation', duration: '1 day', role: 'Ops Lead' }
        ]
      },
      {
        id: 'p2',
        title: 'Execution Phase',
        tasks: [
          { id: 't4', title: 'Core Deliverable Draft', duration: '1 week', role: 'Specialist' },
          { id: 't5', title: 'Internal Review Cycle', duration: '3 days', role: 'Team Lead' },
          { id: 't6', title: 'Revisions & Refinement', duration: '3 days', role: 'Specialist' }
        ]
      },
      {
        id: 'p3',
        title: 'Closure',
        tasks: [
          { id: 't7', title: 'Final Delivery', duration: '1 day', role: 'Project Manager' },
          { id: 't8', title: 'Project Retrospective', duration: '2 hours', role: 'Project Manager' }
        ]
      }
    ];
  }

  return {
    goal,
    deadline,
    phases
  };
};
