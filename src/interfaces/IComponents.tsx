import { ChangeEvent, Dispatch, ReactElement, SetStateAction } from 'react';

export interface IFormRowProps {
  type: string;
  name: string;
  value: string;
  labelText?: string;
  placeholder: string;
  validateMessage?: string;
  autoFocus?: boolean;
  onInputChange: (event: ChangeEvent) => void;
}

export interface IAuthFormProps {
  inputsValues: Record<string, string>;
  setIsMember: Dispatch<SetStateAction<boolean>>;
  setInputsValues: Dispatch<SetStateAction<Record<string, string>>>;
}

export interface IFormSelectProps {
  labelText: string;
  name: string;
  value: string;
  list: string[];
  onChange: (event: ChangeEvent) => void;
}

export interface IJobItemProps {
  _id: string;
  position: string;
  company: string;
  jobLocation: string;
  jobType: string;
  createdAt: string;
  status: string;
}

export interface IStatItemProps {
  count: number;
  title: string;
  icon: ReactElement;
  color: string;
  bcg: string;
}

export interface IValidationRule {
  match: RegExp;
  message: string;
}
