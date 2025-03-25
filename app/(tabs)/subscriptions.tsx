import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Link } from 'expo-router';
import { Plus } from 'lucide-react-native';

const SUBSCRIPTIONS = [
  {
    id: '1',
    name: 'Netflix',
    plan: 'Standard',
    amount: 15.99,
    billingCycle: 'Monthly',
    logo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=100&h=100&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Spotify',
    plan: 'Premium',
    amount: 9.99,
    billingCycle: 'Monthly',
    logo: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=100&h=100&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Disney+',
    plan: 'Basic',
    amount: 7.99,
    billingCycle: 'Monthly',
    logo: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=100&h=100&auto=format&fit=crop',
  },
];

export default function SubscriptionsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Your Subscriptions</Text>
          <Link href="subscriptions/add" asChild>
            <Pressable style={styles.addButton}>
              <Plus size={24} color="#fff" />
            </Pressable>
          </Link>
        </View>

        <View style={styles.subscriptionsList}>
          {SUBSCRIPTIONS.map((subscription) => (
            <Link href={`/subscriptions/${subscription.id}`} key={subscription.id} asChild>
              <Pressable style={styles.subscriptionCard}>
                <Image source={{ uri: subscription.logo }} style={styles.logo} />
                <View style={styles.subscriptionInfo}>
                  <Text style={styles.subscriptionName}>{subscription.name}</Text>
                  <Text style={styles.subscriptionPlan}>{subscription.plan}</Text>
                </View>
                <View style={styles.subscriptionPrice}>
                  <Text style={styles.amount}>${subscription.amount.toFixed(2)}</Text>
                  <Text style={styles.billingCycle}>/{subscription.billingCycle.toLowerCase()}</Text>
                </View>
              </Pressable>
            </Link>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
    color: '#111827',
  },
  addButton: {
    backgroundColor: '#6366f1',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscriptionsList: {
    padding: 20,
  },
  subscriptionCard: {
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
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  subscriptionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  subscriptionName: {
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Inter_600SemiBold',
  },
  subscriptionPlan: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
    fontFamily: 'Inter_400Regular',
  },
  subscriptionPrice: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Inter_600SemiBold',
  },
  billingCycle: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Inter_400Regular',
  },
});