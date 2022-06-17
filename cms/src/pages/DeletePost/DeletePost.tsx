import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useToken } from '../../context/Token/TokenStore';
import fetchData from '../../api/fetchData';
import { APIResponse } from '../../types';
import { default as ErrorComponent } from '../../components/Error';
import Loader from '../../components/Loader';
import Success from '../../components/Success';

export default function DeletePost() {
  const { postId } = useParams();
  const [token, saveToken, resetToken] = useToken();
  const [error, setError] = useState<null | { message: string }>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData<APIResponse>(
      `https://warm-falls-56358.herokuapp.com/api/author/posts/${postId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      () => {
        throw new Error('Something went wrong when deleting a post');
      },
      () => {
        throw new Error('Post is not found');
      },
    )
      .then((data) => {
        if (data.success) {
          return <Navigate to="/" />;
        } else {
          throw new Error('Something went wrong when deleting a post');
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token, postId]);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" />;
  } else if (error) {
    return <ErrorComponent message={error.message} />;
  } else if (isLoading) {
    return <Loader />;
  } else {
    return <Success message="You have successfully deleted the post" />;
  }
}
