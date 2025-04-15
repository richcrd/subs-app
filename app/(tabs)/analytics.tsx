import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';

export default function AnalyticsScreen() {
  const { subscriptions, loadSubscriptions } = useSubscriptionStore();
  const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);
  const categoryTotals: Record<string, number> = {};
  subscriptions.forEach((sub) => {
    if (categoryTotals[sub.category]) {
      categoryTotals[sub.category] += sub.amount;
    } else {
      categoryTotals[sub.category] = sub.amount;
    }
  });

  const dynamicCategories = Object.entries(categoryTotals).map(([name, amount]) => ({
    name,
    amount,
  }));

  const insights = dynamicCategories
    .filter(category => totalMonthly > 0 && (category.amount / totalMonthly) * 100 >= 10)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3)
    .map(category => {
      const percentage = ((category.amount / totalMonthly) * 100).toFixed(1);
      return `La categoría "${category.name}" representa el ${percentage}% de tus gastos mensuales.`;
    });

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
        {dynamicCategories.map((category, index) => (
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
        {insights.length === 0 ? (
          <View style={styles.insightCard}>
            <Text style={styles.insightText}>Aún no hay datos suficientes para mostrar perspectivas.</Text>
          </View>
        ) : (
          insights.map((text, index) => (
            <View key={index} style={styles.insightCard}>
              <Text style={styles.insightText}>{text}</Text>
            </View>
          ))
        )}
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
    backgroundColor: '#7AC6D2',
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
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFAB5B',
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
    marginVertical: 5,
  },
  insightText: {
    fontSize: 14,
    color: '#111827',
    fontFamily: 'Inter_400Regular',
  },
});