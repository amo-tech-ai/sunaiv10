
/**
 * Simulates 'The Comms Lead' agent using Gemini 3 Flash.
 * Input: Context & Tone
 * Output: Email Draft
 */

export interface EmailDraftContext {
  recipientName: string;
  projectContext: string; // e.g., Blueprint Name
  lastInteractionTone: string;
  goal: string;
}

export interface EmailDraftResult {
  subject: string;
  body: string;
}

export const generateEmailDraft = async (ctx: EmailDraftContext): Promise<EmailDraftResult> => {
  return new Promise((resolve) => {
    // Simulate 2.5s generation time
    setTimeout(() => {
      const firstName = ctx.recipientName.split(' ')[0];
      
      resolve({
        subject: `Re: Timeline updates for ${ctx.projectContext}`,
        body: `Hi ${firstName},

I wanted to quickly circle back on our last conversation regarding the integration timeline. 

I've reviewed the latest velocity metrics from ${ctx.projectContext}, and I'm confident we can address the goal: "${ctx.goal}" effectively.

Let me know if you have 10 mins to review the updated Gantt chart this week.

Best,
[Your Name]`
      });
    }, 2500);
  });
};
