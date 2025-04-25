import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { Subscription } from '@/types/Subscription';

const STORAGE_KEY = 'subscriptions_store';

type State = {
  subscriptions: Subscription[];
  categories: string[];
  plans: string[];
  billingCycles: string[],
  loadSubscriptions: () => Promise<void>;
  addSubscription: (sub: Subscription) => void;
  updateSubscription: (sub: Subscription) => void;
  deleteSubscription: (id: string) => void;
};

const saveStore = (get: () => State) => {
  const { subscriptions } = get();
  SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify({ subscriptions }));
};


export const useSubscriptionStore = create<State>((set, get) => ({
  subscriptions: [],
  categories: ['Entretenimiento', 'Educacion', 'Productividad'],
  plans: ['Basico', 'Standard', 'Premium'],
  billingCycles: ['Mensual'],
  notificationsEnabled: true,

  loadSubscriptions: async () => {
    const saved = await SecureStore.getItemAsync(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      set({
        subscriptions: data.subscriptions || [],
      });
    }
  },

  addSubscription: async (sub: Subscription) => {
    try {
      const newSub = { ...sub };
      const updated = [...get().subscriptions, newSub];
      set({ subscriptions: updated });
      saveStore(get);
    } catch (error) {
      console.error('Error al agregar suscripción:', error);
    }
  },

  updateSubscription: async (sub: Subscription) => {
    const { subscriptions } = get();
    const updated = subscriptions.map((s) =>
      s.id === sub.id ? { ...sub } : s
    );
    set({ subscriptions: updated });
    saveStore(get);
  },


  deleteSubscription: async (id: string) => {
    const updated = get().subscriptions.filter((s) => s.id !== id);
    set({ subscriptions: updated });
    saveStore(get);
  },
}));
