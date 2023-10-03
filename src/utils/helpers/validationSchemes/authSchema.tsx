import { Dispatch, SetStateAction } from 'react';
import NotificationMessages from '@/enums/notificationMessage';

interface IValidationRule {
  match: RegExp;
  message: string;
}

export const validateSchema: Record<string, IValidationRule[]> = {
  name: [
    {
      match: /.{3,}/,
      message: 'Name must contain at least three character',
    },
    {
      match: /^[^0-9!@#$%^&*()_+{}[\]:;<>,.?~\\-]+$/,
      message: 'Name must not contain special characters or numbers',
    },
  ],
  password: [
    {
      match: /.{8,}/,
      message: 'Password must contain minimum 8 characters',
    },
    {
      match: /[a-zа-яё]/,
      message: 'Password must contain at least 1 lowercase letter',
    },
    {
      match: /[A-ZА-ЯЁ]/,
      message: 'Password must contain at least 1 uppercase letter',
    },
  ],
  email: [
    {
      match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      message: 'Email should have the format of example@email.com',
    },
  ],
};

export const checkIsInputValid = (
  changedField: string,
  newValue: string,
  setValidateMessages: Dispatch<SetStateAction<Record<string, string>>>
): void => {
  if (!newValue) {
    setValidateMessages((prevState) => ({ ...prevState, [changedField]: NotificationMessages.EMPTY_AUTH_FIELD }));
    return;
  }

  validateSchema[changedField].every(({ match, message }) => {
    if (!match.test(newValue)) {
      setValidateMessages((prevState) => ({ ...prevState, [changedField]: message }));
      return false;
    }
    setValidateMessages((prevState) => ({ ...prevState, [changedField]: '' }));
    return true;
  });
};

export const checkIsAllInputValid = (
  inputValues: Record<string, string>,
  setValidateMessages: Dispatch<SetStateAction<Record<string, string>>>
): boolean => {
  return Object.entries(inputValues).every(([field, value]) => {
    if (!value) {
      setValidateMessages((prevState) => ({ ...prevState, [field]: NotificationMessages.EMPTY_AUTH_FIELD }));
      return false;
    }

    return validateSchema[field].every(({ match, message }) => {
      if (inputValues[field] && !match.test(value)) {
        setValidateMessages((prevState) => ({ ...prevState, [field]: message }));
        return false;
      }

      setValidateMessages((prevState) => ({ ...prevState, [field]: '' }));
      return true;
    });
  });
};
