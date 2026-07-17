import { useNavigate } from 'react-router-dom';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';

/** 404 — designed, on-brand, actionable (brief §5). */
export function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ paddingTop: '3rem' }}>
      <EmptyState
        icon="bolt"
        title="Page not found"
        message="This page took a wrong turn. Let's get you back to the games."
        action={<Button variant="accent" iconLeft="home" onClick={() => navigate('/home')}>Back to home</Button>}
      />
    </div>
  );
}
