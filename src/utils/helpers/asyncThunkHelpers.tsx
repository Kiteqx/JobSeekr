import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { IResponseError } from '@/interfaces/IAPI';
import { getUserFromLocalStorage } from './localStorage';
import { TRootThunkAPI } from '@/types/TRedux';
import { IAllJobsState } from '@/interfaces/IRedux';
import errorStatusCodes from '@/enums/errorStatusCodes';
import { logoutUser } from '@/store/reducers/userSlice';

interface IQueryParams {
  sort: string;
  searchStatus: string;
  searchType: string;
  currentPage: string;
  search: string;
}

const queryParamsFields: IQueryParams = {
  sort: 'sort',
  searchStatus: 'status',
  searchType: 'jobType',
  currentPage: 'page',
  search: 'search',
};

export const createAsyncThunkWithTypes = createAsyncThunk.withTypes<TRootThunkAPI>();

export const createQueryParamsString = (stateObject: IAllJobsState, stateObjectKeys: string[]): string => {
  const searchParams = new URLSearchParams();

  for (let i = 0; i < stateObjectKeys.length; i += 1) {
    const queryParam = queryParamsFields[stateObjectKeys[i] as keyof IQueryParams];
    const queryParamValue = stateObject[stateObjectKeys[i] as keyof IQueryParams];

    if (queryParam && queryParamValue) {
      searchParams.append(queryParam, `${queryParamValue}`);
    }
  }

  return searchParams.toString();
};

export const handleThunkErrors = (error: unknown, thunkAPI: GetThunkAPI<TRootThunkAPI>): string => {
  const {
    response: { status: statusCode, data },
  } = error as IResponseError;

  if (statusCode === errorStatusCodes.UNAUTHORIZER) {
    thunkAPI.dispatch(logoutUser());
    return 'Oops, error has been occurated, please relogin!';
  }

  return typeof data === 'object' ? data.msg : data;
};

export const createAuthHeaders = (): {
  authorization: string;
} => ({ authorization: `Bearer ${getUserFromLocalStorage()?.token || ''}` });
