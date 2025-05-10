import { ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import { SubscriptionStyles } from '@/styles/SubscriptionStyles';
import { Button } from '@ui-kitten/components';
import { showAlert } from '@/utils/alert';
import SubscriptionFormWrapper from '@/components/Form/SubscriptionFormWrapper';
import { SubscriptionSchemaType } from '@/validation/subscriptionSchema';

export default function SubscriptionDetailModal() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const {
    subscriptions,
    deleteSubscription,
    updateSubscription,
  } = useSubscriptionStore();
  const [defaultValues, setDefaultValues] = useState<SubscriptionSchemaType | null>(null);
  const sub = subscriptions.find((s) => s.id === id);

  useEffect(() => {
    if (sub) {
      setDefaultValues({
        name: sub.name,
        plan: sub.plan,
        amount: sub.amount.toString(),
        date: new Date(sub.date),
        category: sub.category,
        billingCycle: sub.billingCycle,
        color: sub.color,
      });
    }
  }, [sub]);

  const handleUpdate = (data: SubscriptionSchemaType) => {
    if (!sub) return;

    showAlert(
      'Actualizar suscripción',
      `¿Estás seguro de que deseas actualizar "${sub.name}"?`,
      () => {
        updateSubscription({
          ...sub,
          ...data,
          amount: parseFloat(data.amount),
          date: data.date.toISOString().split('T')[0],
        });
        router.back();
      },
      'Cancelar',
      'Actualizar'
    );
  };

  const handleClose = () => {
    showAlert(
      '¿Salir sin guardar?',
      'Tienes cambios sin guardar. ¿Estás seguro de que deseas salir?',
      () => router.back(),
      'Seguir editando',
      'Salir'
    );
  }

  const handleDelete = () => {
    if (!sub) return;

    showAlert(
      'Eliminar suscripción',
      `Estás seguro de que deseas eliminar "${sub.name}"?`,
      () => {
        deleteSubscription(sub.id);
        router.back();
      },
      'Cancelar',
      'Eliminar'
    );
  };

  if (!defaultValues) return null;

  return (
    <ScrollView contentContainerStyle={SubscriptionStyles.container}>
      <SubscriptionFormWrapper onSave={handleUpdate} defaultValues={defaultValues} />
      <Button
        status="danger"
        style={SubscriptionStyles.deleteButton}
        onPress={handleDelete}
      >
        Eliminar
      </Button>
      <Button
        status="basic"
        style={SubscriptionStyles.closeButton}
        onPress={handleClose}
      >
        Cerrar
      </Button>
    </ScrollView>
  );
}
