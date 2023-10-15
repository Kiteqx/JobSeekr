import React, { ReactElement } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toggleSidebar } from '@/store/reducers/userSlice';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux';
import Logo from '@/components/Logo/Logo';
import styles from './ModileSidebar.module.scss';
import NavLinks from '../NavLinks/NavLinks';

const MobileSidebar = (): ReactElement => {
  const isSidebarOpen = useAppSelector((state) => state.user.isSidebarOpen);
  const dispatch = useAppDispatch();

  const handleToggleSidebar = (): void => {
    dispatch(toggleSidebar());
  };

  return (
    <aside className={styles.aside}>
      <div className={`${styles.sidebarContainer} ${isSidebarOpen ? styles.showSidebar : ''}`}>
        <div className={styles.content}>
          <button className={styles.closeBtn} onClick={handleToggleSidebar}>
            <FaTimes />
          </button>
          <header className={styles.header}>
            <Logo />
          </header>
          <div className={styles.navLinks}>
            <NavLinks onToggleSidebar={handleToggleSidebar} />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default MobileSidebar;
