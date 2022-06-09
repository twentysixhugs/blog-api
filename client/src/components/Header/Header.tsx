import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Header() {
  return (
    <StyledHeader>
      <InvisibleWrapper></InvisibleWrapper>
      <Title>
        <Link className="title__link" to="/">
          TWENTY SIX HUGS
        </Link>
      </Title>
      <Links>
        <StyledLink to="/">Home</StyledLink>
        <StyledLinkWithMargin to="/about">About</StyledLinkWithMargin>
      </Links>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: var(--header-offset);
  background: #000;
`;

const InvisibleWrapper = styled.div`
  visibility: hidden;
  margin-right: auto;
  flex: 1;

  @media (max-width: 700px) {
    display: none;
  }
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 800;

  & .title__link {
    text-decoration: none;
    color: #ffbb68;
  }

  @media (max-width: 700px) {
    font-size: 1.3rem;
    margin-left: 32px;
  }

  @media (max-width: 500px) {
    font-size: 1rem;
    text-align: center;
    margin-inline: 20px;
  }
`;

const Links = styled.div`
  margin-left: auto;
  flex: 1;

  display: flex;
  justify-content: flex-end;
  gap: 16px;

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
const StyledLinkWithMargin = styled(StyledLink)`
  margin-right: 32px;
`;
