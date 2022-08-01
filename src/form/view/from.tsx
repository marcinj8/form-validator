import React from 'react';
import { Formik } from 'formik';

import { Input } from '../components/input';
import { Radio } from '../components/radio';
import { validator } from '../data/validation';
import {
  createInitialValues,
  createValidationRules,
  inputsData,
} from '../data/inputsData';

import '../style/form.styles.scss';

export const Form: React.FC = () => {
  const formInitialValues = createInitialValues();
  const validationRules = createValidationRules();
  const handleSubmit = (e: any, values: any) => {
    e.preventDefault();
    alert(JSON.stringify(values));
  };

  return (
    <div>
      <Formik
        initialValues={formInitialValues}
        validate={(values) => validator(values, validationRules)}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          setSubmitting,
          handleChange,
          handleBlur,
        }) => (
          <form
            className='form__container'
            onSubmit={(e) => handleSubmit(e, values)}
          >
            {inputsData.map((input) => {
              if (input.type === 'radio') {
                return (
                  <Radio
                    type={input.type}
                    name={input.name}
                    key={input.name}
                    placeholder={input.placeholder}
                    label={input.label}
                    value={values[input.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={[
                      { name: 'male', value: 'male' },
                      { name: 'female', value: 'female' },
                    ]}
                  />
                );
              } else {
                return (
                  <Input
                    type={input.type}
                    name={input.name}
                    key={input.name}
                    placeholder={input.placeholder}
                    label={input.label}
                    value={values[input.name]}
                    touched={touched[input.name]}
                    error={errors[input.name]}
                    setSubmitting={setSubmitting}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    validate={input.validate ? input.validate : null}
                  />
                );
              }
            })}
            {isSubmitting && <div className='form__spinner'>loading...</div>}
            <button
              className='form__button--default'
              type='submit'
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};
