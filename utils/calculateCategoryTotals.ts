import { Subscription } from '@/types/Subscription';

export interface CategoryTotal {
    name: string;
    amount: number;
  }

export function calculateCategoryTotals(subscriptions: Subscription[]): CategoryTotal[] {
    const categoryMap: Record<string, number> = {};
  
    subscriptions.forEach(sub => {
      categoryMap[sub.category] = (categoryMap[sub.category] || 0) + sub.amount;
    });
  
    return Object.entries(categoryMap).map(([name, amount]) => ({ name, amount }));
  }
