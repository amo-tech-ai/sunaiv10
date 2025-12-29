
import { Contact } from '../types';

/**
 * Simulates 'The Researcher' agent using Gemini 3 Flash + Google Search Grounding.
 * Input: Company Name
 * Output: Structured Enrichment Data
 */
export const enrichCompanyProfile = async (companyName: string): Promise<NonNullable<Contact['enrichedData']>> => {
  return new Promise((resolve) => {
    // Simulate 2s latency for Search Tool execution
    setTimeout(() => {
      // Deterministic mocks for demo consistency
      if (companyName.toLowerCase().includes('startup')) {
        resolve({
          industry: "SaaS / B2B Infrastructure",
          recentNews: "StartupCo recently closed a $5M Seed round led by Index Ventures to expand their developer platform.",
          location: "New York, NY",
          source: "Google Search"
        });
      } else if (companyName.toLowerCase().includes('tech')) {
        resolve({
          industry: "Enterprise Software",
          recentNews: "TechFlow announces strategic partnership with Microsoft Azure to accelerate cloud migration services.",
          location: "Austin, TX",
          source: "Google Search"
        });
      } else if (companyName.toLowerCase().includes('creative')) {
        resolve({
          industry: "Digital Design Agency",
          recentNews: "Creative Inc won the 'Agency of the Year' award at the 2024 Digital Design Awards.",
          location: "Los Angeles, CA",
          source: "Google Search"
        });
      } else {
        // Fallback generic response
        resolve({
          industry: "Technology Services",
          recentNews: `${companyName} featured in TechCrunch for innovative AI adoption strategies in Q3.`,
          location: "San Francisco, CA",
          source: "Google Search"
        });
      }
    }, 2000); 
  });
};
