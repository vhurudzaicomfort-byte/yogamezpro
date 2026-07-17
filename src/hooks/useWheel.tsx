import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { LuckyWheel } from '../components/wheel/LuckyWheel';
import { canSpin } from '../services/prizeService';

interface WheelCtx {
  /** Open the wheel unconditionally (e.g. from the Prizes CTA). */
  open: () => void;
  /** Open only if the frequency cap allows it (e.g. auto-offer on Home). */
  offerIfEligible: () => void;
  /** Whether the frequency cap currently allows a spin. */
  eligible: boolean;
}

const Ctx = createContext<WheelCtx | null>(null);

/**
 * Global Lucky Wheel host. Any screen can call `useWheel().open()`. The
 * LuckyWheel owns spin/physics/celebration/capping; this provider just controls
 * visibility and exposes the frequency-cap gate (brief §8).
 */
export function WheelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);

  const open = useCallback(() => setOpen(true), []);
  const offerIfEligible = useCallback(() => { if (canSpin()) setOpen(true); }, []);

  const value: WheelCtx = { open, offerIfEligible, eligible: canSpin() };

  return (
    <Ctx.Provider value={value}>
      {children}
      <LuckyWheel open={isOpen} onClose={() => setOpen(false)} />
    </Ctx.Provider>
  );
}

export function useWheel(): WheelCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useWheel must be used within WheelProvider');
  return ctx;
}
