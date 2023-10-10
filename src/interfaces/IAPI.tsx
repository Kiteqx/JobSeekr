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
