import React from 'react';
import { View, Text } from 'react-native';
import { Input, Select, SelectItem, Datepicker, IndexPath } from '@ui-kitten/components';
import { SubscriptionStyles } from '@/styles/SubscriptionStyles';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import { colorOptions } from '@/constants/colors';
import { SubscriptionFormData } from '@/types/Subscription';

type Props = {
    formData: SubscriptionFormData;
    setFormData: (data: SubscriptionFormData) => void;
};

export default function SubscriptionForm({ formData, setFormData }: Props) {
    const { categories, plans, billingCycles } = useSubscriptionStore();

    const getIndexPath = (array: string[], value: string) =>
        new IndexPath(array.findIndex((item) => item === value));

    const getColorIndexPath = (hex: string) =>
        new IndexPath(colorOptions.findIndex((c) => c.hex === hex));

    return (
        <>
            <Input
                label="Nombre del Servicio"
                value={formData.name}
                onChangeText={(val) => setFormData({ ...formData, name: val })}
                style={SubscriptionStyles.input}
                placeholder="Netflix, Spotify, Youtube..."
            />

            <Select
                label="Tipo de Plan"
                selectedIndex={formData.plan ? getIndexPath(plans, formData.plan) : undefined}
                value={formData.plan || ''}
                onSelect={(index) =>
                    setFormData({ ...formData, plan: plans[(index as IndexPath).row] })
                }
                style={SubscriptionStyles.input}
                placeholder="Selecciona una opción"
            >
                {plans.map((item, i) => (
                    <SelectItem key={i} title={item} />
                ))}
            </Select>

            <Input
                label="Monto Mensual"
                value={formData.amount}
                onChangeText={(val) =>
                    setFormData({
                        ...formData,
                        amount: val,
                    })
                }
                keyboardType="numeric"
                style={SubscriptionStyles.input}
                placeholder="$4.99"
            />

            <Datepicker
                label="Fecha de Cobro"
                date={formData.date}
                onSelect={(nextDate) => setFormData({ ...formData, date: nextDate })}
                style={SubscriptionStyles.input}
            />

            <Select
                label="Categoría"
                selectedIndex={formData.category ? getIndexPath(categories, formData.category) : undefined}
                value={formData.category || ''}
                onSelect={(index) =>
                    setFormData({ ...formData, category: categories[(index as IndexPath).row] })
                }
                style={SubscriptionStyles.input}
                placeholder="Selecciona una opción"
            >
                {categories.map((item, i) => (
                    <SelectItem key={i} title={item} />
                ))}
            </Select>

            <Select
                label="Periodo de Cobro"
                selectedIndex={formData.billingCycle ? getIndexPath(billingCycles, formData.billingCycle) : undefined}
                value={formData.billingCycle || ''}
                onSelect={(index) =>
                    setFormData({
                        ...formData,
                        billingCycle: billingCycles[(index as IndexPath).row],
                    })
                }
                style={SubscriptionStyles.input}
                placeholder="Selecciona una opción"
            >
                {billingCycles.map((item, i) => (
                    <SelectItem key={i} title={item} />
                ))}
            </Select>

            <Select
                label="Color del Servicio"
                selectedIndex={formData.color ? getColorIndexPath(formData.color) : undefined}
                value={formData.color ? colorOptions.find((c) => c.hex === formData.color)?.name : ''}
                onSelect={(index) =>
                    setFormData({ ...formData, color: colorOptions[(index as IndexPath).row].hex })
                }
                style={SubscriptionStyles.input}
                placeholder="Selecciona un color"
            >
                {colorOptions.map((colorOption, index) => (
                    <SelectItem
                        key={index}
                        title={() => (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View
                                    style={{
                                        backgroundColor: colorOption.hex,
                                        width: 20,
                                        height: 20,
                                        borderRadius: 4,
                                        marginRight: 8,
                                    }}
                                />
                                <Text>{colorOption.name}</Text>
                            </View>
                        )}
                    />
                ))}
            </Select>
        </>
    );
}
