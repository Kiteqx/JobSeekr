import React, { ReactElement } from 'react';
import styles from './LazyPagePreloader.module.scss';

const LazyPagePreloader = (): ReactElement => (
  <div className={styles.loaderContainer}>
    <span className={styles.loader}></span>
  </div>
);

export default LazyPagePreloader;
