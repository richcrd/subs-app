import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import LoadingScreen from '@/components/Layout/LoadingScreen';

const screenOptions = {
  headerShown: false,
}

export default function RootLayout() {
  useFrameworkReady();

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
            options={{ presentation: 'modal', title: 'Agregar Suscripción', headerShown: true }}
          />
          <Stack.Screen
            name="modal/[id]"
            options={() => ({
              presentation: 'modal',
              title: 'Detalles Suscripción',
              headerShown: true,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 19,
              },
            })}
          />
          <Stack.Screen
            name="modal/help"
            options={() => ({
              presentation: 'modal',
              title: 'Centro de Ayuda',
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