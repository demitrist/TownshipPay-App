const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^(\+27)?0\d{9}$/;

export function isValidEmail(value) {
  return EMAIL_RE.test(String(value || '').trim());
}

export function isValidPhone(value) {
  return PHONE_RE.test(String(value || '').trim());
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
