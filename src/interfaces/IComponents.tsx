import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export interface IFormRowProps {
  type: string;
  name: string;
  value: string;
  labelText?: string;
  placeholder: string;
  validateMessage?: string;
  autoFocus?: boolean;
  handleInputChange: (event: ChangeEvent) => void;
}

export interface IAuthFormProps {
  inputValues: Record<string, string>;
  setIsMember: Dispatch<SetStateAction<boolean>>;
  setInputValues: Dispatch<SetStateAction<Record<string, string>>>;
}
