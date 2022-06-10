import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

import SUN_PIC from './assets/sun.png';
import MOON_PIC from './assets/moon.png';

export default function Header() {
  const theme = useTheme();

  return (
    <StyledHeader>
      <InvisibleWrapper></InvisibleWrapper>
      <Title>
        <Link className="title__link" to="/">
          TWENTY SIX HUGS
        </Link>
      </Title>
      <Nav>
        <StyledLink to="/">Home</StyledLink>
        <StyledLinkWithMargin to="/about">About</StyledLinkWithMargin>
        <ThemeToggle theme={theme} onClick={theme.toggle}></ThemeToggle>
      </Nav>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: var(--header-offset);
  background: #ffffff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
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
    color: #1c1c1c;
  }

  @media (max-width: 700px) {
    font-size: 1.3rem;
    margin-left: 32px;
  }

  @media (max-width: 500px) {
    font-size: 0.7rem;
    text-align: center;
    margin-inline: 20px;
  }
`;

const Nav = styled.nav`
  margin-left: auto;
  flex: 1;

  display: flex;
  justify-content: flex-end;
  gap: 16px;

  font-size: 1.2rem;
`;

const StyledLink = styled(NavLink)`
  color: #3f3f3f;
  font-weight: 400;
  text-decoration: none;
  line-height: 1.1;
  &.active {
    text-decoration: underline;
  }
`;

const StyledLinkWithMargin = styled(StyledLink)`
  margin-right: 32px;
`;

const ThemeToggle = styled.button`
  width: calc(var(--header-offset));
  height: calc(var(--header-offset) / 4);

  background: url(${(props) => (props.theme.isDark ? SUN_PIC : MOON_PIC)});
  background-repeat: no-repeat;
  background-size: contain;

  cursor: pointer;
`;
