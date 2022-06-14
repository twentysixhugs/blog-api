import { NavLink, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../../context/Theme/ThemeStore';

import SUN_PIC from './assets/sun.png';
import MOON_PIC from './assets/moon.png';
import { useToken } from '../../context/Token/TokenStore';

export default function Header() {
  const theme = useTheme();

  const [token, saveToken, resetToken] = useToken();

  return (
    <StyledHeader>
      <InvisibleWrapper></InvisibleWrapper>
      <Title>
        <Link className="title__link" to="/">
          BLOG API CMS
        </Link>
      </Title>
      <Nav>
        {token ? (
          <>
            <NewPost to="/new">New post</NewPost>
            <StyledNavLink to="/">Home</StyledNavLink>
            <StyledNavLink to="/about">About</StyledNavLink>
            <StyledLink to="/logout">Log out</StyledLink>
          </>
        ) : (
          <>
            <StyledLink to="/signup">Sign up</StyledLink>
            <StyledLink to="/login">Log in</StyledLink>
          </>
        )}
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
`;

const InvisibleWrapper = styled.div`
  visibility: hidden;
  margin-right: auto;
  flex: 1;

  @media (max-width: 1200px) {
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
    color: ${({ theme }) =>
      theme.isDark ? 'var(--orange--dark)' : '#1c1c1c'};
  }

  @media (max-width: 800px) {
    font-size: 1.3rem;
    margin-left: 32px;
  }

  @media (max-width: 620px) {
    display: none;
  }
`;

const Nav = styled.nav`
  margin-left: auto;
  flex: 1;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;

  font-size: 1.2rem;

  @media (max-width: 400px) {
    gap: 12px;
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) =>
    theme.isDark ? 'var(--orange--dark)' : '#3f3f3f'};
  font-weight: 400;
  text-decoration: none;
  line-height: 1.1;

  @media (max-width: 620px) {
    font-size: 1rem;
  }

  @media (max-width: 400px) {
    font-size: 0.85rem;
  }
`;

const StyledNavLink = styled(NavLink)`
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

const NewPost = styled(Link)`
  width: max-content;
  padding: 0.8rem 0.5rem;
  margin-right: 1.75rem;
  margin-left: 3.75rem;

  font-size: 1.3rem;
  text-decoration: none;

  background: ${(props) =>
    props.theme.isDark ? 'var(--orange--dark)' : '#e48729'};
  color: ${(props) => (props.theme.isDark ? '#000' : '#fff')};
  border-radius: 12px;

  cursor: pointer;

  &:active {
    background: #ee8924;
  }

  @media (max-width: 800px) {
    padding: 0;
    margin: 0;
    background: none;
    color: ${(props) =>
      props.theme.isDark ? 'var(--orange--dark)' : '#e48729'};
  }

  @media (max-width: 620px) {
    font-size: 1rem;
  }
  @media (max-width: 400px) {
    font-size: 0.85rem;
  }
`;
