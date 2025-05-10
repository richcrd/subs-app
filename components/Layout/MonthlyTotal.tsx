import { Text } from 'react-native';
import { HomeStyles } from '@/styles/HomeStyles';

type MonthlyTotalProps = {
    total: number;
}

export default function MonthlyTotal({ total }: MonthlyTotalProps) {
    return (
        <Text style={HomeStyles.monthlyTotal}>
            ${total.toFixed(2)}
            <Text style={HomeStyles.monthlyTotalLabel}> /mes</Text>
        </Text>
    );
}