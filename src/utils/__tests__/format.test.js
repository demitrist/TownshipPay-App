import { formatMoney, initialsFromName } from '../format';

describe('format utilities', () => {
  describe('formatMoney', () => {
    it('formats amounts correctly', () => {
      expect(formatMoney(0)).toBe('ZAR 0.00');
      expect(formatMoney(100)).toBe('ZAR 100.00');
      expect(formatMoney(1234.56)).toBe('ZAR 1234.56');
      expect(formatMoney(2500)).toBe('ZAR 2500.00');
    });

    it('handles decimal precision correctly', () => {
      expect(formatMoney(12.345)).toBe('ZAR 12.35');
      expect(formatMoney(12.344)).toBe('ZAR 12.34');
    });
  });

  describe('initialsFromName', () => {
    it('extracts initials from names', () => {
      expect(initialsFromName('John Doe')).toBe('JD');
      expect(initialsFromName('Amina Dlamini')).toBe('AD');
      expect(initialsFromName('Single')).toBe('S');
    });

    it('handles empty or null names', () => {
      expect(initialsFromName('')).toBe('TP');
      expect(initialsFromName(null)).toBe('TP');
      expect(initialsFromName(undefined)).toBe('TP');
    });
  });
});
