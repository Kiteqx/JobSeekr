import React, { ReactElement } from 'react';
import styles from './JobInfo.module.scss';

const JobInfo = ({ icon, text }: { icon: ReactElement; text: string }): ReactElement => {
  return (
    <div className={styles.div}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default JobInfo;
