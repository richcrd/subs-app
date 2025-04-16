import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SectionProps {
    title: string;
    children?: ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
    },
});

export default Section;