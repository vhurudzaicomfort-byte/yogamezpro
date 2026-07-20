import { useMemo, useState } from 'react';
import { Input } from '../components/ui/Input';
import { Icon } from '../icons/Icon';
import { GameCard } from '../components/game/GameCard';
import { EmptyState } from '../components/ui/EmptyState';
import { GAMES } from '../config/catalogue';
import styles from './Search.module.css';

/**
 * Search — instant text results over the catalogue, with a designed empty
 * state. There is no category filter: the library is four titles the user can
 * see at once, so filtering them is friction rather than utility.
 */
export function Search() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return GAMES;
    return GAMES.filter((g) => g.title.toLowerCase().includes(q) || g.tagline.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className={styles.page}>
      <div className={styles.searchWrap}>
        <Input
          label="Search games"
          hideLabel
          type="search"
          placeholder="Search games…"
          prefix={<Icon name="search" size={20} />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      <p className={styles.count} aria-live="polite">{results.length} {results.length === 1 ? 'game' : 'games'}</p>

      {results.length > 0 ? (
        <div className={styles.grid}>
          {results.map((g) => <GameCard key={g.id} game={g} variant="grid" />)}
        </div>
      ) : (
        <EmptyState
          icon="search"
          title="No games found"
          message={`Nothing matches "${query}". Try another search.`}
        />
      )}
    </div>
  );
}
