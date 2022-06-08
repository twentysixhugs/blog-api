import { useState } from 'react';
import styled from 'styled-components';

interface ICommentFormProps {
  onSubmit: (author: string, text: string) => void;
}

export default function CommentForm({ onSubmit }: ICommentFormProps) {
  const [inputFields, setInputFields] = useState({
    author: '',
    text: '',
  });

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(inputFields.author, inputFields.text);
    setInputFields({ author: '', text: '' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <UserInputWrapper>
        <Label>Your name</Label>
        <Input
          name="author"
          onChange={handleChange}
          value={inputFields.author}
          placeholder="Anonymous"
        ></Input>
      </UserInputWrapper>
      <UserInputWrapper>
        <Label>Your message</Label>
        <Textarea
          name="text"
          onChange={handleChange}
          value={inputFields.text}
          placeholder="What do you feel like?"
        ></Textarea>
      </UserInputWrapper>
      <SubmitButton>Post a reply</SubmitButton>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-flow: column;
  gap: 16px;
`;

const UserInputWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 700;
`;

const Input = styled.input`
  border-radius: 8px;
  border: 1px solid black;
`;

const Textarea = styled.textarea`
  border-radius: 8px;
  border: 1px solid black;
  font-family: inherit;
  font-size: inherit;
`;

const SubmitButton = styled.button``;
