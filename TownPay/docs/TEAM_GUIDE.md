# Team guide

Read [CONTRACTS.md](./CONTRACTS.md) first. Route names and component props are frozen.

## Christopher — Home, send/receive, history, offline

**Your folders:** `src/screens/home/`, `src/screens/transactions/`

**Routes you own:** `HOME`, `SEND_MONEY`, `RECEIVE_MONEY`, `HISTORY`

**You also own** the real `TransactionsContext` implementation. The skeleton already exports:

```js
{
  transactions,
  addTransaction(partial),
  getTransactionById(id),
}
```

Transaction object:

```js
{
  id: 'txn_…',
  type: 'debit' | 'credit',
  amount: 85,
  currency: 'ZAR',
  status: 'pending' | 'synced',
  source: 'qr' | 'send' | 'receive' | 'sale',
  counterparty: 'Sipho Traders',
  note: '',
  createdAt: '2026-10-21T12:00:00.000Z',
  syncedAt: null,
}
```

Kateho and SG will call `addTransaction()`. Do not rename that function.

**Build:** dashboard, send/receive forms, history list + filters, offline/online banner, pending vs synced, mock sync toggle.

**Do not edit:** `src/navigation/*`, `src/theme/*`, `src/components/*`, auth screens.

Need a new route or a Button variant? Ask Demitri — open an issue / message, don’t fork the shell.

### Navigation examples

```js
import { ROUTES, TABS } from '../../navigation/routes';

navigation.navigate(ROUTES.SEND_MONEY, { prefillAmount: '50.00' });

navigation.navigate(TABS.QR, {
  screen: ROUTES.CONFIRM_PAYMENT,
  params: { amount: '50.00', payee: 'Thabo', source: 'send' },
});
```

### Offline banner colour

```js
backgroundColor: isOnline ? colors.onlineBanner : colors.offlineBanner
```

Use `StatusBadge` with `status="pending"` or `status="synced"`.

---

## Kateho — QR, scan, confirm, success, receipt

**Your folder:** `src/screens/qr/`

**Routes you own:** `MY_QR`, `SCAN_QR`, `CONFIRM_PAYMENT`, `PAYMENT_SUCCESS`, `RECEIPT`

`MyQR` must stay the QR tab root.

After a scan or confirmed pay, record the mock movement so Christopher’s history can show it:

```js
import { useTransactions } from '../../context/TransactionsContext';
import { ROUTES } from '../../navigation/routes';

const { addTransaction } = useTransactions();

const txn = addTransaction({
  type: 'debit',
  amount: Number(amount),
  status: 'pending',
  source: 'qr',
  counterparty: payee,
});

navigation.navigate(ROUTES.PAYMENT_SUCCESS, {
  amount,
  payee,
  transactionId: txn.id,
});
```

Allowed extra packages (install with Expo so versions match SDK 58):

```bash
npx expo install react-native-svg react-native-qrcode-svg expo-camera
```

Tell Demitri before adding anything else. Camera: if Expo Go permission is painful, ship a **mock scan button** that still navigates with the frozen params.

---

## SG — Inventory, cart, sales

**Your folder:** `src/screens/inventory/`

**Routes you own:** `INVENTORY`, `ADD_ITEM`, `EDIT_ITEM`, `MAKE_SALE`, `SALES_SUMMARY`

Put mock products in `src/data/products.js` (create it). Edit item **must** read `route.params.itemId`.

When a sale completes:

```js
addTransaction({
  type: 'credit',
  amount: cartTotal,
  status: 'pending',
  source: 'sale',
  counterparty: 'Walk-in customer',
  note: `${itemCount} items`,
});
```

Use `StatusBadge status="low-stock"` and `colors.lowStock`.

---

## Theme and components (everyone)

```js
import { colors, spacing, radii, typography, shadows } from '../../theme';
import { Button, Input, Card, ScreenContainer, StatusBadge } from '../../components';
```

Never hard-code hex colours or magic spacing in feature screens.

Gallery: Profile tab → **Component showcase**.

## What you must not edit

- `App.js`, `index.js`, `app.json`
- `src/navigation/` (except Demitri)
- `src/theme/`
- `src/components/`
- `src/screens/auth/`
- `src/context/AuthContext.js`

Request a change instead of patching those files on a feature branch.

## Sharing data across features

There is **one** shared live store: `TransactionsContext`.

| Event | Who writes | Who reads |
| --- | --- | --- |
| QR payment confirmed | Kateho `addTransaction({ source: 'qr' })` | Christopher History |
| Send / receive | Christopher | Christopher History |
| Till sale | SG `addTransaction({ source: 'sale' })` | Christopher History + SG summary |

Do not invent a second global store. If you need inventory stock on Home, keep products in `src/data` + SG local state until Demitri adds a dedicated context.
