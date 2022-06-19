import Cookies from 'js-cookie';
import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';
import {
  ACCESS_TOKEN_KEY,
  IS_REMEMBER,
  IS_REMEMBER_TRUE,
  IS_REMEMBER_FALSE,
} from './utils/constants';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage2'));
const SignUpPage = lazy(() => import('./modules/auth/pages/SignUpPage'));

interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();
  const cookiesLogin = Cookies.get(IS_REMEMBER);

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        <Route
          path={ROUTES.login}
          component={cookiesLogin === IS_REMEMBER_TRUE ? HomePage : LoginPage}
        />
        <ProtectedRoute path={ROUTES.home} component={HomePage} />
        <Route path={ROUTES.contact} component={ContactPage} />
        <Route path={ROUTES.signUp} component={SignUpPage} />

        <Route path="/" component={cookiesLogin === IS_REMEMBER_TRUE ? HomePage : LoginPage} />
      </Switch>
    </Suspense>
  );
};
