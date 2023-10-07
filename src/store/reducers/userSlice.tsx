/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import NotificationMessages from '@/enums/notificationMessage';
import { IUserState } from '@/interfaces/IRedux';
import { showError, showSuccsess } from '@/utils/helpers/antd/antdConfig';
import { registerUser, loginUser, updateUser } from '../actions/userActions';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '@/utils/helpers/localStorage';

const initialState: IUserState = {
  user: getUserFromLocalStorage(),
  isSidebarOpen: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state) => {
      showSuccsess(`Good bye ${state.user?.name || ''}!`);
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder

      // REGISTER USER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state, { payload: errorMessage }) => {
        state.isLoading = false;
        showError(`${errorMessage}`);
      })
      .addCase(registerUser.fulfilled, (state, { payload: userData }) => {
        state.user = userData;
        state.isLoading = false;
        addUserToLocalStorage(userData);
        showSuccsess(NotificationMessages.SUCCESSFUL_REGISTER);
      })

      // LOGIN USER
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state, { payload: errorMessage }) => {
        state.isLoading = false;
        showError(`${errorMessage}`);
      })
      .addCase(loginUser.fulfilled, (state, { payload: userData }) => {
        state.user = userData;
        state.isLoading = false;
        addUserToLocalStorage(userData);
        showSuccsess(`${NotificationMessages.SUCCESSFUL_LOGIN}${` ${userData.name}!`}`);
      })

      // UPDATE USER
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state, { payload: errorMessage }) => {
        state.isLoading = false;
        showError(`${errorMessage}`);
      })
      .addCase(updateUser.fulfilled, (state, { payload: userData }) => {
        state.user = userData;
        state.isLoading = false;
        addUserToLocalStorage(userData);
        showSuccsess(NotificationMessages.SUCCESSFUL_UPDATE);
      });
  },
});

export const { toggleSidebar } = userSlice.actions;
export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
