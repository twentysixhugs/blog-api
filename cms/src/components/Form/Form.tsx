import styled from 'styled-components';
import { useState, useEffect, FormEventHandler } from 'react';
import FormField from './FormField';
import { IInputFields } from '../../types';
import validateRequiredFields from '../../helpers/validateRequiredFields';

export interface IFormProps {
  inputFields: IInputFields;
  submitButtonName?: string;
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  className?: string;
}

export default function Form({
  inputFields,
  submitButtonName,
  onChange,
  onSubmit,
  className,
}: IFormProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const validationErrors = {
    requiredFields: 'Please, fill out the required fields.',
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!validateRequiredFields(inputFields)) {
      // Prevent doubly showing the same message
      if (!errors.find((err) => err === validationErrors.requiredFields)) {
        setErrors([...errors, validationErrors.requiredFields]);
      }
      return;
    } else {
      setErrors([]);
    }

    onSubmit();
  };

  function getFormFields() {
    const elements = [];
    let elementsId = 0;

    for (const field in inputFields) {
      elements.push(
        <FormField
          key={elementsId++}
          name={field}
          value={inputFields[field].value}
          inputId={field}
          label={inputFields[field].label}
          isRequired={inputFields[field].required}
          type={inputFields[field].type}
          onChange={(e) => {
            onChange(field, e.target.value);
          }}
        />,
      );
    }

    return [...elements];
  }

  return (
    <StyledForm onSubmit={handleSubmit} className={className}>
      <Errors>{errors}</Errors>
      {getFormFields()}
      <SubmitButton>
        {submitButtonName ? submitButtonName : 'Submit'}
      </SubmitButton>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-flow: column;
  gap: 32px;
`;

const Errors = styled.div`
  color: #e94b4b;
`;

const SubmitButton = styled.button`
  width: max-content;
  padding: 1rem;
  margin-top: 1.25rem;

  align-self: flex-end;

  font-size: 1.5rem;

  background: ${(props) =>
    props.theme.isDark ? 'var(--orange--dark)' : '#e48729'};
  color: ${(props) => (props.theme.isDark ? '#000' : '#fff')};
  border-radius: 12px;

  cursor: pointer;

  &:active {
    background: #ee8924;
  }
`;
