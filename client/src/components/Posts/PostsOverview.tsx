import Card from '../Card';
import { IPost } from '../../types';

interface IPostsOverviewProps {
  posts: IPost[];
}

export default function PostsOverview({ posts }: IPostsOverviewProps) {
  return (
    <div className="c-posts-overview">
      <h1 className="c-posts-overview__title">The Blog</h1>
      <Card
        date={posts[0].datePublishedFormatted!}
        title={posts[0].title}
        subtitle={'Build subtitle'}
        imgUrl={posts[0].previewUrl}
        contentUrl={posts[0].url}
        className="c-card--main"
      ></Card>
      {posts.slice(1).map((post) => {
        console.log(post._id);
        return (
          <Card
            key={post._id}
            date={post.datePublishedFormatted!}
            title={post.title}
            subtitle={'Build subtitle'}
            imgUrl={post.previewUrl}
            contentUrl={post.url}
          ></Card>
        );
      })}
    </div>
  );
}
