import React, { useState } from 'react';
import LoginForm from 'modules/auth/components/LoginForm2';
import logo from 'logo-420-x-108.png';
import { ILoginParams } from 'models/auth';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from 'modules/common/redux/thunk';
import { API_PATHS } from 'configs/api';
import { RESPONSE_STATUS_SUCCESS } from 'utils/httpResponseCode';
import { setUserInfo } from 'modules/auth/redux/authReducer';
import Cookies from 'js-cookie';
import {
  ACCESS_TOKEN_KEY,
  IS_REMEMBER,
  IS_REMEMBER_TRUE,
  IS_REMEMBER_FALSE,
} from '../../../utils/constants';
import { ROUTES } from '../../../configs/routes';
import { replace, push } from 'connected-react-router';
import { getErrorMessageResponse } from '../../../utils';
import './LoginPage.css';

const LoginPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const redirectToSignUpPage = () => {
    dispatch(push(ROUTES.signUp));
  };

  const onLogin = React.useCallback(
    async (values: ILoginParams) => {
      setErrorMessage('');
      setLoading(true);

      const json = await dispatch(
        fetchThunk(API_PATHS.signIn, 'post', { email: values.email, password: values.password })
      );

      setLoading(false);

      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        if (values.rememberMe) {
          Cookies.set(IS_REMEMBER, IS_REMEMBER_TRUE);
        } else {
          Cookies.set(IS_REMEMBER, IS_REMEMBER_FALSE);
        }
        dispatch(setUserInfo(json.data));
        Cookies.set(ACCESS_TOKEN_KEY, json.data.token, {
          expires: values.rememberMe ? 7 : undefined,
        });
        dispatch(replace(ROUTES.home));

        return;
      }

      setErrorMessage(getErrorMessageResponse(json));
    },
    [dispatch]
  );

  return (
    <div>
      <div className="wrapper-login-page">
        <img src={logo} alt="" />
        <LoginForm onLogin={onLogin} loading={loading} errorMessage={errorMessage} />
        <p className="signup">
          Bạn chưa có tài khoản ?{' '}
          <span className="btn-signup" onClick={redirectToSignUpPage}>
            Đăng kí
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
