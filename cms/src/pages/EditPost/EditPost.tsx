import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { default as ErrorComponent } from '../../components/Error';
import { default as PostComponent } from '../../components/Post';
import Loader from '../../components/Loader';
import CenteredForm from '../../components/CenteredForm';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../helpers/formatDate';
import checkMarkSVG from '../../globalAssets/checkmark.svg';
import { css } from 'styled-components';
import {
  IPost,
  IPostResponse,
  IComment,
  ICommentsResponse,
  ICommentResponse,
  IInputFields,
  IValidationError,
} from '../../types';
import fetchData from '../../api/fetchData';
import { useToken } from '../../context/Token/TokenStore';

export default function EditPost() {
  const [error, setError] = useState<null | { message: string }>(null);
  const [serverErrors, setServerErrors] = useState<IValidationError[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { postId } = useParams();

  const [token, saveToken, resetToken] = useToken();

  const [inputFields, setInputFields] = useState<IInputFields>({});

  useEffect(() => {
    if (!token) return;
    setIsLoading(true);

    fetchData<IPostResponse>(
      `https://warm-falls-56358.herokuapp.com/api/author/posts/${postId}`,
      {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      () => {
        throw new Error('Cannot fetch post data');
      },
      () => {
        throw new Error('Post not found');
      },
    )
      .then((result) => {
        if (!result.success) return;

        const post = result.blogPost;

        if (post) {
          setIsLoading(false);
        }

        setInputFields({
          title: {
            value: post.title,
            label: 'Post title',
            required: true,
            type: 'text',
          },
          text: {
            value: post.text,
            label: 'Text',
            required: true,
            type: 'textarea',
          },
          shouldPublish: {
            value: post.datePublished ? 'on' : '',
            label: 'Publish',
            required: false,
            type: 'checkbox',
            attributes: { checked: post.datePublished ? true : false },
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

                background: url(${checkMarkSVG});
              }

              & input[type='checkbox']:checked {
                background: url(${checkMarkSVG}) no-repeat;
                background-position: center;
              }
            `,
          },
        });
      })
      .catch((err) => {
        setError(err);
      });
  }, [postId, token]);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
    }
  }, [token]);

  const navigate = useNavigate();

  const handleSubmit = () => {
    fetchData<IPostResponse>(
      `https://warm-falls-56358.herokuapp.com/api/posts/${postId}`,
      {
        mode: 'cors',
        method: 'PUT',
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

          setServerErrors(data.errors);
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
  } else if (isLoading) {
    return <Loader />;
  } else if (error) {
    return <ErrorComponent message={error.message} />;
  } else
    return (
      <>
        <CenteredForm
          inputFields={inputFields}
          onChange={(field, value) => {
            if (inputFields[field].type === 'checkbox') {
              setInputFields((prevState) => ({
                ...prevState,
                [field]: {
                  ...prevState[field],
                  value: value,
                  attributes: {
                    ...prevState[field].attributes,
                    checked: value === 'on' ? true : false,
                  },
                },
              }));
            } else {
              setInputFields((prevState) => ({
                ...prevState,
                [field]: {
                  ...prevState[field],
                  value: value,
                },
              }));
            }
          }}
          onSubmit={handleSubmit}
          heading="Edit"
          submitButtonName="Update"
          externalErrors={serverErrors.map((err) => err.msg)}
        />
      </>
    );
}
