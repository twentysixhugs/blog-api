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

export default function Login() {
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
      'https://warm-falls-56358.herokuapp.com/api/login',
      {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({
          username: inputFields.username.value,
          password: inputFields.password.value,
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
          setServerErrors(data.errors);
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
          heading="Log in"
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
          heading="Log in"
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
