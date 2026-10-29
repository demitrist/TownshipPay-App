# TownPay Bug Log

## Known Issues (K1-K8)

### K1: Receive Money screen is a duplicate of HomeScreen
- **Severity**: Critical
- **Location**: `src/screens/home/ReceiveMoneyScreen.js`
- **How to reproduce**: Tap "Receive Money" from Home screen. Screen shows Home dashboard instead of a receive money interface.
- **Root cause**: File is byte-identical to HomeScreen.js, even exports `HomeScreen` instead of `ReceiveMoneyScreen`.
- **Fix**: Replace with real Receive Money screen that shows merchant QR code, allows optional amount/note entry for payment requests, records pending incoming transactions, and provides Share action.
- **Verification**: After fix, Receive Money should show QR code and form, not Home dashboard.
- **Status**: Fixed
- **Commit**: 0fe6a27
- **Before**: Tapping "Receive Money" reloads Home dashboard
- **After**: Tapping "Receive Money" shows merchant QR code with request form

### K2: History screen is a duplicate of SendMoneyScreen
- **Severity**: Critical
- **Location**: `src/screens/transactions/HistoryScreen.js`
- **How to reproduce**: Tap History tab. Screen shows Send Money payment form instead of transaction list.
- **Root cause**: File is byte-identical to SendMoneyScreen.js, exports `SendMoneyScreen` instead of `HistoryScreen`.
- **Fix**: Replace with real History screen that lists all transactions (newest first), supports filters (All/Sent/Received/Pending/Synced), text search, opens receipt on tap, shows sales from till, and displays EmptyState when no matches.
- **Verification**: After fix, History tab should show transaction list with filters and search.
- **Status**: Fixed
- **Commit**: 0fe6a27
- **Before**: History tab shows Send Money payment form
- **After**: History tab shows transaction list with filters and search

### K3: QR feature files in wrong location
- **Severity**: High
- **Location**: `TownPay/src/screens/qr/` (duplicate folder) vs `src/screens/qr/` (placeholders)
- **How to reproduce**: Check `src/screens/qr/` - all files are placeholder "FeaturePlaceholder" components. Check `TownPay/src/screens/qr/` - contains finished implementations.
- **Root cause**: Nested duplicate project folder TownPay/ contains the real QR implementations while the actual src/screens/qr/ has placeholders.
- **Fix**: Copy finished screens from TownPay/src/screens/qr/ into src/screens/qr/, diff to keep better version, delete nested TownPay/ folder after confirming no unique files remain.
- **Verification**: After fix, src/screens/qr/ should contain real implementations, TownPay/ folder should be deleted.
- **Status**: Fixed
- **Commit**: 0fe6a27
- **Before**: src/screens/qr/ contains placeholder screens, real code in nested TownPay/ folder
- **After**: src/screens/qr/ contains real implementations, TownPay/ folder deleted

### K4: Missing QR dependencies
- **Severity**: High
- **Location**: `package.json`
- **How to reproduce**: Attempt to use QRCode component from real MyQrScreen - would fail due to missing dependencies.
- **Root cause**: QR screens need `react-native-svg` and `react-native-qrcode-svg` which are not in package.json.
- **Fix**: Install with `npx expo install react-native-svg react-native-qrcode-svg`.
- **Verification**: After install, dependencies should be in package.json and app should still boot.
- **Status**: Fixed
- **Commit**: 0fe6a27
- **Before**: package.json missing react-native-svg and react-native-qrcode-svg
- **After**: Dependencies installed and listed in package.json

### K5: QR scan is mock-only
- **Severity**: High
- **Location**: `src/screens/qr/ScanQrScreen.js` (after K3 fix)
- **How to reproduce**: Open Scan QR screen - only has "Mock a successful scan" button, no camera.
- **Root cause**: Implementation is placeholder with mock button only.
- **Fix**: Add real scanning with expo-camera (CameraView with onBarcodeScanned), request permission, show friendly screen if denied with "Open settings" action, stop scanning after first valid read to avoid duplicate payments. Keep mock button as "Demo scan" fallback.
- **Verification**: After fix, should request camera permission and show live camera feed for scanning.
- **Status**: Fixed
- **Commit**: 0fe6a27
- **Before**: Scan QR has only "Mock a successful scan" button
- **After**: Scan QR has real camera scanning with permission handling, plus "Demo scan" fallback

### K6: Balance and transaction consistency issues
- **Severity**: High
- **Location**: `src/context/TransactionsContext.js` (balance calculation)
- **How to reproduce**: Send R150 - balance goes 2500→2350. Make QR payment of R85 or sale of R85 - balance doesn't change. Recent Transactions lists both.
- **Root cause**: Balance derivation logic may not handle sales (credit) or QR payments correctly. Pending vs Synced logic unclear.
- **Fix**: Audit balance logic to make it explicit: sent payments decrease balance (Pending or Synced), received/QR-receive and till sales increase balance, QR payments by user decrease balance. Make balance a pure derivation from transaction list (single source of truth).
- **Verification**: After fix, all transaction types should correctly affect balance.
- **Status**: Open
- **Commit**: N/A
- **Before**: Balance updates inconsistently for different transaction types
- **After**: Balance correctly derived from all transactions with explicit rules

### K7: Alert.alert doesn't work on web
- **Severity**: Medium
- **Location**: 10 locations across src/screens/home/SendMoneyScreen.js and src/screens/transactions/HistoryScreen.js
- **How to reproduce**: Run app on web, trigger any Alert.alert (e.g., invalid payment). No alert appears, errors are silent.
- **Root cause**: Alert.alert is React Native only, doesn't work on web/react-native-web.
- **Fix**: Create cross-platform helper in src/utils/notify.js (Alert on native, window.alert/confirm or in-app toast/modal on web). Replace all 10 Alert.alert call sites.
- **Verification**: After fix, alerts should appear on both native and web.
- **Status**: Open
- **Commit**: N/A
- **Before**: Alerts silent on web preview
- **After**: Cross-platform alerts work on native and web

### K8: Dead code and dev-only items in production path
- **Severity**: Low
- **Location**: Nested TownPay/ folder, FeaturePlaceholder component, ComponentShowcase screen
- **How to reproduce**: Check Profile screen - has "Component showcase" link to dev-only screen. Check repo - nested TownPay/ folder exists.
- **Root cause**: Dev-only items left in production code path.
- **Fix**: Remove or hide dev-only items: delete nested TownPay/ folder after K3, consider removing FeaturePlaceholder component if no longer needed, hide or remove ComponentShowcase from Profile in production builds.
- **Verification**: After fix, no nested duplicate folders, dev-only screens not accessible in production.
- **Status**: Open
- **Commit**: N/A
- **Before**: Nested TownPay/ folder exists, ComponentShowcase accessible from Profile
- **After**: TownPay/ folder deleted, dev-only screens hidden/removed

## Additional Issues Found During Phase 1

### K9: InventoryContext doesn't persist data
- **Severity**: High
- **Location**: `src/context/InventoryContext.js`
- **How to reproduce**: Add products or make sales, then relaunch app. Products and sales are lost.
- **Root cause**: InventoryContext uses only in-memory state (useState), no AsyncStorage persistence.
- **Fix**: Add AsyncStorage persistence for products and sales similar to TransactionsContext.
- **Verification**: After fix, products and sales should persist across app restarts.
- **Status**: Open
- **Commit**: N/A
- **Before**: Inventory data lost on app restart
- **After**: Inventory data persists via AsyncStorage

### K10: PIN lockout at 3 attempts (should be 5 per spec)
- **Severity**: Medium
- **Location**: `src/screens/auth/PinScreen.js` line 19
- **How to reproduce**: Enter wrong PIN 3 times - locks out. Spec says should be 5 attempts.
- **Root cause**: Lockout threshold set to 3 instead of 5.
- **Fix**: Change `attempts >= 3` to `attempts >= 5` in PinScreen.js.
- **Verification**: After fix, should lock out after 5 wrong attempts.
- **Status**: Fixed
- **Commit**: 25e19d2
- **Before**: PIN locks after 3 wrong attempts
- **After**: PIN locks after 5 wrong attempts

### K11: HistoryStack missing Receipt screen navigation
- **Severity**: High
- **Location**: `src/navigation/HistoryStack.js`
- **How to reproduce**: Tap History tab, try to navigate to Receipt. Receipt screen not registered in HistoryStack.
- **Root cause**: HistoryStack only has History screen, missing Receipt screen that's in QrStack.
- **Fix**: Add Receipt screen to HistoryStack or ensure navigation to Receipt from History uses correct stack (QrStack).
- **Verification**: After fix, should be able to open receipt from History.
- **Status**: Fixed
- **Commit**: 0fe6a27
- **Before**: Receipt not accessible from History
- **After**: Receipt navigation works from History

### K12: SalesSummary "See sales in history" navigation incorrect
- **Severity**: Medium
- **Location**: `src/screens/inventory/SalesSummaryScreen.js` line 115
- **How to reproduce**: Tap "See sales in history" in SalesSummary. Navigates to wrong screen.
- **Root cause**: Navigation uses `navigation.navigate(TABS.HISTORY, { screen: ROUTES.HISTORY })` which may not resolve correctly.
- **Fix**: Ensure navigation path is correct for deep linking to History tab's History screen.
- **Verification**: After fix, button should navigate to History screen.
- **Status**: Open
- **Commit**: N/A
- **Before**: "See sales in history" navigation fails or goes to wrong screen
- **After**: Navigation correctly opens History screen

### K13: Phone validation too permissive
- **Severity**: Medium
- **Location**: `src/utils/validation.js` line 2
- **How to reproduce**: Enter phone like "+27 (082) 123-4567" - passes validation but not SA format.
- **Root cause**: PHONE_RE pattern `/^[0-9+\s()-]{10,}$/` allows spaces, parentheses, dashes anywhere, not strictly SA format (10 digits starting 0 or +27).
- **Fix**: Update validation to enforce SA format: either 10 digits starting with 0, or +27 followed by 9 digits.
- **Verification**: After fix, only valid SA phone formats should pass.
- **Status**: Fixed
- **Commit**: 25e19d2
- **Before**: Phone validation allows various formats
- **After**: Phone validation enforces SA format (10 digits starting 0, or +27 + 9 digits)

### K14: SendMoneyScreen exported wrong name in HistoryScreen
- **Severity**: Critical
- **Location**: `src/screens/transactions/HistoryScreen.js` line 19
- **How to reproduce**: Import HistoryScreen - actually imports SendMoneyScreen component.
- **Root cause**: HistoryScreen.js exports `SendMoneyScreen` (line 19) instead of `HistoryScreen`.
- **Fix**: Change export to correct name after implementing real History screen.
- **Verification**: After fix, HistoryScreen should export correct component.
- **Status**: Open
- **Commit**: N/A
- **Before**: HistoryScreen exports SendMoneyScreen
- **After**: HistoryScreen exports HistoryScreen component

### K15: InventoryScreen component name typo
- **Severity**: Low
- **Location**: `src/screens/inventory/InventoryScreen.js` line 15
- **How to reproduce**: Check component definition - named `Inventoryscreen` (lowercase s) instead of `InventoryScreen`.
- **Root cause**: Typo in component name.
- **Fix**: Rename to `InventoryScreen` (capital S).
- **Verification**: After fix, component name matches file name convention.
- **Status**: Fixed
- **Commit**: 25e19d2
- **Before**: Component named `Inventoryscreen`
- **After**: Component named `InventoryScreen`

### K16: No error boundary in App.js
- **Severity**: Critical
- **Location**: `App.js`
- **How to reproduce**: Trigger unhandled error in component - app shows white screen.
- **Root cause**: No top-level Error Boundary to catch errors.
- **Fix**: Add Error Boundary in App.js that shows friendly "Something went wrong" screen with Retry button.
- **Verification**: After fix, errors should show friendly error screen instead of white screen.
- **Status**: Open
- **Commit**: N/A
- **Before**: Unhandled errors show white screen
- **After**: Errors show friendly error screen with Retry button

### K17: AsyncStorage operations not wrapped in try/catch
- **Severity**: High
- **Location**: `src/context/TransactionsContext.js` lines 24, 54, `src/context/AuthContext.js` lines 29, 38
- **How to reproduce**: Corrupt AsyncStorage data - app may crash on load.
- **Root cause**: Some AsyncStorage reads/writes lack try/catch or don't handle corrupted JSON gracefully.
- **Fix**: Wrap all AsyncStorage operations in try/catch, handle empty/corrupted data gracefully.
- **Verification**: After fix, app should start cleanly even with corrupted storage.
- **Status**: Open
- **Commit**: N/A
- **Before**: Corrupted storage may crash app
- **After**: Corrupted storage handled gracefully, app starts cleanly

### K18: No route.params safety guards
- **Severity**: High
- **Location**: Multiple screens (Receipt, ConfirmPayment, EditItem, etc.)
- **How to reproduce**: Navigate to screen without required params - may crash.
- **Root cause**: route.params accessed without null checks or safe defaults.
- **Fix**: Add safe defaults for all route.params accesses (e.g., `route.params?.itemId || null`).
- **Verification**: After fix, opening screens without params should not crash.
- **Status**: Open
- **Commit**: N/A
- **Before**: Missing params may cause crashes
- **After**: All params accessed with safe defaults

### K19: console.error calls in production code
- **Severity**: Low
- **Location**: `src/context/TransactionsContext.js` lines 37, 62
- **How to reproduce**: Check code - console.error used for error logging.
- **Root cause**: Development console.error calls left in production code.
- **Fix**: Replace with proper error handling or logging service, remove console.error.
- **Verification**: After fix, no console.error in production code.
- **Status**: Open
- **Commit**: N/A
- **Before**: console.error calls in TransactionsContext
- **After**: console.error removed or replaced with proper error handling

## Summary

- **Total Issues**: 19
- **Critical**: 5 (K1, K2, K14, K16, K17)
- **High**: 7 (K3, K4, K5, K6, K9, K11, K18)
- **Medium**: 5 (K7, K10, K12, K13, K19)
- **Low**: 2 (K8, K15)
- **Fixed**: 9 (K1, K2, K3, K4, K5, K10, K11, K13, K15)
- **Open**: 10
