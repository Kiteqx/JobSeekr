import '@testing-library/jest-dom';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import AuthPage from '../../AuthPage';
import renderPage from '@/utils/tests/utilts';

describe('Render auth forms', () => {
  beforeEach(() => {
    renderPage(
      <MemoryRouter>
        <AuthPage />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  test('should render register form', () => {
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name*')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email*')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password*')).toBeInTheDocument();
    expect(screen.getByText('submit')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('should close register form and open login form', async () => {
    const toLoginFormButton = screen.getByText('Login');
    await waitFor(() => fireEvent.click(toLoginFormButton));

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email*')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password*')).toBeInTheDocument();
    expect(screen.getByText('submit')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('should toogle register and login form ', async () => {
    const toLoginFormButton = screen.getByText('Login');
    await waitFor(() => fireEvent.click(toLoginFormButton));

    const loginFormHeading = screen.getByText('Register');
    const missingInputForName = screen.queryByPlaceholderText('Enter your name*');

    expect(missingInputForName).toBeNull();
    expect(loginFormHeading).toBeInTheDocument();

    const toRegisterFormButton = screen.getByText('Register');
    await waitFor(() => fireEvent.click(toRegisterFormButton));

    const registerFormHeading = screen.getByText('Register');
    const inputForName = screen.getByPlaceholderText('Enter your name*');

    expect(inputForName).toBeInTheDocument();
    expect(registerFormHeading).toBeInTheDocument();
  });
});
