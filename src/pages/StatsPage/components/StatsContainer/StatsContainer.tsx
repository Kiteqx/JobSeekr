import React, { ReactElement } from 'react';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import { useAppSelector } from '@/utils/hooks/redux';
import styles from './StatsContainer.module.scss';
import StatItem from '../StatItem/StatItem';

const StatsContainer = (): ReactElement => {
  const { stats } = useAppSelector((store) => store.allJobs);

  const defaultStats = [
    {
      title: 'pending applications',
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'interviews scheduled',
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'jobs declined',
      count: stats.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];

  return (
    <section className={styles.section}>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </section>
  );
};

export default StatsContainer;
