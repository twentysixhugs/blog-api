import React, { useState } from 'react';
import { IInputFields } from '../../types';
import resetInputFields from '../../helpers/resetInputFields';
import CenteredForm from '../../components/CenteredForm';

export default function AdminSignup() {
  const [inputFields, setInputFields] = useState<IInputFields>({
    username: {
      value: '',
      required: false,
      label: 'Username',
      type: 'text',
    },
    password: {
      value: '',
      required: true,
      label: 'Password',
      type: 'password',
    },
    passwordConfirm: {
      value: '',
      required: true,
      label: 'Confirm password',
      type: 'password',
    },
    adminKey: {
      value: '',
      required: true,
      label: 'Admin key',
      type: 'password',
    },
  });

  const handleSubmit = () => {
    // TODO Send to the server
    console.log(inputFields);

    setInputFields(resetInputFields(inputFields));
  };

  return (
    <>
      <CenteredForm
        inputFields={inputFields}
        onChange={(field, value) => {
          setInputFields({
            ...inputFields,
            [field]: {
              ...inputFields[field],
              value: value,
            },
          });
        }}
        onSubmit={handleSubmit}
      ></CenteredForm>
    </>
  );
}
