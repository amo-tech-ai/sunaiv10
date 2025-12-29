# Project Management Module Architecture

**Version:** 2.0 (Production Master)
**Route:** `/projects` & `/tasks`
**Theme:** "Quiet Execution"
**Goal:** Transform project management from administrative overhead into an AI-orchestrated flow of high-value decisions.

## 1. System Architecture

The PM module does not create new top-level routes. It enhances the existing `Projects` and `Tasks` views with deeply integrated AI agents.

### Routing Strategy: "Integrated Views"
*   **Reasoning:** The 3-panel layout relies on context. Keeping users in `/projects` allows the Right Panel (Intelligence) to maintain context of the active portfolio without reloading.
*   **Implementation:** Use internal state `viewMode` (e.g., `'grid' | 'kanban' | 'timeline'`) to switch views within the Main Panel.

### Gemini 3 Features & Agent Matrix

| Agent | Model | Config | Responsibility |
| :--- | :--- | :--- | :--- |
| **The Planner** | `gemini-3-pro-preview` | `thinkingBudget: 4000` | Breaks generic goals into WBS (Tasks) and dependencies. |
| **The Analyst** | `gemini-3-pro-preview` | `codeExecution: {}` | Calculates precise burn rates, ROI, and schedule variance (SPI/CPI). |
| **The Optimizer** | `gemini-3-pro-preview` | `thinkingBudget: 2000` | Detects resource conflicts (Gantt) and suggests shifts. |
| **The Retriever** | `gemini-3-flash-preview` | `googleSearch: {}` | Verifies vendor pricing and tech stack viability. |
| **The Controller** | **Human UI** | N/A | The Approval Gate. AI proposes plans; Humans commit them. |

## 2. UI/UX Layout Specifications

### Panel A: Navigation (Context)
*   **Context:** `Projects` or `Tasks` active state.
*   **Filters:** "My Tasks", "At Risk Projects", "High Value", "Design Team".
*   **Quick Actions:** "+ New Project" (Wizard), "+ Quick Task".

### Panel B: Work Surface (Execution)
*   **View 1: Portfolio Grid:** High-level cards with "Traffic Light" health indicators (Risk Pulse).
*   **View 2: Kanban Board:** Drag-and-drop tasks (Backlog -> Doing -> Review -> Done).
*   **View 3: Resource Timeline:** Gantt chart showing team overlaps (Conflict Detection).

### Panel C: Intelligence (Insight)
*   **Tab 1: Details:** Static metadata (Team, Budget, Files).
*   **Tab 2: Intelligence:**
    *   *Risk Score:* 0-100 (Calculated by Analyst).
    *   *Bottlenecks:* "Waiting on Client Approval since Tuesday."
    *   *Suggestions:* "Move deadline or add resource."
*   **Tab 3: Drafts:** AI-generated Briefs or Status Reports waiting for approval.

## 3. Workflow Logic

### Journey 1: The "Kickoff" (Planner Agent)
1.  **User** clicks "New Project" -> Opens Wizard.
2.  **User** inputs: "E-commerce launch for Maison Laurent. Deadline Nov 1."
3.  **Planner Agent** activates (`thinkingConfig`).
    *   *Thinking:* "E-com requires Design, Frontend, Backend, QA..."
4.  **UI** displays "Proposed Project Plan" in Panel C.
5.  **User** reviews, edits, and clicks **"Approve Plan"**.

### Journey 2: The "Firefight" (Risk Agent)
1.  **System** logs a task moved to "Blocked".
2.  **Risk Analyst** runs in background.
    *   *Logic:* Blocked task is on the Critical Path.
3.  **UI** updates Project Health from "Green" to "Amber".
4.  **Panel C** shows: "Risk: Critical Path blocked. Projected delay: 4 days."
5.  **Agent** suggests: "Email Vendor" or "Swap Resource".

## 4. Implementation Plan (Multistep Prompts)

Copy and paste these prompts sequentially to build the module.

### Phase 1: Project Dashboard Refinement
> **Prompt:** 
> "Refine the `Projects` page (`/projects`).
> 1. **UI Update:** Modify `ProjectCard` to accept a `ProjectAnalysis` object.
> 2. **Visuals:** Add a 'Risk Pulse' ring around the status dot if `riskScore > 70`.
> 3. **Interaction:** Ensure clicking a project sets `focus` state correctly to trigger the Right Panel.
> 4. **Right Panel:** Implement a 'Run Analysis' button state if no analysis exists. When clicked, simulate a loading state (The Analyst Agent) and then display a Risk Score (0-100) and 2 specific Bottlenecks."

### Phase 2: The Kanban Board (Execution)
> **Prompt:** 
> "Implement a Kanban Board view for tasks.
> 1. Create a `TasksPanel` component (placeholder for `/tasks`).
> 2. **Layout:** Horizontal scrolling columns: Backlog, In Progress, Review, Done.
> 3. **Cards:** Minimalist task cards showing Title, Assignee (Avatar), and Priority.
> 4. **Interaction:** Implement Drag-and-Drop (can use simple state swap or a library like dnd-kit if preferred, but keep it lightweight).
> 5. **Controller Gate:** Moving a task to 'Done' should trigger a subtle confetti effect (CSS animation) to reward progress."

### Phase 3: The Planner Agent (AI WBS)
> **Prompt:** 
> "Implement the 'Project Kickoff' Wizard.
> 1. Add a 'New Project' button in the Sidebar or Projects Toolbar.
> 2. **Wizard UI:** A simple modal asking for 'Project Goal' and 'Deadline'.
> 3. **Simulation:** On submit, trigger `The Planner` (Gemini 3 Pro mock).
>    - Display a 'Planning...' state (Thinking Budget simulation).
> 4. **Output:** In the Right Panel, display a 'Proposed Plan' list containing 3 Phases and 2-3 Tasks per phase.
> 5. **Action:** Add an 'Approve & Create' button that adds the project to the main grid."

### Phase 4: Resource Optimizer (Timeline)
> **Prompt:** 
> "Implement a 'Resource Timeline' visualization.
> 1. Add a view toggle in the Projects toolbar: 'Grid' | 'Timeline'.
> 2. **Timeline UI:** A Gantt-style chart with rows for Team Members (e.g., 'Dev Team', 'Design Team').
> 3. **Conflict Detection:** Highlight overlapping blocks in Red.
> 4. **Agent Logic:** Hovering a red block shows a tooltip: 'Conflict: Julian is double-booked'.
> 5. **Action:** Add a 'Resolve' button that simulates `The Optimizer` shifting one task by +2 days to clear the conflict."
