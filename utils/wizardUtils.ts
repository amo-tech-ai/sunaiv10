export const calculateFeasibility = (budget: number, deadline: string, urgency: string): number => {
  if (!budget || !deadline) return 0;
  
  const today = new Date();
  const dead = new Date(deadline);
  const diffTime = Math.abs(dead.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  let score = 100;

  // Budget penalty
  if (budget < 10000) score -= 20;
  else if (budget > 50000) score += 10;

  // Timeline penalty
  if (diffDays < 30) score -= 30;
  else if (diffDays > 90) score += 10;

  // Urgency penalty
  if (urgency === 'High') score -= 15;
  if (urgency === 'Low') score += 5;

  // Minimum score 0, Max 100
  return Math.min(Math.max(score, 0), 100);
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
};
