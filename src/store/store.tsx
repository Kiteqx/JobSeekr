import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer, { logoutUser } from './reducers/userSlice';
import jobReducer, { clearAddJobState } from './reducers/jobSlice';
import allJobsReducer, { clearAllJobsState } from './reducers/allJobsSlice';
import { createAsyncThunkWithTypes } from '@/utils/helpers/asyncThunkHelpers';

export const rootReducer = combineReducers({
  user: userReducer,
  job: jobReducer,
  allJobs: allJobsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const clearAllStore = createAsyncThunkWithTypes('clearAllStore', async (__, thunkAPI) => {
  thunkAPI.dispatch(logoutUser());
  thunkAPI.dispatch(clearAllJobsState());
  thunkAPI.dispatch(clearAddJobState());
});
