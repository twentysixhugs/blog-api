import Card from '../Card';
import { IPost } from '../../types';
import styled from 'styled-components';

interface IPostsOverviewProps {
  posts: IPost[];
}

export default function PostsOverview({ posts }: IPostsOverviewProps) {
  return (
    <Wrapper>
      <Title>The blog</Title>
      <PostsWrapper>
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
      </PostsWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 50px 15vw;
  display: flex;
  flex-flow: column;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
`;

const PostsWrapper = styled.div`
  display: flex;
  flex-flow: column;
`;
