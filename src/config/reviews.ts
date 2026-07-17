/**
 * Reviews — seed data + a small in-memory mock service (correction §4). In
 * production these calls hit the reviews API; here they mutate a module-level
 * array so the UI can demonstrate add / edit / remove + optimistic updates.
 */

export interface Review {
  id: string;
  gameId: string;
  author: string;
  /** Whole stars, 1–5. */
  rating: number;
  body: string;
  /** Static relative timestamp for display. */
  when: string;
  isOwn?: boolean;
}

/** Seed: three Anonymous reviews per launch title, deliberately varied. */
const SEED: Review[] = [
  // CryptoCrush
  { id: 'r-cc-1', gameId: 'crypto-crush', author: 'Anonymous', rating: 5, body: 'Ridiculously moreish. The chain combos feel amazing and I keep coming back to beat my daily score.', when: '2 days ago' },
  { id: 'r-cc-2', gameId: 'crypto-crush', author: 'Anonymous', rating: 3, body: 'Fun for a bit but the later boards get repetitive. Wish there were more power-ups.', when: '1 week ago' },
  { id: 'r-cc-3', gameId: 'crypto-crush', author: 'Anonymous', rating: 4, body: 'Loads instantly and runs smooth on my phone. Solid puzzle game to kill time on the commute.', when: '3 weeks ago' },
  // Cash Rider
  { id: 'r-cr-1', gameId: 'cash-rider', author: 'Anonymous', rating: 4, body: 'Great arcade racer, the nitro boosts are satisfying. Controls take a minute to get used to.', when: '4 days ago' },
  { id: 'r-cr-2', gameId: 'cash-rider', author: 'Anonymous', rating: 2, body: 'Kept dropping frames during the busy sections for me. Good idea, needs polish before I rate it higher.', when: '2 weeks ago' },
  { id: 'r-cr-3', gameId: 'cash-rider', author: 'Anonymous', rating: 5, body: 'Addictive. Climbed the weekly board and actually won airtime — no complaints here.', when: '1 month ago' },
  // Zuma
  { id: 'r-zu-1', gameId: 'zuma', author: 'Anonymous', rating: 5, body: 'The classic done right. Chaining colours never gets old and the difficulty curve is fair.', when: '1 day ago' },
  { id: 'r-zu-2', gameId: 'zuma', author: 'Anonymous', rating: 4, body: 'Really enjoy it. Would love a few more level themes but what is here is polished.', when: '5 days ago' },
  { id: 'r-zu-3', gameId: 'zuma', author: 'Anonymous', rating: 3, body: 'Decent time-killer. Nothing new if you have played Zuma before, but it runs well.', when: '2 weeks ago' },
  // Gamewin
  { id: 'r-gw-1', gameId: 'gamewin', author: 'Anonymous', rating: 4, body: 'Simple and rewarding. Good pick-up-and-play title, the rewards keep me logging in.', when: '3 days ago' },
  { id: 'r-gw-2', gameId: 'gamewin', author: 'Anonymous', rating: 3, body: 'It is fine. Bit luck-heavy for my taste but the presentation is clean.', when: '10 days ago' },
  { id: 'r-gw-3', gameId: 'gamewin', author: 'Anonymous', rating: 5, body: 'Brilliant little game. Climbed into the top 100 my first week — hooked.', when: '3 weeks ago' },
];

let reviews: Review[] = [...SEED];
let seq = 0;

export function getReviews(gameId: string): Review[] {
  return reviews.filter((r) => r.gameId === gameId);
}

export function addReview(gameId: string, input: { rating: number; body: string }): Review {
  const review: Review = {
    id: `r-own-${seq++}`,
    gameId,
    author: 'You',
    rating: input.rating,
    body: input.body.trim(),
    when: 'Just now',
    isOwn: true,
  };
  reviews = [review, ...reviews];
  return review;
}

export function updateReview(id: string, input: { rating: number; body: string }): void {
  reviews = reviews.map((r) => (r.id === id ? { ...r, rating: input.rating, body: input.body.trim(), when: 'Edited just now' } : r));
}

export function removeReview(id: string): void {
  reviews = reviews.filter((r) => r.id !== id);
}

export function aggregate(gameId: string): { avg: number; count: number } {
  const set = getReviews(gameId);
  if (set.length === 0) return { avg: 0, count: 0 };
  const avg = set.reduce((s, r) => s + r.rating, 0) / set.length;
  return { avg: Math.round(avg * 10) / 10, count: set.length };
}
