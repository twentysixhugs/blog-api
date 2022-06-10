import styled, { keyframes } from 'styled-components';

export default function Loader() {
  return (
    <Wrapper>
      <Spinner></Spinner>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: calc(100vh - var(--header-offset));
  display: flex;
  align-items: center;
  justify-content: center;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid ${({ theme }) => (theme.isDark ? 'none' : '#cdcdcd')};
  border-top: 4px solid
    ${({ theme }) => (theme.isDark ? 'var(--orange--dark)' : '#ffda9f')};
  border-radius: 100%;
  animation: ${rotate} 1s linear infinite;
`;
