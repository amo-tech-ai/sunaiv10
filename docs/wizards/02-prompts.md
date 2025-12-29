# 🧙‍♂️ Wizard Build Protocol: Multistep Prompts

**System:** Sun AI Agency
**Module:** Project Kickoff Wizard
**Status:** Complete

---

## 📊 Progress Tracker

| Phase | Prompt | Component(s) | Status |
| :--- | :--- | :--- | :--- |
| **1** | [The Skeleton & State](#prompt-1-the-skeleton--state) | `ProjectWizard.tsx` (Layout, State) | ✅ **Completed** |
| **2** | [Inputs: Basics & Overview](#prompt-2-steps-1--2-inputs) | `StepBasics`, `StepOverview` | ✅ **Completed** |
| **3** | [Constraints & Logic](#prompt-3-step-3-constraints--validation) | `StepConstraints`, `StepReview` | ✅ **Completed** |
| **4** | [The Planner Agent](#prompt-4-step-5-the-planner-agent--gemini-3) | `StepArchitecting`, `projectGenerator.ts` | ✅ **Completed** |
| **5** | [Proposal & Commit](#prompt-5-step-6-proposal--commit) | `StepProposal`, Commit Logic | ✅ **Completed** |

---

## 🛠️ Execution Prompts

All prompts have been executed successfully.

### Prompt 5: Step 6 (Proposal & Commit)
**Goal:** Display the generated result and finalize the project creation.

```markdown
**Task:** Implement Step 6 (Proposal) and Project Creation logic.

**1. Create `StepProposal` Component:**
   - **Header:** "Here is your Execution Blueprint."
   - **Content:** Render the generated `ProjectPlan` (Phases & Tasks) in a clean, accordion-style or list view.
   - **Interactivity:** Allow users to "Uncheck" tasks they don't want (optional).
   - **Actions:** 
     - Secondary Button: "Refine" (Goes back to Step 2).
     - Primary Button: "Approve & Launch".

**2. Implement Commit Logic:**
   - In `pages/ProjectWizard.tsx`, create a `handleApprove()` function.
   - **Action:** 
     1. Construct a full `Project` object from the `WizardBlueprint` + `ProjectPlan`.
     2. Save this to a global state (or mock `console.log` and navigate).
     3. Navigate to `/projects` (or `/projects/:id`).
   
**3. Final Polish:**
   - Ensure the Right Panel on Step 6 displays the "Final Stats": Total Estimated Cost, Total Weeks, Team Size.
```

---

## 🧠 UX Best Practices Checklist

When implementing these steps, ensure:

*   **Responsive:** The layout collapses gracefully on smaller screens (hide Right Panel on mobile).
*   **Accessibility:** All form inputs have `aria-labels` and focus states.
*   **Error Handling:** If the "AI" fails (timeout), show a "Retry" button, don't leave the user stuck.
*   **Motion:** Use `animate-in fade-in` classes for smooth transitions between steps.
