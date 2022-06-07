import Card from '../Card';
import { IPost } from '../../types';

interface IPostsOverviewProps {
  posts: IPost[];
}

export default function PostsOverview({ posts }: IPostsOverviewProps) {
  return (
    <div className="c-posts-overview">
      <h1 className="c-posts-overview__title">The Blog</h1>
      {posts.map((post) => {
        return (
          <Card
            key={post._id}
            date={post.datePublishedFormatted}
            title={post.title}
            subtitle={'Build subtitle'}
            contentUrl={post.url}
          ></Card>
        );
      })}
    </div>
  );
}
