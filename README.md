HEAD
# TownPay

A **mock** mobile payments + small-business prototype: QR payments, send/receive, inventory and sales. No real backend, no real money, no real security — it should still feel like a finished fintech app.

This repository’s foundation (navigation, mock auth, theme, shared components) is owned by **Demitri**. Feature screens are placeholders until Christopher, Kateho and SG replace them.

## Run it

```bash
npm install
npx expo start
```

Scan the QR code with **Expo Go**.

TownPay is on **Expo SDK 58**. Expo Go on your phone must match SDK 58. If the store build is older, install a matching client from [expo.dev/go](https://expo.dev/go).

Exact packages used by the shell (already in `package.json`):

```bash
npx expo install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack react-native-screens react-native-safe-area-context react-native-gesture-handler @react-native-async-storage/async-storage @expo/vector-icons
```

Do **not** add Expo Router. Navigation is React Navigation only.

## Demo login

| Field | Value |
| --- | --- |
| Email | `demo@townpay.app` |
| Password | `townpay` |
| PIN | `1234` |

Any valid-format email (or 10+ digit phone) plus a password of 6+ characters also signs in. Registering stores a mock user on device.

## Tech stack

- Expo SDK 58, React Native, JavaScript
- React Navigation (native stack + bottom tabs)
- React Context (`AuthContext`, `TransactionsContext` skeleton)
- AsyncStorage for mock session persistence
- Ionicons via `@expo/vector-icons`

## Folder map

```
src/
  navigation/     Demitri — routes, stacks, tabs
  screens/auth    Demitri — Splash, Login, Register, PIN
  screens/profile Demitri — Profile, component showcase
  screens/home    Christopher
  screens/transactions  Christopher
  screens/qr      Kateho
  screens/inventory     SG
  components/     Demitri — shared UI
  theme/          Demitri — colours, type, space
  context/        Auth (Demitri) + Transactions skeleton (Christopher fills in)
  data/           teammates add their own mock files
  utils/          Demitri
docs/             Team, git, and test guides
```

## Docs

- [Team guide](docs/TEAM_GUIDE.md)
- [Git workflow](docs/GIT_WORKFLOW.md)
- [Manual test checklist](docs/TEST_CHECKLIST.md)
- [Frozen contracts](docs/CONTRACTS.md)
=======
# TownshipPay-App
Mobile App for Group Project
3a1d77c80009e44e0c3b94b011847865f27478ac
