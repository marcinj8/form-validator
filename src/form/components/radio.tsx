import React, { useId } from 'react';
import { Field } from 'formik';

import '../style/input.styles.scss';

interface InputData {
  type: 'radio';
  name: string;
  value: string | number;
  options: Array<{ name: string; value: string }>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
}

export const Radio: React.FC<InputData> = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  options,
  label,
}) => {
  const optionsList = options.map((option) => (
    <option key={option.value} value={option.value}>
      {option.name}
    </option>
  ));
  const inputId = useId();
  const onChangeHandler = (e: any) => {
    onBlur(e);
    onChange(e);
  };
  return (
    <div className='input__container--default'>
      {label && (
        <label className='input__label--default' htmlFor={inputId}>
          {label}
        </label>
      )}
      <Field
        className='input__field--default'
        style={{
          border: '2px solid black',
        }}
        as='select'
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlur}
      >
        {optionsList}
      </Field>
    </div>
  );
};
