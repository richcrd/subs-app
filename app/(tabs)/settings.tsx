import { View, Text, ScrollView, Pressable, Switch } from 'react-native';
import { Bell, CircleHelp as HelpCircle } from 'lucide-react-native';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import TestNotificationButton from '@/components/TestNotificationButton';
import { SettingStyles } from '@/styles/SettingStyles';
import SettingOption from '@/components/ui/SettingOption';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const { notificationsEnabled, toggleNotifications } = useSubscriptionStore();
  const router = useRouter();

  return (
    <ScrollView style={SettingStyles.container}>
      <View style={SettingStyles.header}>
        <Text style={SettingStyles.title}>Ajustes</Text>
      </View>

      <View style={SettingStyles.section}>
        <Text style={SettingStyles.sectionTitle}>Notificaciones</Text>
        <SettingOption
          icon={<Bell size={24} color="#6b7280" />}
          label="Notificaciones"
          switchValue={notificationsEnabled}
          onToggleSwitch={toggleNotifications}
        />
      </View>

      {/* <TestNotificationButton /> */}

      {/* <View style={SettingStyles.section}>
        <Text style={SettingStyles.sectionTitle}>Seguridad</Text>
        <Pressable style={SettingStyles.settingItem}>
          <View style={SettingStyles.settingInfo}>
            <Shield size={24} color="#6b7280" />
            <Text style={SettingStyles.settingLabel}>Ajustes de Privacidad</Text>
          </View>
        </Pressable>
      </View> */}

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
