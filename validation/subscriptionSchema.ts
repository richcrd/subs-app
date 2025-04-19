import { z } from 'zod';

const futureDate = z.date().refine((val) => val > new Date(), {
  message: 'La fecha debe ser posterior a la fecha actual',
}).refine((val) => !isNaN(val.getTime()), {
  message: 'La fecha es requerida',
});


export const subscriptionSchema = z.object({
  name: z.string().min(1, 'Requerido'),
  plan: z.string().min(1, 'Requerido'),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Debe ser un número válido',
  }),
  date: futureDate,
  category: z.string().min(1, 'Requerido'),
  billingCycle: z.string().min(1, 'Requerido'),
  color: z.string().min(1, 'Requerido'),
});

export type SubscriptionSchemaType = z.infer<typeof subscriptionSchema>;
