import { useState, useEffect } from 'react';
import { IPost, IPostsResponse } from '../../types';
import { formatDate } from '../../components/helpers/formatDate';
import PostsOverview from './PostsOverview';

export default function Posts() {
  const [posts, setPosts] = useState<null | IPost[]>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          'http://localhost:3000/api/posts?perpage=7&page=0',
          { mode: 'cors' },
        );

        const data: IPostsResponse = await res.json();

        const blogPosts: IPost[] = data.blogPosts.map((post) => ({
          ...post,
          datePublishedFormatted: formatDate(post.datePublished!),
          url: `/posts/${post._id}`,
        }));

        setPosts(blogPosts);
      } catch (err) {
        setIsError(true);
      }
    }

    fetchData().then(() => {
      setIsError(false);
    });
  }, []);

  return <>{posts && <PostsOverview posts={posts} />}</>;
}
