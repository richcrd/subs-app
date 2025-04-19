import { View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';

import ScrollContainer from '@/components/Layout/ScrollContainer';
import UpcomingBillsSection from '@/components/ui/billCard';
import MonthlyTotal from '@/components/Layout/MonthlyTotal';
import { HomeStyles } from '@/styles/HomeStyles';
import { useMonthlyTotal } from '@/hooks/useMonthlyTotal';
import { showAlert } from '@/utils/alert';

export default function HomeScreen() {
  const { subscriptions, total } = useMonthlyTotal();

  const handleAddPress = () => {
    if (subscriptions.length >= 7) {
      showAlert(
        'Limite Alcanzado',
        'Ya has alcanzado el limite de 7 suscripciones. Elimina una suscripcion para agregar una nueva',
        () => { },
        'Cerrar',
        'Aceptar'
      );
    } else {
      router.push('/modal/add-subscription');
    }
  };

  return (
    <ScrollContainer>
      <View style={HomeStyles.header}>
        <MonthlyTotal total={total} />
        <Pressable style={HomeStyles.addButton} onPress={handleAddPress}>
          <Plus size={24} color="#fff" />
        </Pressable>
      </View>

      <UpcomingBillsSection bills={subscriptions} />
    </ScrollContainer>
  );
}
