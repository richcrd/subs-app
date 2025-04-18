import { StyleSheet } from "react-native";

export const SubscriptionStyles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
    },
    input: {
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 6,
        color: '#444',
    },
    saveButton: {
        alignItems: 'center',
    },
    closeButton: {
        marginTop: 20,
        alignItems: 'center',
    },
});

export const styles = StyleSheet.create({
    input: {
      marginBottom: 12,
    },
    saveButton: {
      marginTop: 10,
      borderRadius: 8,
    },
    deleteButton: {
      marginTop: 10,
      borderRadius: 8,
    },
    closeButton: {
      marginTop: 20,
      borderRadius: 8,
    },
  });