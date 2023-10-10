import axios from 'axios';
import APIEndpoints from '@/enums/APIEndpoints';
import errorStatusCodes from '@/enums/errorStatusCodes';
import { logoutUser } from '../reducers/userSlice';
import { IResponseCreateJob } from '@/interfaces/IAPI';
import { handleResetState } from '../reducers/jobSlice';
import { createAsyncThunkWithTypes, createAuthHeaders, getErrorData } from '@/utils/helpers/asyncThunkHelper';

interface ICreateJobThunkArg {
  position: string;
  company: string;
  jobLocation: string;
  jobType: string;
  status: string;
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

      thunkAPI.dispatch(handleResetState());
      return thunkAPI.fulfillWithValue(jobData);
    } catch (error) {
      const { errorMessage, statusCode } = getErrorData(error);
      if (statusCode === errorStatusCodes.UNAUTHORIZER) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue('Oops, please relogin!');
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deleteJob = createAsyncThunkWithTypes('job/deleteJob', async (jobId, thunkAPI) => {
  // thunkAPI.dispatch(showLoading());  TODO
  try {
    const resp = await axios.delete(`${APIEndpoints.URL_JOBS}/${jobId}`, {
      headers: createAuthHeaders(),
    });
    // thunkAPI.dispatch(getAllJobs()); TODO
    return resp.data;
  } catch (error) {
    // thunkAPI.dispatch(hideLoading()); TODO
    const { errorMessage, statusCode } = getErrorData(error);
    if (statusCode === errorStatusCodes.UNAUTHORIZER) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Oops, please relogin!');
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
