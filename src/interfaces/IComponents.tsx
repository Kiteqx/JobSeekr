import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export interface IFormRowProps {
  type: string;
  name: string;
  value: string;
  labelText?: string;
  handleInputChange: (event: ChangeEvent) => void;
}

export interface IAuthInputValues {
  name: string;
  email: string;
  password: string;
}

export interface IAuthFormProps {
  inputValues: IAuthInputValues;
  setIsMember: Dispatch<SetStateAction<boolean>>;
  setInputValues: Dispatch<SetStateAction<IAuthInputValues>>;
}
