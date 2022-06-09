import styled from 'styled-components';
import Links from './Links';

export default function About() {
  return (
    <Wrapper>
      <Content>
        <Title>About</Title>
        <Description>
          I made this blog project to practice building REST API and
          accessing it. It{"'"}s not the first time I work with REST API,
          but it is the first time I build the API myself. I create the
          blog posts using CMS, store them on the backend made with Express
          & MongoDB and make available here. You can browse through the
          posts page by page, open one, leave a comment and see what others
          think about it.
        </Description>
        <Links></Links>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: calc(100vh - var(--header-offset));
  display: flex;
  align-items: center;
  padding: 0 30vw;
`;

const Content = styled.div`
  padding: 24px 32px;
  display: flex;
  flex-flow: column;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -12px;
  border: 1px solid #f1f1f1;
  border-radius: 12px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
`;

const Description = styled.p`
  margin-block: 1rem;

  line-height: 1.5;
  font-size: 1.2rem;
  text-align: center;

  color: #1d1d1d;
`;
