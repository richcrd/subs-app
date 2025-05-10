import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { subscriptionSchema, SubscriptionSchemaType } from '@/validation/subscriptionSchema';
import SubscriptionForm from './SubscriptionForm';
import { Button } from '@ui-kitten/components';
import { SubscriptionStyles } from '@/styles/SubscriptionStyles'

type Props = {
  onSave: (data: SubscriptionSchemaType) => void;
  defaultValues?: SubscriptionSchemaType;
};

export default function SubscriptionFormWrapper({ onSave, defaultValues }: Props) {
  const methods = useForm<SubscriptionSchemaType>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <SubscriptionForm />
      <Button
        style={SubscriptionStyles.saveButton}
        onPress={methods.handleSubmit(onSave)}
      >
        Guardar
      </Button>
    </FormProvider>
  );
}
