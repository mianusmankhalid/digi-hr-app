import { ToastAndroid } from 'react-native';

export function showToast(message, duration = ToastAndroid.SHORT) {
  ToastAndroid.show(message, duration);
}
