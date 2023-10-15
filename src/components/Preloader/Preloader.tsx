import React, { ReactElement } from 'react';
import styles from './Preloader.module.scss';

const Preloader = ({ containerClassname }: { containerClassname: string }): ReactElement => (
  <div className={styles[containerClassname]}>
    <span></span>
  </div>
);

export default Preloader;
