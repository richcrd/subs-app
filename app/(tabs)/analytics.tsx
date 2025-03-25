import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AnalyticsScreen() {
  const monthlyTotal = 33.97; // Sum of all subscriptions
  const categories = [
    { name: 'Entertainment', amount: 23.98 }, // Netflix + Disney+
    { name: 'Music', amount: 9.99 }, // Spotify
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Spending Analytics</Text>
        <Text style={styles.subtitle}>Monthly Overview</Text>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total Monthly Spend</Text>
        <Text style={styles.totalAmount}>${monthlyTotal.toFixed(2)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Spending by Category</Text>
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryCard}>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${(category.amount / monthlyTotal) * 100}%` }
                  ]} 
                />
              </View>
            </View>
            <Text style={styles.categoryAmount}>${category.amount.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Insights</Text>
        <View style={styles.insightCard}>
          <Text style={styles.insightText}>
            Entertainment makes up {((23.98 / monthlyTotal) * 100).toFixed(0)}% of your monthly subscriptions
          </Text>
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
  title: {
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
  },
  totalCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#6366f1',
    borderRadius: 12,
  },
  totalLabel: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    fontFamily: 'Inter_400Regular',
  },
  totalAmount: {
    fontSize: 36,
    color: '#fff',
    marginTop: 8,
    fontFamily: 'Inter_700Bold',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  categoryCard: {
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
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 8,
    fontFamily: 'Inter_600SemiBold',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e5e5e5',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  categoryAmount: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  insightCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  insightText: {
    fontSize: 14,
    color: '#111827',
    fontFamily: 'Inter_400Regular',
  },
});