import React from 'react';
import '@testing-library/jest-dom';

import { cleanup, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import { validInputsValues } from '../testCases/unitTestCases';

import AuthPage from '../../AuthPage';
import renderPage from '@/utils/tests/utilts';
import fillInFormInputs from '../utils/utils';
import APIEndpoints from '@/enums/APIEndpoints';
import { getUserFromLocalStorage } from '@/utils/helpers/localStorage';

describe('Login user', () => {
  let formInputsArray: HTMLInputElement[];
  let submitButton: HTMLButtonElement;
  const mock = new MockAdapter(axios);

  beforeEach(async () => {
    renderPage(
      <MemoryRouter>
        <AuthPage />
      </MemoryRouter>
    );
    const toLoginFormButton = screen.getByText('Login');
    await waitFor(() => fireEvent.click(toLoginFormButton));
    formInputsArray = [
      screen.getByPlaceholderText('Enter your email*'),
      screen.getByPlaceholderText('Enter your password*'),
    ];
    submitButton = screen.getByText('submit');
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  test('Should successful user login with valid credentials and save user data to local storage', async () => {
    const mockResponse = {
      user: {
        email: 'test@gmail.com',
        name: 'John',
        lastName: 'Krya',
        location: 'fake location',
        token: 'fake token',
      },
    };

    mock.onPost(APIEndpoints.URL_LOGIN).reply(200, mockResponse);

    fillInFormInputs(formInputsArray, validInputsValues[0]);
    expect(submitButton).not.toBeDisabled();

    await waitFor(() => fireEvent.click(submitButton));
    expect(getUserFromLocalStorage()).toEqual(mockResponse.user);
  });

  test('Should handle "User not found" error if response is object', async () => {
    const mockResponse = {
      msg: 'User not found',
    };

    mock.onPost(APIEndpoints.URL_LOGIN).reply(404, mockResponse);

    fillInFormInputs(formInputsArray, validInputsValues[0]);
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(getUserFromLocalStorage()).toBeNull();
        expect(screen.getByText('User not found')).toBeInTheDocument();
      },
      {
        timeout: 5000,
      }
    );
  });

  test('Should handle "User not found" error if response is a primitive value', async () => {
    mock.onPost(APIEndpoints.URL_LOGIN).reply(404, 'User not found');
    fillInFormInputs(formInputsArray, validInputsValues[0]);

    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(getUserFromLocalStorage()).toBeNull();
        expect(screen.getByText('User not found')).toBeInTheDocument();
      },
      {
        timeout: 5000,
      }
    );
  });
});
