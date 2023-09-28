import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.scss';
import landingPagePreview from '@/assets/images/svg/landing-page-preview.svg';
import Logo from '@/components/Logo/Logo';

const LandingPage = (): ReactElement => {
  return (
    <main className={`container ${styles.main}`}>
      <header>
        <nav>
          <Logo />
        </nav>
      </header>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <h2 className={`heading ${styles.infoHheading}`}>
            Job <span className={styles.infoHeadingSpan}>Tracking</span> App
          </h2>
          <p className={styles.descriptionText}>
            Welcome to JobSeekr - your premier platform for job search, adding opportunities, tracking, and managing job
            applications. Our mission is to make job hunting and career management as convenient and effective as
            possible. Join us today to kickstart your journey towards your dream career.
          </p>
          <Link className={`btn ${styles.authBtn}`} to="/auth">
            Login/Register
          </Link>
        </div>
        <img src={landingPagePreview} alt="job hunt" className={styles.previewImg} />
      </div>
    </main>
  );
};

export default LandingPage;
