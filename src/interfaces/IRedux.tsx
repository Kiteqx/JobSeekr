import { IResponseUserData } from './IAPI';

export interface IUserState {
  user: Pick<IResponseUserData['data'], 'user'>['user'] | null;
  isSidebarOpen: boolean;
  isLoading: boolean;
}
