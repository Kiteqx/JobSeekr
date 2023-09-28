import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import notFoundSVG from '@/assets/images/svg/not-found.svg';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = (): ReactElement => {
  return (
    <main className={`container ${styles.main}`}>
      <div>
        <img className={styles.notFoundImg} src={notFoundSVG} alt="not found image" />
        <h3 className={styles.heading}>Ohh! Page Not Found</h3>
        <p className={styles.description}>We can't seem to find the page you're looking for</p>
        <Link className={`btn ${styles.toHomeLink}`} to="/home">
          back home
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
