# TownPay Feature Inventory

## Screens and Components

| Route Name | Screen File | Purpose | Inputs | Actions | Context Usage |
|------------|-------------|---------|--------|---------|---------------|
| Splash | SplashScreen.js | App loading screen | None | Auto-advance to Login | AuthContext (isLoading) |
| Login | LoginScreen.js | User sign-in | Email/phone, password | Validate, login, navigate to PIN | AuthContext (login) |
| Register | RegisterScreen.js | New user registration | Name, email, phone, password, confirm password | Validate, register, navigate to PIN | AuthContext (register) |
| PIN | PinScreen.js | PIN verification/setup | 4-digit PIN input | Verify/set PIN, unlock app | AuthContext (verifyPin, setPin) |
| Home | HomeScreen.js | Main dashboard | None | Navigate to send/receive money, toggle online/offline, sync pending | TransactionsContext (balance, transactions, isOnline, toggleOnline, syncPendingTransactions, pendingCount) |
| SendMoney | SendMoneyScreen.js | Send money to recipient | Recipient name, amount, note | Validate, record debit transaction | TransactionsContext (addTransaction, balance, isOnline) |
| ReceiveMoney | ReceiveMoneyScreen.js | **DUPLICATE OF HOME** - needs real implementation | (currently none) | (currently none) | (currently none) |
| History | HistoryScreen.js | **DUPLICATE OF SENDMONEY** - needs real implementation | (currently none) | (currently none) | (currently none) |
| MyQR | MyQrScreen.js | **PLACEHOLDER** - show merchant QR code | None | Share QR, navigate to scan | AuthContext (user) |
| ScanQR | ScanQrScreen.js | **PLACEHOLDER** - scan QR code to pay | None | Mock scan, navigate to confirm | None |
| ConfirmPayment | ConfirmPaymentScreen.js | **PLACEHOLDER** - confirm payment details | Amount, payee, source | Confirm payment, navigate to success | TransactionsContext (addTransaction) |
| PaymentSuccess | PaymentSuccessScreen.js | **PLACEHOLDER** - show payment success | Amount, payee, transactionId | Navigate to receipt or home | None |
| Receipt | ReceiptScreen.js | **PLACEHOLDER** - show transaction receipt | TransactionId | Navigate back | TransactionsContext (getTransactionById) |
| Inventory | InventoryScreen.js | Product inventory list | None | Add item, make sale, view summary, edit item | InventoryContext (products, lowStockProducts) |
| AddItem | AddItemScreen.js | Add new product | Name, SKU, price, quantity, threshold | Validate, add product | InventoryContext (addProduct) |
| EditItem | EditItemScreen.js | Edit existing product | Name, SKU, price, quantity, threshold | Validate, update product | InventoryContext (getProduct, updateProduct) |
| MakeSale | MakeSaleScreen.js | Create sale from inventory | Item selection, quantities | Complete sale, update stock, record transaction | InventoryContext (products, completeSale), TransactionsContext (addTransaction) |
| SalesSummary | SalesSummaryScreen.js | Daily sales report | Date navigation | View daily totals, view low stock, navigate to history | InventoryContext (sales, lowStockProducts) |
| Profile | ProfileScreen.js | User profile | None | View details, logout, navigate to component showcase | AuthContext (user, logout) |
| ComponentShowcase | ComponentShowcaseScreen.js | **DEV-ONLY** - gallery of shared UI | Test inputs | None | None |

## Contexts

| Context | State | Methods | Storage |
|---------|-------|---------|---------|
| AuthContext | user, isAuthenticated, isLoading | register, login, verifyPin, setPin, logout | AsyncStorage (USER, SESSION) |
| TransactionsContext | transactions, isOnline, isLoading, balance (derived), pendingCount (derived) | addTransaction, getTransactionById, toggleOnline, syncPendingTransactions, setIsOnline | AsyncStorage (@townpay_transactions) |
| InventoryContext | products, sales, lowStockProducts (derived) | getProduct, addProduct, updateProduct, completeSale | None (in-memory only) |

## Navigation Structure

- **AuthStack**: Splash → Login → Register → PIN
- **HomeStack**: Home → SendMoney → ReceiveMoney
- **HistoryStack**: History → Receipt
- **QrStack**: MyQR → ScanQR → ConfirmPayment → PaymentSuccess → Receipt
- **InventoryStack**: Inventory → AddItem → EditItem → MakeSale → SalesSummary
- **ProfileStack**: Profile → ComponentShowcase
- **MainTabs**: Home, History, QR (center button), Inventory, Profile

## Known Data Flows

1. **Auth Flow**: Splash → Login (validate) → PIN (verify) → MainTabs
2. **Registration Flow**: Register (validate) → PIN (set) → MainTabs
3. **Send Money Flow**: Home → SendMoney (validate, record debit) → back to Home (balance updated)
4. **Receive Money Flow**: (placeholder) → should show QR + request form → record pending credit
5. **QR Payment Flow**: MyQR → ScanQR → ConfirmPayment → PaymentSuccess → Receipt
6. **Sale Flow**: Inventory → MakeSale (select items) → Complete Sale → update stock, record credit transaction → SalesSummary
7. **Logout Flow**: Profile → logout → reset session → AuthStack

## Critical Issues to Fix

1. **K1**: ReceiveMoneyScreen is a duplicate of HomeScreen - needs real implementation
2. **K2**: HistoryScreen is a duplicate of SendMoneyScreen - needs real implementation  
3. **K3**: QR screens are placeholders in src/screens/qr/ but finished versions exist in TownPay/src/screens/qr/
4. **K4**: Missing dependencies: react-native-svg, react-native-qrcode-svg
5. **K5**: QR scan is mock-only - needs real camera integration
6. **K6**: Balance calculation may not reflect sales or QR payments correctly
7. **K7**: Alert.alert used in 10 places - doesn't work on web
8. **K8**: Dead code: nested TownPay/ folder, FeaturePlaceholder component, ComponentShowcase screen
