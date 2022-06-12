import styled from 'styled-components';

interface IFormFieldProps {
  label: string;
  inputId: string;
  name: string;
  value: string | number | readonly string[] | undefined;
  type: string;
  isRequired: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
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
      <Input
        name={name}
        value={value}
        id={inputId}
        onChange={onChange}
        type={type}
      ></Input>
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

const Input = styled.input`
  min-height: 2.5rem;
  padding: 0 0.5rem;

  font-size: 1.1rem;

  border-radius: 8px;

  &:focus {
    outline: none;
    border: 1px solid #9e9e9e;
  }

  background: ${(props) => (props.theme.isDark ? '#232323' : '#ffffff')};
  border: 1px solid
    ${(props) => (props.theme.isDark ? '#232323' : '#cacaca;')};
`;

const Required = styled.span`
  color: #e94b4b;
`;
