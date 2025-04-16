import { View, Text, Pressable, Switch } from 'react-native';
import { SettingStyles } from '@/styles/SettingStyles';
import { ReactNode } from 'react';

type Props = {
    icon: ReactNode;
    label: string;
    onPress?: () => void;
    switchValue?: boolean;
    onToggleSwitch?: (value: boolean) => void;
};

export default function SettingOption({
    icon,
    label,
    onPress,
    switchValue,
    onToggleSwitch,
}: Props) {
    return (
        <Pressable style={SettingStyles.settingItem} onPress={onPress} disabled={!onPress}>
            <View style={SettingStyles.settingInfo}>
                {icon}
                <Text style={SettingStyles.settingLabel}>{label}</Text>
            </View>
            {typeof switchValue === 'boolean' && onToggleSwitch ? (
                <Switch
                    value={switchValue}
                    onValueChange={onToggleSwitch}
                    trackColor={{ false: '#e5e5e5', true: '#818cf8' }}
                    thumbColor={switchValue ? '#6366f1' : '#fff'}
                />
            ) : null}
        </Pressable>
    );
}
