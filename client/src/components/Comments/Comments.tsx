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
  console.log(comments);
  return (
    <>
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
        <span>There are no comments yet. Be the first :)</span>
      )}
    </>
  );
}
