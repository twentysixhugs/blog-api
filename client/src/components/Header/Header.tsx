import { NavLink, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../../context/Theme/ThemeStore';

import SUN_PIC from './assets/sun.png';
import MOON_PIC from './assets/moon.png';

export default function Header() {
  const theme = useTheme();

  return (
    <StyledHeader>
      <AnchorLinkWrapper>
        <AnchorLink
          href="https://blogcms-twentysixhugs.netlify.app"
          target="_blank"
          rel="noreferrer"
        >
          Go to CMS
        </AnchorLink>
      </AnchorLinkWrapper>
      <Title>
        <Link className="title__link" to="/">
          TWENTY SIX HUGS
        </Link>
      </Title>
      <Nav>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/about">About</StyledLink>
        <ThemeToggle onClick={theme.toggle}></ThemeToggle>
      </Nav>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  padding-inline: 16px;
  width: 100%;
  min-height: var(--header-offset);

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${({ theme }) => (theme.isDark ? '#181818' : '#fff')};
  box-shadow: ${({ theme }) =>
    theme.isDark ? 'none' : 'rgba(111, 104, 100, 0.2) 0px 7px 29px 0px'};

  @media (max-width: 340px) {
    padding-inline: 12px;
  }
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 800;

  & .title__link {
    text-decoration: none;
    color: ${({ theme }) =>
      theme.isDark ? 'var(--orange--dark)' : '#1c1c1c'};
  }

  @media (max-width: 700px) {
    font-size: 1.3rem;
    margin-inline: 32px;
  }

  @media (max-width: 620px) {
    display: none;
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
  align-items: center;
  gap: 12px;

  font-size: 1.2rem;
`;

const StyledLink = styled(NavLink)`
  color: ${({ theme }) =>
    theme.isDark ? 'var(--orange--dark)' : '#3f3f3f'};
  font-weight: 400;
  text-decoration: none;
  line-height: 1.1;
  &.active {
    text-decoration: underline;
  }
  @media (max-width: 620px) {
    font-size: 1rem;
  }
  @media (max-width: 400px) {
    font-size: 0.85rem;
  }
`;

const ThemeToggle = styled.button`
  width: calc(var(--header-offset) / 4);
  height: calc(var(--header-offset) / 4);
  margin-left: 10px;

  background: url(${(props) => (props.theme.isDark ? MOON_PIC : SUN_PIC)});
  background-repeat: no-repeat;
  background-size: contain;

  cursor: pointer;

  @media (max-width: 500px) {
    background-position: center;
    width: calc(var(--header-offset) / 4);
  }
`;

const AnchorLinkWrapper = styled.div`
  margin-right: auto;
  flex: 1;
`;

const AnchorLink = styled.a`
  color: ${({ theme }) =>
    theme.isDark ? 'var(--orange--dark)' : '#3f3f3f'};
  font-weight: 400;
  text-decoration: none;
  line-height: 1.1;

  @media (max-width: 620px) {
    font-size: 1rem;
  }

  @media (max-width: 400px) {
    font-size: 0.8rem;
  }
`;
