import { store, rootReducer } from '@/store/store';

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppStore = typeof store;
export type TAppDispatch = TAppStore['dispatch'];
