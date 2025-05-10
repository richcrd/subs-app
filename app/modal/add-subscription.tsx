import { ScrollView, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import { SubscriptionStyles } from '@/styles/SubscriptionStyles';
import { Button } from '@ui-kitten/components';
import { showAlert } from '@/utils/alert';
import SubscriptionFormWrapper from '@/components/Form/SubscriptionFormWrapper';
import { SubscriptionSchemaType } from '@/validation/subscriptionSchema'

export default function AddSubscriptionModal() {
  const router = useRouter();
  const { addSubscription } = useSubscriptionStore();

  const handleSave = (data: SubscriptionSchemaType) => {
    addSubscription({
      id: Date.now().toString(),
      ...data,
      amount: parseFloat(data.amount),
      date: data.date.toISOString().split('T')[0],
    });
    router.back();
  }

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
      <SubscriptionFormWrapper onSave={handleSave} />
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
