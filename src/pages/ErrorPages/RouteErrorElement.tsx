import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import errorBoundarySVG from '@/assets/images/svg/route-error-page.svg';
import styles from './ErrorPages.module.scss';

const RouteErrorElement = (): ReactElement => {
  return (
    <main className={`container ${styles.main}`}>
      <div>
        <img className={styles.notFoundImg} src={errorBoundarySVG} alt="error boundary image" />
        <h3 className={styles.heading}>Oops! Error has occurred.</h3>
        <p className={styles.description}>
          We are working to fix it. Please reload a page or{' '}
          <a className={styles.supportLink} href="https://github.com/DiegoKitty/JobSeekr/issues" target="_blank">
            contact our support.
          </a>
        </p>
        <Link className={`btn ${styles.toHomeLink}`} to="/stats">
          back home
        </Link>
      </div>
    </main>
  );
};

export default RouteErrorElement;
