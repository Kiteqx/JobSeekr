import React, { ReactElement } from 'react';
import moment from 'moment';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/utils/hooks/redux';
import { IJobItemProps } from '@/interfaces/IComponents';
import { deleteJob } from '@/store/actions/allJobsActions';
import { setEditJob } from '@/store/reducers/jobSlice';
import styles from './JobItem.module.scss';
import JobInfo from '../JobInfo/JobInfo';

const JobItem = ({
  _id: jobId,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}: IJobItemProps): ReactElement => {
  const dispatch = useAppDispatch();
  const date = moment(createdAt).format('MMM Do, YYYY');

  const handleDeleteJob = (): void => {
    dispatch(deleteJob(jobId));
  };

  const handleEditJob = (): void => {
    dispatch(setEditJob({ editJobId: jobId, position, company, jobLocation, jobType, status }));
  };

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <div className={styles.mainIcon}>{company.charAt(0)}</div>
        <div className={styles.info}>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.contentCenter}>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`${styles.status} ${styles[status]}`}>{status}</div>
        </div>
        <footer className={styles.footer}>
          <div className={styles.actions}>
            <Link to="/add-job" className={`btn ${styles.editBtn}`} onClick={handleEditJob}>
              Edit
            </Link>
            <button type="button" className={`btn ${styles.deleteBtn}`} onClick={handleDeleteJob}>
              Delete
            </button>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default JobItem;
