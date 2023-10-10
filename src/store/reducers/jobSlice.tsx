/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { IJobState } from '@/interfaces/IRedux';
import { createJob } from '../actions/jobActions';
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
    handleResetState: () => {
      return { ...initialState, jobLocation: getUserFromLocalStorage()?.location || '' };
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
      });
  },
});

export const { handleChangeState, handleResetState } = jobSlice.actions;
export default jobSlice.reducer;
