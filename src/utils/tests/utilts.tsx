import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import { store } from '@/store/store';

const renderPage = (PageWithRouter: ReactElement): void => {
  render(<Provider store={store}>{PageWithRouter}</Provider>);
};

export default renderPage;
