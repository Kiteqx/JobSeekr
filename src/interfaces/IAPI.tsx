export interface IResponseUserData {
  status: number;
  statusText: string;
  data: {
    user: {
      email: string;
      name: string;
      lastName: string;
      location: string;
      token: string;
    };
  };
}

export interface IResponseCreateJob {
  status: number;
  statusText: string;
  data: {
    job: {
      company: string;
      createdAt: string;
      createdBy: string;
      jobLocation: string;
      jobType: string;
      position: string;
      status: string;
      updatedAt: string;
      __v: string;
      _id: string;
    };
  };
}

export interface IResponseEditJob {
  status: number;
  statusText: string;
  data: {
    updatedJob: Pick<IResponseCreateJob['data'], 'job'>['job'];
  };
}

export interface IResponseGetAllJobs {
  status: number;
  statusText: string;
  data: {
    jobs: Pick<IResponseCreateJob['data'], 'job'>['job'][];
    numOfPages: number;
    totalJobs: number;
  };
}

export interface IResponseDeleteJob {
  status: number;
  statusText: string;
  data: { msg: string };
}

export interface IResponseError {
  type: string;
  error: { message: string };
  code: string;
  name: string;
  message: string;
  response: {
    status: number;
    statusText: string;
    data:
      | string
      | {
          msg: string;
        };
  };
}
