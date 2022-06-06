import { useState, useEffect } from 'react';
import { IPost, IPostsResponse } from '../../types';
import { formatDate } from '../../components/helpers/formatDate';
import PostsOverview from './PostsOverview';
import Loader from '../../components/Loader';
import { default as ErrorComponent } from '../../components/Error';

export default function Posts() {
  const [posts, setPosts] = useState<null | IPost[]>(null);
  const [error, setError] = useState<null | { message: string }>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          'http://localhost:3000/api/posts?perpage=7&page=0',
          { mode: 'cors' },
        );

        if (!res.ok) {
          if (res.status === 404) {
            setError({ message: 'Post not found' });
          } else {
            throw new Error('Cannot fetch post data');
          }
        }

        const data: IPostsResponse = await res.json();

        const blogPosts: IPost[] = data.blogPosts.map((post) => ({
          ...post,
          datePublishedFormatted: formatDate(post.datePublished!),
          url: `/posts/${post._id}`,
        }));

        setPosts(blogPosts);
      } catch (err) {
        setError({ message: 'Cannot fetch blog posts data' });
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <ErrorComponent message={error.message} />;
  } else if (!posts) {
    return <Loader />;
  } else {
    return <PostsOverview posts={posts} />;
  }
}
