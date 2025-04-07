import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

const STORAGE_KEY = 'subscriptions_data';

export type Subscription = {
  id: string;
  name: string;
  plan: string;
  amount: number;
  billingCycle: string;
  date: string;
  category: string;
  color?: string;
  logo?: string;
};

type State = {
  subscriptions: Subscription[];
  loadSubscriptions: () => Promise<void>;
  addSubscription: (sub: Subscription) => void;
  updateSubscription: (sub: Subscription) => void;
  deleteSubscription: (id: string) => void;
};

export const useSubscriptionStore = create<State>((set, get) => ({
  subscriptions: [],

  loadSubscriptions: async () => {
    const saved = await SecureStore.getItemAsync(STORAGE_KEY);
    if (saved) {
      set({ subscriptions: JSON.parse(saved) });
    }
  },

  addSubscription: (sub: Subscription) => {
    const updated = [...get().subscriptions, sub];
    set({ subscriptions: updated });
    SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(updated));
  },

  updateSubscription: (sub: Subscription) => {
    const updated = get().subscriptions.map((s) =>
      s.id === sub.id ? sub : s
    );
    set({ subscriptions: updated });
    SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(updated));
  },

  deleteSubscription: (id: string) => {
    const updated = get().subscriptions.filter((s) => s.id !== id);
    set({ subscriptions: updated });
    SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(updated));
  },
}));
