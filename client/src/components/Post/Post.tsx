import styled from 'styled-components';
import { IComment } from '../../types';
import Comments from '../Comments';

interface IPostProps {
  author: string;
  title: string;
  date: string;
  text: string;
  comments: IComment[];
  onNewComment: (author: string, text: string) => void;
}

export default function Post({
  author,
  title,
  date,
  text,
  comments,
  onNewComment,
}: IPostProps) {
  return (
    <StyledPost>
      <Title>{title}</Title>
      <DateAuthorWrapper>
        <span>{date}, by </span>
        <span>{author}</span>
      </DateAuthorWrapper>
      <Text>{text}</Text>
      <Comments comments={comments} onNewComment={onNewComment} />
    </StyledPost>
  );
}

const StyledPost = styled.div`
  padding: 80px 20vw;

  @media (max-width: 1000px) {
    padding: 50px 8vw;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;

  color: ${(props) => (props.theme.isDark ? 'var(--text--dark)' : '#000')};

  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;

const DateAuthorWrapper = styled.div`
  margin-top: 1rem;
  padding-bottom: 0.75rem;
  color: ${(props) => (props.theme.isDark ? '#bababa' : '#525252')};
  border-bottom: 1px solid
    ${(props) => (props.theme.isDark ? 'var(--border--dark)' : '#e7e7e7')};
`;

const Text = styled.p`
  margin-top: 1.25rem;

  line-height: 1.8;
  font-size: 1.3rem;

  color: ${(props) => (props.theme.isDark ? 'var(--text--dark)' : '#000')};

  @media (max-width: 500px) {
    line-height: 1.6;
    font-size: 1.2rem;
  }
`;
