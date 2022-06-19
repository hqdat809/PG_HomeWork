import { Field } from 'formik';
import { IGenderParams } from 'models/auth';
import { FormattedMessage } from 'react-intl';
import React from 'react';

import 'modules/component/InputElement.css';

interface Props {
  error: string | undefined;
  isToached: boolean | undefined;
  options: IGenderParams[];
  value: string;
  onChange(e: React.ChangeEvent<any>): void;
}

const GenderField = (props: Props) => {
  const { error, isToached, options, value, onChange } = props;

  return (
    <div>
      <label htmlFor="inputEmail" className="form-label">
        <FormattedMessage id="gender" />
      </label>
      <Field as="select" className="form-control" name="gender" value={value} onChange={onChange}>
        <option value="" disabled selected>
          --Select your option--
        </option>
        {options &&
          options.map((item: IGenderParams, index) => {
            return (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            );
          })}
      </Field>
      {error && isToached && <div className="input-feedback">{error}</div>}
    </div>
  );
};

export default GenderField;
