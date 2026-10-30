# Test Plan Notes

## Components Tested

### Utilities
- `src/utils/validation.js` - Email, phone, password, name, PIN validation
- `src/utils/format.js` - Money formatting, initials extraction
- `src/utils/salesDates.js` - Date formatting, day comparison

### Contexts
- `src/context/TransactionsContext.js` - Balance calculation logic
- `src/context/InventoryContext.js` - Stock logic, low stock detection

## Test Method

### Automated Tests
- **Framework**: Jest + jest-expo
- **Test Library**: @testing-library/react-native (not used in unit tests due to React 19 compatibility)
- **Location**: `src/utils/__tests__/` and `src/context/__tests__/`
- **Coverage**: Core business logic functions
- **Total Tests**: 31
- **Status**: All passing

### Manual Tests
- **Platform**: Web preview (Expo web) due to environment constraints
- **Environment**: macOS, Expo SDK 58.0.21, React Native 0.88.1
- **Scope**: Full app workflow testing per test matrix

## Test Environment Details

- **OS**: macOS (Darwin 25.6.0)
- **Node**: npm environment
- **Expo SDK**: 58.0.21
- **React Native**: 0.88.1
- **React**: 19.3.0
- **Test Framework**: Jest 30.5.2, jest-expo 58.0.13

## Known Limitations

1. **No Android/iOS emulator testing**: Tests run on web preview only due to environment
2. **Camera scanning**: Cannot test real camera on web, only mock/demo scan
3. **Native alerts**: Cross-platform notify helper not visually tested on native device
4. **Persistence**: AsyncStorage behavior tested via web storage, not verified on native

## Test Execution Instructions

### Run Automated Tests
```bash
npm test
```

### Run Manual Tests
1. Start app: `npm start` (web preview)
2. Use demo credentials: demo@townpay.app / townpay / PIN 1234
3. Execute test matrix from TEST_RESULTS.md
4. Record actual results truthfully

## Coverage Summary

- **Validation utilities**: 100% coverage (email, phone, password, name, PIN)
- **Format utilities**: 100% coverage (money formatting, initials)
- **Sales dates**: 100% coverage (day comparison, formatting)
- **Balance logic**: 100% coverage (credit/debit calculation)
- **Inventory logic**: 100% coverage (stock thresholds)
