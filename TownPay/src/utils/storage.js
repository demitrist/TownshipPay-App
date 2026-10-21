import AsyncStorage from '@react-native-async-storage/async-storage';

const memory = new Map();

/**
 * AsyncStorage wrapper that falls back to memory so a storage failure
 * never crashes the mock auth flow.
 */
export async function storageGet(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (_error) {
    return memory.has(key) ? memory.get(key) : null;
  }
}

export async function storageSet(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
    memory.set(key, value);
  } catch (_error) {
    memory.set(key, value);
  }
}

export async function storageRemove(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (_error) {
    // Ignore — memory fallback still cleared below.
  }
  memory.delete(key);
}

export const STORAGE_KEYS = {
  USER: '@townpay/user',
  SESSION: '@townpay/session',
};
