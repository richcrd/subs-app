import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SubscriptionCard({ subscription }) {
  const daysUntilBilling = Math.ceil(
    (new Date(subscription.nextBilling) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Pressable style={[styles.card, { borderLeftColor: subscription.color }]}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={subscription.icon}
          size={30}
          color={subscription.color}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{subscription.name}</Text>
        <Text style={styles.billing}>
          ${subscription.price} / {subscription.billingCycle}
        </Text>
        <Text style={styles.nextBilling}>
          Next billing in {daysUntilBilling} days
        </Text>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color="#666"
        style={styles.arrow}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  billing: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  nextBilling: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  arrow: {
    marginLeft: 8,
  },
});