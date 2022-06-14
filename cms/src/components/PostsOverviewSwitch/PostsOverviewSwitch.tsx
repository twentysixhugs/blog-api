import styled, { keyframes } from 'styled-components';
import { useState } from 'react';

interface IPostsOverviewSwitchProps {
  onChange: (switchTo: 'unpublished' | 'published') => void;
  selected: 'unpublished' | 'published';
}

export default function PostsOverviewSwitch({
  onChange,
  selected,
}: IPostsOverviewSwitchProps) {
  return (
    <Wrapper>
      <OptionLeft
        className={selected === 'published' ? 'selected' : ''}
        onClick={() => {
          onChange('published');
        }}
      >
        Published
      </OptionLeft>
      <OptionRight
        className={selected === 'unpublished' ? 'selected' : ''}
        onClick={() => {
          onChange('unpublished');
        }}
      >
        Unpublished
      </OptionRight>
    </Wrapper>
  );
}

const opacity = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding: 24px;
  animation: ${opacity} 1.5s ease-out;
`;

const Option = styled.div`
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  user-select: none;

  &.selected {
    text-decoration: underline;
  }
`;

const OptionLeft = styled(Option)`
  color: ${({ theme }) => (theme.isDark ? '#00db12' : '#006608')};
`;

const OptionRight = styled(Option)`
  color: ${({ theme }) => (theme.isDark ? '#f09c00' : '#a16900')};

  border-radius: 0 var(--border-radius) var(--border-radius) 0;
`;
