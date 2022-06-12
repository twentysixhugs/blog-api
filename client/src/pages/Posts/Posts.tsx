import { useState, useEffect } from 'react';
import { IPost, IPostsCountResponse, IPostsResponse } from '../../types';
import { formatDate } from '../../helpers/formatDate';
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
      `http://localhost:3000/api/posts/count`,
      { mode: 'cors' },
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
      `http://localhost:3000/api/posts?perpage=${POSTS_PER_PAGE}&page=${currentPage}`,
      { mode: 'cors' },
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
          datePublishedFormatted: formatDate(post.datePublished!),
          url: `/posts/${post._id}`,
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
