import React from 'react';
import '@testing-library/jest-dom';

import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { emptyInputValues, invalidInputsValues, validInputsValues } from '../testCases/unitTestCases';

import AuthPage from '../../AuthPage';
import fillInFormInputs from '../utils/utils';
import renderPage from '@/utils/tests/utilts';
import NotificationMessages from '@/enums/notificationMessage';

describe('Verification of the correctness of working out validation before submit register form', () => {
  let formInputsArray: HTMLInputElement[];
  let submitButton: HTMLButtonElement;

  beforeEach(async () => {
    renderPage(
      <MemoryRouter>
        <AuthPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      formInputsArray = [
        screen.getByPlaceholderText('Enter your name*'),
        screen.getByPlaceholderText('Enter your email*'),
        screen.getByPlaceholderText('Enter your password*'),
      ];
      submitButton = screen.getByText('submit');
    });
  });

  afterEach(() => {
    cleanup();
  });

  test('The registration button should be disabled if all inputs have invalid value', () => {
    invalidInputsValues.forEach((inputsValues) => {
      fillInFormInputs(formInputsArray, inputsValues);
      expect(submitButton).toBeDisabled();
    });
  });

  test('The registration button should be disabled if the user clears the required field', async () => {
    fillInFormInputs(formInputsArray, validInputsValues[0]);
    const [formNameInput] = formInputsArray;
    fireEvent.change(formNameInput, { target: { value: '' } });

    await waitFor(() => expect(screen.getByText(NotificationMessages.EMPTY_FIELD)).toBeInTheDocument(), {
      timeout: 5000,
    });
  });

  test('The registration button should not to be disabled if all inputs have valid value', () => {
    validInputsValues.forEach((inputsValues) => {
      fillInFormInputs(formInputsArray, inputsValues);
      expect(submitButton).not.toBeDisabled();
    });
  });

  test('The registration button should not to be disabled if the user fix invalid input value', async () => {
    fillInFormInputs(formInputsArray, invalidInputsValues[2]);
    expect(submitButton).toBeDisabled();

    // fix invalid password value 12345678 => Pass2app
    await waitFor(() => fireEvent.change(formInputsArray[2], { target: { value: 'Pass2app' } }));
    expect(submitButton).not.toBeDisabled();
  });

  test('should show notification after submit if one of the input has not value', async () => {
    fillInFormInputs(formInputsArray, emptyInputValues);
    submitButton.disabled = false;
    fireEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText(NotificationMessages.EMPTY_FIELDS)).toBeInTheDocument(), {
      timeout: 5000,
    });
  });

  test('should show notification after submit if one of the input has invalid value', async () => {
    fillInFormInputs(formInputsArray, invalidInputsValues[0]);
    submitButton.disabled = false;
    fireEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText(NotificationMessages.CHECK_FIELDS_VALUE)).toBeInTheDocument(), {
      timeout: 5000,
    });
  });
});

describe('Verification of the correctness of working out validation before submission login form', () => {
  let formInputsArray: HTMLInputElement[];
  let submitButton: HTMLButtonElement;

  beforeEach(async () => {
    renderPage(
      <MemoryRouter>
        <AuthPage />
      </MemoryRouter>
    );
    const toLoginFormButton = screen.getByText('Login');
    fireEvent.click(toLoginFormButton);
    await waitFor(() => {
      formInputsArray = [
        screen.getByPlaceholderText('Enter your email*'),
        screen.getByPlaceholderText('Enter your password*'),
      ];
      submitButton = screen.getByText('submit');
    });
  });

  afterEach(() => {
    cleanup();
  });

  test('The login button should be disabled if all inputs have invalid value', () => {
    invalidInputsValues.forEach((inputsValues) => {
      fillInFormInputs(formInputsArray, inputsValues);
      expect(submitButton).toBeDisabled();
    });
  });

  test('The login button should not to be disabled if all inputs have valid value', () => {
    validInputsValues.forEach((inputsValues) => {
      fillInFormInputs(formInputsArray, inputsValues);
      expect(submitButton).not.toBeDisabled();
    });
  });

  test('should show notification after submit if one of the input has invalid value', async () => {
    fillInFormInputs(formInputsArray, invalidInputsValues[0]);
    submitButton.disabled = false;
    fireEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText(NotificationMessages.CHECK_FIELDS_VALUE)).toBeInTheDocument(), {
      timeout: 5000,
    });
  });

  test('should show notification after submit if one of the input has not value', async () => {
    fillInFormInputs(formInputsArray, emptyInputValues);
    submitButton.disabled = false;
    fireEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText(NotificationMessages.EMPTY_FIELDS)).toBeInTheDocument(), {
      timeout: 5000,
    });
  });
});
