import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from 'redux/reducer';
import { RESPONSE_STATUS_SUCCESS } from 'utils/httpResponseCode';
import { API_PATHS } from 'configs/api';
import { ROUTES } from 'configs/routes';
import { replace } from 'connected-react-router';
import logo from 'logo-420-x-108.png';
import { ISignUpParams, IStateParams } from 'models/auth';
import SignUpForm from 'modules/auth/components/SignUpForm';
import 'modules/auth/pages/SignUpPage.css';
import { fetchThunk } from 'modules/common/redux/thunk';

const SignUpPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [locations, setLocations] = useState([]);
  const [city, setCity] = useState<IStateParams[] | undefined>([]);

  const getCity = React.useCallback(async (pid: number) => {
    const json = await dispatch(fetchThunk(`${API_PATHS.getLocation}?pid=${pid}`, 'get'));

    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      setCity(json.data);
      return;
    }
  }, []);

  const getLocation = React.useCallback(async () => {
    setLoading(true);

    const json = await dispatch(fetchThunk(API_PATHS.getLocation, 'get'));

    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      setLocations(json.data);
      return;
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  const onSignUp = async (values: ISignUpParams) => {
    setErrorMessage('');
    setLoading(true);

    const json = await dispatch(fetchThunk(API_PATHS.signUp, 'post', values));

    setLoading(false);

    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      console.log(json);
      alert('Chúc mùng bạn đã đăng kí thành công');
      dispatch(replace(ROUTES.login));
    }

    setErrorMessage(json.message);
  };

  return (
    <div>
      <div className="wrapper-signup-page">
        <img src={logo} alt="" />
        <SignUpForm
          onSignUp={onSignUp}
          loading={loading}
          errorMessage={errorMessage}
          locations={locations}
          getCity={getCity}
          city={city}
        />
      </div>
    </div>
  );
};

export default SignUpPage;
