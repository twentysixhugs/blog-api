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
          autoComplete="off"
        ></Input>
      </UserInputWrapper>
      <UserInputWrapper>
        <Label>Your message</Label>
        <Textarea
          name="text"
          onChange={handleChange}
          value={inputFields.text}
          placeholder="What do you think?"
        ></Textarea>
      </UserInputWrapper>
      <SubmitButton>Post a reply</SubmitButton>
    </Form>
  );
}

const Form = styled.form`
  margin-top: 2rem;
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
  font-size: 1.2rem;
`;

const Input = styled.input`
  min-height: 2.5rem;
  padding: 0 0.5rem;

  font-size: 1.1rem;

  border-radius: 8px;
  border: 1px solid #cacaca;

  &:focus {
    outline: none;
    border: 1px solid #9e9e9e;
  }
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  min-height: 16rem;

  font-size: 1.1rem;
  font-family: inherit;

  border-radius: 8px;
  border: 1px solid #cacaca;

  resize: none;

  &:focus {
    outline: none;
    border: 1px solid #9e9e9e;
  }
`;

const SubmitButton = styled.button`
  width: max-content;
  padding: 1rem;
  margin-top: 1.25rem;

  align-self: flex-end;

  font-size: 1.5rem;

  color: #fff;
  background: #e48729;
  border-radius: 12px;

  cursor: pointer;

  &:active {
    background: #ee8924;
  }
`;
