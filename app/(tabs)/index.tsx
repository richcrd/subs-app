import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import UpcomingBillsSection from '@/components/billCard';
import ScrollContainer from '@/components/ScrollContainer';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import { useEffect } from 'react';

export default function HomeScreen() {
  const { subscriptions, loadSubscriptions } = useSubscriptionStore();
  const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);
  
  useEffect(() => {
    loadSubscriptions();
  }, []);

  return (
    <ScrollContainer>
      <View style={styles.header}>
        <Text style={styles.monthlyTotal}>
          ${totalMonthly.toFixed(2)}
          <Text style={styles.monthlyTotalLabel}> /mes</Text>
        </Text>
        <Pressable style={styles.addButton} onPress={() => router.push("/modal/add-subscription")}>
            <Plus size={24} color="#fff" />
        </Pressable>
      </View>

      <View>
        <UpcomingBillsSection bills={subscriptions} />
      </View>
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#6b7280',
    fontFamily: 'Inter_400Regular',
  },
  monthlyTotal: {
    fontSize: 36,
    color: '#111827',
    marginTop: 8,
    fontFamily: 'Inter_700Bold',
  },
  monthlyTotalLabel: {
    fontSize: 16,
    color: '#6b7280',
    fontFamily: 'Inter_400Regular',
  },
  subscriptionsList: {
    padding: 16,
  },
  addButton: {
    backgroundColor: '#6366f1',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});