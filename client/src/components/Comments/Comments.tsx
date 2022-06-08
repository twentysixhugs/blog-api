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
      <CommentForm onSubmit={onNewComment} />
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          text={comment.text}
          author={comment.author}
          date={comment.dateFormatted}
        />
      ))}
    </>
  );
}
