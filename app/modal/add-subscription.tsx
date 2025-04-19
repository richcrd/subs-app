import { ScrollView, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import { SubscriptionStyles } from '@/styles/SubscriptionStyles';
import SubscriptionForm from '@/components/Form/SubscriptionForm';
import { SubscriptionFormData } from '@/types/Subscription';
import { Button } from '@ui-kitten/components';
import { showAlert } from '@/utils/alert';

export default function AddSubscriptionModal() {
  const router = useRouter();
  const { addSubscription } = useSubscriptionStore();
  const [formData, setFormData] = useState<SubscriptionFormData>({
    name: '',
    plan: '',
    amount: '',
    date: new Date(),
    category: '',
    billingCycle: '',
    color: '',
  });

  const handleSubmit = () => {
    const { name, plan, amount, date, category, billingCycle, color } = formData;
    if (!name || !amount || !date || !plan || !category || !billingCycle) return;

    addSubscription({
      id: Date.now().toString(),
      name,
      plan,
      amount: parseFloat(formData.amount),
      billingCycle,
      date: date.toISOString().split('T')[0],
      category,
      color,
    });

    router.back();
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

  return (
    <ScrollView contentContainerStyle={SubscriptionStyles.container}>
      <Text style={SubscriptionStyles.title}>Agregar Subscripción</Text>
      <SubscriptionForm formData={formData} setFormData={setFormData} />
      <Button
        style={SubscriptionStyles.saveButton}
        onPress={handleSubmit}
      >
        Guardar
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
