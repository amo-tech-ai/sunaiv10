
/**
 * Simulates 'The Scorer' agent using Gemini 3 Pro with Thinking Config.
 * Input: Contact ID / History
 * Output: Relationship Score & Reasoning
 */

export interface RelationshipMetrics {
  score: number;
  reason: string;
  trend: 'up' | 'down' | 'neutral';
}

export const calculateRelationshipScore = async (contactId: string): Promise<RelationshipMetrics> => {
  return new Promise((resolve) => {
    // Simulate 1.5s 'Thinking' time for analysis
    setTimeout(() => {
      // Mock logic matching the CRM mock data
      if (contactId === '2') { // Sarah Kim (At Risk)
        resolve({
          score: 45,
          reason: "Client expressed concern about timeline in last email (2 days ago). Engagement frequency dropped by 40% compared to last month.",
          trend: 'down'
        });
      } else if (contactId === '4') { // Emma Davis (Archived)
        resolve({
          score: 10,
          reason: "No interaction recorded in >30 days. Project status is Archived.",
          trend: 'neutral'
        });
      } else { // Others (Healthy)
        resolve({
          score: 82,
          reason: "Strong engagement patterns. Recent meeting notes indicate high satisfaction with Phase 1 deliverables.",
          trend: 'up'
        });
      }
    }, 1500);
  });
};
