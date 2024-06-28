import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

export default function ProtectedRoute({
  children,
  isAllowed,
  redirectPath = '/',
}) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children || <Outlet />;
}

/* код Дениса
export default function ProtectedRoute({ children, authUser, redirectTo })
  if (!authUser) {
    return <Navigate to={redirectTo} replace/>
  }
  return children
}
  */
