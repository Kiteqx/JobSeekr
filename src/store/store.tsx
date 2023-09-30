import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice/userSlice';

export const rootReducer = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
