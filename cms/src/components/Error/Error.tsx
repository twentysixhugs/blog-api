import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IErrorProps {
  message: string;
}

export default function Error({ message }: IErrorProps) {
  return (
    <Wrapper>
      <h1 className="title">Something went wrong</h1>
      <span className="text">{message}</span>
      <StyledLink to="/">Go home</StyledLink>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: calc(100vh - var(--header-offset));
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #4b4b4b;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) =>
    theme.isDark ? 'var(--orange--dark)' : 'var(--orange--light)'};
`;
