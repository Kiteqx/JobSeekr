import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import {
  LandingPage,
  AuthPage,
  StatsPage,
  AllJobsPage,
  AddJobPage,
  ProfilePage,
  NotFoundPage,
  RouteErrorElement,
} from './lazyPages';
import DashboardLayout from '@/pages/DashboardLayout/DashboardLayout';
import { PrivateAuthRoute, PrivateDashboardRoute } from './privateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateAuthRoute>
        <LandingPage />
      </PrivateAuthRoute>
    ),
    errorElement: <RouteErrorElement />,
  },
  {
    path: '/auth',
    element: (
      <PrivateAuthRoute>
        <AuthPage />
      </PrivateAuthRoute>
    ),
    errorElement: <RouteErrorElement />,
  },
  {
    element: (
      <PrivateDashboardRoute>
        <DashboardLayout />
      </PrivateDashboardRoute>
    ),
    errorElement: <RouteErrorElement />,
    children: [
      {
        path: '/stats',
        element: <StatsPage />,
      },
      {
        path: '/all-jobs',
        element: <AllJobsPage />,
      },
      {
        path: '/add-job',
        element: <AddJobPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
    errorElement: <RouteErrorElement />,
  },
]);

export default router;
