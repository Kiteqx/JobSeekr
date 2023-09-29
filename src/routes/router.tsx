import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import { LandingPage, AuthPage, NotFoundPage } from './lazyPages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
