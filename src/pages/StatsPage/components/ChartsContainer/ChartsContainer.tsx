import React, { ReactElement, useState } from 'react';
import { useAppSelector } from '@/utils/hooks/redux';
import BarChartComponent from '../BarChartComponent/BarChartComponent';
import AreaChartComponent from '../AreaChartComponent/AreaChartComponent';
import styles from './ChartsContainer.module.scss';

const ChartsContainer = (): ReactElement => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useAppSelector((store) => store.allJobs);

  const handleSetBarChart = (): void => {
    setBarChart(!barChart);
  };

  return (
    <section className={styles.section}>
      <h4 className={styles.h4}>Monthly Applications</h4>
      <button className={styles.button} type="button" onClick={handleSetBarChart}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChartComponent data={data} /> : <AreaChartComponent data={data} />}
    </section>
  );
};

export default ChartsContainer;
