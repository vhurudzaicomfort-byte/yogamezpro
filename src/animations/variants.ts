import type { Variants, Transition } from 'framer-motion';

/** Motion tokens mirrored from tokens.css for use in framer-motion. */
export const DUR = { fast: 0.15, base: 0.25, slow: 0.4 } as const;
export const EASE_OUT: Transition['ease'] = [0.22, 1, 0.36, 1];
export const EASE_SPRING: Transition['ease'] = [0.34, 1.56, 0.64, 1];

/** Route transition: gentle rise + fade. transform/opacity only. */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_OUT } },
  exit: { opacity: 0, y: -8, transition: { duration: DUR.fast, ease: EASE_OUT } },
};

/** Staggered list reveal for rails / grids. */
export const listVariants: Variants = {
  enter: { transition: { staggerChildren: 0.05, delayChildren: 0.02 } },
};
export const itemVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_OUT } },
};

/** Modal / dialog entrance. */
export const modalVariants: Variants = {
  initial: { opacity: 0, scale: 0.92, y: 16 },
  enter: { opacity: 1, scale: 1, y: 0, transition: { duration: DUR.base, ease: EASE_SPRING } },
  exit: { opacity: 0, scale: 0.96, y: 8, transition: { duration: DUR.fast, ease: EASE_OUT } },
};

/** Backdrop fade. */
export const backdropVariants: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: DUR.base } },
  exit: { opacity: 0, transition: { duration: DUR.fast } },
};

/** Drawer slide from left. */
export const drawerVariants: Variants = {
  initial: { x: '-100%' },
  enter: { x: 0, transition: { duration: DUR.base, ease: EASE_OUT } },
  exit: { x: '-100%', transition: { duration: DUR.base, ease: EASE_OUT } },
};
