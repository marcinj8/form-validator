import axios from 'axios';

export const validator = (values: any, validationRules: any) => {
  const errors: { [key: string]: string } = {};
  for (let value in validationRules) {
    errors[value] = '';
  }

  for (let property in errors) {
    if (validationRules.hasOwnProperty(property)) {
      if (!values[property] && validationRules[property].required) {
        errors[property] = `${property} required`;
      }
      if (
        validationRules[property].min &&
        values[property].toString().length < validationRules[property].min
      ) {
        errors[
          property
        ] = `${property} should have at least ${validationRules[property].min} characters`;
      }
      if (
        validationRules[property].max &&
        values[property].toString().length > validationRules[property].max
      ) {
        errors[
          property
        ] = `${property} should have max ${validationRules[property].max} characters`;
      }
    }
  }

  return errors;
};

let lastRequestedEmail: string;
let error: string | undefined = undefined;

export const emailValidator = async (
  value: string | number,
  setSubmitting: Function
) => {
  const emailString = value.toString();
  const encodedEmail = encodeURIComponent(emailString);
  lastRequestedEmail = emailString;

  if (emailString.length === 0) {
    error = 'email required';
    return error;
  }

  let response;
  try {
    setSubmitting(true);
    response = await axios.get(`/api/email-validator.php?email=${encodedEmail}`);
  } catch (err) {
    error = 'connection error';
  }
  if (!response?.data.validation_status && lastRequestedEmail === emailString) {
    error = 'email is not valid';
  } else if (lastRequestedEmail === emailString) {
    error = undefined;
  }

  setSubmitting(false);

  return error;
};
