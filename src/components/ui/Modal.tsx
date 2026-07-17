import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { backdropVariants, modalVariants } from '../../animations/variants';
import { Icon } from '../../icons/Icon';
import styles from './Modal.module.css';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  /** Hide the default header/close (for bespoke dialogs like the wheel). */
  bare?: boolean;
  labelledBy?: string;
  describedBy?: string;
  children: ReactNode;
  /** Max content width. */
  size?: 'sm' | 'md' | 'lg';
}

const FOCUSABLE = 'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';

/** Accessible dialog: portal, focus trap, Escape to close, scroll lock. */
export function Modal({ open, onClose, title, bare, labelledBy, describedBy, children, size = 'md' }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';

    const focusFirst = () => {
      const node = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      (node ?? panelRef.current)?.focus();
    };
    const t = setTimeout(focusFirst, 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      restoreRef.current?.focus?.();
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          variants={backdropVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            className={`${styles.panel} ${styles[size]}`}
            variants={modalVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label={!labelledBy ? title : undefined}
            aria-labelledby={labelledBy}
            aria-describedby={describedBy}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            {!bare && (
              <header className={styles.head}>
                {title && <h2 className={styles.title}>{title}</h2>}
                <button className={styles.close} onClick={onClose} aria-label="Close dialog">
                  <Icon name="close" size={22} />
                </button>
              </header>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
