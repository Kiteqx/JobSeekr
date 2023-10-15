import React, { ChangeEvent, FormEvent, ReactElement } from 'react';
import styles from './AddJobPage.module.scss';
import FormRow from '@/components/FormRow/FormRow';
import FormRowSelect from '@/components/FormRowSelect/FormRowSelect';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux';
import { handleChangeState, clearAddJobState } from '@/store/reducers/jobSlice';
import { createJob, editJob } from '@/store/actions/jobActions';
import Preloader from '@/components/Preloader/Preloader';

const AddJobPage = (): ReactElement => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useAppSelector((store) => store.job);
  const dispatch = useAppDispatch();

  const handleChangeJobState = (event: ChangeEvent): void => {
    const target = event.target as HTMLSelectElement;
    const { name, value } = target;
    dispatch(handleChangeState({ name, value }));
  };

  const handleResetJobState = (): void => {
    dispatch(clearAddJobState());
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    if (isEditing) {
      dispatch(editJob({ jobId: editJobId, jobData: { position, company, jobLocation, jobType, status } }));
      return;
    }

    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };

  return (
    <>
      {isLoading && <Preloader containerClassname="cornerLoaderContainer" />}
      <section className={styles.section}>
        <form className={`form ${styles.form}`}>
          <h3>{isEditing ? 'edit job' : 'add job'}</h3>
          <div className={styles.formCenter}>
            <FormRow
              type="text"
              name="position"
              value={position}
              placeholder="Enter position*"
              onInputChange={handleChangeJobState}
            />
            <FormRow
              type="text"
              name="company"
              value={company}
              placeholder="Enter company*"
              onInputChange={handleChangeJobState}
            />
            <FormRow
              type="text"
              labelText="job location"
              name="jobLocation"
              value={jobLocation}
              placeholder="Enter job location*"
              onInputChange={handleChangeJobState}
            />
            <FormRowSelect
              name="status"
              value={status}
              labelText="status"
              list={statusOptions}
              onChange={handleChangeJobState}
            />
            <FormRowSelect
              name="jobType"
              labelText="job type"
              value={jobType}
              list={jobTypeOptions}
              onChange={handleChangeJobState}
            />
            <div className={styles.btnContainer}>
              <button type="button" className={`btn btn-block ${styles.clearBtn}`} onClick={handleResetJobState}>
                clear
              </button>
              <button
                type="submit"
                className={`btn btn-block`}
                disabled={isLoading || !position || !company || !jobLocation}
                onClick={handleSubmit}
              >
                {isLoading ? 'please wait...' : 'submit'}
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddJobPage;
