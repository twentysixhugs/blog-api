import styled from 'styled-components';

interface ICommentProps {
  author: string;
  text: string;
  date: string;
}

export default function Comment({ author, text, date }: ICommentProps) {
  return (
    <Wrapper>
      <CommentInfo>
        <Author>{author}</Author>
        &#8226;
        <Date>{date}</Date>
      </CommentInfo>
      <Text>{text}</Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 3rem;
  padding: 1.7rem;

  display: flex;
  flex-flow: column;
  border: 1px solid
    ${(props) => (props.theme.isDark ? '#3e3e3e' : '#e4e4e4')};
  border-radius: 12px;

  @media (max-width: 500px) {
    padding: 1.2rem 1rem;
  }
`;

const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  font-size: 0.7rem;

  color: #979797;
`;

const Author = styled.span`
  font-size: 1.2rem;
  color: ${(props) => (props.theme.isDark ? '#a0a0a0' : '#464646')};
`;

const Text = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  color: ${(props) => (props.theme.isDark ? '#e2e2e2' : '#525252')};
`;

const Date = styled.span`
  margin-top: 2px;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #636363;
`;
