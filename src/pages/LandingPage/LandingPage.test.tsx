import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './LandingPage';
import renderPage from '@/utils/tests/utilts';

test('Should navigate to auth page', async () => {
  renderPage(
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  );

  const toAuthPageButton = screen.getByText('Login/Register');
  fireEvent.click(toAuthPageButton);

  expect(window.location.pathname).toBe('/auth');
});
