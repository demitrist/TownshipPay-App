/**
 * FROZEN route-name contract.
 * Teammates must navigate with these constants — never hard-code strings.
 *
 * Expected params (pass only these keys):
 *   EDIT_ITEM          { itemId: string }
 *   SEND_MONEY         { prefillAmount?: string, prefillPayee?: string }
 *   RECEIVE_MONEY      { prefillAmount?: string }
 *   CONFIRM_PAYMENT    { amount: string, payee: string, source: 'qr'|'send'|'receive'|'sale' }
 *   PAYMENT_SUCCESS    { amount: string, payee: string, transactionId: string }
 *   RECEIPT            { transactionId: string }
 *   MAKE_SALE          { itemId?: string }
 *   PIN                { mode: 'verify' | 'set' }
 */
export const ROUTES = {
  SPLASH: 'Splash',
  LOGIN: 'Login',
  REGISTER: 'Register',
  PIN: 'Pin',

  HOME: 'Home',
  SEND_MONEY: 'SendMoney',
  RECEIVE_MONEY: 'ReceiveMoney',

  HISTORY: 'History',

  MY_QR: 'MyQR',
  SCAN_QR: 'ScanQR',
  CONFIRM_PAYMENT: 'ConfirmPayment',
  PAYMENT_SUCCESS: 'PaymentSuccess',
  RECEIPT: 'Receipt',

  INVENTORY: 'Inventory',
  ADD_ITEM: 'AddItem',
  EDIT_ITEM: 'EditItem',
  MAKE_SALE: 'MakeSale',
  SALES_SUMMARY: 'SalesSummary',

  PROFILE: 'Profile',
  COMPONENT_SHOWCASE: 'ComponentShowcase',
};

export const TABS = {
  HOME: 'HomeTab',
  HISTORY: 'HistoryTab',
  QR: 'QrTab',
  INVENTORY: 'InventoryTab',
  PROFILE: 'ProfileTab',
};

export const PARAMS = {
  EDIT_ITEM: { itemId: 'string' },
  SEND_MONEY: { prefillAmount: 'string?', prefillPayee: 'string?' },
  RECEIVE_MONEY: { prefillAmount: 'string?' },
  CONFIRM_PAYMENT: {
    amount: 'string',
    payee: 'string',
    source: 'qr|send|receive|sale',
  },
  PAYMENT_SUCCESS: {
    amount: 'string',
    payee: 'string',
    transactionId: 'string',
  },
  RECEIPT: { transactionId: 'string' },
  MAKE_SALE: { itemId: 'string?' },
  PIN: { mode: 'verify|set' },
};
