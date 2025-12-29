
export interface KPI {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  alert?: boolean;
}

export interface ActivityItem {
  id: string;
  type: 'blueprint' | 'project' | 'task';
  description: string;
  timestamp: string;
}

export interface IntelligenceInsight {
  id: string;
  type: 'risk' | 'recommendation' | 'action';
  title: string;
  description: string;
  impact?: string;
  why?: string;
  actionLabel: string;
}

export interface Blueprint {
  id: string;
  name: string;
  status: 'active' | 'draft' | 'archived';
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  company: string;
  blueprintId: string;
  blueprintName: string;
  blueprintHealth?: 'Healthy' | 'At Risk' | 'On Track';
  status: 'Active' | 'In Review' | 'Archived';
  lastContact: string;
  email: string;
  avatar: string;
  sentimentScore?: number;
  enrichedData?: {
    industry: string;
    recentNews: string;
    location: string;
    source: string;
  };
}

export interface Interaction {
  id: string;
  type: 'email' | 'call' | 'meeting';
  notes: string;
  date: string;
}

// --- Projects System Types ---

export interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'blocked';
}

export interface Project {
  id: string;
  title: string;
  client: string;
  status: 'On Track' | 'At Risk' | 'Delayed' | 'Completed';
  progress: number; // 0-100
  dueDate: string;
  team: string[]; // Avatar initials
  taskStats: {
    total: number;
    completed: number;
  };
  nextMilestone: Milestone;
  riskFactor?: {
    level: 'Low' | 'Medium' | 'High';
    reason?: string;
  };
}

// --- Planner Agent Types ---

export interface ProjectTask {
  id: string;
  title: string;
  duration: string;
  role: string;
}

export interface ProjectPhase {
  id: string;
  title: string;
  tasks: ProjectTask[];
}

export interface ProjectPlan {
  goal: string;
  deadline: string;
  phases: ProjectPhase[];
}

// --- Wizard Types ---

export interface RiskFactor {
  id: string;
  category: string;
  probability: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  mitigation: string;
}

export interface WizardBlueprint {
  // Step 1: Basics
  identity: {
    projectName: string;
    clientName: string;
    website: string;
  };
  // Step 2: Overview
  intent: {
    type: 'Web' | 'Mobile' | 'Marketing' | 'Integration' | '';
    industry: string;
    goals: string[]; // e.g., "Increase conversion", "Launch MVP"
    integrations: string[]; // e.g., "Stripe", "Supabase"
  };
  // Step 3: Constraints
  constraints: {
    budget: number;
    currency: string;
    deadline: string;
    urgency: 'Low' | 'Medium' | 'High';
  };
  // Step 5: AI Generated Artifacts
  artifacts?: {
    wbs?: ProjectPhase[];
    riskAnalysis?: RiskFactor[];
    estimatedTimeline?: number; // days
  };
  meta: {
    step: number;
    lastUpdated: string;
    status: 'draft' | 'processing' | 'ready' | 'committed';
  };
}
