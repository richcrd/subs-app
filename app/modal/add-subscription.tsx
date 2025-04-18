import { View, Text, StyleSheet, ScrollView, TextInput, } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import { Select, SelectItem, IndexPath, Input, Datepicker, Button } from '@ui-kitten/components';
import { SubscriptionStyles } from '@/styles/SubscriptionStyles';
import { colorOptions } from '@/constants/colors';

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
    <ScrollView contentContainerStyle={SubscriptionStyles.container}>
      <Text style={SubscriptionStyles.title}>Agregar Subscripción</Text>
      <Input
        placeholder="Netflix, Spotify, Youtube..."
        value={name}
        onChangeText={setName}
        style={SubscriptionStyles.input}
        label="Nombre del Servicio"
      />
      <Select
        placeholder='Selecciona una opción'
        value={plan}
        label="Tipo de plan"
        style={SubscriptionStyles.input}
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
        style={SubscriptionStyles.input}
        label="Monto Mensual"
        keyboardType='numeric'
      />
      <Datepicker
        style={SubscriptionStyles.input}
        label="Fecha de cobro"
        date={date}
        onSelect={nextDate => setDate(nextDate)}
      />

      <Select
        placeholder='Selecciona una opción'
        value={category}
        label='Categoria'
        style={SubscriptionStyles.input}
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
        style={SubscriptionStyles.input}
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
        value={selectedColorIndex !== undefined ? colorOptions[selectedColorIndex.row].name : ''}
        selectedIndex={selectedColorIndex}
        style={SubscriptionStyles.input}
        onSelect={(index: IndexPath | IndexPath[]) => {
          const i = Array.isArray(index) ? index[0].row : index.row;
          setSelectedColorIndex(Array.isArray(index) ? index[0] : index);
          setColor(colorOptions[i].hex);
        }}
      >
        {colorOptions.map((colorOption, index) => (
          <SelectItem
            key={index}
            title={() => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  backgroundColor: colorOption.hex,
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  marginRight: 8,
                }} />
                <Text>{colorOption.name}</Text>
              </View>
            )}
          />
        ))}
      </Select>
      <Button
        style={SubscriptionStyles.saveButton}
        onPress={handleSave}
      >
        Guardar
      </Button>
      <Button
        status='basic'
        style={SubscriptionStyles.closeButton}
        onPress={() => router.back()}
      >Cerrar
      </Button>
    </ScrollView>
  );
}
