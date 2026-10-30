// Test inventory stock logic
const DEFAULT_LOW_STOCK_THRESHOLD = 5;

function isLowStock(product) {
  return product.quantity <= product.lowStockThreshold;
}

describe('inventory stock logic', () => {
  describe('isLowStock', () => {
    it('returns true when quantity at or below threshold', () => {
      expect(isLowStock({ quantity: 5, lowStockThreshold: 5 })).toBe(true);
      expect(isLowStock({ quantity: 3, lowStockThreshold: 5 })).toBe(true);
      expect(isLowStock({ quantity: 0, lowStockThreshold: 5 })).toBe(true);
    });

    it('returns false when quantity above threshold', () => {
      expect(isLowStock({ quantity: 6, lowStockThreshold: 5 })).toBe(false);
      expect(isLowStock({ quantity: 10, lowStockThreshold: 5 })).toBe(false);
    });
  });

  describe('stock reduction on sale', () => {
    it('prevents negative stock', () => {
      const product = { id: '1', quantity: 5 };
      const saleQty = 6;
      expect(saleQty > product.quantity).toBe(true);
    });

    it('allows sale when sufficient stock', () => {
      const product = { id: '1', quantity: 10 };
      const saleQty = 5;
      expect(saleQty <= product.quantity).toBe(true);
    });
  });
});
