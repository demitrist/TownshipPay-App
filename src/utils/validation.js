const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s()-]+$/;

export function isValidEmail(value) {
  return EMAIL_RE.test(String(value || '').trim());
}

export function isValidPhone(value) {
  const text = String(value || '').trim();
  // Only digits/spaces/()/- and an optional leading +, with at least 10 real digits.
  return PHONE_RE.test(text) && text.replace(/\D/g, '').length >= 10;
}

export function isValidPassword(value) {
  return String(value || '').length >= 6;
}

export function isValidName(value) {
  return String(value || '').trim().length >= 2;
}

export function isEmailOrPhone(value) {
  const trimmed = String(value || '').trim();
  return isValidEmail(trimmed) || isValidPhone(trimmed);
}

export function isValidPin(value) {
  return /^\d{4}$/.test(String(value || ''));
}
