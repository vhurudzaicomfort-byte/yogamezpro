import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Icon } from '../../icons/Icon';
import { Confetti } from './Confetti';
import { buildSlices, landingRotation, WHEEL_VIEW, CENTER, RADIUS } from './wheelGeometry';
import { WHEEL_SEGMENTS } from '../../config/wheel';
import { drawPrize, markSpun, canSpin } from '../../services/prizeService';
import { useToast } from '../../hooks/useToast';
import type { WheelResult } from '../../types';
import styles from './LuckyWheel.module.css';

const SLICES = buildSlices(WHEEL_SEGMENTS);

type Phase = 'idle' | 'spinning' | 'revealed';

/**
 * Lucky Wheel (brief §8). Outcome is decided by the prize service FIRST; the
 * animation is then targeted to land on it — the spin never chooses the prize.
 * Physics: fast spin-up → long cubic-bezier deceleration → micro-settle bounce
 * into the pointer detent. Accessible dialog (focus trap + Escape via Modal,
 * aria-live prize announcement). Honours prefers-reduced-motion (instant
 * reveal, no spin) and a persisted once-per-day frequency cap.
 */
export function LuckyWheel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const controls = useAnimationControls();
  const reduced = useReducedMotion();
  const { push } = useToast();
  const rotation = useRef(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [result, setResult] = useState<WheelResult | null>(null);
  const [capped, setCapped] = useState(false);

  useEffect(() => {
    if (open) {
      setPhase('idle');
      setResult(null);
      setCapped(!canSpin());
      controls.set({ rotate: rotation.current });
    }
  }, [open, controls]);

  const spin = useCallback(async () => {
    if (phase === 'spinning') return;
    setPhase('spinning');
    setResult(null);

    // 1) Outcome decided by the service FIRST.
    const outcome = await drawPrize();

    // 2) Target the animation to the decided segment (deterministic jitter,
    //    stays inside the slice — cosmetic only, never changes the outcome).
    const jitter = ((Math.sin(rotation.current * 12.9898) * 43758.5453) % 1) * 6;
    const target = landingRotation(rotation.current, outcome.segmentIndex, WHEEL_SEGMENTS.length, reduced ? 0 : 5, jitter);

    if (reduced) {
      controls.set({ rotate: target });
    } else {
      // fast spin-up → long deceleration, undershoot the detent…
      await controls.start({ rotate: target - 6, transition: { duration: 4.2, ease: [0.16, 0.8, 0.24, 1] } });
      // …then micro-settle bounce into it
      await controls.start({ rotate: target, transition: { type: 'spring', stiffness: 55, damping: 7, mass: 0.8 } });
    }
    rotation.current = target;

    markSpun();
    setResult(outcome);
    setPhase('revealed');
    push(outcome.won ? `You won ${outcome.label}!` : 'No win this time — try again tomorrow.', outcome.won ? 'success' : 'info');
  }, [phase, reduced, controls, push]);

  const winningIndex = phase === 'revealed' && result ? result.segmentIndex : -1;

  return (
    <Modal open={open} onClose={() => phase !== 'spinning' && onClose()} bare size="sm" labelledBy="wheel-title">
      <div className={styles.wheelDialog}>
        <button className={styles.dismiss} onClick={() => phase !== 'spinning' && onClose()} aria-label="Close" disabled={phase === 'spinning'}>
          <Icon name="close" size={20} />
        </button>

        <header className={styles.head}>
          <span className="t-overline" style={{ color: 'var(--reward)' }}>Daily reward</span>
          <h2 id="wheel-title" className={styles.title}>Lucky Wheel</h2>
          <p className={styles.sub}>Spin for a chance to win instant airtime.</p>
        </header>

        <div className={styles.stage}>
          {phase === 'revealed' && result?.won && !reduced && <Confetti />}

          <span className={styles.pointer} aria-hidden="true" />
          <span className={styles.rim} aria-hidden="true" />

          <motion.div className={styles.spinner} animate={controls} style={{ transformOrigin: 'center' }}>
            <svg viewBox={`0 0 ${WHEEL_VIEW} ${WHEEL_VIEW}`} className={styles.svg} aria-hidden="true">
              <defs>
                <radialGradient id="w-blue" cx="0.5" cy="0.35"><stop offset="0" stopColor="#7fd3f2" /><stop offset="1" stopColor="#2b368a" /></radialGradient>
                <radialGradient id="w-red" cx="0.5" cy="0.35"><stop offset="0" stopColor="#ff5a66" /><stop offset="1" stopColor="#a5121d" /></radialGradient>
                <radialGradient id="w-gold" cx="0.5" cy="0.35"><stop offset="0" stopColor="#ffe08a" /><stop offset="1" stopColor="#d98a1f" /></radialGradient>
              </defs>
              {SLICES.map((s) => {
                const fill = s.segment.kind === 'airtime' ? 'url(#w-blue)' : s.segment.kind === 'bonus' ? 'url(#w-gold)' : 'url(#w-red)';
                const win = s.index === winningIndex;
                return (
                  <g key={s.segment.id} className={win ? styles.winSlice : undefined}>
                    <path d={s.path} fill={fill} stroke="#06141f" strokeWidth="1.5" />
                    <text
                      x={s.labelX}
                      y={s.labelY}
                      transform={`rotate(${s.labelAngle} ${s.labelX} ${s.labelY})`}
                      className={styles.sliceLabel}
                      textAnchor="middle"
                    >
                      {s.segment.label.split('\n').map((line, li) => (
                        <tspan key={li} x={s.labelX} dy={li === 0 ? '-0.3em' : '1.05em'}>{line}</tspan>
                      ))}
                    </text>
                  </g>
                );
              })}
              <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="#06141f" strokeWidth="3" />
            </svg>
          </motion.div>

          <button
            className={styles.spinBtn}
            onClick={spin}
            disabled={phase === 'spinning' || capped}
            aria-label={capped ? 'You have already spun today' : 'Spin the wheel'}
          >
            {phase === 'spinning' ? <span className={styles.spinnerDots} aria-hidden="true" /> : <span>SPIN</span>}
          </button>
        </div>

        {/* Live region: announces the decided prize to assistive tech */}
        <div className={styles.result} aria-live="assertive" aria-atomic="true">
          {phase === 'revealed' && result && (
            <motion.div
              className={styles.reveal}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            >
              {result.won ? (
                <>
                  <span className={styles.trophy}><Icon name="ticket" variant="solid" size={26} /></span>
                  <p className={styles.won}>You won {result.label}!</p>
                  <p className={styles.wonSub}>Airtime has been credited to your Econet line.</p>
                </>
              ) : (
                <>
                  <p className={styles.miss}>So close!</p>
                  <p className={styles.wonSub}>No win this time — come back tomorrow for another spin.</p>
                </>
              )}
            </motion.div>
          )}
          {capped && phase === 'idle' && <p className={styles.capNote}>You've used today's spin. Check back tomorrow!</p>}
        </div>

        {phase === 'revealed' ? (
          <div className={styles.actions}>
            <Button variant="reward" block iconLeft="play" onClick={onClose}>Play games</Button>
          </div>
        ) : (
          <p className={styles.terms}>One spin per day. Prizes credited as Econet airtime. T&amp;Cs apply.</p>
        )}
      </div>
    </Modal>
  );
}
