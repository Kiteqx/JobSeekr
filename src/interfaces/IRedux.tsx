import { IResponseUserData } from './IAPI';

export interface IUserState {
  user: Pick<IResponseUserData['data'], 'user'>['user'] | null;
  isSidebarOpen: boolean;
  isLoading: boolean;
}

export interface IJobState {
  isLoading: boolean;
  position: string;
  company: string;
  jobLocation: string;
  jobTypeOptions: string[];
  jobType: string;
  statusOptions: string[];
  status: string;
  isEditing: boolean;
  editJobId: string;
}
