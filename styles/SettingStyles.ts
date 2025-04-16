import { StyleSheet } from "react-native";

export const SettingStyles = StyleSheet.create({
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
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },

    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    modalContent: {
        marginTop: 10,
    },

    helpText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#374151',
    },
});
