import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const CheckAuth = ({ children }: { children: ReactNode }) => {
  const isAuth = true;

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default CheckAuth;
