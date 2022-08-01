import { emailValidator } from './validation';

export interface ValidationRules {
  required: boolean;
  min?: number;
  max?: number;
}

interface InputData {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  validate?: (
    e: string | number,
    setSubmitting: Function
  ) => Promise<string | undefined>;
  validationRules?: ValidationRules;
}

export interface InputsData extends Array<InputData> {}

export const inputsData: InputsData = [
  {
    type: 'text',
    name: 'name',
    label: 'name',
    validationRules: { required: true, min: 3, max: 10 },
  },
  {
    type: 'text',
    name: 'surname',
    label: 'surname',
    validationRules: { required: false, max: 10 },
  },
  {
    type: 'email',
    name: 'email',
    label: 'email',
    validate: emailValidator,
  },
  {
    label: 'sex',
    type: 'radio',
    name: 'sex',
  },
  {
    type: 'date',
    name: 'date',
    label: 'date',
    validationRules: { required: true },
    min: '1990-01-01',
    max: '2021-12-31',
  },
];

export const createInitialValues = () => {
  let formInitialValues: { [key: string]: string } = {};
  for (let value of inputsData as InputsData) {
    formInitialValues[value.name] = '';
  }
  return formInitialValues;
};

export const createValidationRules = () => {
  let rules: { [key: string]: ValidationRules } = {};
  for (let value of inputsData as InputsData) {
    if (!value.validationRules) {
      continue;
    }
    rules[value.name] = value.validationRules;
  }
  return rules;
};
