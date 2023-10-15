/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { IJobState } from '@/interfaces/IRedux';
import { createJob, editJob } from '../actions/jobActions';
import NotificationMessages from '@/enums/notificationMessage';
import { showError, showSuccsess } from '@/utils/helpers/antd/antdConfig';
import { getUserFromLocalStorage } from '@/utils/helpers/localStorage';

const initialState: IJobState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChangeState: (state: IJobState, { payload: { name, value } }) => {
      return { ...state, [name]: value };
    },
    clearAddJobState: () => {
      return { ...initialState, jobLocation: getUserFromLocalStorage()?.location || '' };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder

      // ADD JOB
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.rejected, (state, { payload: errorMessage }) => {
        state.isLoading = false;
        showError(`${errorMessage}`);
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false;
        showSuccsess(NotificationMessages.SUCCESSFUL_ADD_JOB);
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.rejected, (state, { payload: errorMessage }) => {
        state.isLoading = false;
        showError(`${errorMessage}`);
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        showSuccsess(NotificationMessages.SUCCESSFUL_EDIT_JOB);
      });
  },
});

export const { handleChangeState, clearAddJobState, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
