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

export type SubscriptionFormData = {
    name: string;
    plan: string;
    amount: string;
    date: Date;
    category: string;
    billingCycle: string;
    color?: string;
  };
  