import { useRef, type ClipboardEvent, type KeyboardEvent } from 'react';
import styles from './OtpInput.module.css';

interface OtpInputProps {
  length: number;
  value: string;
  onChange: (v: string) => void;
  onComplete?: (v: string) => void;
  invalid?: boolean;
}

/**
 * Segmented OTP entry. Numeric inputmode, one-time-code autofill, paste-to-fill
 * across all boxes, backspace-to-previous, arrow navigation. The first input
 * carries autocomplete so platform OTP autofill lands correctly (brief §4, §12).
 */
export function OtpInput({ length, value, onChange, onComplete, invalid }: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(length).split('').slice(0, length);

  const setAt = (i: number, d: string) => {
    const next = value.split('');
    next[i] = d;
    const joined = next.join('').replace(/\s/g, '').slice(0, length);
    onChange(joined);
    if (joined.length === length) onComplete?.(joined);
  };

  const handleInput = (i: number, raw: string) => {
    const d = raw.replace(/\D/g, '');
    if (!d) return;
    if (d.length > 1) { handlePasteText(d); return; }
    setAt(i, d);
    if (i < length - 1) refs.current[i + 1]?.focus();
  };

  const handlePasteText = (text: string) => {
    const clean = text.replace(/\D/g, '').slice(0, length);
    if (!clean) return;
    onChange(clean);
    const focusIdx = Math.min(clean.length, length - 1);
    refs.current[focusIdx]?.focus();
    if (clean.length === length) onComplete?.(clean);
  };

  const onKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (value[i]) setAt(i, ' ');
      else if (i > 0) { setAt(i - 1, ' '); refs.current[i - 1]?.focus(); }
    } else if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus();
    else if (e.key === 'ArrowRight' && i < length - 1) refs.current[i + 1]?.focus();
  };

  return (
    <div className={styles.group} role="group" aria-label={`Enter the ${length}-digit PIN`}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          className={`${styles.box} ${invalid ? styles.invalid : ''} ${digits[i]?.trim() ? styles.filled : ''}`}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          aria-label={`Digit ${i + 1}`}
          value={digits[i]?.trim() ? digits[i] : ''}
          onChange={(e) => handleInput(i, e.target.value)}
          onKeyDown={(e) => onKey(i, e)}
          onPaste={(e: ClipboardEvent<HTMLInputElement>) => { e.preventDefault(); handlePasteText(e.clipboardData.getData('text')); }}
          onFocus={(e) => e.target.select()}
        />
      ))}
    </div>
  );
}
