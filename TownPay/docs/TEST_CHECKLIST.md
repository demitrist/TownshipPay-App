# Manual test checklist

Test on Expo Go (Android and iOS if you can). Mentally check a 360px-wide phone.

## Auth

- [ ] Cold start shows the blue TownPay splash, then Sign in (or Main tabs if a session exists)
- [ ] Demo card is visible: `demo@townpay.app` / `townpay` / PIN `1234`
- [ ] Empty or invalid email disables Continue
- [ ] Short password shows an inline error
- [ ] Login → PIN; `1234` opens Home
- [ ] Wrong PIN shakes, shows an error; 3 failures show the lockout message
- [ ] Register requires name, email, phone, password + confirm; then PIN set mode
- [ ] Logout from Profile returns to Sign in (no crash, no leftover tabs)
- [ ] Kill and reopen the app: still logged in (AsyncStorage). If storage fails, app still runs.

## Tabs and routes

From placeholders, every button must open the named screen (no red box).

- [ ] Home → Send money → Confirm payment (QR tab) → Success → Receipt
- [ ] Home → Receive money → My QR
- [ ] History → sample receipt
- [ ] QR tab (centre, raised) → Scan → Confirm → Success → Receipt → History
- [ ] Inventory → Add item, Edit item (`itemId` visible), Make a sale → Sales summary → History
- [ ] Profile → Component showcase (buttons, inputs, badges, empty state)
- [ ] Android back from a stack screen pops one screen, not the whole tab
- [ ] Android back on a tab root does not dump the user into Auth

## Polish

- [ ] Keyboard does not cover Login / Register fields
- [ ] Headers use the blue theme; no mixed fonts
- [ ] Offline banner (when Christopher adds it) does not hide the tab bar
- [ ] QR tab stays tappable on a small phone; touch targets feel ≥ 44px
- [ ] No yellow-box warnings in the Metro console for unused vars / missing keys

## Demo run-through (about 5 minutes)

1. Splash → Sign in with demo credentials → PIN 1234.
2. Home placeholder: explain dashboard / offline toggle is Christopher’s.
3. Send money → confirm mock payment → success → receipt.
4. Centre QR tab → Scan → confirm Sipho Traders R85 → success.
5. History: mention pending vs synced and that QR/sale rows will appear via `addTransaction`.
6. Inventory → add/edit → make a sale → sales summary.
7. Profile showcase (30 seconds) → Log out → Sign in again.

That path touches every tab and the auth gate.
