# Screenshot Checklist

This list identifies exactly which screens and states the team must screenshot as proof for Deliverable 5. Each screenshot should match the corresponding Test ID.

## Auth Screens

1. **T-001**: Splash screen
2. **T-002**: Register screen with valid data filled in
3. **T-003**: Register screen showing invalid email error
4. **T-004**: Register screen showing invalid phone error
5. **T-005**: Register screen showing short password error
6. **T-006**: Register screen showing mismatched passwords error
7. **T-007**: Login screen with demo credentials filled in
8. **T-008**: Login screen showing invalid format error
9. **T-009**: Login screen showing short password error
10. **T-010**: PIN screen with correct PIN entered (4 dots filled)
11. **T-011**: PIN screen showing lockout message after 5 wrong attempts
12. **T-012**: Profile screen showing logout button
13. **T-013**: Home screen after relaunch (session persistence)

## Home Screens

14. **T-014**: Home screen showing balance ZAR 2500
15. **T-015**: Home screen with Send Money and Receive Money buttons
16. **T-016**: Home screen showing Online Mode status
17. **T-017**: Home screen showing Offline Mode status with pending count
18. **T-018**: Home screen showing Sync Now button enabled
19. **T-019**: Home screen showing recent transactions list

## Send Money Screens

20. **T-020**: Send Money screen with valid recipient and amount
21. **T-021**: Send Money screen showing "Missing Recipient" error
22. **T-022**: Send Money screen showing "Invalid Amount" error
23. **T-023**: Send Money screen showing "Insufficient Demo Balance" error
24. **T-024**: Home screen after sending payment (balance decreased)
25. **T-025**: History screen showing sent payment transaction
26. **T-026**: Send Money screen showing Offline Mode status

## Receive Money Screens

27. **T-027**: Receive Money screen showing merchant QR code
28. **T-028**: Receive Money screen with amount filled in
29. **T-029**: Receive Money screen showing success state after request
30. **T-030**: Receive Money screen showing invalid amount error
31. **T-031**: Receive Money screen with Share action

## History Screens

32. **T-032**: History screen showing transaction list (newest first)
33. **T-033**: History screen with "Sent" filter selected
34. **T-034**: History screen with search bar showing query
35. **T-035**: History screen showing EmptyState for no matches
36. **T-036**: Receipt screen showing transaction details
37. **T-037**: History screen showing sale transaction (positive amount)

## QR Screens

38. **T-038**: My QR screen showing merchant QR code
39. **T-039**: Scan QR screen showing Demo scan button
40. **T-040**: Scan QR screen showing "Invalid QR Code" alert
41. **T-041**: Confirm Payment screen showing payment details
42. **T-042**: Confirm Payment screen (cancelled state)
43. **T-043**: Payment Success screen showing success message
44. **T-044**: Receipt screen showing payment details

## Inventory Screens

45. **T-045**: Inventory screen showing product list
46. **T-046**: Add Item screen with valid data filled in
47. **T-047**: Add Item screen showing validation errors
48. **T-048**: Edit Item screen with product data
49. **T-049**: Inventory screen showing low stock banner
50. **T-050**: Inventory screen showing "Out of stock" badge

## Make Sale Screens

51. **T-051**: Make Sale screen with items in cart
52. **T-052**: Make Sale screen showing item at stock limit
53. **T-053**: Make Sale screen with item removed from cart
54. **T-054**: Make Sale screen showing "The cart is empty" error
55. **T-055**: Make Sale screen showing success modal after completing sale
56. **T-056**: History screen showing sale transaction

## Daily Sales Summary Screens

57. **T-057**: Daily Sales Summary showing totals
58. **T-058**: Daily Sales Summary showing previous day
59. **T-059**: Daily Sales Summary showing low stock warnings
60. **T-060**: Daily Sales Summary with "See sales in history" button

## Profile Screens

61. **T-061**: Profile screen showing user details
62. **T-062**: Profile screen after logout (Login screen)

## Navigation

63. **T-063**: All 5 tabs visible in bottom navigation
64. **T-064**: Deep navigation stack (e.g., Home → Send Money → back)

## Stability

65. **T-075**: Error boundary screen (if triggered during testing)

---

**Total Screenshots Required**: 65

**Instructions**:
1. Run the app on an Android emulator or iOS simulator (recommended) or web preview
2. Execute each test scenario from TEST_RESULTS.md
3. Take a screenshot of each state listed above
4. Label screenshots with their Test ID (e.g., "T-001 - Splash screen")
5. Organize screenshots in a folder named `screenshots/` in the repo root
6. Include these screenshots in your Deliverable 5 document
