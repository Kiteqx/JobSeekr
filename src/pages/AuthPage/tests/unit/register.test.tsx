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

describe('Register user', () => {
  let formInputsArray: HTMLInputElement[];
  let submitButton: HTMLButtonElement;
  const mock = new MockAdapter(axios);

  beforeEach(async () => {
    renderPage(
      <MemoryRouter>
        <AuthPage />
      </MemoryRouter>
    );
    formInputsArray = [
      screen.getByPlaceholderText('Enter your name*'),
      screen.getByPlaceholderText('Enter your email*'),
      screen.getByPlaceholderText('Enter your password*'),
    ];
    submitButton = screen.getByText('submit');
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  test('', async () => {
    const mockResponse = {
      user: {
        email: 'test@gmail.com',
        name: 'John',
        lastName: 'Krya',
        location: 'fake location',
        token: 'fake token',
      },
    };

    mock.onPost(APIEndpoints.URL_REGISTER).reply(200, mockResponse);
    fillInFormInputs(formInputsArray, validInputsValues[0]);
    expect(submitButton).not.toBeDisabled();

    await waitFor(() => fireEvent.click(submitButton));
    expect(getUserFromLocalStorage()).toEqual(mockResponse.user);
  });

  test('Should handle "Email is already in used" error if response is a object', async () => {
    const mockResponse = {
      msg: 'Email is already in used',
    };

    mock.onPost(APIEndpoints.URL_REGISTER).reply(400, mockResponse);
    fillInFormInputs(formInputsArray, validInputsValues[0]);

    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(getUserFromLocalStorage()).toBeNull();
        expect(screen.getByText('Email is already in used')).toBeInTheDocument();
      },
      {
        timeout: 5000,
      }
    );
  });

  test('Should handle "Email is already in used" error if response is a primitive value', async () => {
    mock.onPost(APIEndpoints.URL_REGISTER).reply(400, 'Email is already in used');
    fillInFormInputs(formInputsArray, validInputsValues[0]);

    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(getUserFromLocalStorage()).toBeNull();
        expect(screen.getByText('Email is already in used')).toBeInTheDocument();
      },
      {
        timeout: 5000,
      }
    );
  });
});
