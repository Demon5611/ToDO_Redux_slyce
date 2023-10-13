import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type PrivateRoutePropsType = {
  children?: React.ReactElement;
  isAllowed: boolean;
  redirect?: string;
};

function PrivateRoute({ children, isAllowed, redirect = '/' }: PrivateRoutePropsType): JSX.Element {
  if (!isAllowed) return <Navigate to={redirect} replace />;
  return children || <Outlet />;
}

export default PrivateRoute;
