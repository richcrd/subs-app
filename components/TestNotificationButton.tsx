// components/TestNotificationButton.tsx
import { Button, Alert } from 'react-native';
import { useSubscriptionStore } from '../store/useSubscriptionStore';
import { v4 as uuid } from 'uuid';
import { registerForPushNotificationsAsync, scheduleReminderNotification } from '../utils/notifications';

export default function TestNotificationButton() {
  const addSubscription = useSubscriptionStore((s) => s.addSubscription);
  const notificationsEnabled = useSubscriptionStore((s) => s.notificationsEnabled);

  const handleTest = async () => {
    const permission = await registerForPushNotificationsAsync();

    if (!permission) {
      Alert.alert('🚫 Sin permiso', 'No se pueden enviar notificaciones.');
      return;
    }

    const testId = uuid();
    const futureDate = new Date();
    //futureDate.setDate(futureDate.getDate() + 5); // Dentro de 5 días

    addSubscription({
      id: testId,
      name: 'Netflix (TEST)',
      plan: 'Premium',
      amount: 14.99,
      billingCycle: 'Mensual',
      date: futureDate.toISOString(),
      category: 'Entretenimiento',
    });

    Alert.alert(
      '✅ Subscripción de prueba agregada',
      notificationsEnabled
        ? 'Notificaciones programadas.'
        : 'Notificaciones desactivadas, pero suscripción guardada.'
    );
  };

  return <Button title="Agregar suscripción de prueba" onPress={handleTest} />;
}
