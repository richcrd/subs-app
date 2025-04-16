import { View, Text } from 'react-native';
import { AnalitycStyles } from '@/styles/AnalitycStyles';

interface Category {
    name: string;
    amount: number;
}

interface CategoryCardProps {
    category: Category;
    totalMonthly: number;
}

function CategoryCard({ category, totalMonthly }: CategoryCardProps) {
    const percentage = (category.amount / totalMonthly) * 100;

    return (
        <View style={AnalitycStyles.categoryCard}>
            <View style={AnalitycStyles.categoryInfo}>
                <Text style={AnalitycStyles.categoryName}>{category.name}</Text>
                <View style={AnalitycStyles.progressBar}>
                    <View style={[AnalitycStyles.progressFill, { width: `${percentage}%` }]} />
                </View>
            </View>
            <Text style={AnalitycStyles.categoryAmount}>${category.amount.toFixed(2)}</Text>
        </View>
    );
}

export default CategoryCard;
