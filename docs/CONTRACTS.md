# Frozen contracts

Do not rename routes, tab keys, theme tokens, or shared component props without Demitri changing this file first.

## 4.1 Folder ownership

```
src/
  navigation/          Demitri only
  screens/auth/        Demitri
  screens/home/        Christopher
  screens/transactions/Christopher
  screens/qr/          Kateho
  screens/inventory/   SG
  screens/profile/     Demitri
  components/          Demitri only
  theme/               Demitri only
  context/AuthContext.js           Demitri
  context/TransactionsContext.js   Christopher may implement; keep the exported API
  data/                each teammate adds their own files
  utils/               Demitri
```

Replace the **contents** of your screen files. Keep the **file names** and default exports.

## 4.2 Routes (`src/navigation/routes.js`)

Import:

```js
import { ROUTES, TABS } from '../navigation/routes';
```

Same-stack push:

```js
navigation.navigate(ROUTES.SEND_MONEY);
navigation.navigate(ROUTES.EDIT_ITEM, { itemId: 'item_001' });
```

Cross-tab (required for QR confirmation / receipt):

```js
navigation.navigate(TABS.QR, {
  screen: ROUTES.CONFIRM_PAYMENT,
  params: { amount: '85.00', payee: 'Sipho Traders', source: 'qr' },
});
```

Params:

| Route | Params |
| --- | --- |
| `EDIT_ITEM` | `{ itemId: string }` |
| `SEND_MONEY` | `{ prefillAmount?: string, prefillPayee?: string }` |
| `RECEIVE_MONEY` | `{ prefillAmount?: string }` |
| `CONFIRM_PAYMENT` | `{ amount: string, payee: string, source: 'qr'\|'send'\|'receive'\|'sale' }` |
| `PAYMENT_SUCCESS` | `{ amount: string, payee: string, transactionId: string }` |
| `RECEIPT` | `{ transactionId: string }` |
| `MAKE_SALE` | `{ itemId?: string }` |
| `PIN` | `{ mode: 'verify' \| 'set' }` |

## 4.3 Navigation tree

```
Root
 |- AuthStack (when logged out)
 |    Splash → Login → Pin
 |                 ↘ Register → Pin
 |- MainTabs (when logged in)
      HomeTab        → HomeStack (Home, SendMoney, ReceiveMoney)
      HistoryTab     → HistoryStack (History)
      QrTab          → QrStack (MyQR, ScanQR, ConfirmPayment, PaymentSuccess, Receipt)
      InventoryTab   → InventoryStack (Inventory, AddItem, EditItem, MakeSale, SalesSummary)
      ProfileTab     → ProfileStack (Profile, ComponentShowcase)
```

## 4.4 Theme

```js
import { colors, spacing, radii, typography, shadows } from '../theme';
```

Colour tokens: `primary`, `primaryDark`, `secondary`, `background`, `surface`, `text`, `textMuted`, `textOnPrimary`, `border`, `success`, `warning`, `danger`, `info`, `statusPending`, `statusSynced`, `offlineBanner`, `onlineBanner`, `lowStock`.

Spacing: `xs=4 sm=8 md=12 lg=16 xl=24 xxl=32`.

Light mode only. Palette is the attached blue strip (royal → ice), with navy body text for WCAG AA.

## 4.5 Shared components

From `src/components`: `Button`, `Input`, `Card`, `ScreenContainer`, `SectionHeader`, `StatusBadge`, `EmptyState`, `ListItem`, `AppHeader`, `Divider`, `BalanceCard`.

Open **Profile → Component showcase** to see every variant.

## 4.6 AuthContext

```js
const { user, isAuthenticated, isLoading, register, login, verifyPin, setPin, logout } = useAuth();
```

- `login(emailOrPhone, password)` — valid email/phone + password ≥ 6
- `register({ name, email, phone, password, confirmPassword })`
- `verifyPin(pin)` / `setPin(pin)` — 4 digits, demo default `1234`
- Session is persisted; logout keeps the mock user but clears the session flag
