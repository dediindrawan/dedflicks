import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { TitleProvider } from './context/TitleContext';
import { combinedLoader } from './apis/loaders';

import { HomePage } from './pages';
import { MoviesPage } from './pages/MoviesPage';
import { TvSeriesPage } from './pages/TvSeriesPage';
import { PeoplePage } from './pages/PeoplePage';
import { DetailPage } from './pages/DetailPage';
import { SearchPage } from './pages/SearchPage';
import { PlayVideoPage } from './pages/PlayVideoPage';
import { ErrorPage } from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    loader: combinedLoader,
  },
  {
    path: '/movies',
    element: <MoviesPage />,
    errorElement: <ErrorPage />,
    loader: combinedLoader,
  },
  {
    path: '/tv-series',
    element: <TvSeriesPage />,
    errorElement: <ErrorPage />,
    loader: combinedLoader,
  },
  {
    path: '/people',
    element: <PeoplePage />,
    errorElement: <ErrorPage />,
    loader: combinedLoader,
  },
  {
    path: '/details/:type/:id',
    element: <DetailPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/search',
    element: <SearchPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/play-video/:id',
    element: <PlayVideoPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TitleProvider>
      <RouterProvider router={router} />
    </TitleProvider>
  </StrictMode>
);
