import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { scheduleReminderNotification, cancelScheduledNotifications } from '@/utils/notifications';

const STORAGE_KEY = 'subscriptions_store';

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
  notificationIds?: {
    reminderId: string;
    chargeDayId: string;
    confirmationId: string;
  }
};

type State = {
  subscriptions: Subscription[];
  categories: string[];
  plans: string[];
  billingCycles: string[],
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
  loadSubscriptions: () => Promise<void>;
  addSubscription: (sub: Subscription) => void;
  updateSubscription: (sub: Subscription) => void;
  deleteSubscription: (id: string) => void;
};

const saveStore = (get: () => State) => {
  const { subscriptions, notificationsEnabled } = get();
  SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify({ subscriptions, notificationsEnabled }));
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
        notificationsEnabled: data.notificationsEnabled ?? true,
      });
    }
  },

  addSubscription: async (sub: Subscription) => {
    const { notificationsEnabled } = get();
    let notificationIds;

    if (notificationsEnabled) {
      const chargeDate = new Date(sub.date);
      notificationIds = await scheduleReminderNotification(sub.name, chargeDate);
    }

    const newSub = { ...sub, notificationIds };
    const updated = [...get().subscriptions, newSub];
    set({ subscriptions: updated });
    saveStore(get);
  },

  updateSubscription: async (sub: Subscription) => {
    const { subscriptions, notificationsEnabled } = get();
    const existing = subscriptions.find((s) => s.id === sub.id);
    let notificationIds = existing?.notificationIds;
  
    // Si hay notificaciones previas, cancelarlas
    if (existing?.notificationIds) {
      const { reminderId, chargeDayId, confirmationId } = existing.notificationIds;
      await cancelScheduledNotifications([reminderId, chargeDayId, confirmationId]);
      notificationIds = undefined;
    }
  
    // Reprogramar si están activadas
    if (notificationsEnabled) {
      const chargeDate = new Date(sub.date);
      notificationIds = await scheduleReminderNotification(sub.name, chargeDate);
    }
  
    // Actualiza la suscripción con los nuevos datos + IDs
    const updated = subscriptions.map((s) =>
      s.id === sub.id ? { ...sub, notificationIds } : s
    );
  
    set({ subscriptions: updated });
    saveStore(get);
  },
  

  deleteSubscription: async (id: string) => {
    const subscription = get().subscriptions.find(s => s.id === id);
  
    if (subscription?.notificationIds) {
      const { reminderId, chargeDayId, confirmationId } = subscription.notificationIds;
      await cancelScheduledNotifications([reminderId, chargeDayId, confirmationId]);
    }
  
    const updated = get().subscriptions.filter((s) => s.id !== id);
    set({ subscriptions: updated });
    saveStore(get);
  },

  toggleNotifications: () => {
    const newValue = !get().notificationsEnabled;
    set({ notificationsEnabled: newValue });
    saveStore(get);
  },

}));
