import React from 'react';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';

import 'modules/component/InputElement.css';
import { ILocationParams, IStateParams } from 'models/auth';

interface Props {
  error: string | undefined;
  isToached: boolean | undefined;
  options: IStateParams[] | undefined;
  value: number | undefined;
  onChange(e: React.ChangeEvent<any>): void;
}

const CityField = (props: Props) => {
  const { error, isToached, options, value, onChange } = props;

  return (
    <div>
      <label htmlFor="inputEmail" className="form-label">
        <FormattedMessage id="city" />
      </label>
      <Field
        as="select"
        className="form-control"
        name="state"
        value={value ? value : null}
        onChange={onChange}
      >
        <option value="" disabled selected={value ? false : true}>
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

export default CityField;
