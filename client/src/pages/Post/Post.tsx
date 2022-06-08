import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { default as ErrorComponent } from '../../components/Error';
import { default as PostComponent } from '../../components/Post';
import { formatDate } from '../../components/helpers/formatDate';
import Loader from '../../components/Loader';
import { IPost, IPostResponse } from '../../types';
import fetchData from '../../api/fetchData';

export default function Post() {
  const [currentPost, setCurrentPost] = useState<null | IPost>();
  const [error, setError] = useState<null | { message: string }>(null);

  const { postId } = useParams();

  useEffect(() => {
    fetchData<IPostResponse>(
      `http://localhost:3000/api/posts/${postId}`,
      () => {
        throw new Error('Cannot fetch post data');
      },
      () => {
        throw new Error('Post not found');
      },
    )
      .then((data) => {
        const post: IPost = {
          ...data.blogPost,
          url: `/posts/${data.blogPost._id}`,
          datePublishedFormatted: formatDate(data.blogPost.datePublished),
        };
        setCurrentPost(post);
      })
      .catch((err) => {
        setError(err);
      });
  }, [postId]);

  if (error) {
    return <ErrorComponent message={error.message} />;
  } else if (!currentPost) {
    return (
      <div className="c-post">
        <Loader />
      </div>
    );
  } else {
    return (
      <PostComponent
        author={currentPost.author.username}
        date={currentPost.datePublishedFormatted}
        title={currentPost.title}
        text={currentPost.text}
      />
    );
  }
}
