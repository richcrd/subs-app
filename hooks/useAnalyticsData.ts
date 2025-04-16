import { useMemo } from 'react';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import { calculateCategoryTotals } from '@/utils/calculateCategoryTotals';

interface Category {
    name: string;
    amount: number;
}

export function useAnalyticsData() {
    const { subscriptions } = useSubscriptionStore();

    const totalMonthly = useMemo(() => {
        return subscriptions.reduce((sum, sub) => sum + sub.amount, 0);
    }, [subscriptions]);

    const dynamicCategories: Category[] = useMemo(() => {
        return calculateCategoryTotals(subscriptions);
    }, [subscriptions]);

    const insights: string[] = useMemo(() => {
        return dynamicCategories
            .filter(cat => totalMonthly > 0 && (cat.amount / totalMonthly) * 100 >= 10)
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 3)
            .map(cat => {
                const percentage = ((cat.amount / totalMonthly) * 100).toFixed(1);
                return `La categoría "${cat.name}" representa el ${percentage}% de tus gastos mensuales.`;
            });
    }, [dynamicCategories, totalMonthly]);

    return {
        totalMonthly,
        dynamicCategories,
        insights,
    };
}
