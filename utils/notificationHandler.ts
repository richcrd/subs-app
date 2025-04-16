import * as Notifications from 'expo-notifications';

// 👇 Esto hace que se muestren notificaciones aunque la app esté en primer plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
