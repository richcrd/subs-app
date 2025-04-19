import { z } from 'zod';

export const subscriptionSchema = z.object({
  name: z.string().min(1, 'Requerido'),
  plan: z.string().min(1, 'Requerido'),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Debe ser un número válido',
  }),
  date: z.date({ required_error: 'Requerido' }),
  category: z.string().min(1, 'Requerido'),
  billingCycle: z.string().min(1, 'Requerido'),
  color: z.string().min(1, 'Requerido'),
});

export type SubscriptionSchemaType = z.infer<typeof subscriptionSchema>;
