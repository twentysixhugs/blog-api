import styled from 'styled-components';
import DeleteCommentAction from '../DeleteCommentAction';

interface ICommentProps {
  author: string;
  text: string;
  date: string;
  id: string;
  postId: string;
  onDelete: () => void;
}

export default function Comment({
  author,
  text,
  date,
  id,
  postId,
  onDelete,
}: ICommentProps) {
  return (
    <Wrapper>
      <WrapperTop>
        <Author>{author}</Author>
        &#8226;
        <Date>{date}</Date>
        <StyledDeleteCommentAction onActionSubmit={onDelete} />
      </WrapperTop>
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
    ${(props) => (props.theme.isDark ? 'var(--border--dark)' : '#e4e4e4')};
  border-radius: 12px;

  @media (max-width: 500px) {
    padding: 1.2rem 1rem;
  }
`;

const WrapperTop = styled.div`
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
  color: ${(props) =>
    props.theme.isDark ? 'var(--text--dark)' : '#525252'};
`;

const Date = styled.span`
  margin-top: 2px;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #636363;
`;

const StyledDeleteCommentAction = styled(DeleteCommentAction)`
  width: 25px;
  height: 25px;
  margin-left: auto;
`;
