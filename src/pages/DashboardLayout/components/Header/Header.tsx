import React, { ReactElement, useState } from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux';
import { toggleSidebar, logoutUser } from '@/store/reducers/userSlice';

const Header = (): ReactElement => {
  const [shouldShowLogout, setShouldShowLogout] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const handleLogoutUser = (): void => {
    dispatch(logoutUser());
  };

  const handleToggleSidebar = (): void => {
    dispatch(toggleSidebar());
  };

  const handleToggleLogoutDropdown = (): void => {
    setShouldShowLogout(!shouldShowLogout);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navCenter}>
        <button className={styles.toogleBtn} type="button" onClick={handleToggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <h3 className={styles.logoText}>Dashboard</h3>
        </div>
        <div className={styles.btnContainer}>
          <button className={`btn ${styles.btn}`} type="button" onClick={handleToggleLogoutDropdown}>
            <FaUserCircle />
            {user?.name}
            {shouldShowLogout ? <FaCaretUp /> : <FaCaretDown />}
          </button>
          <div className={`${styles.dropdown} ${shouldShowLogout ? styles.showDropdown : ''}`}>
            <button className={styles.dropdownBtn} type="button" onClick={handleLogoutUser}>
              logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
