import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { Bell, CreditCard, Shield, CircleHelp as HelpCircle } from 'lucide-react-native';

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Bell size={24} color="#6b7280" />
            <Text style={styles.settingLabel}>Payment Reminders</Text>
          </View>
          <Switch 
            value={true}
            onValueChange={() => {}}
            trackColor={{ false: '#e5e5e5', true: '#818cf8' }}
            thumbColor={true ? '#6366f1' : '#fff'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Methods</Text>
        <Pressable style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <CreditCard size={24} color="#6b7280" />
            <Text style={styles.settingLabel}>Manage Payment Methods</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        <Pressable style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Shield size={24} color="#6b7280" />
            <Text style={styles.settingLabel}>Privacy Settings</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <Pressable style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <HelpCircle size={24} color="#6b7280" />
            <Text style={styles.settingLabel}>Help Center</Text>
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