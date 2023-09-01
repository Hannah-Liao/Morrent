import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRoutesProps {
  isLoggedIn: boolean | null;
  children: ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
  isLoggedIn,
  children,
}) => {
  if (!isLoggedIn) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
