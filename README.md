# TownPay

A **mock** mobile payments + small-business prototype: QR payments, send/receive, inventory and sales. No real backend, no real money, no real security — it should still feel like a finished fintech app.

## Run it

```bash
npm install
npx expo start
```

Scan the QR code with **Expo Go**.

TownPay is on **Expo SDK 58**. Expo Go on your phone must match SDK 58. If the store build is older, install a matching client from [expo.dev/go](https://expo.dev/go).

## Run tests

```bash
npm test
```

## Demo credentials

|| Field | Value |
|| --- | --- |
|| Email | `demo@townpay.app` |
|| Password | `townpay` |
|| PIN | `1234` |

Any valid-format email (or 10+ digit phone starting with 0, or +27 format) plus a password of 6+ characters also signs in. Registering stores a mock user on device.

## Tech stack

- Expo SDK 58, React Native 0.88.1, React 19.3.0
- React Navigation (native stack + bottom tabs)
- React Context (`AuthContext`, `TransactionsContext`, `InventoryContext`)
- AsyncStorage for mock session persistence
- Ionicons via `@expo/vector-icons`
- expo-camera for QR scanning
- react-native-qrcode-svg for QR generation
- Jest + jest-expo for testing

## Folder map

```
src/
  navigation/     Demitri — routes, stacks, tabs
  screens/auth    Demitri — Splash, Login, Register, PIN
  screens/profile Demitri — Profile
  screens/home    Christopher — Home, Send Money, Receive Money
  screens/transactions  Christopher — History
  screens/qr      Kateho — My QR, Scan QR, Confirm Payment, Payment Success, Receipt
  screens/inventory     SG — Inventory, Add Item, Edit Item, Make Sale, Sales Summary
  components/     Demitri — shared UI
  theme/          Demitri — colours, type, space
  context/        Auth (Demitri), Transactions (Christopher), Inventory (SG)
  data/           mock products
  utils/          Demitri — format, validation, salesDates, storage, notify
docs/             Team, git, and test guides
```

## Deliverable 5 Documentation

For Deliverable 5: Tests and Results, see `docs/deliverable-5/` for:
- Feature inventory
- Bug log with all fixes
- Test results (automated and manual)
- Test plan notes
- Screenshot checklist
