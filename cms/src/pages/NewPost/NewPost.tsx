import CenteredForm from '../../components/CenteredForm';
import {
  IInputFields,
  IPostResponse,
  IValidationError,
} from '../../types';
import { useEffect, useState } from 'react';
import { useToken } from '../../context/Token/TokenStore';
import { Navigate, useNavigate } from 'react-router-dom';
import { css } from 'styled-components';
import checkMarkSVG from '../../globalAssets/checkmark.svg';
import fetchData from '../../api/fetchData';
import { default as ErrorComponent } from '../../components/Error';

export default function NewPost() {
  const [inputFields, setInputFields] = useState<IInputFields>({
    title: {
      value: '',
      label: 'Post title',
      required: true,
      type: 'text',
    },
    text: {
      value: '',
      label: 'Text',
      required: true,
      type: 'textarea',
    },
    shouldPublish: {
      value: '',
      label: 'Publish',
      required: false,
      type: 'checkbox',
      css: css`
        flex-flow: row-reverse;
        align-items: center;

        & input[type='checkbox'] {
          appearance: none;
          height: 40px;
          width: 40px;
          transform: scale(0.75);
          cursor: pointer;
        }

        & input[type='checkbox']:checked {
          position: relative;

          height: 40px;
          width: 40px;
          transform: scale(0.75);

          appearance: none;
          outline: none;

          background: url(${checkMarkSVG}) no-repeat;
          background-position: center;
        }
      `,
    },
  });

  const [error, setError] = useState<null | { message: string }>(null);

  const [serverErrors, setServerErrors] = useState<IValidationError[]>([]);

  const [token, saveToken, resetToken] = useToken();

  const navigate = useNavigate();

  const handleSubmit = () => {
    fetchData<IPostResponse>(
      'http://localhost:3000/api/posts/new',
      {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({
          title: inputFields['title'].value,
          text: inputFields['text'].value,
          shouldPublish: inputFields['shouldPublish'].value,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
      () => {
        throw new Error('Something went wrong when creating a post');
      },
      () => {
        throw new Error('Resource not found');
      },
    )
      .then((data) => {
        if (data.success) {
          return navigate(`/author/posts/${data.blogPost._id}`);
        } else if (data.errors) {
          console.log(data.errors);
          setServerErrors(data.errors.errors);
        } else {
          setError({
            message: 'Something went wrong when creating a post',
          });
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (error) {
    return <ErrorComponent message={error.message} />;
  }

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
        heading="New post"
        submitButtonName="Create"
        externalErrors={serverErrors.map((err) => err.msg)}
      />
    </>
  );
}
