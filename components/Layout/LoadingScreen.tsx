import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

type LoadingScreenProps = {
    backgroundColor?: string;
    spinnerColor?: string;
};

export default function LoadingScreen({
    backgroundColor = '#fff',
    spinnerColor = '#000',
}: LoadingScreenProps) {
    return (
        <View style={[styles.container, { backgroundColor }]}>
            <ActivityIndicator size="large" color={spinnerColor} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});