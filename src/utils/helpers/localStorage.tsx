import { IUserState } from '@/interfaces/IRedux';

type IUserDataFromLocalStorage = IUserState['user'];

export const addUserToLocalStorage = (user: IUserDataFromLocalStorage): void => {
  localStorage.setItem('JobSeekrUser', JSON.stringify(user));
};

export const removeUserFromLocalStorage = (): void => {
  localStorage.removeItem('JobSeekrUser');
};

export const getUserFromLocalStorage = (): IUserDataFromLocalStorage | null => {
  const data = localStorage.getItem('JobSeekrUser');
  return (data ? JSON.parse(data) : null) as IUserDataFromLocalStorage | null;
};
