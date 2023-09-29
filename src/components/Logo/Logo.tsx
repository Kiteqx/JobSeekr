import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';
import logo from '@/assets/images/png/logo.png';

const Logo = ({ className }: { className?: string }): ReactElement => {
  return (
    <Link className={`${className || ''} ${styles.logoContainer}`} to="/home">
      <img src={logo} alt="jobseekr logo" className={styles.logo} />
      <h1 className={`heading ${styles.logoHeading}`}>JobSeekr</h1>
    </Link>
  );
};

export default Logo;
