import styled from 'styled-components';

interface ICommentProps {
  author: string;
  text: string;
  date: string;
}

export default function Comment({ author, text, date }: ICommentProps) {
  console.log(text);
  return (
    <Wrapper>
      <Author>{author}</Author>
      <Text>{text}</Text>
      <Date>{date}</Date>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  padding: 0.3rem;
  border-bottom: 1px solid #e4e4e4;
`;

const Author = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
`;

const Text = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  color: #1b1b1b;
`;

const Date = styled.span`
  font-size: 0.7rem;
  color: #d6d6d6;
`;
