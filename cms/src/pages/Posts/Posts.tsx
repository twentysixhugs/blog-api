import { useState, useEffect } from 'react';
import { IPost, IPostsCountResponse, IPostsResponse } from '../../types';
import { formatDate } from '../../helpers/formatDate';
import PostsOverview from '../../components/PostsOverview/';
import PostsPagination from '../../components/PostsPagination';
import Loader from '../../components/Loader';
import { default as ErrorComponent } from '../../components/Error';
import fetchData from '../../api/fetchData';
import { Navigate } from 'react-router-dom';
import { useToken } from '../../context/Token/TokenStore';

export default function Posts() {
  const [posts, setPosts] = useState<null | IPost[]>(null);
  const [error, setError] = useState<null | { message: string }>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const POSTS_PER_PAGE = 7;

  const [token, saveToken, resetToken] = useToken();

  useEffect(() => {
    if (!token) return;
    setIsLoading(true);

    fetchData<IPostsCountResponse>(
      `http://localhost:3000/api/author/posts/count`,
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
        throw new Error('Posts not found');
      },
    )
      .then((data) => {
        setPageCount(Math.ceil(data.blogPostsCount / POSTS_PER_PAGE));
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [token]);

  useEffect(() => {
    if (!token) return;

    fetchData<IPostsResponse>(
      `http://localhost:3000/api/posts/author?perpage=${POSTS_PER_PAGE}&page=${currentPage}`,
      {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      () => {
        throw new Error('Cannot fetch posts data');
      },
      () => {
        throw new Error('Posts not found');
      },
    )
      .then((data) => {
        const blogPosts: IPost[] = data.blogPosts.map((post) => ({
          ...post,
          datePublishedFormatted:
            post.datePublished && formatDate(post.datePublished),
          url: `/author/posts/${post._id}`,
        }));
        setPosts(blogPosts);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [currentPage, token]);

  useEffect(() => {
    if (posts || !token) {
      setIsLoading(false);
    }
  }, [posts, token]);

  const handlePageChange = (event: { selected: number }) => {
    setTimeout(() => {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }, 200);
    setCurrentPage(event.selected);
  };

  if (error) {
    return <ErrorComponent message={error.message} />;
  } else if (isLoading) {
    return <Loader />;
  } else if (!token) {
    return <Navigate to="/login"></Navigate>;
  } else if (posts) {
    return (
      <>
        <PostsOverview posts={posts}>
          {posts.length > 0 && (
            <PostsPagination
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageChange}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="<"
            />
          )}
        </PostsOverview>
      </>
    );
  } else {
    return null;
  }
}
