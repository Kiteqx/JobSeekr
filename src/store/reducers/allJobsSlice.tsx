/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getAllJobs, deleteJob } from '../actions/allJobsActions';
import { showError, showSuccsess } from '@/utils/helpers/antd/antdConfig';
import { IAllJobsState } from '@/interfaces/IRedux';
import NotificationMessages from '@/enums/notificationMessage';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState: IAllJobsState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  currentPage: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    handleChangeState: (state, { payload: { name, value } }) => {
      return { ...state, [name]: value, currentPage: 1 };
    },
    handleClearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload: currenPage }) => {
      state.currentPage = currenPage;
    },
    clearAllJobsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder

      // GET ALL JOBS
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.rejected, (state, { payload: errorMessage }) => {
        state.isLoading = false;
        showError(`${errorMessage}`);
      })
      .addCase(getAllJobs.fulfilled, (state, { payload: jobsData }) => {
        state.isLoading = false;
        state.jobs = jobsData.jobs;
        state.numOfPages = jobsData.numOfPages;
        state.totalJobs = jobsData.totalJobs;
      })

      // DELETE JOB
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJob.rejected, (state, { payload: errorMessage }) => {
        state.isLoading = false;
        showError(`${errorMessage}`);
      })
      .addCase(deleteJob.fulfilled, (state) => {
        state.isLoading = false;
        showSuccsess(NotificationMessages.SUCCESSFUL_DELETE_JOB);
      });
  },
});

export const { handleChangeState, handleClearFilters, changePage, clearAllJobsState } = allJobsSlice.actions;
export default allJobsSlice.reducer;
