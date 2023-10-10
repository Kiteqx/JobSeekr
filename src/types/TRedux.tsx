import { store, rootReducer } from '@/store/store';

export type TAppStore = typeof store;
export type TAppDispatch = TAppStore['dispatch'];
export type TRootState = ReturnType<typeof rootReducer>;

export type TRootThunkAPI = {
  state: TRootState;
  dispatch: TAppDispatch;
  getState: () => TRootState;
};
