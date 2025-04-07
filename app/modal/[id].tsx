import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import React from 'react';

const SubscriptionDetailModal = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { subscriptions, deleteSubscription } = useSubscriptionStore();
  const subscription = subscriptions.find((sub) => sub.id === id);

  if (!subscription) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Suscripción no encontrada</Text>
        <Pressable style={styles.button} onPress={router.back}>
          <Text style={styles.buttonText}>Cerrar</Text>
        </Pressable>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      '¿Eliminar suscripción?',
      `¿Estás seguro de que deseas eliminar ${subscription.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            deleteSubscription(subscription.id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{subscription.name}</Text>
      <Text style={styles.text}>Plan: {subscription.plan}</Text>
      <Text style={styles.text}>Monto: ${subscription.amount}</Text>
      <Text style={styles.text}>Frecuencia: {subscription.billingCycle}</Text>
      <Text style={styles.text}>Categoría: {subscription.category}</Text>
      <Text style={styles.text}>Fecha: {new Date(subscription.date).toLocaleDateString()}</Text>

      <View style={styles.buttons}>
        <Pressable style={[styles.button, styles.editButton]} onPress={() => console.log('Editar')}>
          <Text style={styles.buttonText}>Editar</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SubscriptionDetailModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: '#374151',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 32,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  editButton: {
    backgroundColor: '#3b82f6',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
