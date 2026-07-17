/**
 * Zimbabwe MSISDN handling. The portal collects a local number behind the
 * fixed +263 country code (preserved from the production Login/Subscribe
 * screens). Econet mobile prefixes are 077/078 (and legacy 071/073).
 */

export const COUNTRY_CODE = '+263';

/** Keep digits only; drop a leading 0 the way the +263 prefix expects. */
export const normalizeLocal = (raw: string): string => {
  const digits = raw.replace(/\D/g, '');
  return digits.replace(/^0+/, '').slice(0, 9);
};

/** Group a local number as `77 810 6935` for display. */
export const formatLocal = (local: string): string => {
  const d = normalizeLocal(local);
  const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 9)].filter(Boolean);
  return parts.join(' ');
};

/** Full E.164 for the auth request: +263778106935. */
export const toE164 = (local: string): string => `${COUNTRY_CODE}${normalizeLocal(local)}`;

/**
 * Valid = 9 digits starting with a mobile prefix. Returns a specific,
 * screen-reader-friendly error string, or null when valid.
 */
export const validateMsisdn = (local: string): string | null => {
  const d = normalizeLocal(local);
  if (d.length === 0) return 'Enter your Econet number';
  if (d.length < 9) return 'Number is too short';
  if (d.length > 9) return 'Number is too long';
  if (!/^7[0-9]/.test(d)) return 'Enter a valid mobile number';
  return null;
};
