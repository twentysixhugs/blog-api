import styled from 'styled-components';
import Form from '../Form';
import { IFormProps } from '../Form/Form';

export default function CenteredForm(props: IFormProps) {
  return (
    <Wrapper>
      <StyledForm {...props}></StyledForm>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: calc(100vh - var(--header-offset));
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled(Form)`
  min-width: 40vw;
`;
