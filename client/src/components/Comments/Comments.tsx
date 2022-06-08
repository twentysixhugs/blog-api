import styled from 'styled-components';
import { IComment } from '../../types';
import Comment from './Comment';
import CommentForm from './CommentForm';

interface ICommentsProps {
  comments: IComment[];
  onNewComment: (author: string, text: string) => void;
}

export default function Comments({
  comments,
  onNewComment,
}: ICommentsProps) {
  return (
    <>
      <CommentsHeading>Comments</CommentsHeading>
      <CommentForm onSubmit={onNewComment} />
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment
            key={comment._id}
            text={comment.text}
            author={comment.author}
            date={comment.dateFormatted}
          />
        ))
      ) : (
        <NoComments>There are no comments yet. Be the first :)</NoComments>
      )}
    </>
  );
}

const CommentsHeading = styled.h2`
  margin-top: 3rem;
  font-size: 2rem;
  font-weight: 700;
`;

const NoComments = styled.div`
  margin-top: 80px;

  font-size: 1.5rem;
  font-weight: 700;

  color: #333333;
`;
