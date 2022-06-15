import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { default as ErrorComponent } from '../../components/Error';
import { default as PostComponent } from '../../components/Post';
import { formatDate } from '../../helpers/formatDate';
import Loader from '../../components/Loader';
import {
  IPost,
  IPostResponse,
  IComment,
  ICommentsResponse,
  ICommentResponse,
} from '../../types';
import fetchData from '../../api/fetchData';
import { useToken } from '../../context/Token/TokenStore';

export default function Post() {
  const [currentPost, setCurrentPost] = useState<null | IPost>();
  const [currentPostComments, setCurrentPostComments] = useState<
    IComment[] | null
  >(null);
  const [error, setError] = useState<null | { message: string }>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { postId } = useParams();

  const [token, saveToken, resetToken] = useToken();

  useEffect(() => {
    if (!token) return;
    setIsLoading(true);

    Promise.all([
      fetchData<IPostResponse>(
        `http://localhost:3000/api/author/posts/${postId}`,
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
      ),
      fetchData<ICommentsResponse>(
        `http://localhost:3000/api/author/posts/${postId}/comments`,
        {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
        () => {
          throw new Error('Cannot fetch comments data');
        },
        () => {
          throw new Error('Post not found');
        },
      ),
    ])
      .then((results) => {
        if (!results[0].success || !results[1].success) return;

        const postFetchResult = results[0];
        const commentsFetchResult = results[1];

        const post: IPost = {
          ...postFetchResult.blogPost,
          url: `/author/posts/${postFetchResult.blogPost!._id}`,
          datePublishedFormatted:
            postFetchResult.blogPost!.datePublished &&
            formatDate(postFetchResult.blogPost!.datePublished),
        };

        setCurrentPost(post);

        const comments: IComment[] = commentsFetchResult.comments.map(
          (comment) => {
            const processedComment = {
              ...comment,
              dateFormatted: formatDate(comment.date),
            };

            return processedComment;
          },
        );

        setCurrentPostComments(comments);
      })
      .catch((err) => {
        setError(err);
      });
  }, [postId, token]);

  useEffect(() => {
    if ((currentPost && currentPostComments) || !token) {
      setIsLoading(false);
    }
  }, [currentPost, currentPostComments, token]);

  const handleNewComment = async (author: string, text: string) => {
    try {
      const commentCreationResult = await fetchData<ICommentResponse>(
        `http://localhost:3000/api/posts/${postId}/comments/new`,
        {
          mode: 'cors',
          method: 'POST',
          body: JSON.stringify({ author, text }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
        () => {
          throw new Error('Something went wrong, cannot add a comment');
        },
        () => {
          throw new Error(
            'The post you are trying to add a comment for is not found. Are you a hacker?',
          );
        },
      );

      if (commentCreationResult.success) {
        const processedComment = {
          ...commentCreationResult.comment,
          dateFormatted: formatDate(commentCreationResult.comment.date),
        };
        setCurrentPostComments(
          currentPostComments && [
            processedComment,
            ...currentPostComments,
          ],
        );
      }
    } catch (err) {
      setError(err as { message: string });
    }
  };

  const handleCommentDelete = (id: string) => {
    fetchData<ICommentResponse>(
      `http://localhost:3000/api/author/posts/${postId}/comments/${id}`,
      {
        mode: 'cors',
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
      () => {
        throw new Error('Something went wrong, cannot delete a comment');
      },
      () => {
        throw new Error(
          'The post you are trying to delete a comment from is not found. Are you a hacker?',
        );
      },
    )
      .then((data) => {
        if (!data.success) {
          throw new Error('Something went wrong, cannot delete a comment');
        } else {
          setCurrentPostComments(
            currentPostComments && [
              ...currentPostComments.filter(
                (comment) => comment._id !== id,
              ),
            ],
          );
        }
      })
      .catch((err) => {
        setError(err as { message: string });
      });
  };

  if (error) {
    return <ErrorComponent message={error.message} />;
  } else if (isLoading) {
    return <Loader />;
  } else if (!token) {
    return <Navigate to="/login" />;
  } else if (currentPost && currentPostComments) {
    return (
      <>
        <PostComponent
          author={currentPost.author.username}
          date={currentPost.datePublishedFormatted}
          title={currentPost.title}
          text={currentPost.text}
          contentUrl={currentPost.url}
          comments={currentPostComments}
          onNewComment={handleNewComment}
          onCommentDelete={handleCommentDelete}
        />
      </>
    );
  } else {
    return null;
  }
}
