import React, { ReactElement } from 'react';

const MockLink = {
  ...jest.requireActual('react-router-dom'),
  Link: ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }): ReactElement => {
    return (
      <a href={to} onClick={onClick}>
        {children}
      </a>
    );
  },
};

export default MockLink;
