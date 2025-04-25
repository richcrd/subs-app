import { View, Text, ScrollView } from 'react-native';
import { CircleHelp as HelpCircle } from 'lucide-react-native';
import { SettingStyles } from '@/styles/SettingStyles';
import SettingOption from '@/components/ui/SettingOption';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <ScrollView style={SettingStyles.container}>
      <View style={SettingStyles.header}>
        <Text style={SettingStyles.title}>Centro de Control</Text>
      </View>

      <View style={SettingStyles.section}>
        <Text style={SettingStyles.sectionTitle}>Soporte</Text>
        <SettingOption
          icon={<HelpCircle size={24} color="#6b7280" />}
          label="Centro de Ayuda"
          onPress={() => router.push('/modal/help')}
        />
      </View>

      <View style={SettingStyles.footer}>
        <Text style={SettingStyles.version}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}
