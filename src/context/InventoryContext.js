import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { MOCK_PRODUCTS } from '../data/mockProducts';

export const DEFAULT_LOW_STOCK_THRESHOLD = 5;

export const isLowStock = (p) => p.quantity <= p.lowStockThreshold;

const nextId = (products) => {
  const max = products.reduce((m, p) => {
    const n = parseInt(String(p.id).replace(/\D/g, ''), 10);
    return Number.isNaN(n) ? m : Math.max(m, n);
  }, 0);
  return `item_${String(max + 1).padStart(3, '0')}`;
};

const clean = (v) => ({
  name: v.name.trim(),
  sku: (v.sku || '').trim(),
  price: v.price,
  quantity: v.quantity,
  lowStockThreshold: v.lowStockThreshold,
});

const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [sales, setSales] = useState([]);

  const getProduct = useCallback((id) => products.find((p) => p.id === id), [products]);

  const addProduct = useCallback((values) => {
    setProducts((prev) => [{ id: nextId(prev), ...clean(values) }, ...prev]);
  }, []);

  const updateProduct = useCallback((id, values) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...clean(values) } : p)));
  }, []);

  const completeSale = useCallback(
    (lines) => {
      if (!lines.length) return { ok: false, error: 'The cart is empty.' };

      const byId = new Map(products.map((p) => [p.id, p]));
      const items = [];
      for (const { itemId, qty } of lines) {
        const p = byId.get(itemId);
        if (!p) return { ok: false, error: 'An item in the cart no longer exists.' };
        if (qty > p.quantity) return { ok: false, error: `Only ${p.quantity} of "${p.name}" left.` };
        items.push({ itemId, name: p.name, price: p.price, qty });
      }

      const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
      const sale = { id: `sale_${Date.now()}`, createdAt: new Date().toISOString(), items, total };

      const sold = new Map(items.map((i) => [i.itemId, i.qty]));
      const next = products.map((p) =>
        sold.has(p.id) ? { ...p, quantity: p.quantity - sold.get(p.id) } : p
      );

      setProducts(next);
      setSales((prev) => [sale, ...prev]);

      return { ok: true, sale, lowStock: next.filter((p) => sold.has(p.id) && isLowStock(p)) };
    },
    [products]
  );

  const lowStockProducts = useMemo(() => products.filter(isLowStock), [products]);

  const value = useMemo(
    () => ({ products, sales, lowStockProducts, getProduct, addProduct, updateProduct, completeSale }),
    [products, sales, lowStockProducts, getProduct, addProduct, updateProduct, completeSale]
  );

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}

export function useInventory() {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error('useInventory must be used inside <InventoryProvider>');
  return ctx;
}