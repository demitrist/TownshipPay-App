import {
  isValidEmail,
  isValidPhone,
  isValidPassword,
  isValidName,
  isEmailOrPhone,
  isValidPin,
} from '../validation';

describe('validation utilities', () => {
  describe('isValidEmail', () => {
    it('accepts valid email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.za')).toBe(true);
      expect(isValidEmail('demo@townpay.app')).toBe(true);
    });

    it('rejects invalid email addresses', () => {
      expect(isValidEmail('notanemail')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('   ')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('accepts valid SA phone numbers', () => {
      expect(isValidPhone('0821234567')).toBe(true);
      expect(isValidPhone('0112345678')).toBe(true);
    });

    it('rejects invalid phone numbers', () => {
      expect(isValidPhone('082123')).toBe(false);
      expect(isValidPhone('08212345678')).toBe(false);
      expect(isValidPhone('+27 (082) 123-4567')).toBe(false);
      expect(isValidPhone('abc1234567')).toBe(false);
      expect(isValidPhone('')).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    it('accepts passwords with 6+ characters', () => {
      expect(isValidPassword('password')).toBe(true);
      expect(isValidPassword('123456')).toBe(true);
      expect(isValidPassword('townpay')).toBe(true);
    });

    it('rejects passwords with fewer than 6 characters', () => {
      expect(isValidPassword('12345')).toBe(false);
      expect(isValidPassword('abc')).toBe(false);
      expect(isValidPassword('')).toBe(false);
    });
  });

  describe('isValidName', () => {
    it('accepts names with 2+ characters', () => {
      expect(isValidName('John')).toBe(true);
      expect(isValidName('Amina Dlamini')).toBe(true);
      expect(isValidName('AB')).toBe(true);
    });

    it('rejects names with fewer than 2 characters', () => {
      expect(isValidName('J')).toBe(false);
      expect(isValidName('')).toBe(false);
      expect(isValidName('   ')).toBe(false);
    });
  });

  describe('isEmailOrPhone', () => {
    it('accepts valid email or phone', () => {
      expect(isEmailOrPhone('test@example.com')).toBe(true);
      expect(isValidPhone('0821234567')).toBe(true);
    });

    it('rejects invalid email and phone', () => {
      expect(isEmailOrPhone('notvalid')).toBe(false);
      expect(isEmailOrPhone('')).toBe(false);
    });
  });

  describe('isValidPin', () => {
    it('accepts 4-digit PINs', () => {
      expect(isValidPin('1234')).toBe(true);
      expect(isValidPin('0000')).toBe(true);
      expect(isValidPin('9876')).toBe(true);
    });

    it('rejects non-4-digit PINs', () => {
      expect(isValidPin('123')).toBe(false);
      expect(isValidPin('12345')).toBe(false);
      expect(isValidPin('abcd')).toBe(false);
      expect(isValidPin('')).toBe(false);
    });
  });
});
