import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function SpendingChart({ subscriptions }) {
  const monthlyTotal = subscriptions.reduce((acc, sub) => acc + sub.price, 0);
  
  // Mock data for the last 6 months
  const data = {
    labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [{
      data: [
        monthlyTotal * 0.8,
        monthlyTotal * 0.8,
        monthlyTotal * 0.9,
        monthlyTotal,
        monthlyTotal,
        monthlyTotal,
      ]
    }]
  };

  return (
    <View style={{ marginTop: 20 }}>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 64}
        height={180}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
        bezier
      />
    </View>
  );
}