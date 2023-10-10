import { ChangeEvent, Dispatch, SetStateAction } from 'react';

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

export interface IValidationRule {
  match: RegExp;
  message: string;
}
