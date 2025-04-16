import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

interface ActionButtonProps {
    text: string;
    onPress?: () => void;
    variant?: 'primary' | 'secondary';
    route?: `/${string}`;
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, onPress, variant = "primary", route }) => {
    const router = useRouter();

    const handlePress = () => {
        if (route) {
            router.push(route);
        }
        if (onPress) {
            onPress();
        }
    };

    return (
        <Pressable style={[styles.actionButton, variant === 'secondary' && styles.actionButtonSecondary]}
            onPress={handlePress}>
            <Text style={variant === 'secondary' ? styles.actionButtonTextSecondary : styles.actionButtonText}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    actionButton: {
        flex: 1,
        backgroundColor: '#6366f1',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    actionButtonSecondary: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e5e5e5',
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
    },
    actionButtonTextSecondary: {
        color: '#6b7280',
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
    },
});

export default ActionButton;