import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { Bell, CreditCard, Shield, CircleHelp as HelpCircle } from 'lucide-react-native';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import TestNotificationButton from '@/components/TestNotificationButton';

export default function SettingsScreen() {
  const { notificationsEnabled, toggleNotifications } = useSubscriptionStore();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ajustes</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notificaciones</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Bell size={24} color="#6b7280" />
            <Text style={styles.settingLabel}>Notificaciones</Text>
          </View>
          <Switch 
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: '#e5e5e5', true: '#818cf8' }}
            thumbColor={notificationsEnabled ? '#6366f1' : '#fff'}
          />
        </View>
      </View>

      <TestNotificationButton />

      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Seguridad</Text>
        <Pressable style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Shield size={24} color="#6b7280" />
            <Text style={styles.settingLabel}>Ajustes de Privacidad</Text>
          </View>
        </Pressable>
      </View> */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Soporte</Text>
        <Pressable style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <HelpCircle size={24} color="#6b7280" />
            <Text style={styles.settingLabel}>Centro de Ayuda</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.version}>Version 1.0.0</Text>
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
    color: '#111827',
    fontFamily: 'Inter_600SemiBold',
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
    fontFamily: 'Inter_400Regular',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  version: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Inter_400Regular',
  },
});