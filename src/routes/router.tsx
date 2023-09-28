import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import LandingPage from '@/pages/LandingPage/LandingPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
]);

export default router;
