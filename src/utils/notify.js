import { Platform, Alert } from 'react-native';

/**
 * Cross-platform notification helper
 * On native: uses Alert.alert
 * On web: uses window.alert or window.confirm
 */

export function notify(title, message) {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message || ''}`);
  } else {
    Alert.alert(title, message);
  }
}

export function confirm(title, message, onConfirm, onCancel) {
  if (Platform.OS === 'web') {
    const result = window.confirm(`${title}\n\n${message || ''}`);
    if (result) {
      onConfirm?.();
    } else {
      onCancel?.();
    }
  } else {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: onCancel,
        },
        {
          text: 'OK',
          onPress: onConfirm,
        },
      ],
      { cancelable: true }
    );
  }
}

export function confirmWithOptions(title, message, buttons, options = {}) {
  if (Platform.OS === 'web') {
    // Web only supports simple confirm, default to first button
    const result = window.confirm(`${title}\n\n${message || ''}`);
    if (result && buttons.length > 0) {
      const primaryButton = buttons.find(b => b.style !== 'cancel') || buttons[0];
      primaryButton.onPress?.();
    }
  } else {
    Alert.alert(title, message, buttons, options);
  }
}
