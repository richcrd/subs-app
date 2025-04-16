import { StyleSheet } from "react-native";

export const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#6b7280',
    fontFamily: 'Inter_400Regular',
  },
  monthlyTotal: {
    fontSize: 36,
    color: '#111827',
    marginTop: 8,
    fontFamily: 'Inter_700Bold',
  },
  monthlyTotalLabel: {
    fontSize: 16,
    color: '#6b7280',
    fontFamily: 'Inter_400Regular',
  },
  subscriptionsList: {
    padding: 16,
  },
  addButton: {
    backgroundColor: '#6366f1',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
