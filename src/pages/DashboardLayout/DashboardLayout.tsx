import React, { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './DashboardLayout.module.scss';
import Header from './components/Header/Header';
import DesktopSidebar from './components/Sidebars/DesktopSidebar/DesktopSidebar';
import MobileSidebar from './components/Sidebars/ModileSidebar/MobileSidebar';
import { useAppSelector } from '@/utils/hooks/redux';
import DataFetchingPreloader from '@/components/DataFetchingPreloader/DataFetchingPreloader';

const DashboardLayout = (): ReactElement => {
  const { isLoading } = useAppSelector((state) => state.user);

  return (
    <section>
      {isLoading && <DataFetchingPreloader />}
      <main className={styles.dashboard}>
        <MobileSidebar />
        <DesktopSidebar />
        <div>
          <Header />
          <div className={styles.dashboardPage}>
            <Outlet />
          </div>
        </div>
      </main>
    </section>
  );
};

export default DashboardLayout;
