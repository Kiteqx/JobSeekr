import axios from 'axios';
import APIEndpoints from '@/enums/APIEndpoints';
import errorStatusCodes from '@/enums/errorStatusCodes';
import { logoutUser } from '../reducers/userSlice';
import { IResponseUserData } from '@/interfaces/IAPI';
import { createAsyncThunkWithTypes, createAuthHeaders, getErrorData } from '@/utils/helpers/asyncThunkHelper';

export const registerUser = createAsyncThunkWithTypes(
  'user/registerUser',
  async (inputValues: Record<string, string>, thunkAPI) => {
    try {
      const {
        data: { user },
      }: IResponseUserData = await axios.post(APIEndpoints.URL_REGISTER, inputValues);
      return thunkAPI.fulfillWithValue(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorData(error).errorMessage);
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
      return thunkAPI.rejectWithValue(getErrorData(error).errorMessage);
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
      const { errorMessage, statusCode } = getErrorData(error);
      if (statusCode === errorStatusCodes.UNAUTHORIZER) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue('Oops, please relogin!');
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
