import React, { ComponentType, ReactElement, Suspense, lazy } from 'react';
import LazyPagePreloader from '@/components/LazyPagePreloader/LazyPagePreloader';

const delay = (): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

const LazyComponent = (importFunction: () => Promise<{ default: ComponentType<unknown> }>): (() => ReactElement) => {
  const LazyPage = lazy(importFunction);

  return (): ReactElement => (
    <Suspense fallback={<LazyPagePreloader />}>
      <LazyPage />
    </Suspense>
  );
};

export const LandingPage = LazyComponent(async () => {
  await delay();
  return import(/* webpackChunkName: "pages/stats/stats" */ '@/pages/LandingPage/LandingPage');
});

export const AuthPage = LazyComponent(async () => {
  await delay();
  return import(/* webpackChunkName: "pages/auth/auth" */ '@/pages/AuthPage/AuthPage');
});

export const StatsPage = LazyComponent(async () => {
  await delay();
  return import(/* webpackChunkName: "pages/auth/auth" */ '@/pages/StatsPage/StatsPage');
});

export const AllJobsPage = LazyComponent(async () => {
  await delay();
  return import(/* webpackChunkName: "pages/all-jobs/all-jobs" */ '@/pages/AllJobsPage/AllJobsPage');
});

export const AddJobPage = LazyComponent(async () => {
  await delay();
  return import(/* webpackChunkName: "pages/auth/auth" */ '@/pages/AddJobPage/AddJobPage');
});

export const ProfilePage = LazyComponent(async () => {
  await delay();
  return import(/* webpackChunkName: "pages/auth/auth" */ '@/pages/ProfilePage/ProfilePage');
});

export const NotFoundPage = LazyComponent(async () => {
  await delay();
  return import(/* webpackChunkName: "pages/not-found/not-found" */ '@/pages/ErrorPages/NotFoundPage');
});

export const RouteErrorElement = LazyComponent(async () => {
  await delay();
  return import(
    /* webpackChunkName: "pages/route-error-page/route-error-page" */ '@/pages/ErrorPages/RouteErrorElement'
  );
});
