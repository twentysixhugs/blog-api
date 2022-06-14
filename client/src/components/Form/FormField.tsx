import styled, { css } from 'styled-components';

interface IFormFieldProps {
  label: string;
  inputId: string;
  name: string;
  value: string | number | readonly string[] | undefined;
  type: string;
  isRequired: boolean;
  onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
}

export default function FormField({
  label,
  inputId,
  name,
  value,
  type,
  onChange,
  isRequired,
}: IFormFieldProps) {
  return (
    <UserInputWrapper>
      <Label htmlFor={inputId}>
        {label}
        {isRequired ? <Required> *</Required> : ''}
      </Label>
      {type === 'textarea' ? (
        <Textarea
          name={name}
          value={value}
          id={inputId}
          onChange={onChange}
          autoComplete="off"
        ></Textarea>
      ) : (
        <Input
          name={name}
          value={value}
          id={inputId}
          onChange={onChange}
          type={type}
          autoComplete="off"
        ></Input>
      )}
    </UserInputWrapper>
  );
}

const UserInputWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 1.2rem;

  color: ${(props) => (props.theme.isDark ? 'var(--text--dark)' : '#000')};
`;

const fieldTag = css`
  font-size: 1.1rem;

  border-radius: 8px;

  &:focus {
    outline: none;
    border: 1px solid
      ${(props) => (props.theme.isDark ? '#333333' : '#9e9e9e')};
  }

  background: ${(props) => (props.theme.isDark ? '#232323' : '#ffffff')};
  border: 1px solid
    ${(props) => (props.theme.isDark ? '#232323' : '#cacaca;')};
  color: ${(props) => (props.theme.isDark ? '#cacaca' : '#000000;')};
`;

const Input = styled.input`
  ${fieldTag}

  min-height: 2.5rem;
  padding: 0 0.5rem;
`;

const Textarea = styled.textarea`
  ${fieldTag}

  min-height: 10rem;
  padding: 0.5rem;
  font-family: inherit;

  resize: none;
`;

const Required = styled.span`
  color: #e94b4b;
`;
