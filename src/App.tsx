import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { Loading } from './pages/Loading';
import { BrandedLoader } from './components/layout/BrandedLoader';

/* Route-level code splitting (brief §13) — auth entry stays eager for a fast
   first paint; everything else lazy-loads on navigation. */
const Subscribe = lazy(() => import('./pages/Subscribe').then((m) => ({ default: m.Subscribe })));
const Login = lazy(() => import('./pages/Login').then((m) => ({ default: m.Login })));
const Otp = lazy(() => import('./pages/Otp').then((m) => ({ default: m.Otp })));
const Authentication = lazy(() => import('./pages/Authentication').then((m) => ({ default: m.Authentication })));
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const Profile = lazy(() => import('./pages/Profile').then((m) => ({ default: m.Profile })));
const Leaderboard = lazy(() => import('./pages/Leaderboard').then((m) => ({ default: m.Leaderboard })));
const Prizes = lazy(() => import('./pages/Prizes').then((m) => ({ default: m.Prizes })));
const Search = lazy(() => import('./pages/Search').then((m) => ({ default: m.Search })));
const GameDetail = lazy(() => import('./pages/GameDetail').then((m) => ({ default: m.GameDetail })));
const Legal = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Legal })));
const Faq = lazy(() => import('./pages/Faq').then((m) => ({ default: m.Faq })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

function Fallback() {
  return (
    <div style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center' }}>
      <BrandedLoader size={54} />
    </div>
  );
}

export function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        {/* Pre-auth journey (full-screen, no app chrome) */}
        <Route path="/" element={<Loading />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/authenticating" element={<Authentication />} />

        {/* Authenticated app shell */}
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/prizes" element={<Prizes />} />
          <Route path="/search" element={<Search />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/faq" element={<Faq />} />
        </Route>

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
}
