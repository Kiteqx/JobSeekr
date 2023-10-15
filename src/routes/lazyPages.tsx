import React, { ComponentType, ReactElement, Suspense, lazy } from 'react';
import Preloader from '@/components/Preloader/Preloader';

const delay = (): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

const LazyComponent = (
  {
    preloaderContainerClassname,
  }: {
    preloaderContainerClassname: string;
  },
  importFunction: () => Promise<{ default: ComponentType<unknown> }>
): (() => ReactElement) => {
  const LazyPage = lazy(importFunction);

  return (): ReactElement => (
    <Suspense fallback={<Preloader containerClassname={preloaderContainerClassname} />}>
      <LazyPage />
    </Suspense>
  );
};

export const LandingPage = LazyComponent(
  {
    preloaderContainerClassname: 'lazyPageLoaderContainer',
  },
  async () => {
    await delay();
    return import(/* webpackChunkName: "pages/landing/landing" */ '@/pages/LandingPage/LandingPage');
  }
);

export const AuthPage = LazyComponent(
  {
    preloaderContainerClassname: 'lazyPageLoaderContainer',
  },
  async () => {
    await delay();
    return import(/* webpackChunkName: "pages/auth/auth" */ '@/pages/AuthPage/AuthPage');
  }
);

export const StatsPage = LazyComponent(
  {
    preloaderContainerClassname: 'layoutPagesLoaderContainer',
  },
  async () => {
    await delay();
    return import(/* webpackChunkName: "pages/stats/stats" */ '@/pages/StatsPage/StatsPage');
  }
);

export const AllJobsPage = LazyComponent(
  {
    preloaderContainerClassname: 'layoutPagesLoaderContainer',
  },
  async () => {
    await delay();
    return import(/* webpackChunkName: "pages/all-jobs/all-jobs" */ '@/pages/AllJobsPage/AllJobsPage');
  }
);

export const AddJobPage = LazyComponent(
  {
    preloaderContainerClassname: 'layoutPagesLoaderContainer',
  },
  async () => {
    await delay();
    return import(/* webpackChunkName: "pages/auth/auth" */ '@/pages/AddJobPage/AddJobPage');
  }
);

export const ProfilePage = LazyComponent(
  {
    preloaderContainerClassname: 'layoutPagesLoaderContainer',
  },
  async () => {
    await delay();
    return import(/* webpackChunkName: "pages/auth/auth" */ '@/pages/ProfilePage/ProfilePage');
  }
);

export const NotFoundPage = LazyComponent(
  {
    preloaderContainerClassname: 'lazyPageLoaderContainer',
  },
  async () => {
    await delay();
    return import(/* webpackChunkName: "pages/not-found/not-found" */ '@/pages/ErrorPages/NotFoundPage');
  }
);

export const RouteErrorElement = LazyComponent(
  {
    preloaderContainerClassname: 'lazyPageLoaderContainer',
  },
  async () => {
    await delay();
    return import(
      /* webpackChunkName: "pages/route-error-page/route-error-page" */ '@/pages/ErrorPages/RouteErrorElement'
    );
  }
);
