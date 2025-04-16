import { View, Text, ScrollView } from 'react-native';
import { AnalitycStyles } from '@/styles/AnalitycStyles';
import { useAnalyticsData } from '@/hooks/useAnalyticsData';
import CategoryCard from '@/components/ui/CategoryCard';
import InsightsCard from '@/components/ui/InsightsCard';

export default function AnalyticsScreen() {
  const { totalMonthly, dynamicCategories, insights } = useAnalyticsData();

  return (
    <ScrollView style={AnalitycStyles.container}>
      <View style={AnalitycStyles.header}>
        <Text style={AnalitycStyles.title}>Estadísticas de Gastos</Text>
        <Text style={AnalitycStyles.subtitle}>Resumen Mensual</Text>
      </View>

      <View style={AnalitycStyles.totalCard}>
        <Text style={AnalitycStyles.totalLabel}>Total Gastos Mensual</Text>
        <Text style={AnalitycStyles.totalAmount}>${totalMonthly.toFixed(2)}</Text>
      </View>

      <View style={AnalitycStyles.section}>
        <Text style={AnalitycStyles.sectionTitle}>Gastos por Categoría</Text>
        {dynamicCategories.map((category, index) => (
          <CategoryCard key={index} category={category} totalMonthly={totalMonthly} />
        ))}
      </View>

      <View style={AnalitycStyles.section}>
        <Text style={AnalitycStyles.sectionTitle}>Perspectivas</Text>
        <InsightsCard insights={insights} />
      </View>
    </ScrollView>
  );
}

