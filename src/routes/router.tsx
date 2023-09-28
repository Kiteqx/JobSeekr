import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import { LandingPage, NotFoundPage } from './lazyPages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
