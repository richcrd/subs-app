import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Select, SelectItem, IndexPath, Input, Datepicker, Button } from '@ui-kitten/components';
import { SubscriptionStyles } from '@/styles/SubscriptionStyles';
import { colorOptions } from '@/constants/colors';

const SubscriptionDetailModal = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { subscriptions, deleteSubscription, updateSubscription, categories, plans, billingCycles } = useSubscriptionStore();

  const subs = subscriptions.find((sub) => sub.id === id);

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
      setSelectedColorIndex(new IndexPath(colorOptions.findIndex((c) => c.hex === subs.color)));
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

    Alert.alert(
      'Eliminar suscripción',
      `¿Estás seguro de que deseas eliminar "${subs.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            deleteSubscription(subs.id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={SubscriptionStyles.container}>
      <Input label="Nombre del Servicio" value={name} onChangeText={setName} style={SubscriptionStyles.input} />

      <Select
        label="Tipo de plan"
        value={plan}
        selectedIndex={planIndex}
        onSelect={(index) => {
          const idx = Array.isArray(index) ? index[0].row : index.row;
          setPlanIndex(new IndexPath(idx));
          setPlan(plans[idx]);
        }}
        style={SubscriptionStyles.input}
      >
        {plans.map((item, i) => <SelectItem key={i} title={item} />)}
      </Select>

      <Input label="Monto Mensual" value={amount} onChangeText={setAmount} style={SubscriptionStyles.input} keyboardType="numeric" />

      <Datepicker label="Fecha de cobro" date={date} onSelect={setDate} style={SubscriptionStyles.input} />

      <Select
        label="Categoría"
        value={category}
        selectedIndex={categoryIndex}
        onSelect={(index) => {
          const idx = Array.isArray(index) ? index[0].row : index.row;
          setCategoryIndex(new IndexPath(idx));
          setCategory(categories[idx]);
        }}
        style={SubscriptionStyles.input}
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
        style={SubscriptionStyles.input}
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
          setColor(colorOptions[i].hex);
        }}
        style={SubscriptionStyles.input}
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

      <Button style={SubscriptionStyles.saveButton} onPress={handleUpdate}>Actualizar</Button>
      <Button status="danger" style={SubscriptionStyles.deleteButton} onPress={handleDelete}>Eliminar</Button>
      <Button status="basic" style={SubscriptionStyles.closeButton} onPress={() => router.back()}>Cerrar</Button>
    </ScrollView>
  );
};

export default SubscriptionDetailModal;
