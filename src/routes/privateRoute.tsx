import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/utils/hooks/redux';

export const PrivateDashboardRoute = ({ children }: { children: ReactElement }): ReactElement => {
  const user = useAppSelector((state) => state.user.user);

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export const PrivateAuthRoute = ({ children }: { children: ReactElement }): ReactElement => {
  const user = useAppSelector((state) => state.user.user);

  if (user) {
    return <Navigate to="/stats" />;
  }

  return children;
};
