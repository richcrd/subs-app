import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function AddSubscriptionModal() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Subscription</Text>

      {/* Aquí puedes agregar el formulario para añadir suscripciones */}

      <Pressable style={styles.closeButton} onPress={() => router.back()}>
        <Text style={styles.closeButtonText}>Close</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#6366f1',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
