import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

/**
 * SKELETON ONLY — Christopher owns the real implementation.
 * Kateho and SG should call addTransaction() so History can pick it up later.
 *
 * Transaction shape:
 * {
 *   id: string,
 *   type: 'debit' | 'credit',
 *   amount: number,
 *   currency: 'ZAR',
 *   status: 'pending' | 'synced',
 *   source: 'qr' | 'send' | 'receive' | 'sale',
 *   counterparty: string,
 *   note: string,
 *   createdAt: string (ISO),
 *   syncedAt: string | null,
 * }
 */
const TransactionsContext = createContext(null);

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = useCallback((partial) => {
    const next = {
      id: partial.id || `txn_${Date.now()}`,
      type: partial.type || 'debit',
      amount: Number(partial.amount) || 0,
      currency: partial.currency || 'ZAR',
      status: partial.status || 'pending',
      source: partial.source || 'send',
      counterparty: partial.counterparty || 'Unknown',
      note: partial.note || '',
      createdAt: partial.createdAt || new Date().toISOString(),
      syncedAt: partial.syncedAt || null,
    };
    setTransactions((current) => [next, ...current]);
    return next;
  }, []);

  const getTransactionById = useCallback(
    (id) => transactions.find((item) => item.id === id) || null,
    [transactions],
  );

  const value = useMemo(
    () => ({ transactions, addTransaction, getTransactionById }),
    [transactions, addTransaction, getTransactionById],
  );

  return (
    <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const ctx = useContext(TransactionsContext);
  if (!ctx) {
    throw new Error('useTransactions must be used inside TransactionsProvider');
  }
  return ctx;
}
