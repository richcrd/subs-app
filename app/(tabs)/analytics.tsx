import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';

export default function AnalyticsScreen() {
  const { subscriptions, loadSubscriptions } = useSubscriptionStore();
  const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);
  const categories = [
    { name: 'Entretenimiento', amount: 23.98 }, // Netflix + Disney+
    { name: 'Música', amount: 9.99 }, // Spotify
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Estadísticas de Gastos</Text>
        <Text style={styles.subtitle}>Resumen Mensual</Text>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total Gastos Mensual</Text>
        <Text style={styles.totalAmount}>${totalMonthly.toFixed(2)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gastos por Categoría</Text>
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryCard}>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${(category.amount / totalMonthly) * 100}%` }
                  ]} 
                />
              </View>
            </View>
            <Text style={styles.categoryAmount}>${category.amount.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Perspectivas</Text>
        <View style={styles.insightCard}>
          <Text style={styles.insightText}>
            El entretenimiento representa el {((23.98 / totalMonthly) * 100).toFixed(0)}% de tus suscripciones mensuales
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