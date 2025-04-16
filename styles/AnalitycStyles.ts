import { StyleSheet } from "react-native";

export const AnalitycStyles = StyleSheet.create({
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
        fontFamily: 'Inter_600SemiBold',
        color: '#111827',
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
        marginTop: 4,
        fontFamily: 'Inter_400Regular',
    },
    totalCard: {
        margin: 20,
        padding: 20,
        backgroundColor: '#7AC6D2',
        borderRadius: 12,
    },
    totalLabel: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.9,
        fontFamily: 'Inter_400Regular',
    },
    totalAmount: {
        fontSize: 36,
        color: '#fff',
        marginTop: 8,
        fontFamily: 'Inter_700Bold',
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
    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
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
    categoryInfo: {
        flex: 1,
    },
    categoryName: {
        fontSize: 16,
        color: '#111827',
        marginBottom: 8,
        fontFamily: 'Inter_600SemiBold',
    },
    progressBar: {
        height: 4,
        backgroundColor: '#e5e5e5',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#FFAB5B',
        borderRadius: 2,
    },
    categoryAmount: {
        fontSize: 16,
        color: '#111827',
        marginLeft: 16,
        fontFamily: 'Inter_600SemiBold',
    },
    insightCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        marginVertical: 5,
    },
    insightText: {
        fontSize: 14,
        color: '#111827',
        fontFamily: 'Inter_400Regular',
    },
});
