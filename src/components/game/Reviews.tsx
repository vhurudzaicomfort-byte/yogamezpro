import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { StarRating } from '../ui/StarRating';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';
import { Icon } from '../../icons/Icon';
import { useSession } from '../../hooks/useSession';
import { useToast } from '../../hooks/useToast';
import { getReviews, addReview, updateReview, removeReview, type Review } from '../../config/reviews';
import styles from './Reviews.module.css';

const MAX = 280;
const PAGE = 3;

/**
 * Reviews section (correction §4): varied seeded reviews, an accessible
 * composer (star + text) with a live counter and designed validation,
 * optimistic add with rollback, an editable/removable own review, a
 * subscription gate, an empty state, and a show-more control. The aggregate
 * always reflects the current review set.
 */
export function Reviews({ gameId }: { gameId: string }) {
  const navigate = useNavigate();
  const { authenticated } = useSession();
  const { push } = useToast();

  const [list, setList] = useState<Review[]>(() => getReviews(gameId));
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [visible, setVisible] = useState(PAGE);

  const agg = useMemo(() => {
    if (list.length === 0) return { avg: 0, count: 0 };
    const avg = list.reduce((s, r) => s + r.rating, 0) / list.length;
    return { avg: Math.round(avg * 10) / 10, count: list.length };
  }, [list]);

  const over = body.length > MAX;
  const canSubmit = rating > 0 && body.trim().length > 0 && !over && !pending;

  const resetComposer = () => { setRating(0); setBody(''); setEditingId(null); setError(null); };

  const submit = async () => {
    if (!canSubmit) {
      setError(rating === 0 ? 'Add a star rating' : body.trim() ? 'Review is too long' : 'Write a short review');
      return;
    }
    setPending(true);
    setError(null);

    if (editingId) {
      const prev = list;
      setList((l) => l.map((r) => (r.id === editingId ? { ...r, rating, body: body.trim(), when: 'Edited just now' } : r)));
      try {
        await new Promise((res) => setTimeout(res, 400));
        updateReview(editingId, { rating, body });
        push('Review updated', 'success');
        resetComposer();
      } catch {
        setList(prev);
        push('Could not update your review', 'danger');
      } finally { setPending(false); }
      return;
    }

    // optimistic insert
    const optimistic: Review = { id: `opt-${Date.now()}`, gameId, author: 'You', rating, body: body.trim(), when: 'Just now', isOwn: true };
    setList((l) => [optimistic, ...l]);
    setVisible((v) => Math.max(v, PAGE));
    try {
      await new Promise((res) => setTimeout(res, 450));
      const saved = addReview(gameId, { rating, body });
      setList((l) => l.map((r) => (r.id === optimistic.id ? saved : r)));
      push('Review posted', 'success');
      resetComposer();
    } catch {
      setList((l) => l.filter((r) => r.id !== optimistic.id)); // rollback
      push('Could not post your review — try again', 'danger');
    } finally { setPending(false); }
  };

  const startEdit = (r: Review) => { setEditingId(r.id); setRating(r.rating); setBody(r.body); setError(null); };
  const remove = (id: string) => {
    const prev = list;
    setList((l) => l.filter((r) => r.id !== id));
    removeReview(id);
    if (editingId === id) resetComposer();
    push('Review removed', 'info');
    void prev;
  };

  return (
    <section className={styles.reviews} aria-label="Reviews">
      <header className={styles.head}>
        <h2 className={styles.title}>Reviews</h2>
        {agg.count > 0 && (
          <div className={styles.agg}>
            <StarRating value={agg.avg} readOnly size={18} ariaLabel={`Average ${agg.avg} of 5`} />
            <span className={`${styles.aggNum} num`}>{agg.avg.toFixed(1)}</span>
            <span className={styles.aggCount}>({agg.count})</span>
          </div>
        )}
      </header>

      {/* Composer / gate */}
      {authenticated ? (
        <div className={styles.composer}>
          <div className={styles.composerTop}>
            <span className={styles.composerLabel}>{editingId ? 'Edit your review' : 'Rate this game'}</span>
            <StarRating value={rating} onChange={setRating} size={28} ariaLabel="Your rating" />
          </div>
          <label htmlFor="review-body" className="sr-only">Your review</label>
          <textarea
            id="review-body"
            className={`${styles.textarea} ${over ? styles.invalid : ''}`}
            placeholder="Share what you think — what's good, what could be better?"
            value={body}
            maxLength={MAX + 40}
            onChange={(e) => { setBody(e.target.value); setError(null); }}
            rows={3}
          />
          <div className={styles.composerFoot}>
            <span className={`${styles.counter} ${over ? styles.over : ''}`} aria-live="polite">{body.length}/{MAX}</span>
            <div className={styles.composerActions}>
              {editingId && <Button variant="ghost" size="sm" onClick={resetComposer} disabled={pending}>Cancel</Button>}
              <Button variant="accent" size="sm" onClick={submit} loading={pending} disabled={!canSubmit}>
                {editingId ? 'Save' : 'Post review'}
              </Button>
            </div>
          </div>
          {error && <p className={styles.error} role="alert">{error}</p>}
        </div>
      ) : (
        <div className={styles.gate}>
          <Icon name="shield" size={22} />
          <div>
            <p className={styles.gateTitle}>Subscribe to review</p>
            <p className={styles.gateSub}>Active YoGamezPro subscribers can rate and review games.</p>
          </div>
          <Button variant="primary" size="sm" onClick={() => navigate('/subscribe')}>Subscribe</Button>
        </div>
      )}

      {/* List */}
      {list.length === 0 ? (
        <EmptyState icon="chat" title="No reviews yet" message="Be the first to review this game." />
      ) : (
        <>
          <ul className={styles.list}>
            <AnimatePresence initial={false}>
              {list.slice(0, visible).map((r) => (
                <motion.li
                  key={r.id}
                  className={`${styles.item} ${r.isOwn ? styles.own : ''}`}
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={styles.itemHead}>
                    <span className={styles.author}>{r.isOwn ? 'You' : r.author}{r.isOwn && <span className={styles.ownBadge}>Your review</span>}</span>
                    <span className={styles.when}>{r.when}</span>
                  </div>
                  <StarRating value={r.rating} readOnly size={14} ariaLabel={`${r.rating} of 5`} />
                  <p className={styles.body}>{r.body}</p>
                  {r.isOwn && (
                    <div className={styles.ownActions}>
                      <button className={styles.linkBtn} onClick={() => startEdit(r)}>Edit</button>
                      <button className={`${styles.linkBtn} ${styles.danger}`} onClick={() => remove(r.id)}>Remove</button>
                    </div>
                  )}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          {visible < list.length && (
            <button className={styles.more} onClick={() => setVisible((v) => v + PAGE)}>
              Show more reviews ({list.length - visible})
            </button>
          )}
        </>
      )}
    </section>
  );
}
