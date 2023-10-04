import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import { LandingPage, AuthPage, NotFoundPage, RouteErrorElement } from './lazyPages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <RouteErrorElement />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
    errorElement: <RouteErrorElement />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
    errorElement: <RouteErrorElement />,
  },
]);

export default router;
