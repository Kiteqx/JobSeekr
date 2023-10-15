import React, { ReactElement, useEffect } from 'react';
import styles from './JobsContainer.module.scss';
import JobItem from '../JobItem/JobItem';
import Preloader from '@/components/Preloader/Preloader';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux';
import { getAllJobs } from '@/store/actions/allJobsActions';
import Pagination from '../Pagination/Pagination';

const JobsContainer = (): ReactElement => {
  const { jobs, totalJobs, isLoading, numOfPages, currentPage, search, searchStatus, searchType, sort } =
    useAppSelector((store) => store.allJobs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, [currentPage, search, searchStatus, searchType, sort]);

  return (
    <>
      {isLoading && <Preloader containerClassname="cornerLoaderContainer" />}
      {!jobs.length && !isLoading ? (
        <h3 className={styles.noJobsHeading}>No jobs to display...</h3>
      ) : (
        <section className={styles.section}>
          <h5 className={styles.jobsQuantity}>
            {isLoading ? 'Please wait...' : `${totalJobs} ${totalJobs > 1 ? 'Jobs' : 'Job'} Found`}
          </h5>
          <div className={styles.jobs}>
            {jobs.map((job) => {
              // eslint-disable-next-line no-underscore-dangle
              return <JobItem key={job._id} {...job} />;
            })}
          </div>
          {numOfPages > 1 && <Pagination />}
        </section>
      )}
    </>
  );
};

export default JobsContainer;
