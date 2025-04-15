import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Select, SelectItem, IndexPath, Input, Datepicker, Button } from '@ui-kitten/components';

const SubscriptionDetailModal = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { subscriptions, deleteSubscription, updateSubscription, categories, plans, billingCycles } = useSubscriptionStore();

  const subs = subscriptions.find((sub) => sub.id === id);

  const colors = ["#EF4444", "#F97316", "#FACC15", "#10B981", '#3B82F6', '#8B5CF6', '#EC4899', '#000'];
  const [selectedColorIndex, setSelectedColorIndex] = useState<IndexPath | undefined>(undefined);
  const [name, setName] = useState('');
  const [plan, setPlan] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const [billingCycle, setBillingCycle] = useState('');
  const [color, setColor] = useState('');

  const [planIndex, setPlanIndex] = useState<IndexPath | undefined>();
  const [categoryIndex, setCategoryIndex] = useState<IndexPath | undefined>();
  const [billingCycleIndex, setBillingCycleIndex] = useState<IndexPath | undefined>();
  useEffect(() => {
    if (subs) {
      setName(subs.name);
      setPlan(subs.plan);
      setAmount(subs.amount.toString());
      setDate(new Date(subs.date));
      setCategory(subs.category);
      setBillingCycle(subs.billingCycle);
      setColor(subs.color || '');
      setPlanIndex(new IndexPath(plans.indexOf(subs.plan)));
      setCategoryIndex(new IndexPath(categories.indexOf(subs.category)));
      setBillingCycleIndex(new IndexPath(billingCycles.indexOf(subs.billingCycle)));
      setSelectedColorIndex(new IndexPath(colors.indexOf(subs.color || '')));
    }
  }, [subs]);

  const handleUpdate = () => {
    if (!subs) return;
    updateSubscription({
      ...subs,
      name,
      plan,
      amount: parseFloat(amount),
      date: date.toISOString().split('T')[0],
      category,
      billingCycle,
      color,
    });
    router.back();
  };

  const handleDelete = () => {
    if (!subs) return;
    deleteSubscription(subs.id);
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Input label="Nombre del Servicio" value={name} onChangeText={setName} style={styles.input} />
      
      <Select
        label="Tipo de plan"
        value={plan}
        selectedIndex={planIndex}
        onSelect={(index) => {
          const idx = Array.isArray(index) ? index[0].row : index.row;
          setPlanIndex(new IndexPath(idx));
          setPlan(plans[idx]);
        }}
        style={styles.input}
      >
        {plans.map((item, i) => <SelectItem key={i} title={item} />)}
      </Select>

      <Input label="Monto Mensual" value={amount} onChangeText={setAmount} style={styles.input} keyboardType="numeric" />

      <Datepicker label="Fecha de cobro" date={date} onSelect={setDate} style={styles.input} />

      <Select
        label="Categoría"
        value={category}
        selectedIndex={categoryIndex}
        onSelect={(index) => {
          const idx = Array.isArray(index) ? index[0].row : index.row;
          setCategoryIndex(new IndexPath(idx));
          setCategory(categories[idx]);
        }}
        style={styles.input}
      >
        {categories.map((item, i) => <SelectItem key={i} title={item} />)}
      </Select>

      <Select
        label="Periodo de cobro"
        value={billingCycle}
        selectedIndex={billingCycleIndex}
        onSelect={(index) => {
          const idx = Array.isArray(index) ? index[0].row : index.row;
          setBillingCycleIndex(new IndexPath(idx));
          setBillingCycle(billingCycles[idx]);
        }}
        style={styles.input}
      >
        {billingCycles.map((item, i) => <SelectItem key={i} title={item} />)}
      </Select>

      <Select
        label="Color del Servicio"
        value={color}
        selectedIndex={selectedColorIndex}
        onSelect={(index) => {
          const i = Array.isArray(index) ? index[0].row : index.row;
          setSelectedColorIndex(new IndexPath(i));
          setColor(colors[i]);
        }}
        style={styles.input}
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

      <Button style={styles.saveButton} onPress={handleUpdate}>Actualizar</Button>
      <Button status="danger" style={styles.deleteButton} onPress={handleDelete}>Eliminar</Button>
      <Button status="basic" style={styles.closeButton} onPress={() => router.back()}>Cerrar</Button>
    </ScrollView>
  );
};

export default SubscriptionDetailModal;

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
    marginBottom: 12,
  },
  saveButton: {
    marginTop: 10,
    borderRadius: 8,
  },
  deleteButton: {
    marginTop: 10,
    borderRadius: 8,
  },
  closeButton: {
    marginTop: 20,
    borderRadius: 8,
  },
});
