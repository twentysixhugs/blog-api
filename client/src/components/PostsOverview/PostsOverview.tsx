import Card from '../Card';
import { IPost } from '../../types';
import styled, { keyframes } from 'styled-components';

interface IPostsOverviewProps {
  posts: IPost[];
  children?: React.ReactNode;
}

export default function PostsOverview({
  posts,
  children,
}: IPostsOverviewProps) {
  let animationDelay = 0;

  return (
    <Wrapper>
      <Title>The blog</Title>
      <PostsWrapper>
        {posts.map((post) => {
          animationDelay += 0.1;

          return (
            <AnimatedCard
              key={post._id}
              date={post.datePublishedFormatted}
              title={post.title}
              subtitle={post.text.slice(0, 250) + '...'}
              contentUrl={post.url}
              animationDelay={animationDelay}
            />
          );
        })}
      </PostsWrapper>
      {children}
    </Wrapper>
  );
}

const appear = keyframes`
  from {
    opacity: 0;
    transform: scale(1.2);
  }
  to {
    opacity: 1;
    transform: scale(1);

  }
`;

const Wrapper = styled.div`
  padding: 50px 15vw;
  display: flex;
  flex-flow: column;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  animation: ${appear} 0.5s ease-out both;
`;

const PostsWrapper = styled.div`
  display: flex;
  flex-flow: column;
`;

const AnimatedCard = styled(Card)`
  animation: ${appear} 1.2s ease-out both;
  animation-delay: ${(props: { animationDelay: number }) =>
    props.animationDelay}s;
`;
