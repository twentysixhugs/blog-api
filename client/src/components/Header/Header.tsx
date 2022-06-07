import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export default function Header() {
  return (
    <StyledHeader>
      <InvisibleWrapper></InvisibleWrapper>
      <Title>
        <span>Self-discipline</span>
        <span>database</span>
      </Title>
      <Links>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/about">About</StyledLink>
      </Links>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 80px;
  background: #000;
`;

const InvisibleWrapper = styled.div`
  visibility: hidden;
  margin-right: auto;
  flex: 1;
`;

const Title = styled.h1`
  display: flex;
  flex-flow: column;
  align-items: center;
  font-size: 2rem;
  font-weight: 800;
  color: #ffc068;
`;

const Links = styled.div`
  margin-left: auto;
  flex: 1;

  display: flex;
  justify-content: flex-end;
  gap: 16px;

  padding: 0 32px;

  font-size: 1.2rem;
`;

const StyledLink = styled(NavLink)`
  color: #ffffff;
  font-weight: 600;
  text-decoration: none;
  &.active {
    text-decoration: underline;
  }
`;
