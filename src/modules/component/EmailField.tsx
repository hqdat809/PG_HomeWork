import React from 'react';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';

import 'modules/component/InputElement.css';

interface Props {
  error: string | undefined;
  isToached: boolean | undefined;
}

const EmailField = (props: Props) => {
  const { error, isToached } = props;

  return (
    <div>
      <label htmlFor="inputEmail" className="form-label">
        <FormattedMessage id="email" />
      </label>
      <Field
        type="email"
        name="email"
        placeholder="Enter your email"
        className={`form-control ${error && isToached && 'error-input'}`}
        id="inputEmail"
      />
      {error && isToached && <div className="input-feedback">{error}</div>}
    </div>
  );
};

export default EmailField;
