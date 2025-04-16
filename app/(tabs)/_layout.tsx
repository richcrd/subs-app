import { Tabs } from 'expo-router';
import { Home, Settings, ChartPie as PieChart } from 'lucide-react-native';

const screenOptions = {
  tabBarStyle: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  tabBarActiveTintColor: '#6366f1',
  tabBarInactiveTintColor: '#6b7280',
  headerStyle: {
    backgroundColor: '#4D55CC',
  },
  headerTitleStyle: {
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
  },
};

const tabsConfig = [
  {
    name: 'index',
    title: 'Inicio',
    icon: Home,
  },
  {
    name: 'analytics',
    title: 'Estadísticas',
    icon: PieChart,
  },
  {
    name: 'settings',
    title: 'Ajustes',
    icon: Settings,
  },
];

export default function TabLayout() {
  return (
    <Tabs screenOptions={screenOptions}>
      {tabsConfig.map(({ name, title, icon: Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, size }) => <Icon size={size} color={color} />,
          }}
        />
      ))}
    </Tabs>
  );
}
