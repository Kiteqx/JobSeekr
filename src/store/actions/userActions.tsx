import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import APIEndpoints from '@/enums/APIEndpoints';
import { IResponseUserData, IResponseError } from '@/interfaces/IAPI';

export const registerUser = createAsyncThunk(
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

export const loginUser = createAsyncThunk('user/loginUser', async (inputValues: Record<string, string>, thunkAPI) => {
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
});
