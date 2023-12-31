import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useGetCurrentUserQuery } from '../services/api';
import { Loader } from '../components';

interface ProtectedRoutesProps {
  children: ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const { data, isLoading, error } = useGetCurrentUserQuery({});
  console.log(data, 'Pro Route');

  if (error) console.log(error);

  if (isLoading) return <Loader />;

  let canAccess = false;
  if (data?.userId) {
    canAccess = true;
  }

  return <>{canAccess ? children : <Navigate to='/login' replace />}</>;
};

export default ProtectedRoutes;
