import { IInputFields } from '../types';

const validateRequiredFields = (inputFields: IInputFields) => {
  for (const prop in inputFields) {
    const typedProp = prop as keyof typeof inputFields;

    if (!inputFields[typedProp].value && inputFields[typedProp].required) {
      return false;
    }
  }

  return true;
};

export default validateRequiredFields;
