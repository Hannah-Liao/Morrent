import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useGetCurrentUserQuery } from '../services/api';

interface ProtectedRoutesProps {
  children: ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const { data, isLoading, error } = useGetCurrentUserQuery();

  if (error) console.log(error);

  if (isLoading) return <h1>hello World</h1>;

  let canAccess = false;
  if (data?.userId) {
    canAccess = true;
  }

  // Render the children only when userID is not null (authenticated)
  return <>{canAccess ? children : <Navigate to='/login' replace />}</>;
};

export default ProtectedRoutes;
