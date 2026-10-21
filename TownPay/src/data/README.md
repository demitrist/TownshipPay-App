# src/data — mock data (teammate-owned)

This folder is empty on purpose so Git merge conflicts stay rare.

Add **your own** mock files. Do not edit someone else’s data file.

| Owner | Suggested file | Purpose |
| --- | --- | --- |
| Christopher | `transactions.js` | Seed history + filters |
| Kateho | `qrPayloads.js` | Sample QR strings / payees |
| SG | `products.js` | Inventory catalogue |

Keep exports simple, for example:

```js
export const PRODUCTS = [
  { id: 'item_001', name: 'Brown bread', price: 18.5, quantity: 12, lowStockAt: 5 },
];
```

Shared live data (new payments, sales) belongs in `TransactionsContext`, not in these files.
