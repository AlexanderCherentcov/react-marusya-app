import { useAuth } from '@/hooks/useAuth';
import { useState, Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';
import AuthModal from '@/features/AuthModal/AuthModal';
import { AuthView } from '@/features/AuthModal/AuthModal.types';
import PageLoader from '@/ui/PageLoader';

const MainPage = lazy(() => import('@/pages/MainPage'));
const GenresPage = lazy(() => import('@/pages/GenresPage'));
const GenreMoviesPage = lazy(() => import('@/pages/GenreMoviesPage'));
const MoviePage = lazy(() => import('@/pages/MoviePage'));
const AccountPage = lazy(() => import('@/pages/AccountPage'));

function App() {
  const { user, loading, isAuth } = useAuth();
  const [authView, setAuthView] = useState<AuthView>(null);

  return (
    <>
      <Header
        user={user}
        loading={loading}
        isAuth={isAuth}
        onLoginClick={() => setAuthView('login')}
      />

      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/main" replace />} />
            <Route
              path="/main"
              element={<MainPage onAuthRequired={() => setAuthView('login')} />}
            />
            <Route path="/genres" element={<GenresPage />} />
            <Route path="/genre/:genre" element={<GenreMoviesPage />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />

      <AuthModal
        view={authView}
        onChangeView={setAuthView}
        onClose={() => setAuthView(null)}
      />
    </>
  );
}

export default App;
