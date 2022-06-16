import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Navigate, Link } from 'react-router-dom';

interface ISuccessProps {
  message: string;
}

export default function Success({ message }: ISuccessProps) {
  const [secondsLeft, setSecondsLeft] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (secondsLeft === 0) {
    return <Navigate to="/"></Navigate>;
  } else {
    return (
      <Wrapper>
        <Message>{message}</Message>
        <Message>
          Redirect to home page in {secondsLeft}{' '}
          {secondsLeft > 1 ? 'seconds' : 'second'}
        </Message>
        <StyledLink to="/">Go now</StyledLink>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - var(--header-offset));

  @media (max-width: 500px) {
    padding: 0 20px;
  }
`;

const Message = styled.span`
  font-size: 1.4rem;
  color: ${(props) =>
    props.theme.isDark ? 'var(--text--dark)' : '#202020'};

  @media (max-width: 500px) {
    font-size: 1.1rem;
    text-align: center;
  }
`;

const StyledLink = styled(Link)`
  font-size: 1.4rem;
  color: ${(props) =>
    props.theme.isDark ? 'var(--text--dark)' : '#202020'};
  text-decoration: underline;
`;
