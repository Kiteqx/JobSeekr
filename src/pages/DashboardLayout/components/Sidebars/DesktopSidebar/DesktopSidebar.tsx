import React, { ReactElement } from 'react';
import styles from './DesktopSidebar.module.scss';
import Logo from '@/components/Logo/Logo';
import NavLinks from '../NavLinks/NavLinks';
import { useAppSelector } from '@/utils/hooks/redux';

const DesktopSidebar = (): ReactElement => {
  const isSidebarOpen = useAppSelector((state) => state.user.isSidebarOpen);

  return (
    <aside className={styles.aside}>
      <div className={`${styles.sidebarContainer} ${isSidebarOpen ? styles.showSidebar : ''}`}>
        <div className={styles.content}>
          <header className={styles.header}>
            <Logo />
          </header>
          <div className={styles.linksContainer}>
            <NavLinks />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
