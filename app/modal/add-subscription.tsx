import { View, Text, StyleSheet, Pressable, ScrollView, TextInput} from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';

export default function AddSubscriptionModal() {
  const router = useRouter();
  const { addSubscription } = useSubscriptionStore();

  const [name, setName] = useState('');
  const [plan, setPlan] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [billingCycle, setBillingCycle] = useState('');
  const [logo, setLogo] = useState('');

  const handleSave = () => {
    if (!name || !amount || !date ) return;

    addSubscription({
      id: Date.now().toString(),
      name,
      plan,
      amount: parseFloat(amount),
      billingCycle: 'Monthly',
      date,
      category,
      logo: logo || 'https://via.placeholder.com/100',
    });

    router.back();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Agregar Subscripción</Text>
      
      <Text>Nombre del servicio</Text>
      <TextInput style={styles.input} placeholder="Nombre del servicio" value={name} onChangeText={setName} />
      <Text>Tipo de plan (Ej. Básico)</Text>
      <TextInput style={styles.input} placeholder="Tipo de plan (Ej. Básico)" value={plan} onChangeText={setPlan} />
      <Text>Monto mensual</Text>
      <TextInput style={styles.input} placeholder="Monto mensual" value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <Text>Fecha de cobro (YYYY-MM-DD)</Text>
      <TextInput style={styles.input} placeholder="Fecha de cobro (YYYY-MM-DD)" value={date} onChangeText={setDate} />
      <Text>Categoría (Ej. Entretenimiento)</Text>
      <TextInput style={styles.input} placeholder="Categoría (Ej. Entretenimiento)" value={category} onChangeText={setCategory} />
      <Text>URL del logo (opcional)</Text>
      <TextInput style={styles.input} placeholder="URL del logo (opcional)" value={logo} onChangeText={setLogo} />

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </Pressable>

      <Pressable style={styles.closeButton} onPress={() => router.back()}>
        <Text style={styles.closeButtonText}>Cerrar</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: '#10b981',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#6366f1',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
