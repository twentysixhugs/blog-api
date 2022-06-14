import React, { useState } from 'react';
import {
  IAuthResponse,
  IInputFields,
  IValidationError,
  IAuthError,
} from '../../types';
import resetInputFields from '../../helpers/resetInputFields';
import CenteredForm from '../../components/CenteredForm';
import fetchData from '../../api/fetchData';
import Loader from '../../components/Loader';
import { default as ErrorComponent } from '../../components/Error';
import { Navigate } from 'react-router-dom';
import { useToken } from '../../context/Token/TokenStore';

export default function Signup() {
  const [inputFields, setInputFields] = useState<IInputFields>({
    username: {
      value: '',
      required: true,
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
  });

  const [error, setError] = useState<null | { message: string }>(null);
  const [serverErrors, setServerErrors] = useState<
    IValidationError[] | IAuthError[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authResult, setAuthResult] = useState<
    'success' | 'failure' | null
  >(null);

  const [token, saveToken, resetToken] = useToken();

  const handleSubmit = async () => {
    setIsLoading(true);

    fetchData<IAuthResponse>(
      'http://localhost:3000/api/signup',
      {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({
          username: inputFields.username.value,
          password: inputFields.password.value,
          passwordConfirm: inputFields.passwordConfirm.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
      () => {
        throw new Error('Something went wrong when logging in');
      },
      () => {
        throw new Error('Not found');
      },
    )
      .then((data) => {
        data;
        if (data.success) {
          saveToken(data.token);
          setAuthResult('success');
          setInputFields(resetInputFields(inputFields));
        } else if (data.errors) {
          setAuthResult('failure');
          setServerErrors(data.errors.errors || []);
        }
      })
      .catch((err) => {
        setError(err);
        setInputFields(resetInputFields(inputFields));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (error) {
    return <ErrorComponent message={error.message} />;
  } else if (isLoading) {
    return <Loader />;
  } else if (authResult === 'success' && token) {
    return <Navigate to="/" />;
  } else if (authResult === 'failure') {
    return (
      <>
        <CenteredForm
          inputFields={inputFields}
          heading="Sign up"
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
          externalErrors={serverErrors.map((err) => err.msg)}
        ></CenteredForm>
      </>
    );
  } else if (!token) {
    return (
      <>
        <CenteredForm
          inputFields={inputFields}
          heading="Sign up"
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
  } else {
    return <Navigate to="/" />;
  }
}
