import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { SettingStyles } from '@/styles/SettingStyles';

export default function HelpModal() {
  const router = useRouter();

  return (
    <View style={SettingStyles.modalContainer}>
      <View style={SettingStyles.modalHeader}>
        <Text style={SettingStyles.modalTitle}>Información</Text>
      </View>

      <ScrollView style={SettingStyles.modalContent}>
        <Text style={SettingStyles.helpText}>
          🛠 ¿Tienes problemas?
          {'\n\n'}
          Aquí te dejamos algunas soluciones rápidas:
          {'\n\n'}
          🔔 Notificaciones: Asegúrate de tenerlas activadas tanto en la app como en los ajustes de tu teléfono.
          {'\n\n'}
          💳 Suscripciones: Si no ves una suscripción, intenta agregarla nuevamente.
          {'\n\n'}
          📅 Recordatorios: Las notificaciones se envían 3 días antes de la fecha de pago.
          {'\n\n'}
          🧹 Eliminar datos: Puedes eliminar una suscripción desde el detalle en la sección de gastos.
          {'\n\n'}
          Si sigues teniendo problemas, contáctanos por correo:
          {'\n'}📧 richardsupport@subsapp.com
        </Text>
      </ScrollView>
    </View>
  );
}
