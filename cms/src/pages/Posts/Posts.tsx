import { useState, useEffect } from 'react';
import { IPost, IPostsCountResponse, IPostsResponse } from '../../types';
import { formatDate } from '../../components/helpers/formatDate';
import PostsOverview from '../../components/PostsOverview/';
import PostsPagination from '../../components/PostsPagination';
import Loader from '../../components/Loader';
import { default as ErrorComponent } from '../../components/Error';
import fetchData from '../../api/fetchData';

export default function Posts() {
  const [posts, setPosts] = useState<null | IPost[]>(null);
  const [error, setError] = useState<null | { message: string }>(null);

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const POSTS_PER_PAGE = 7;

  useEffect(() => {
    fetchData<IPostsCountResponse>(
      `http://localhost:3000/api/author/posts/count`,
      {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmE0OGRlNDhlYTg3MjAwODYzNjkzYWUiLCJpYXQiOjE2NTQ5NTEzOTYsImV4cCI6MTY1NTAzNzc5Nn0.6sKLkrpj7D3xpEpE7n3xWJ40WpSOpB2-DIC1QAjxEkY',
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
      });
  }, []);

  useEffect(() => {
    fetchData<IPostsResponse>(
      `http://localhost:3000/api/posts/author?perpage=${POSTS_PER_PAGE}&page=${currentPage}`,
      {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmE0OGRlNDhlYTg3MjAwODYzNjkzYWUiLCJpYXQiOjE2NTQ5NTEzOTYsImV4cCI6MTY1NTAzNzc5Nn0.6sKLkrpj7D3xpEpE7n3xWJ40WpSOpB2-DIC1QAjxEkY',
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
      });
  }, [currentPage]);

  const handlePageChange = (event: { selected: number }) => {
    setTimeout(() => {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }, 200);
    setCurrentPage(event.selected);
  };

  if (error) {
    return <ErrorComponent message={error.message} />;
  } else if (!posts) {
    return <Loader />;
  } else {
    return (
      <>
        <PostsOverview posts={posts}>
          <PostsPagination
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageChange}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="<"
          />
        </PostsOverview>
      </>
    );
  }
}
