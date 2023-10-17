import { IResponseGetStats, IResponseUserData } from './IAPI';
import { IJobItemProps } from './IComponents';

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

export interface IAllJobsState {
  isLoading: boolean;
  jobs: IJobItemProps[];
  totalJobs: number;
  numOfPages: number;
  currentPage: number;
  stats: Pick<IResponseGetStats['data'], 'defaultStats'>['defaultStats'];
  monthlyApplications: Pick<IResponseGetStats['data'], 'monthlyApplications'>['monthlyApplications'];
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOptions: string[];
}
