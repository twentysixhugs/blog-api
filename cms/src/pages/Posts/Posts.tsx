import { useState, useEffect } from 'react';
import { IPost, IPostsCountResponse, IPostsResponse } from '../../types';
import { formatDate } from '../../helpers/formatDate';
import PostsOverview from '../../components/PostsOverview/';
import PostsOverviewSwitch from '../../components/PostsOverviewSwitch';
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
  const [postsTypeToFetch, setPostsTypeToFetch] = useState<
    'published' | 'unpublished'
  >('published');

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const POSTS_PER_PAGE = 7;

  const [token, saveToken, resetToken] = useToken();

  useEffect(() => {
    if (!token) return;
    setIsLoading(true);

    fetchData<IPostsCountResponse>(
      `https://warm-falls-56358.herokuapp.com/api/author/posts/count?type=${postsTypeToFetch}`,
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
  }, [token, postsTypeToFetch]);

  useEffect(() => {
    if (!token) return;

    fetchData<IPostsResponse>(
      `https://warm-falls-56358.herokuapp.com/api/posts/author?perpage=${POSTS_PER_PAGE}&page=${currentPage}&type=${postsTypeToFetch}`,
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
  }, [currentPage, token, postsTypeToFetch]);

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

  // toggle between published and unpublished posts
  const handleOverviewSwitch = (switchTo: 'published' | 'unpublished') => {
    setPostsTypeToFetch(switchTo);
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
        <PostsOverview
          posts={posts}
          pagination={
            <PostsPagination
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageChange}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="<"
            />
          }
        >
          <PostsOverviewSwitch
            onChange={handleOverviewSwitch}
            selected={postsTypeToFetch}
          />
        </PostsOverview>
      </>
    );
  } else {
    return null;
  }
}
