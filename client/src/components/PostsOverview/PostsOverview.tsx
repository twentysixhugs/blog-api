import Card from '../Card';
import { IPost } from '../../types';
import styled, { keyframes, ThemeProvider } from 'styled-components';

import { useTheme } from '../../context/Theme/ThemeContext';

interface IPostsOverviewProps {
  posts: IPost[];
  children?: React.ReactNode;
}

export default function PostsOverview({
  posts,
  children,
}: IPostsOverviewProps) {
  const theme = useTheme();

  let animationDelay = 0;

  return (
    <ThemeProvider theme={theme}>
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
                subtitle={post.text}
                contentUrl={post.url}
                animationDelay={animationDelay}
              />
            );
          })}
        </PostsWrapper>
        {children}
      </Wrapper>
    </ThemeProvider>
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

  @media (max-width: 700px) {
    padding: 50px 5vw;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  animation: ${appear} 0.5s ease-out both;

  color: ${(props) =>
    props.theme.isDark ? 'rgb(236, 236, 236)' : '#000'};

  @media (max-width: 500px) {
    font-size: 2rem;
  }
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
