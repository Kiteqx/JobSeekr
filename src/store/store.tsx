import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import jobReducer from './reducers/jobSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  job: jobReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
