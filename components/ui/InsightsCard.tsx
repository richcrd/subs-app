import { View, Text } from 'react-native';
import { AnalitycStyles } from '@/styles/AnalitycStyles';

interface InsightsCardProps {
  insights: string[];
}

function InsightsCard({ insights }: InsightsCardProps) {
  if (insights.length === 0) {
    return (
      <View style={AnalitycStyles.insightCard}>
        <Text style={AnalitycStyles.insightText}>
          Aún no hay datos suficientes para mostrar perspectivas.
        </Text>
      </View>
    );
  }

  return (
    <>
      {insights.map((text: string, index: number) => (
        <View key={index} style={AnalitycStyles.insightCard}>
          <Text style={AnalitycStyles.insightText}>{text}</Text>
        </View>
      ))}
    </>
  );
}

export default InsightsCard;
