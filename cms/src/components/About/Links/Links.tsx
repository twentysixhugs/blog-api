import GithubLink from './GithubLink';
import LinkedInLink from './LinkedInLink';
import styled, { css } from 'styled-components';

export default function Links() {
  return (
    <Wrapper className="c-game-result__links">
      <LinksWrapper>
        <StyledGithubLink />
        <StyledLinkedinLink />
      </LinksWrapper>
      <ViewCodeLink
        className="c-game-result__code-link"
        href="https://github.com/twentysixhugs/blog-api"
        target="_blank"
        rel="noreferrer"
      >
        View code
      </ViewCodeLink>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 12px;
`;

const LinksWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const StyledLink = css`
  & svg {
    width: 50px;
    height: 50px;
  }
`;

const StyledGithubLink = styled(GithubLink)`
  ${StyledLink}
`;

const StyledLinkedinLink = styled(LinkedInLink)`
  ${StyledLink}
`;

const ViewCodeLink = styled.a`
  font-weight: 700;
  font-size: 1.1rem;
  color: ${(props) =>
    props.theme.isDark ? 'var(--orange--dark)' : '#006a97'};

  &:active {
    color: #009bde;
  }
`;
