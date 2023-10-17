import React, { ReactElement } from 'react';
import { IStatItemProps } from '@/interfaces/IComponents';
import styles from './StatItem.module.scss';

const StatItem = ({ count, title, icon, color, bcg }: IStatItemProps): ReactElement => {
  return (
    <article className={styles.article} style={{ borderBottom: `5px solid ${color}` }}>
      <header className={styles.header}>
        <span className={styles.count} style={{ color }}>
          {count}
        </span>
        <span className={styles.icon} style={{ background: bcg }}>
          {icon}
        </span>
      </header>
      <h5 className={styles.title}>{title}</h5>
    </article>
  );
};

export default StatItem;
