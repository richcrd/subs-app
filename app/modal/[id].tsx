import { ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import { SubscriptionStyles } from '@/styles/SubscriptionStyles';
import { SubscriptionFormData } from '@/types/Subscription';
import SubscriptionForm from '@/components/Form/SubscriptionForm';
import { Button } from '@ui-kitten/components';
import { showAlert } from '@/utils/alert';

export default function SubscriptionDetailModal() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const {
    subscriptions,
    deleteSubscription,
    updateSubscription,
  } = useSubscriptionStore();

  const subs = subscriptions.find((sub) => sub.id === id);

  const [formData, setFormData] = useState<SubscriptionFormData>({
    name: '',
    plan: '',
    amount: '',
    date: new Date(),
    category: '',
    billingCycle: '',
    color: '',
  });

  useEffect(() => {
    if (subs) {
      setFormData({
        name: subs.name,
        plan: subs.plan,
        amount: subs.amount.toString(),
        date: new Date(subs.date),
        category: subs.category,
        billingCycle: subs.billingCycle,
        color: subs.color || '',
      });
    }
  }, [subs]);

  const handleUpdate = () => {
    if (!subs) return;

    showAlert(
      'Actualizar suscripción',
      `Estás seguro de que deseas actualizar "${subs.name}"?`,
      () => {
        updateSubscription({
          ...subs,
          name: formData.name,
          plan: formData.plan,
          amount: parseFloat(formData.amount),
          date: formData.date.toISOString().split('T')[0],
          category: formData.category,
          billingCycle: formData.billingCycle,
          color: formData.color,
        });
        router.back();
      },
      'Cancelar',
      'Actualizar'
    );
  };

  const handleDelete = () => {
    if (!subs) return;

    showAlert(
      'Eliminar suscripción',
      `Estás seguro de que deseas eliminar "${subs.name}"?`,
      () => {
        deleteSubscription(subs.id);
        router.back();
      },
      'Cancelar',
      'Eliminar'
    );
  };

  return (
    <ScrollView contentContainerStyle={SubscriptionStyles.container}>
      <SubscriptionForm formData={formData} setFormData={setFormData} />
      <Button style={SubscriptionStyles.saveButton} onPress={handleUpdate}>
        Actualizar
      </Button>
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
        onPress={() => router.back()}
      >
        Cerrar
      </Button>
    </ScrollView>
  );
}
