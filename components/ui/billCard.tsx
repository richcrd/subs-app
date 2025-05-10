import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Section from '@/components/Layout/Section';

interface Bill {
    id: string;
    name: string;
    amount: number;
    billingCycle: string;
    date: string;
    plan?: string;
    category?: string;
    color?: string;
}

interface UpcomingBillsProps {
    title?: string;
    bills: Bill[];
}

const UpcomingBillsSection: React.FC<UpcomingBillsProps> = ({ title = 'Próximos Pagos', bills }) => {
    const router = useRouter()

    const isExpired = (dueDate: string): boolean => {
        const currentDate = new Date();
        const due = new Date(dueDate);
        return due < currentDate;
    }

    return (
        <Section title={title}>
            {bills.map((bill) => {
                const hasExpired = isExpired(bill.date);

                return (
                    <Pressable
                        key={bill.id}
                        style={styles.billCard}
                        onPress={() => router.push(`/modal/${bill.id}`)}
                    >
                        <View style={[styles.colorBox, { backgroundColor: bill.color || '#ddd' }]} />
                        <View style={styles.billInfo}>
                            <Text style={styles.billName}>{bill.name}</Text>
                            <Text style={[styles.billDate, { color: hasExpired ? 'red' : '#6b7280' }]}>
                                Vence {new Date(bill.date).toLocaleDateString()}
                            </Text>
                        </View>
                        <Text style={styles.billAmount}>${bill.amount.toFixed(2)}</Text>
                    </Pressable>
                );
            })}
        </Section>
    );
}

const styles = StyleSheet.create({
    billCard: {
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
    logo: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    billInfo: {
        flex: 1,
        marginLeft: 12,
    },
    billName: {
        fontSize: 16,
        color: '#111827',
        fontFamily: 'Inter_600SemiBold',
    },
    billDate: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 2,
        fontFamily: 'Inter_400Regular',
    },
    billAmount: {
        fontSize: 16,
        color: '#111827',
        fontFamily: 'Inter_600SemiBold',
    },
    colorBox: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },

});

export default UpcomingBillsSection;