import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Logo from './Logo';
import '@testing-library/jest-dom';
import renderPage from '@/utils/tests/utilts';

test('Should set default classname without classname props', async () => {
  renderPage(
    <MemoryRouter>
      <Logo />
    </MemoryRouter>
  );
});
