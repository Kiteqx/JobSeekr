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
    data: {
      msg: string;
    };
  };
}
