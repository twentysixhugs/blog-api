import { useState, useEffect } from 'react';
import { IPost, IPostsCountResponse, IPostsResponse } from '../../types';
import { formatDate } from '../../components/helpers/formatDate';
import PostsOverview from './PostsOverview';
import Loader from '../../components/Loader';
import { default as ErrorComponent } from '../../components/Error';
import ReactPaginate from 'react-paginate';

export default function Posts() {
  const [posts, setPosts] = useState<null | IPost[]>(null);
  const [error, setError] = useState<null | { message: string }>(null);

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const POSTS_PER_PAGE = 7;

  useEffect(() => {
    fetchData<IPostsCountResponse>(`http://localhost:3000/api/posts/count`)
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

  async function fetchData<T>(url: string): Promise<T> {
    const res = await fetch(url, { mode: 'cors' });

    if (!res.ok) {
      if (res.status === 404) {
        setError({ message: 'Post not found' });
      } else {
        throw new Error('Cannot fetch post data');
      }
    }

    const data = await res.json();

    return data;
  }

  const handlePageChange = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  if (error) {
    return <ErrorComponent message={error.message} />;
  } else if (!posts) {
    return <Loader />;
  } else {
    return (
      <>
        <PostsOverview posts={posts} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageChange}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< previous"
        />
      </>
    );
  }
}
