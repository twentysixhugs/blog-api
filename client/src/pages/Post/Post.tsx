import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Error from '../../components/Error';
import { formatDate } from '../../components/helpers/formatDate';
import Loader from '../../components/Loader';
import { IPost, IPostResponse } from '../../types';

export default function Post() {
  const [currentPost, setCurrentPost] = useState<null | IPost>();
  const [isError, setIsError] = useState(false);

  const { postId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/posts/${postId}`,
        );

        const data: IPostResponse = await res.json();

        const post: IPost = {
          ...data.blogPost,
          url: `/posts/${data.blogPost._id}`,
          datePublishedFormatted: formatDate(data.blogPost.datePublished),
        };

        setCurrentPost(post);
      } catch (err) {
        setIsError(true);
      }
    }

    fetchData().then(() => {
      setIsError(false);
    });
  }, [postId]);

  if (!currentPost) {
    return (
      <div className="c-post">
        <Loader />
      </div>
    );
  } else if (isError) {
    return <Error message="Cannot fetch post data" />;
  } else {
    return (
      <div className="c-post">
        <img className="c-post__image" src={currentPost.previewUrl}></img>
        <span className="c-post__author">
          {currentPost.author.username}
        </span>
        <span className="c-post__date">
          {currentPost.datePublishedFormatted}
        </span>
        <h1 className="c-post__title">{currentPost.title}</h1>
        <p className="c-post__text">{currentPost.text}</p>
      </div>
    );
  }
}
