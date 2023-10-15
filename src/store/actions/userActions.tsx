import axios from 'axios';
import APIEndpoints from '@/enums/APIEndpoints';
import { IResponseUserData } from '@/interfaces/IAPI';
import { createAsyncThunkWithTypes, createAuthHeaders, handleThunkErrors } from '@/utils/helpers/asyncThunkHelpers';

export const registerUser = createAsyncThunkWithTypes(
  'user/registerUser',
  async (inputValues: Record<string, string>, thunkAPI) => {
    try {
      const {
        data: { user },
      }: IResponseUserData = await axios.post(APIEndpoints.URL_REGISTER, inputValues);
      return thunkAPI.fulfillWithValue(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(handleThunkErrors(error, thunkAPI));
    }
  }
);

export const loginUser = createAsyncThunkWithTypes(
  'user/loginUser',
  async (inputValues: Record<string, string>, thunkAPI) => {
    try {
      const {
        data: { user },
      }: IResponseUserData = await axios.post(APIEndpoints.URL_LOGIN, inputValues);
      return thunkAPI.fulfillWithValue(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(handleThunkErrors(error, thunkAPI));
    }
  }
);

export const updateUser = createAsyncThunkWithTypes(
  'user/updateUser',
  async (inputValues: Record<string, string>, thunkAPI) => {
    try {
      const {
        data: { user },
      }: IResponseUserData = await axios.patch(APIEndpoints.URL_UPDATE_USER, inputValues, {
        headers: createAuthHeaders(),
      });

      return thunkAPI.fulfillWithValue(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(handleThunkErrors(error, thunkAPI));
    }
  }
);
