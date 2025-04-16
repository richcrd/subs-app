import { useEffect } from 'react';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';

export const useMonthlyTotal = () => {
  const { subscriptions, loadSubscriptions } = useSubscriptionStore();

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const total = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);

  return { subscriptions, total };
};
