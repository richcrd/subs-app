import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Pressable, Text } from 'react-native';

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
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
    </>
  );
}