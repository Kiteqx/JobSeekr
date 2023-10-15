import axios from 'axios';
import APIEndpoints from '@/enums/APIEndpoints';
import { IResponseCreateJob, IResponseEditJob } from '@/interfaces/IAPI';
import { createAsyncThunkWithTypes, createAuthHeaders, handleThunkErrors } from '@/utils/helpers/asyncThunkHelpers';
import { clearAddJobState } from '../reducers/jobSlice';

interface ICreateJobThunkArg {
  position: string;
  company: string;
  jobLocation: string;
  jobType: string;
  status: string;
}

interface IEditJobThunkArg {
  jobId: string;
  jobData: {
    position: string;
    company: string;
    jobLocation: string;
    jobType: string;
    status: string;
  };
}

export const createJob = createAsyncThunkWithTypes(
  'job/createJob',
  async (inputsValues: ICreateJobThunkArg, thunkAPI) => {
    try {
      const {
        data: { job: jobData },
      }: IResponseCreateJob = await axios.post(APIEndpoints.URL_JOBS, inputsValues, {
        headers: createAuthHeaders(),
      });

      thunkAPI.dispatch(clearAddJobState());
      return thunkAPI.fulfillWithValue(jobData);
    } catch (error) {
      return thunkAPI.rejectWithValue(handleThunkErrors(error, thunkAPI));
    }
  }
);

export const editJob = createAsyncThunkWithTypes(
  'job/editJob',
  async ({ jobId, jobData }: IEditJobThunkArg, thunkAPI) => {
    try {
      const {
        data: { updatedJob },
      }: IResponseEditJob = await axios.patch(`${APIEndpoints.URL_JOBS}/${jobId}`, jobData, {
        headers: createAuthHeaders(),
      });

      thunkAPI.dispatch(clearAddJobState());
      return thunkAPI.fulfillWithValue(updatedJob);
    } catch (error) {
      return thunkAPI.rejectWithValue(handleThunkErrors(error, thunkAPI));
    }
  }
);
