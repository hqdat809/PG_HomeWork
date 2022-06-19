import { API_PATHS } from 'configs/api';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'redux';

import { RESPONSE_STATUS_SUCCESS } from 'utils/httpResponseCode';
import { ILocationParams, ISignUpParams, IStateParams } from 'models/auth';
import { SignupSchema } from 'modules/auth/utils';
import { fetchThunk } from 'modules/common/redux/thunk';
import EmailField from 'modules/component/EmailField';
import NameField from 'modules/component/NameField';
import PasswordField from 'modules/component/PasswordField';
import RepeatField from 'modules/component/RepeatField';
import CityField from 'modules/component/CityField';
import GenderField from 'modules/component/GenderField';
import { GENDER_OPTIONS } from 'modules/intl/constants';
import LocationField from 'modules/component/LocationField';

export interface GroupBase<Option> {
  readonly options: readonly Option[];
  readonly label?: string;
}

interface Props {
  onSignUp(values: ISignUpParams): void;
  loading: boolean;
  errorMessage: string;
  locations: ILocationParams[];
  city: IStateParams[] | undefined;
  getCity(value: number): void;
}

const SignUpForm = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { onSignUp, loading, errorMessage, locations, getCity, city } = props;

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        repeatPassword: '',
        name: '',
        gender: '',
        region: 0,
        state: 0,
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onSignUp(values);
      }}
      validationSchema={SignupSchema}
    >
      {({ touched, errors, handleChange, values }) => {
        // Xử lý khi quốc gia thay đổi
        React.useEffect(() => {
          if (values.region) {
            if (typeof values.region === 'string') {
              values.region = parseInt(values.region);
            }
            if (values.region) {
              getCity(values.region);
            }
          }
          values.state = 0;
        }, [values.region]);

        // Xử lý khi thành phố thay đổi
        React.useEffect(() => {
          if (typeof values.state === 'string') {
            values.state = parseInt(values.state);
          }
        }, [values.state]);

        return (
          <Form
            // onSubmit={handleSubmit}
            className="row g-3 needs-validation form-login"
          >
            {!!errorMessage && (
              <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
                {errorMessage}
              </div>
            )}

            <EmailField error={errors.email} isToached={touched.email} />
            <PasswordField error={errors.password} isToached={touched.password} />
            <RepeatField error={errors.repeatPassword} isToached={touched.repeatPassword} />
            <NameField error={errors.name} isToached={touched.name} />
            <GenderField
              error={errors.gender}
              isToached={touched.gender}
              options={GENDER_OPTIONS}
              value={values.gender}
              onChange={handleChange}
            />
            <LocationField
              error={errors.region}
              isToached={touched.region}
              options={locations}
              value={values.region}
              onChange={handleChange}
            />

            <CityField
              error={errors.state}
              isToached={touched.state}
              options={city}
              value={values.state}
              onChange={handleChange}
            />

            <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
              <div className="col-md-auto">
                <button className="btn btn-primary" type="submit">
                  <FormattedMessage id="register" />
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUpForm;
