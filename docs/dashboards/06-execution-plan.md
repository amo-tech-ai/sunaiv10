
# 🏗️ Execution Plan Module: The Operational Cockpit

**Route:** `/projects/:projectId/execution-plan`
**Theme:** "Operational Clarity & Safety"
**Purpose:** The final gate where Strategy (Intelligence) becomes Action (Execution).

---

## 1. Gemini 3 Feature Matrix

This table maps the specific capabilities of the Gemini 3 API to the functional requirements of the Execution Plan.

| Feature / Tool | Model | Agent Archetype | Usage in Execution Plan |
| :--- | :--- | :--- | :--- |
| **Gemini 3 Pro** | `gemini-3-pro-preview` | **The Orchestrator** | **Complex Reasoning:** Resolving dependency conflicts in the timeline (e.g., "Task B cannot start because Agent X is blocked"). |
| **Gemini 3 Flash** | `gemini-3-flash-preview` | **The Comms Lead** | **High-Frequency Updates:** Real-time generation of task status logs, commit messages, and notification text. |
| **Thinking Config** | `thinkingConfig` | **The Planner** | **Re-Sequencing:** When a delay occurs, the Planner "thinks" through the ripple effects on the critical path before suggesting a new schedule. |
| **Function Calling** | `tools: [functions]` | **The Orchestrator** | **System Action:** Actually executing the plan. Maps LLM intent to code: `activateAgent(id)`, `pauseWorkflow(id)`, `sendNotification()`. |
| **Grounding (Search)** | `tools: [googleSearch]` | **The Analyst** | **External Verification:** Checking vendor status (e.g., "Is Stripe API down?") or regulatory updates before running a workflow. |
| **Code Execution** | `tools: [codeExecution]` | **The Analyst** | **Precise Calculation:** Computing exact burn rates, remaining budget, and Schedule Performance Index (SPI) without hallucinations. |
| **Structured Outputs** | `responseSchema` | **The Controller** | **Data Integrity:** Ensuring the Execution Plan is saved as valid, type-safe JSON that the frontend can render without crashing. |
| **Interactions API** | `sessions` | **All Agents** | **State Continuity:** Maintaining the context of the execution "session" so agents remember previous failures or user overrides. |

---

## 2. Agent Roles in Execution

| Agent | Role | Responsibility |
| :--- | :--- | :--- |
| **Orchestrator** | *The Conductor* | Coordinates handoffs between tasks and other agents. Detects stalls. |
| **Planner** | *The Architect* | Updates the Gantt chart/Timeline when reality diverges from the plan. |
| **Analyst** | *The Watchdog* | Monitors risks, budget burn, and external dependencies. |
| **Content/Comms** | *The Scribe* | Drafts all human-facing outputs (emails, reports, alerts). |
| **Controller** | *The Gatekeeper* | **Human Proxy.** Enforces safety limits. Prevents auto-execution of high-risk actions. |

---

## 3. UI/UX Layout Specifications

### Panel A: Navigation (256px)
*   Back to Project Intelligence.
*   Version History (v1, v2, v3).
*   **Safety Lock:** Visual indicator if the plan is "Active" vs "Draft".

### Panel B: Execution Canvas (Center)
*   **Header:** Plan ID, Owner, Risk Level.
*   **Tabs:**
    1.  **Tasks:** Kanban or List view of the WBS.
    2.  **Agents:** Live monitor of active Agent Swarms (Idle/Running).
    3.  **Automations:** Trigger/Action rules engine status.
    4.  **Timeline:** Visual Gantt chart.

### Panel C: Control Center (320px)
*   **Sticky Header:** "Activate Plan" / "Pause Execution".
*   **Live Audit Log:** Streaming text of system actions.
*   **Safety:** Explicit warnings ("Actions here affect live systems").

---

## 4. Action Logic

1.  **Draft State:** Users can edit tasks, assign agents, and toggle automations. No real-world actions occur.
2.  **Activation:** User clicks "Activate Plan".
    *   System locks the plan version.
    *   Agents transition from `Idle` -> `Running`.
    *   Orchestrator begins evaluating Task 1 dependencies.
3.  **Execution:**
    *   If Task 1 is "Generate Proposal" (assigned to Comms Agent):
    *   Orchestrator calls Comms Agent -> Comms Agent generates text -> Controller waits for Human Approval -> Task Done.

---

## 5. Data Object: `ExecutionPlan`

```typescript
{
  id: "exec-123",
  projectId: "proj-alpha",
  version: 1,
  status: "active", // The master switch
  riskLevel: "Low",
  tasks: [
    { id: "t1", title: "Setup Repo", assignedTo: "Agent: Ops", status: "done" },
    { id: "t2", title: "Draft Content", assignedTo: "Agent: Comms", status: "in-progress" }
  ],
  agents: [
    { id: "a1", name: "The Researcher", status: "idle" },
    { id: "a2", name: "The Comms Lead", status: "running" }
  ],
  auditLog: [
    { timestamp: "10:00", actor: "User", action: "Activated Plan" },
    { timestamp: "10:01", actor: "Orchestrator", action: "Triggered Task t2" }
  ]
}
```
