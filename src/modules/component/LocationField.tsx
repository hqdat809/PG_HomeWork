import React, { useEffect } from 'react';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';

import 'modules/component/InputElement.css';
import { ILocationParams } from 'models/auth';

interface Props {
  error: string | undefined;
  isToached: boolean | undefined;
  options: ILocationParams[];
  value: number | undefined;
  onChange(e: React.ChangeEvent<any>): void;
}

const LocationField = (props: Props) => {
  const { error, isToached, options, onChange, value } = props;

  return (
    <div>
      <label htmlFor="inputEmail" className="form-label">
        <FormattedMessage id="region" />
      </label>
      <Field
        as="select"
        className="form-control"
        name="region"
        value={value ? value : null}
        onChange={onChange}
      >
        <option value="" disabled selected>
          --Select your option--
        </option>
        {options &&
          options.map((item: ILocationParams, index) => {
            return (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            );
          })}
      </Field>
      {error && isToached && <div className="input-feedback">{error}</div>}
    </div>
  );
};

export default LocationField;
