import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUserState } from '@/interfaces/IRedux';
import APIEndpoints from '@/enums/APIEndpoints';
import { IAuthInputValues } from '@/interfaces/IComponents';

const initialState: IUserState = {
  user: null,
  isLoading: false,
  error: '',
};

export const registerUser = createAsyncThunk('user/registerUser', async (inputValues: IAuthInputValues) => {
  try {
    await axios.post(APIEndpoints.URL_TEST_REGISTER, inputValues);
  } catch (error) {
    console.log(error);
  }
});

export const loginUser = createAsyncThunk('user/loginUser', async (user) => {
  console.log(`Login User : ${user}`);
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
