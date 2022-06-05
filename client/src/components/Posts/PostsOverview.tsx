import Card from '../Card';
import { IPost } from '../../types';

interface IPostsOverviewProps {
  mainPost: IPost;
  otherPosts: IPost[];
}

export default function PostsOverview({
  mainPost,
  otherPosts,
}: IPostsOverviewProps) {
  return (
    <div className="c-posts-overview">
      <h1 className="c-posts-overview__title">The Blog</h1>
      <Card
        date={mainPost.datePublishedFormatted!}
        title={mainPost.title}
        subtitle={'Build subtitle'}
        imgUrl={mainPost.previewUrl}
        contentUrl={mainPost.url}
        className="c-card--main"
      ></Card>
      {otherPosts.map((post) => {
        return (
          <Card
            key={post.id}
            date={post.datePublishedFormatted!}
            title={post.title}
            subtitle={'Build subtitle'}
            imgUrl={post.previewUrl}
            contentUrl={mainPost.url}
          ></Card>
        );
      })}
    </div>
  );
}
