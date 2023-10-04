import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import renderPage from '@/utils/tests/utilts';

test('Should navigate to home page', async () => {
  renderPage(
    <BrowserRouter>
      <NotFoundPage />
    </BrowserRouter>
  );

  const toAuthPageButton = screen.getByText('back home');
  fireEvent.click(toAuthPageButton);

  expect(window.location.pathname).toBe('/home');
});
