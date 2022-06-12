import styled from 'styled-components';
import { IComment, IInputFields } from '../../types';
import { useState } from 'react';
import Form from '../Form';
import Comment from './Comment';
import resetInputFields from '../../helpers/resetInputFields';

interface ICommentsProps {
  comments: IComment[];
  onNewComment: (author: string, text: string) => void;
}

export default function Comments({
  comments,
  onNewComment,
}: ICommentsProps) {
  const [inputFields, setInputFields] = useState<IInputFields>({
    author: {
      value: '',
      required: false,
      label: 'Your name',
    },
    text: {
      value: '',
      required: true,
      label: 'Your message',
    },
  });

  return (
    <>
      <CommentsHeading>Comments</CommentsHeading>
      <Form
        onSubmit={() => {
          onNewComment(inputFields.author.value, inputFields.text.value);
          setInputFields(resetInputFields(inputFields));
        }}
        inputFields={inputFields}
        onChange={(field, value) => {
          setInputFields({
            ...inputFields,
            [field]: {
              ...inputFields[field],
              value: value,
            },
          });
        }}
        submitButtonName="Post a reply"
      ></Form>
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

  color: ${(props) => (props.theme.isDark ? 'var(--text--dark)' : '#000')};
`;

const NoComments = styled.div`
  margin-top: 80px;

  font-size: 1.5rem;
  font-weight: 700;

  color: #333333;
`;
