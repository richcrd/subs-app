import React from 'react';
import { View, Text } from 'react-native';
import {
  Input,
  Select,
  SelectItem,
  Datepicker,
  IndexPath,
} from '@ui-kitten/components';
import { useFormContext, Controller } from 'react-hook-form';
import { SubscriptionStyles } from '@/styles/SubscriptionStyles';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import { colorOptions } from '@/constants/colors';
import { SubscriptionSchemaType } from '@/validations/subscriptionSchema';

type Props = {
  onSubmit?: () => void;
};

export default function SubscriptionForm({ onSubmit }: Props) {
  const { control, handleSubmit, formState } = useFormContext<SubscriptionSchemaType>();
  const { errors } = formState;
  const { categories, plans, billingCycles } = useSubscriptionStore();

  const getIndexPath = (array: string[], value: string) =>
    new IndexPath(array.findIndex((item) => item === value));

  const getColorIndexPath = (hex: string) =>
    new IndexPath(colorOptions.findIndex((c) => c.hex === hex));

  return (
    <View>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Nombre del Servicio"
            value={value}
            onChangeText={onChange}
            placeholder="Netflix, Spotify..."
            style={SubscriptionStyles.input}
            status={errors.name ? 'danger' : 'basic'}
            caption={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="plan"
        render={({ field: { onChange, value } }) => (
          <Select
            label="Tipo de Plan"
            selectedIndex={value ? getIndexPath(plans, value) : undefined}
            value={value || ''}
            onSelect={(index) => onChange(plans[(index as IndexPath).row])}
            style={SubscriptionStyles.input}
            placeholder="Selecciona una opción"
            status={errors.plan ? 'danger' : 'basic'}
            caption={errors.plan?.message}
          >
            {plans.map((item, i) => (
              <SelectItem key={i} title={item} />
            ))}
          </Select>
        )}
      />

      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Monto Mensual"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            placeholder="$4.99"
            style={SubscriptionStyles.input}
            status={errors.amount ? 'danger' : 'basic'}
            caption={errors.amount?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="date"
        render={({ field: { onChange, value } }) => (
          <Datepicker
            label="Fecha de Cobro"
            date={value}
            onSelect={onChange}
            style={SubscriptionStyles.input}
            status={errors.date ? 'danger' : 'basic'}
            caption={errors.date?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <Select
            label="Categoría"
            selectedIndex={value ? getIndexPath(categories, value) : undefined}
            value={value || ''}
            onSelect={(index) =>
              onChange(categories[(index as IndexPath).row])
            }
            style={SubscriptionStyles.input}
            placeholder="Selecciona una opción"
            status={errors.category ? 'danger' : 'basic'}
            caption={errors.category?.message}
          >
            {categories.map((item, i) => (
              <SelectItem key={i} title={item} />
            ))}
          </Select>
        )}
      />

      <Controller
        control={control}
        name="billingCycle"
        render={({ field: { onChange, value } }) => (
          <Select
            label="Periodo de Cobro"
            selectedIndex={value ? getIndexPath(billingCycles, value) : undefined}
            value={value || ''}
            onSelect={(index) =>
              onChange(billingCycles[(index as IndexPath).row])
            }
            style={SubscriptionStyles.input}
            placeholder="Selecciona una opción"
            status={errors.billingCycle ? 'danger' : 'basic'}
            caption={errors.billingCycle?.message}
          >
            {billingCycles.map((item, i) => (
              <SelectItem key={i} title={item} />
            ))}
          </Select>
        )}
      />

      <Controller
        control={control}
        name="color"
        render={({ field: { onChange, value } }) => (
          <Select
            label="Color del Servicio"
            selectedIndex={value ? getColorIndexPath(value) : undefined}
            value={colorOptions.find((c) => c.hex === value)?.name || ''}
            onSelect={(index) =>
              onChange(colorOptions[(index as IndexPath).row].hex)
            }
            style={SubscriptionStyles.input}
            placeholder="Escoge un color"
            status={errors.color ? 'danger' : 'basic'}
            caption={errors.color?.message}
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
        )}
      />
    </View>
  );
}
