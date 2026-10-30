// Test balance derivation logic
const INITIAL_BALANCE = 2500;

function calculateBalance(transactions) {
  return transactions.reduce((total, transaction) => {
    const amount = Number(transaction.amount) || 0;
    if (transaction.type === 'credit') {
      return total + amount;
    }
    return total - amount;
  }, INITIAL_BALANCE);
}

describe('balance calculation', () => {
  it('starts with initial balance', () => {
    expect(calculateBalance([])).toBe(INITIAL_BALANCE);
  });

  it('decreases for debit transactions (sent payments)', () => {
    const transactions = [
      { type: 'debit', amount: 150, status: 'synced' },
    ];
    expect(calculateBalance(transactions)).toBe(INITIAL_BALANCE - 150);
  });

  it('increases for credit transactions (received payments)', () => {
    const transactions = [
      { type: 'credit', amount: 85, status: 'synced' },
    ];
    expect(calculateBalance(transactions)).toBe(INITIAL_BALANCE + 85);
  });

  it('decreases for debit regardless of pending status', () => {
    const transactions = [
      { type: 'debit', amount: 100, status: 'pending' },
    ];
    expect(calculateBalance(transactions)).toBe(INITIAL_BALANCE - 100);
  });

  it('increases for credit regardless of pending status', () => {
    const transactions = [
      { type: 'credit', amount: 50, status: 'pending' },
    ];
    expect(calculateBalance(transactions)).toBe(INITIAL_BALANCE + 50);
  });

  it('correctly handles mixed transactions', () => {
    const transactions = [
      { type: 'debit', amount: 150, status: 'synced' },
      { type: 'credit', amount: 85, status: 'pending' },
      { type: 'debit', amount: 50, status: 'synced' },
      { type: 'credit', amount: 200, status: 'synced' },
    ];
    // 2500 - 150 + 85 - 50 + 200 = 2585
    expect(calculateBalance(transactions)).toBe(2585);
  });
});
