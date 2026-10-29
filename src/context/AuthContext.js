import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  isEmailOrPhone,
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidPhone,
  isValidPin,
} from '../utils/validation';
import { STORAGE_KEYS, storageGet, storageSet } from '../utils/storage';

const AuthContext = createContext(null);

const DEMO_PIN = '1234';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const persistUser = useCallback(async (nextUser, sessionActive) => {
    await storageSet(STORAGE_KEYS.USER, JSON.stringify(nextUser));
    await storageSet(STORAGE_KEYS.SESSION, sessionActive ? '1' : '0');
  }, []);

  useEffect(() => {
    let mounted = true;

    async function hydrate() {
      try {
        const rawUser = await storageGet(STORAGE_KEYS.USER);
        const session = await storageGet(STORAGE_KEYS.SESSION);
        if (!mounted) return;
        if (rawUser) {
          try {
            const parsed = JSON.parse(rawUser);
            setUser(parsed);
            setIsAuthenticated(session === '1');
          } catch (parseError) {
            // Corrupted user data, start fresh
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      } catch (_error) {
        if (mounted) {
          setUser(null);
          setIsAuthenticated(false);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    hydrate();
    return () => {
      mounted = false;
    };
  }, []);

  const register = useCallback(async (data) => {
    const name = String(data?.name || '').trim();
    const email = String(data?.email || '').trim().toLowerCase();
    const phone = String(data?.phone || '').trim();
    const password = String(data?.password || '');

    if (!isValidName(name)) throw new Error('Enter your full name.');
    if (!isValidEmail(email)) throw new Error('Enter a valid email address.');
    if (!isValidPhone(phone)) throw new Error('Enter a valid phone number.');
    if (!isValidPassword(password)) throw new Error('Password must be at least 6 characters.');
    if (password !== data?.confirmPassword) throw new Error('Passwords do not match.');

    const nextUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      phone,
      pin: DEMO_PIN,
      createdAt: new Date().toISOString(),
    };

    setUser(nextUser);
    setIsAuthenticated(false);
    await persistUser(nextUser, false);
    return nextUser;
  }, [persistUser]);

  const login = useCallback(async (identifier, password) => {
    if (!isEmailOrPhone(identifier)) {
      throw new Error('Enter a valid email or phone number.');
    }
    if (!isValidPassword(password)) {
      throw new Error('Password must be at least 6 characters.');
    }

    const existing = user || {
      id: 'usr_demo',
      name: 'Demo Merchant',
      email: isValidEmail(identifier) ? identifier.trim().toLowerCase() : 'demo@townpay.app',
      phone: isValidPhone(identifier) ? identifier.trim() : '0821234567',
      pin: DEMO_PIN,
      createdAt: new Date().toISOString(),
    };

    setUser(existing);
    setIsAuthenticated(false);
    await persistUser(existing, false);
    return existing;
  }, [persistUser, user]);

  const verifyPin = useCallback(async (pin) => {
    if (!isValidPin(pin)) throw new Error('PIN must be 4 digits.');
    const expected = user?.pin || DEMO_PIN;
    if (pin !== expected) throw new Error('Incorrect PIN. Try 1234 for the demo.');
    setIsAuthenticated(true);
    if (user) await persistUser(user, true);
  }, [persistUser, user]);

  const setPin = useCallback(async (pin) => {
    if (!isValidPin(pin)) throw new Error('PIN must be 4 digits.');
    const nextUser = {
      ...(user || {
        id: `usr_${Date.now()}`,
        name: 'TownPay User',
        email: 'demo@townpay.app',
        phone: '0821234567',
        createdAt: new Date().toISOString(),
      }),
      pin,
    };
    setUser(nextUser);
    setIsAuthenticated(true);
    await persistUser(nextUser, true);
  }, [persistUser, user]);

  const logout = useCallback(async () => {
    setIsAuthenticated(false);
    await storageSet(STORAGE_KEYS.SESSION, '0');
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      register,
      login,
      verifyPin,
      setPin,
      logout,
    }),
    [user, isAuthenticated, isLoading, register, login, verifyPin, setPin, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
