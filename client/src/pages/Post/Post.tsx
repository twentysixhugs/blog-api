import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

export default function Post() {
  const [currentPost, setCurrentPost] = useState<null | IPost>();
  const [currentPostComments, setCurrentPostComments] = useState<
    IComment[] | null
  >(null);
  const [error, setError] = useState<null | { message: string }>(null);

  const { postId } = useParams();

  useEffect(() => {
    Promise.all([
      fetchData<IPostResponse>(
        `http://localhost:3000/api/posts/${postId}`,
        { mode: 'cors' },
        () => {
          throw new Error('Cannot fetch post data');
        },
        () => {
          throw new Error('Post not found');
        },
      ),
      fetchData<ICommentsResponse>(
        `http://localhost:3000/api/posts/${postId}/comments`,
        { mode: 'cors' },
        () => {
          throw new Error('Cannot fetch comments data');
        },
        () => {
          throw new Error('Post not found');
        },
      ),
    ])
      .then((results) => {
        const postFetchResult = results[0];
        const commentsFetchResult = results[1];

        const post: IPost = {
          ...postFetchResult.blogPost,
          url: `/posts/${postFetchResult.blogPost._id}`,
          datePublishedFormatted: formatDate(
            postFetchResult.blogPost.datePublished,
          ),
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
  }, [postId]);

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

  if (error) {
    return <ErrorComponent message={error.message} />;
  } else if (!currentPost || !currentPostComments) {
    return (
      <div className="c-post">
        <Loader />
      </div>
    );
  } else {
    return (
      <>
        <PostComponent
          author={currentPost.author.username}
          date={currentPost.datePublishedFormatted}
          title={currentPost.title}
          text={currentPost.text}
          comments={currentPostComments}
          onNewComment={handleNewComment}
        />
      </>
    );
  }
}
