# Projects Module: Execution Intelligence

**Route:** `/projects`
**Theme:** "Velocity & Risk Management"

## 1. System Architecture

The Projects dashboard monitors the execution of Blueprints. It uses a grid layout for high-level visibility and a dedicated Intelligence panel for deep-dive analysis.

### Agent Configuration (Gemini 3 Stack)

| Agent Archetype | Model | Config | Responsibility |
| :--- | :--- | :--- | :--- |
| **The Project Manager** | `gemini-3-pro-preview` | `thinkingConfig` | Analyzes task completion rates vs. deadlines to forecast delays. |
| **The Risk Analyst** | `gemini-3-flash-preview` | Temperature: 0.2 | Scans for "Scope Creep" and "Budget Drift" based on recent activity. |
| **The Resource Lead** | `gemini-3-flash-preview` | Standard | Suggests re-assigning tasks when a team member is overloaded. |

## 2. UI/UX Layout Specifications

### Panel A: Navigation & Context (256px)
*   **Global Sidebar:** Standard app navigation.
*   **Local Filters:** "Active", "At Risk", "Completed".

### Panel B: The Work Surface (Fluid Grid)
*   **Layout:** Responsive Grid (2 columns on tablet, 3 on wide screens).
*   **Card Design:**
    *   **Header:** Project Name + Status Badge.
    *   **Visual:** Progress Bar (Computed from closed/total tasks).
    *   **KPIs:** "Next Milestone", "Due Date", "Team Avatars".
    *   **Interaction:** Clicking a card opens the Intelligence Panel context.

### Panel C: Intelligence & Actions (320px)
Transformative context based on selection.

#### State 1: No Selection (Portfolio View)
*   **Portfolio Health:** "80% of projects are on track."
*   **Critical Alerts:** "Project Alpha is blocked."

#### State 2: Active Project (Detail View)
*   **Velocity Analysis:** "Velocity dropped 15% this week."
*   **Risk Card:** 
    *   **Alert:** "Scope Creep Detected."
    *   **Why:** "3 new features added to 'MVP' milestone in last 24h."
*   **Proposals:**
    *   [Re-baseline Schedule] -> Triggers Approval Modal.
    *   [Draft Status Report] -> Triggers Content Gen.

## 3. Workflow Logic

### The "Scope Creep" Detector
1.  **Trigger:** User adds new tasks to a finalized milestone.
2.  **AI Analysis:** Compares new task estimate against remaining buffer.
3.  **Output:** Risk Alert in Intelligence Panel. "Adding this task risks pushing launch by 3 days."
4.  **Action:** User clicks "Review Impact" -> Modal shows Gantt chart comparison.

### The "Status Report" Generator
1.  **Trigger:** "Draft Update" button.
2.  **Input:** Completed tasks, blocked tasks, recent decisions.
3.  **Output:** Bulleted summary in "Executive Brief" style.
