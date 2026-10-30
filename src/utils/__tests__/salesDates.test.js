import { formatDay, formatTime, isSameDay, startOfDay } from '../salesDates';

describe('salesDates utilities', () => {
  describe('isSameDay', () => {
    it('returns true for same day', () => {
      const date1 = new Date('2024-01-15T10:30:00');
      const date2 = new Date('2024-01-15T23:59:59');
      expect(isSameDay(date1, date2)).toBe(true);
    });

    it('returns false for different days', () => {
      const date1 = new Date('2024-01-15T10:30:00');
      const date2 = new Date('2024-01-16T00:01:00');
      expect(isSameDay(date1, date2)).toBe(false);
    });
  });

  describe('startOfDay', () => {
    it('returns start of day', () => {
      const date = new Date('2024-01-15T14:30:00');
      const start = startOfDay(date);
      expect(start.getHours()).toBe(0);
      expect(start.getMinutes()).toBe(0);
      expect(start.getSeconds()).toBe(0);
    });
  });

  describe('formatDay', () => {
    it('formats date as readable string', () => {
      const date = new Date('2024-01-15');
      const formatted = formatDay(date);
      expect(typeof formatted).toBe('string');
      expect(formatted.length).toBeGreaterThan(0);
    });
  });

  describe('formatTime', () => {
    it('formats time as readable string', () => {
      const date = new Date('2024-01-15T14:30:00');
      const formatted = formatTime(date);
      expect(typeof formatted).toBe('string');
      expect(formatted.length).toBeGreaterThan(0);
    });
  });
});
