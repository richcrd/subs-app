import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { UPCOMING_BILLS } from '@/constants/data';
import UpcomingBillsSection from '@/components/billCard';
import ScrollContainer from '@/components/ScrollContainer';


export default function HomeScreen() {
  const totalMonthly = UPCOMING_BILLS.reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <ScrollContainer>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back!</Text>
        <Text style={styles.monthlyTotal}>
          ${totalMonthly.toFixed(2)}
          <Text style={styles.monthlyTotalLabel}> /month</Text>
        </Text>
      </View>

      <View>
        <UpcomingBillsSection bills={UPCOMING_BILLS} />
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
});