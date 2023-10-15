import React, { ChangeEvent, FormEvent, ReactElement, useMemo, useState } from 'react';
import styles from './SearchContainer.module.scss';
import FormRow from '@/components/FormRow/FormRow';
import FormRowSelect from '@/components/FormRowSelect/FormRowSelect';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux';
import { handleChangeState, handleClearFilters } from '@/store/reducers/allJobsSlice';

const SearchContainer = (): ReactElement => {
  const [localSearch, setLocalSearch] = useState('');
  const { jobTypeOptions, statusOptions } = useAppSelector((store) => store.job);
  const { isLoading, searchStatus, searchType, sort, sortOptions } = useAppSelector((store) => store.allJobs);
  const dispatch = useAppDispatch();

  const handleSearch = (event: ChangeEvent): void => {
    const target = event.target as HTMLSelectElement;
    const { name, value } = target;
    dispatch(handleChangeState({ name, value }));
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setLocalSearch('');
    dispatch(handleClearFilters());
  };

  const debounce = (): ((event: ChangeEvent) => void) => {
    let timeoutID: NodeJS.Timeout;

    return (event: ChangeEvent) => {
      const target = event.target as HTMLSelectElement;
      const { name, value } = target;

      setLocalSearch(value);
      clearTimeout(timeoutID);

      timeoutID = setTimeout(() => {
        dispatch(handleChangeState({ name, value }));
      }, 1000);
    };
  };

  const optimizedDebounce = useMemo(() => debounce(), []);

  return (
    <section className={styles.section}>
      <form className={`form ${styles.form}`}>
        <h3>search form</h3>
        <div className={styles.formCenter}>
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            onInputChange={optimizedDebounce}
            placeholder="Enter name of job..."
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            onChange={handleSearch}
            list={['all', ...statusOptions]}
          />
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            onChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />
          <FormRowSelect name="sort" value={sort} onChange={handleSearch} list={sortOptions} labelText="sort" />
          <button className={`btn btn-block btn-danger ${styles.btnBlock}`} disabled={isLoading} onClick={handleSubmit}>
            clear filters
          </button>
        </div>
      </form>
    </section>
  );
};

export default SearchContainer;
