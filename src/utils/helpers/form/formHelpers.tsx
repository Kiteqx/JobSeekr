import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { AsyncThunk } from '@reduxjs/toolkit';
import NotificationMessages from '@/enums/notificationMessage';
import { showNotification } from '../antd/antdConfig';
import { TAppDispatch, TRootThunkAPI } from '@/types/TRedux';
import { IValidationRule } from '@/interfaces/IComponents';

interface IUserActionsReturned {
  email: string;
  name: string;
  lastName: string;
  location: string;
  token: string;
}

export const checkIsInputValid = (
  changedField: string,
  newValue: string,
  validateSchema: Record<string, IValidationRule[]>,
  setValidateMessages: Dispatch<SetStateAction<Record<string, string>>>
): void => {
  if (!newValue) {
    setValidateMessages((prevState) => ({ ...prevState, [changedField]: NotificationMessages.EMPTY_FIELD }));
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
  validateSchema: Record<string, IValidationRule[]>,
  setValidateMessages: Dispatch<SetStateAction<Record<string, string>>>
): boolean => {
  return Object.entries(inputValues).every(([field, value]) => {
    if (!value) {
      setValidateMessages((prevState) => ({ ...prevState, [field]: NotificationMessages.EMPTY_FIELD }));
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

export const handleInputChange = (
  event: ChangeEvent,
  inputValues: Record<string, string>,
  validateSchema: Record<string, IValidationRule[]>,
  setInputValues: Dispatch<SetStateAction<Record<string, string>>>,
  setValidateMessages: Dispatch<SetStateAction<Record<string, string>>>
): void => {
  const input = event.target as HTMLInputElement;
  const { value } = input;
  const changedField = input.name;
  checkIsInputValid(changedField, value, validateSchema, setValidateMessages);
  setInputValues({ ...inputValues, [changedField]: value });
};

export const handleSubmit = (
  event: FormEvent,
  inputsValues: Record<string, string>,
  validateSchema: Record<string, IValidationRule[]>,
  action: AsyncThunk<IUserActionsReturned, Record<string, string>, TRootThunkAPI>,
  dispatch: TAppDispatch,
  setValidateMessages: Dispatch<SetStateAction<Record<string, string>>>
): void => {
  event.preventDefault();

  if (Object.values(inputsValues).some((value) => !value)) {
    showNotification(NotificationMessages.EMPTY_FIELDS);
  } else if (!checkIsAllInputValid(inputsValues, validateSchema, setValidateMessages)) {
    showNotification(NotificationMessages.CHECK_FIELDS_VALUE);
  } else {
    dispatch(action(inputsValues));
  }
};
