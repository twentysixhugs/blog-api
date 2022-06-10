import { useState } from 'react';
import styled from 'styled-components';

interface ICommentFormProps {
  onSubmit: (author: string, text: string) => void;
}

export default function CommentForm({ onSubmit }: ICommentFormProps) {
  const [inputFields, setInputFields] = useState({
    author: {
      value: '',
      required: false,
    },
    text: {
      value: '',
      required: true,
    },
  });

  const [errors, setErrors] = useState<string[]>([]);

  const validationErrors = {
    requiredFields: 'Please, fill out the required fields.',
  };

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    if (e.target.name in inputFields)
      setInputFields({
        ...inputFields,
        [e.target.name]: {
          ...inputFields[e.target.name as keyof typeof inputFields],
          value: e.target.value,
        },
      });
  };
  const validateRequiredFields = () => {
    for (const prop in inputFields) {
      const typedProp = prop as keyof typeof inputFields;

      if (
        !inputFields[typedProp].value &&
        inputFields[typedProp].required
      ) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!validateRequiredFields()) {
      // Prevent doubly showing the same message
      if (!errors.find((err) => err === validationErrors.requiredFields)) {
        setErrors([...errors, validationErrors.requiredFields]);
      }
      return;
    } else {
      setErrors([]);
    }

    onSubmit(inputFields.author.value, inputFields.text.value);

    const resetInputFields = { ...inputFields };

    for (const prop in inputFields) {
      const typedProp = prop as keyof typeof inputFields;

      resetInputFields[typedProp] = {
        ...inputFields[typedProp],
        value: '',
      };
    }

    setInputFields(resetInputFields);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Errors>{errors}</Errors>
      <UserInputWrapper>
        <Label>Your name</Label>
        <Input
          name="author"
          onChange={handleChange}
          value={inputFields.author.value}
          placeholder="Anonymous"
          autoComplete="off"
        ></Input>
      </UserInputWrapper>
      <UserInputWrapper>
        <Label>
          Your message <Required>*</Required>
        </Label>
        <Textarea
          name="text"
          onChange={handleChange}
          value={inputFields.text.value}
          placeholder="What do you think?"
        ></Textarea>
      </UserInputWrapper>
      <SubmitButton>Post a reply</SubmitButton>
    </Form>
  );
}

const Form = styled.form`
  margin-top: 0.5rem;
  display: flex;
  flex-flow: column;
  gap: 32px;
`;

const Errors = styled.div`
  color: #e94b4b;
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

  @media (max-width: 500px) {
    min-height: 8rem;
  }
`;

const Required = styled.span`
  color: #e94b4b;
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
