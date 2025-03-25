import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

interface ScrollContainerProps {
    children?: ReactNode;
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
});

export default ScrollContainer;