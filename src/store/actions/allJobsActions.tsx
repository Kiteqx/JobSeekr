import axios from 'axios';
import APIEndpoints from '@/enums/APIEndpoints';
import { IResponseDeleteJob, IResponseGetAllJobs } from '@/interfaces/IAPI';
import {
  createAsyncThunkWithTypes,
  createAuthHeaders,
  createQueryParamsString,
  handleThunkErrors,
} from '@/utils/helpers/asyncThunkHelpers';

export const getAllJobs = createAsyncThunkWithTypes('allJobs/getJobs', async (__, thunkAPI) => {
  try {
    const stateObject = thunkAPI.getState().allJobs;
    const stateKeys = Object.keys(stateObject);
    const searchParamsString = createQueryParamsString(stateObject, stateKeys);

    const { data }: IResponseGetAllJobs = await axios.get(`${APIEndpoints.URL_JOBS}/?${searchParamsString}`, {
      headers: createAuthHeaders(),
    });

    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(handleThunkErrors(error, thunkAPI));
  }
});

export const deleteJob = createAsyncThunkWithTypes('allJobs/deleteJob', async (jobId: string, thunkAPI) => {
  try {
    const {
      data: { msg },
    }: IResponseDeleteJob = await axios.delete(`${APIEndpoints.URL_JOBS}/${jobId}`, {
      headers: createAuthHeaders(),
    });

    await thunkAPI.dispatch(getAllJobs());
    return thunkAPI.fulfillWithValue(msg);
  } catch (error) {
    return thunkAPI.rejectWithValue(handleThunkErrors(error, thunkAPI));
  }
});
