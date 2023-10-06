import React, { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './DashboardLayout.module.scss';
import Header from './components/Header/Header';
import DesktopSidebar from './components/Sidebars/DesktopSidebar/DesktopSidebar';
import MobileSidebar from './components/Sidebars/ModileSidebar/MobileSidebar';

const DashboardLayout = (): ReactElement => {
  return (
    <section>
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
