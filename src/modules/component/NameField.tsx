import React from 'react';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';

import 'modules/component/InputElement.css';

interface Props {
  error: string | undefined;
  isToached: boolean | undefined;
}

const NameField = (props: Props) => {
  const { error, isToached } = props;

  return (
    <div>
      <label htmlFor="inputEmail" className="form-label">
        <FormattedMessage id="fullName" />
      </label>
      <Field
        type="text"
        name="name"
        placeholder="Enter your full name"
        className={`form-control ${error && isToached && 'error-input'}`}
        id="inputName"
      />
      {error && isToached && <div className="input-feedback">{error}</div>}
    </div>
  );
};

export default NameField;
