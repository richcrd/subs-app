import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Link } from 'expo-router';
import SubscriptionCard from '@/components/subscriptionCard';

const UPCOMING_BILLS = [
  {
    id: '1',
    name: 'Netflix',
    amount: 15.99,
    date: '2024-02-15',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK-b-GRJP49S_nvl8UDCQ2DDusVBUmQcN1Ug&s',
  },
  {
    id: '2',
    name: 'Spotify',
    amount: 9.99,
    date: '2024-02-18',
    logo: 'https://static-00.iconduck.com/assets.00/spotify-icon-256x256-j1thlhis.png',
  },
  {
    id: '3',
    name: 'Disney+',
    amount: 7.99,
    date: '2024-02-20',
    logo: 'https://gnnhd.tv/_next/image?url=https%3A%2F%2Fgnnhd.tv%3A8000%2Fmedia%2F101288%2FDisney__Logo_March_2024.png&w=3840&q=75',
  },
  {
    id: '4',
    name: 'HBO Max',
    amount: 14.99,
    date: '2024-02-25',
    logo: 'https://sm.ign.com/ign_es/cover/h/hbo-max/hbo-max_7zr8.jpg',
  },
  {
    id: '5',
    name: 'Amazon Prime',
    amount: 12.99,
    date: '2024-02-28',
    logo: 'data:image/png;base64,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',
  },
  {
    id: '6',
    name: 'Apple Music',
    amount: 9.99,
    date: '2024-03-01',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB0daJy-G9U7rEpOBBhnmvQKkX4h4qvwWSfA&s',
  },
  {
    id: '7',
    name: 'YouTube Premium',
    amount: 11.99,
    date: '2024-03-05',
    logo: 'https://cdn3.iconfinder.com/data/icons/social-network-30/512/social-06-512.png',
  },
  {
    id: '8',
    name: 'Paramount+',
    amount: 8.99,
    date: '2024-03-15',
    logo: 'data:image/png;base64,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',
  },
  {
    id: '9',
    name: 'ESPN+',
    amount: 5.99,
    date: '2024-03-30',
    logo: 'https://cnbl-cdn.bamgrid.com/assets/cbc11829f838ae44fe3587937d2df820ffc979f39b04af49ae34ae5413c9a710/original',
  },
];

export default function HomeScreen() {
  const totalMonthly = UPCOMING_BILLS.reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back!</Text>
        <Text style={styles.monthlyTotal}>
          ${totalMonthly.toFixed(2)}
          <Text style={styles.monthlyTotalLabel}> /month</Text>
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Bills</Text>
        {UPCOMING_BILLS.map((bill) => (
          <Link href={`/subscriptions/${bill.id}`} key={bill.id} asChild>
            <Pressable style={styles.billCard}>
              <Image source={{ uri: bill.logo }} style={styles.logo} />
              <View style={styles.billInfo}>
                <Text style={styles.billName}>{bill.name}</Text>
                <Text style={styles.billDate}>Due {new Date(bill.date).toLocaleDateString()}</Text>
              </View>
              <Text style={styles.billAmount}>${bill.amount.toFixed(2)}</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <Link href="/subscriptions/add" asChild>
            <Pressable style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Add Subscription</Text>
            </Pressable>
          </Link>
          <Link href="/analytics" asChild>
            <Pressable style={[styles.actionButton, styles.actionButtonSecondary]}>
              <Text style={styles.actionButtonTextSecondary}>View Analytics</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </ScrollView>
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  billCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  billInfo: {
    flex: 1,
    marginLeft: 12,
  },
  billName: {
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Inter_600SemiBold',
  },
  billDate: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
    fontFamily: 'Inter_400Regular',
  },
  billAmount: {
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Inter_600SemiBold',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  actionButtonTextSecondary: {
    color: '#6b7280',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  subscriptionsList: {
    padding: 16,
  },
});