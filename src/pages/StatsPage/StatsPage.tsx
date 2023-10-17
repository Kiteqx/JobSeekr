import React, { ReactElement, useEffect } from 'react';
import Preloader from '@/components/Preloader/Preloader';
import StatsContainer from './components/StatsContainer/StatsContainer';
import ChartsContainer from './components/ChartsContainer/ChartsContainer';
import { getStats } from '@/store/actions/allJobsActions';
import { useAppSelector, useAppDispatch } from '@/utils/hooks/redux';

const StatsPage = (): ReactElement => {
  const { isLoading, monthlyApplications } = useAppSelector((store) => store.allJobs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStats());
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader containerClassname="layoutPagesLoaderContainer" />
      ) : (
        <>
          <StatsContainer />
          {monthlyApplications.length > 0 && <ChartsContainer />}
        </>
      )}
    </>
  );
};

export default StatsPage;
