import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Chip } from '../components/ui/Chip';
import { Icon } from '../icons/Icon';
import { GameCard } from '../components/game/GameCard';
import { EmptyState } from '../components/ui/EmptyState';
import { GAMES, CATEGORIES } from '../config/catalogue';
import type { CategoryKey } from '../types';
import styles from './Search.module.css';

/** Search & filters — instant results, category chips, designed empty state. */
export function Search() {
  const [params, setParams] = useSearchParams();
  const initialCat = (params.get('cat') as CategoryKey | null) ?? 'all';
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<CategoryKey | 'all'>(initialCat);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GAMES.filter((g) => (cat === 'all' || g.category === cat) && (!q || g.title.toLowerCase().includes(q) || g.tagline.toLowerCase().includes(q)));
  }, [query, cat]);

  const selectCat = (next: CategoryKey | 'all') => {
    setCat(next);
    if (next === 'all') setParams({});
    else setParams({ cat: next });
  };

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

      <nav className={`${styles.chips} no-scrollbar`} aria-label="Filter by category">
        <Chip icon="grid" active={cat === 'all'} onClick={() => selectCat('all')}>All</Chip>
        {(Object.keys(CATEGORIES) as CategoryKey[]).map((key) => (
          <Chip key={key} active={cat === key} onClick={() => selectCat(key)}>{CATEGORIES[key].label}</Chip>
        ))}
      </nav>

      <p className={styles.count} aria-live="polite">{results.length} {results.length === 1 ? 'game' : 'games'}</p>

      {results.length > 0 ? (
        <div className={styles.grid}>
          {results.map((g) => <GameCard key={g.id} game={g} variant="grid" />)}
        </div>
      ) : (
        <EmptyState
          icon="search"
          title="No games found"
          message={`Nothing matches "${query}"${cat !== 'all' ? ` in ${CATEGORIES[cat].label}` : ''}. Try another search or category.`}
        />
      )}
    </div>
  );
}
