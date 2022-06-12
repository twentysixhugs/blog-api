import React, { useState } from 'react';
import { IInputFields } from '../../types';
import Form from '../../components/Form';
import validateRequiredFields from '../../helpers/validateRequiredFields';
import resetInputFields from '../../helpers/resetInputFields';

export default function AdminSignup() {
  const [inputFields, setInputFields] = useState<IInputFields>({
    username: {
      value: '',
      required: false,
      label: 'Username',
    },
    password: {
      value: '',
      required: true,
      label: 'Password',
    },
    adminKey: {
      value: '',
      required: true,
      label: 'Admin key',
    },
  });

  const handleSubmit = () => {
    // TODO Send to the server
    console.log(inputFields);

    setInputFields(resetInputFields(inputFields));
  };

  return (
    <>
      <Form
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
      ></Form>
    </>
  );
}
