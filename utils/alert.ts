import { Alert } from 'react-native';

export const showAlert = (
  title: string,
  message: string,
  onConfirm: () => void,
  cancelText: string = 'Cancelar',
  confirmText: string = 'Confirmar'
) => {
  Alert.alert(
    title,
    message,
    [
      { text: cancelText, style: 'cancel' },
      { text: confirmText, style: 'destructive', onPress: onConfirm },
    ]
  );
};
