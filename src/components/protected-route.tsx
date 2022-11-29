import { FC } from 'react';
import { useAppSelector } from '../utils/types';
import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';
import { getCookie } from '../utils/cookie';
import Loader from '../pages/loader/loader';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const isAuthorized = getCookie('accessToken');

  if (!isAuth && !isAuthorized) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      </Route>
    );
  }

  if (!isAuth && isAuthorized) {
    return <Loader />;
  }

  return <Route {...rest}>{children}</Route>;
};