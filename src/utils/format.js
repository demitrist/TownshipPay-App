export function formatMoney(amount, currency = 'ZAR') {
  const numeric = Number(amount);
  const safe = Number.isFinite(numeric) ? numeric : 0;
  return `${currency} ${safe.toFixed(2)}`;
}

export function initialsFromName(name) {
  const parts = String(name || 'Town Pay').trim().split(/\s+/);
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
}
