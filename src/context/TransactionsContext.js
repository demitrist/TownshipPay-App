import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionsContext = createContext(null);
const STORAGE_KEY = '@townpay_transactions';
const INITIAL_BALANCE = 2500;

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);

            if (Array.isArray(parsedData.transactions)) {
              setTransactions(parsedData.transactions);
            }

            if (typeof parsedData.isOnline === 'boolean') {
              setIsOnline(parsedData.isOnline);
            }
          } catch (parseError) {
            // Corrupted data, start fresh
            setTransactions([]);
            setIsOnline(true);
          }
        }
      } catch (error) {
        // Storage error, start fresh
        setTransactions([]);
        setIsOnline(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

 
  useEffect(() => {
    if (isLoading) {
      return;
    }

    async function saveData() {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            transactions,
            isOnline,
          })
        );
      } catch (error) {
        // Silently fail on save error to not disrupt UX
      }
    }

    saveData();
  }, [transactions, isOnline, isLoading]);


  const addTransaction = useCallback(                                        //mock transaction
    (partial) => {
      const now = new Date().toISOString();

      const status = partial.status || (isOnline ? 'synced' : 'pending');

      const next = {
        id:
          partial.id ||
          `txn_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        type: partial.type || 'debit',
        amount: Number(partial.amount) || 0,
        currency: partial.currency || 'ZAR',
        status,
        source: partial.source || 'send',
        counterparty: partial.counterparty || 'Unknown',
        note: partial.note || '',
        createdAt: partial.createdAt || now,
        syncedAt:
          status === 'synced' ? partial.syncedAt || now : null,
      };

      setTransactions((current) => [next, ...current]);

      return next;
    },
    [isOnline]
  );

  const getTransactionById = useCallback(                        // Find a transaction via ID
    (id) => transactions.find((item) => item.id === id) || null,
    [transactions]
  );

  // Simulate switching internet connectivity
  const toggleOnline = useCallback(() => {
    setIsOnline((current) => !current);
  }, []);

  // Sync all pending transactions
  const syncPendingTransactions = useCallback(() => {
    if (!isOnline) {
      return;
    }

    const now = new Date().toISOString();

    setTransactions((current) =>
      current.map((transaction) => {
        if (transaction.status === 'pending') {
          return {
            ...transaction,
            status: 'synced',
            syncedAt: now,
          };
        }

        return transaction;
      })
    );
  }, [isOnline]);

  const balance = useMemo(() => {                            // Calculate the mock balance from recorded payments
    return transactions.reduce((total, transaction) => {
      if (transaction.type === 'credit') {
        return total + transaction.amount;
      }

      return total - transaction.amount;
    }, INITIAL_BALANCE);
  }, [transactions]);


  const pendingCount = useMemo(() => {                            // Count transactions waiting to sync
    return transactions.filter(
      (transaction) => transaction.status === 'pending'
    ).length;
  }, [transactions]);

  const value = useMemo(
    () => ({
      transactions,
      addTransaction,
      getTransactionById,
      balance,
      isOnline,
      setIsOnline,
      toggleOnline,
      syncPendingTransactions,
      pendingCount,
      isLoading,
    }),
    [
      transactions,
      addTransaction,
      getTransactionById,
      balance,
      isOnline,
      toggleOnline,
      syncPendingTransactions,
      pendingCount,
      isLoading,
    ]
  );

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const ctx = useContext(TransactionsContext);

  if (!ctx) {
    throw new Error(
      'useTransactions must be used inside TransactionsProvider'
    );
  }

  return ctx;
}
