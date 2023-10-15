import React, { ReactElement } from 'react';
import SearchContainer from './components/SearchContainer/SearchContainer';
import JobsContainer from './components/JobsContainer/JobsContainer';

const AllJobsPage = (): ReactElement => {
  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  );
};

export default AllJobsPage;
