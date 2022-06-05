import { useState, useEffect } from 'react';
import { IPost, IPostAPI } from '../../types';
import { formatDate } from '../helpers/formatDate';
import PostsOverview from './PostsOverview';

export default function Posts() {
  const [posts, setPosts] = useState<null | IPost[]>(null);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          'http://localhost:3000/api/posts?perpage=7&page=0',
          { mode: 'cors' },
        );

        const data = await res.json();

        const blogPosts: IPost[] = (data.blogPosts as IPostAPI[]).map(
          (post) => ({
            ...post,
            datePublishedFormatted: formatDate(post.datePublished!),
            url: `/posts/${post._id}`,
          }),
        );

        setPosts(blogPosts);
      } catch (err) {
        setIsError(true);
      }
    }

    fetchData().then(() => {
      setIsError(false);
    });
  }, []);
  // TODO: Refactor with loading HOC
  return <>{posts && <PostsOverview posts={posts} />}</>;
}
