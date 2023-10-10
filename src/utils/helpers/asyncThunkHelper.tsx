import { createAsyncThunk } from '@reduxjs/toolkit';
import { IResponseError } from '@/interfaces/IAPI';
import { getUserFromLocalStorage } from './localStorage';
import { TRootThunkAPI } from '@/types/TRedux';

export const createAsyncThunkWithTypes = createAsyncThunk.withTypes<TRootThunkAPI>();

export const getErrorData = (error: unknown): { errorMessage: string; statusCode: number } => {
  const {
    response: { status: statusCode, data },
  } = error as IResponseError;
  return { errorMessage: typeof data === 'object' ? data.msg : data, statusCode };
};

export const createAuthHeaders = (): {
  authorization: string;
} => ({ authorization: `Bearer ${getUserFromLocalStorage()?.token || ''}` });
