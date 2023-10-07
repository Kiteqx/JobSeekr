import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import APIEndpoints from '@/enums/APIEndpoints';
import { IResponseUserData, IResponseError } from '@/interfaces/IAPI';
import { logoutUser } from '../reducers/userSlice';
import errorStatusCodes from '@/enums/errorStatusCodes';
import { TThunkApiConfig } from '@/types/TRedux';

const createUserAsyncThunk = createAsyncThunk.withTypes<TThunkApiConfig>();

export const registerUser = createUserAsyncThunk(
  'user/registerUser',
  async (inputValues: Record<string, string>, thunkAPI) => {
    try {
      const {
        data: { user },
      }: IResponseUserData = await axios.post(APIEndpoints.URL_REGISTER, inputValues);
      return thunkAPI.fulfillWithValue(user);
    } catch (e) {
      const {
        response: { data },
      } = e as IResponseError;
      return typeof data === 'object' ? thunkAPI.rejectWithValue(data.msg) : thunkAPI.rejectWithValue(data);
    }
  }
);

export const loginUser = createUserAsyncThunk(
  'user/loginUser',
  async (inputValues: Record<string, string>, thunkAPI) => {
    try {
      const {
        data: { user },
      }: IResponseUserData = await axios.post(APIEndpoints.URL_LOGIN, inputValues);
      return thunkAPI.fulfillWithValue(user);
    } catch (e) {
      const {
        response: { data },
      } = e as IResponseError;
      return typeof data === 'object' ? thunkAPI.rejectWithValue(data.msg) : thunkAPI.rejectWithValue(data);
    }
  }
);

export const updateUser = createUserAsyncThunk(
  'user/updateUser',
  async (inputValues: Record<string, string>, thunkAPI) => {
    try {
      const userState = thunkAPI.getState().user.user;
      const {
        data: { user },
      }: IResponseUserData = await axios.patch(APIEndpoints.URL_UPDATE_USER, inputValues, {
        headers: {
          authorization: `Bearer ${userState?.token || ''}`,
        },
      });

      return thunkAPI.fulfillWithValue(user);
    } catch (e) {
      const {
        response: { status: statusCode, data },
      } = e as IResponseError;

      if (statusCode === errorStatusCodes.UNAUTHORIZER) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
      }
      return typeof data === 'object' ? thunkAPI.rejectWithValue(data.msg) : thunkAPI.rejectWithValue(data);
    }
  }
);
