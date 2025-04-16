import '@/utils/notificationHandler';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { registerForPushNotificationsAsync } from '@/utils/notifications';
import LoadingScreen from '@/components/Layout/LoadingScreen';

const screenOptions = {
  headerShown: false,
}

export default function RootLayout() {
  useFrameworkReady();

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Stack screenOptions={screenOptions}>
          <Stack.Screen name="(tabs)" options={screenOptions} />
          <Stack.Screen
            name="modal/add-subscription"
            options={{ presentation: 'modal', title: 'Add Subscription' }}
          />
          <Stack.Screen
            name="modal/[id]"
            options={() => ({
              presentation: 'modal',
              title: 'Detalles Subscripción',
              headerShown: true,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 19,
              },
            })}
          />

        </Stack>
        <StatusBar style="light" />
      </ApplicationProvider>
    </>
  );
}