import React, { useId } from 'react';
import { Field } from 'formik';

import '../style/input.styles.scss';

interface InputData {
  type: string;
  name: string;
  value: string | number;
  error: any;
  touched: boolean | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validate: Function | null;
  placeholder?: string;
  min?: string;
  max?: string;
  label?: string;
  setSubmitting?: Function;
}

export const Input: React.FC<InputData> = ({
  type,
  name,
  value,
  placeholder,
  min,
  max,
  label,
  error,
  touched,
  setSubmitting,
  onChange,
  onBlur,
  validate,
}) => {
  const inputId = useId();
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          border:
            error && touched
              ? '2px solid red'
              : touched
              ? '2px solid green'
              : '2px solid black',
        }}
        id={inputId}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        min={min}
        max={max}
        onChange={onChangeHandler}
        onBlur={onBlur}
        validate={
          validate !== null
            ? (e: string | number) => validate(e, setSubmitting)
            : null
        }
      />
      {error && touched && <div className='input__error--default'>{error}</div>}
    </div>
  );
};
