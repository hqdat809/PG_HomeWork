import React from 'react';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';

import 'modules/component/InputElement.css';

interface Props {
  error: string | undefined;
  isToached: boolean | undefined;
}

const RepeatField = (props: Props) => {
  const { error, isToached } = props;

  return (
    <div>
      <label htmlFor="inputEmail" className="form-label">
        <FormattedMessage id="repeatPassword" />
      </label>
      <Field
        type="password"
        name="repeatPassword"
        placeholder="Repeat Your Password"
        className={`form-control ${error && isToached && 'error-input'}`}
        id="inputEmail"
      />
      {error && isToached && <div className="input-feedback">{error}</div>}
    </div>
  );
};

export default RepeatField;
