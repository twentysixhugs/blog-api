import styled from 'styled-components';
import Links from './Links';

export default function About() {
  return (
    <Wrapper>
      <Title>About</Title>
      <Description>
        I made this blog project to practice building REST API and
        accessing it. It{"'"}s not the first time I work with REST API, but
        it is the first time I build the API myself. I create the blog
        posts using CMS, store them on the backend made with Express &
        MongoDB and fetch from there. You can browse through the posts page
        by page, open one, leave a comment and see what others think about
        it.
      </Description>
      <Links></Links>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
`;

const Description = styled.p`
  line-height: 1.5;
  font-size: 1.2rem;
  color: #1d1d1d;
`;
