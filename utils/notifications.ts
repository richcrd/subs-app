// utils/notifications.ts
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync(): Promise<boolean> {
  if (!Device.isDevice) {
    console.warn('⚠️ Must use physical device for push notifications');
    return false;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
}

export async function scheduleReminderNotification(subscriptionName: string, chargeDate: Date) {
  const now = new Date();

  // 📅 Recordatorio 3 días antes
  const reminderDate = new Date(chargeDate);
  reminderDate.setDate(reminderDate.getDate() - 3);

  const isReminderInPast = reminderDate <= now;
  const reminderTrigger: Notifications.TimeIntervalTriggerInput = __DEV__ || isReminderInPast
  ? { seconds: 3, type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL as const }
  : { seconds: reminderDate.getTime() / 1000, type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL as const };

  const isChargeDayInPast = chargeDate <= now;
  const chargeDayTrigger: Notifications.TimeIntervalTriggerInput = __DEV__ || isChargeDayInPast
  ? { seconds: 6, type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL as const }
  : { seconds: chargeDate.getTime() / 1000, type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL as const };

  // 🛎️ Recordatorio 3 días antes
  const reminderId = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Próximo pago de suscripción',
      body: `Tu plan "${subscriptionName}" vence en 3 días.`,
      sound: true,
    },
    trigger: reminderTrigger,
  });

  // 💸 Notificación el día del cobro
  const chargeDayId = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Hoy se cobra tu suscripción',
      body: `Tu suscripción a "${subscriptionName}" se cobra hoy.`,
      sound: true,
    },
    trigger: chargeDayTrigger,
  });

  // ✅ Confirmación inmediata
  const confirmationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Suscripción guardada',
      body: `La suscripción "${subscriptionName}" se ha agregado correctamente.`,
      sound: true,
    },
    trigger: null,
  });

  if (__DEV__) {
    console.log(`📬 [DEV] Notifs programadas: Reminder(3s), ChargeDay(6s), Confirmation(inmediata)`);
  }

  return {
    reminderId,
    chargeDayId,
    confirmationId,
  };
}

export async function cancelScheduledNotifications(notificationIds: string[]) {
  for (const id of notificationIds) {
    try {
      await Notifications.cancelScheduledNotificationAsync(id);
      console.log(`❌ Notificación cancelada: ${id}`);
    } catch (error) {
      console.warn(`⚠️ Error al cancelar notificación ${id}:`, error);
    }
  }
}

