import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface ICardProps {
  date: string | null;
  title: string;
  subtitle: string;
  contentUrl: string;
  className?: string;
}

export default function Card({
  date,
  title,
  subtitle,
  contentUrl,
  className,
}: ICardProps) {
  const navigate = useNavigate();

  const handleCardOpen: React.MouseEventHandler = (e) => {
    navigate(contentUrl);
  };

  return (
    <Wrapper className={className} onClick={handleCardOpen}>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      {date ? (
        <Published>Published on {date}</Published>
      ) : (
        <NotPublished>Not published</NotPublished>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 24px;
  display: flex;
  flex-flow: column;
  gap: 8px;
  border-bottom: ${({ theme }) =>
    theme.isDark ? '1px solid var(--border--dark)' : '1px solid #bbbbbb'};
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => (theme.isDark ? 'var(--orange--dark)' : '#000')};
`;

const Subtitle = styled.p`
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #707070;
`;

const NotPublished = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => (theme.isDark ? '#f09c00' : '#a16900')};
`;

const Published = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => (theme.isDark ? '#00db12' : '#006608')};
`;
