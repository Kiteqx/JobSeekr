import React, { ReactElement } from 'react';
import styles from './DataFetchingPreloader.module.scss';

const DataFetchingPreloader = (): ReactElement => (
  <div className={styles.loaderContainer}>
    <span className={styles.loader}></span>
  </div>
);

export default DataFetchingPreloader;
