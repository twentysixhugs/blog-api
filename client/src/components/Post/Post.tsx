import styled from 'styled-components';

interface IPostProps {
  author: string;
  title: string;
  date: string;
  text: string;
}

export default function Post({ author, title, date, text }: IPostProps) {
  return (
    <StyledPost>
      <Title>{title}</Title>
      <DateAuthorWrapper>
        <span>{date}, by </span>
        <span>{author}</span>
      </DateAuthorWrapper>
      <Text>{text}</Text>
    </StyledPost>
  );
}

const StyledPost = styled.div`
  padding: 50px 20vw;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
`;

const DateAuthorWrapper = styled.div`
  margin-top: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e7e7e7;
  color: #525252;
`;

const Text = styled.p`
  margin-top: 1.25rem;

  line-height: 1.8;
  font-size: 1.3rem;
`;
