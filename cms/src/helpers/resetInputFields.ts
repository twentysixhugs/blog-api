import { IInputFields } from '../types';

export default function resetInputFields(inputFields: IInputFields) {
  const resetInputFields = { ...inputFields };

  for (const prop in inputFields) {
    const typedProp = prop as keyof typeof inputFields;

    resetInputFields[typedProp] = {
      ...inputFields[typedProp],
      value: '',
    };
  }

  return { ...resetInputFields };
}
