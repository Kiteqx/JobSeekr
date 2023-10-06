import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import linksData from './linksData';
import styles from './NavLinks.module.scss';

const NavLinks = ({ onToggleSidebar }: { onToggleSidebar?: () => void }): ReactElement => {
  return (
    <>
      {linksData.map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            to={path}
            key={id}
            onClick={onToggleSidebar}
            className={({ isActive }): string => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            <span className={styles.icon}>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </>
  );
};

export default NavLinks;
