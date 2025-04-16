import { View, Text, StyleSheet, ScrollView, TextInput, } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import { Select, SelectItem, IndexPath, Input, Datepicker, Button } from '@ui-kitten/components';
import { scheduleReminderNotification } from '@/utils/notifications';

export default function AddSubscriptionModal() {
  const router = useRouter();
  const { addSubscription, categories, plans, billingCycles } = useSubscriptionStore();
  const colors = ["#EF4444", "#F97316", "#FACC15", "#10B981", '#3B82F6', '#8B5CF6', '#EC4899', '#000']
  const [selectedColorIndex, setSelectedColorIndex] = useState<IndexPath | undefined>(undefined);
  const [color, setColor] = useState<string>('');
  const [name, setName] = useState('');
  const [plan, setPlan] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const [billingCycle, setBillingCycle] = useState('');
  const [logo, setLogo] = useState('');

  // Estado de índice para los Select de UI Kitten
  const [planIndex, setPlanIndex] = useState<IndexPath | undefined>(undefined);
  const [categoryIndex, setCategoryIndex] = useState<IndexPath | undefined>(undefined);
  const [billingCycleIndex, setBillingCycleIndex] = useState<IndexPath | undefined>(undefined);


  const handleSave = async () => {
    if (!name || !amount || !date || !plan || !category || !billingCycle) return;

    addSubscription({
      id: Date.now().toString(),
      name,
      plan,
      amount: parseFloat(amount),
      billingCycle,
      date: date.toISOString().split('T')[0],
      category,
      color,
    });

    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Agregar Subscripción</Text>
      <Input
        placeholder="Netflix, Spotify, Youtube..."
        value={name}
        onChangeText={setName}
        style={styles.input}
        label="Nombre del Servicio"
      />
      <Select
        placeholder='Selecciona una opción'
        value={plan}
        label="Tipo de plan"
        style={styles.input}
        selectedIndex={planIndex}
        onSelect={(index: IndexPath | IndexPath[]) => {
          if (Array.isArray(index)) {
            // Maneja el caso donde el índice es un arreglo
            setPlanIndex(index[0]); // Solo toma el primer valor si es un arreglo
            setPlan(plans[index[0].row]);
          } else {
            // Maneja el caso donde el índice es un solo valor
            setPlanIndex(index);
            setPlan(plans[index.row]);
          }
        }}
      >
        {plans.map((planOption, index) => (
          <SelectItem key={index} title={planOption} />
        ))}
      </Select>

      <Input
        placeholder="$4.99"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
        label="Monto Mensual"
        keyboardType='numeric'
      />
      <Datepicker
        style={styles.input}
        label="Fecha de cobro"
        date={date}
        onSelect={nextDate => setDate(nextDate)}
      />

      <Select
        placeholder='Selecciona una opción'
        value={category}
        label='Categoria'
        style={styles.input}
        selectedIndex={categoryIndex}
        onSelect={(index: IndexPath | IndexPath[]) => {
          if (Array.isArray(index)) {
            setCategoryIndex(index[0]);
            setCategory(categories[index[0].row]);
          } else {
            setCategoryIndex(index);
            setCategory(categories[index.row]);
          }
        }}
      >
        {categories.map((categoryOption, index) => (
          <SelectItem key={index} title={categoryOption} />
        ))}
      </Select>

      <Select
        placeholder='Selecciona una opción'
        value={billingCycle}
        label="Periodo de cobro"
        style={styles.input}
        selectedIndex={billingCycleIndex}
        onSelect={(index: IndexPath | IndexPath[]) => {
          if (Array.isArray(index)) {
            setBillingCycleIndex(index[0]);
            setBillingCycle(billingCycles[index[0].row]);
          } else {
            setBillingCycleIndex(index);
            setBillingCycle(billingCycles[index.row]);
          }
        }}
      >
        {billingCycles.map((cycleOption, index) => (
          <SelectItem key={index} title={cycleOption} />
        ))}
      </Select>

      <Select
        placeholder="Seleccione un color"
        label="Color del Servicio"
        value={color}
        selectedIndex={selectedColorIndex}
        style={styles.input}
        onSelect={(index: IndexPath | IndexPath[]) => {
          const i = Array.isArray(index) ? index[0].row : index.row;
          setSelectedColorIndex(Array.isArray(index) ? index[0] : index);
          setColor(colors[i]);
        }}
      >
        {colors.map((colorOption, index) => (
          <SelectItem
            key={index}
            title={() => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  backgroundColor: colorOption,
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  marginRight: 8,
                }} />
                <Text>{colorOption}</Text>
              </View>
            )}
          />
        ))}
      </Select>
      <Button
        style={styles.saveButton}
        onPress={handleSave}
      >
        Guardar
      </Button>
      <Button
        status='basic'
        style={styles.closeButton}
        onPress={() => router.back()}
      >Cerrar
      </Button>
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
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#444',
  },
  saveButton: {
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
});
