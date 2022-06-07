import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface ICardProps {
  date: string;
  title: string;
  subtitle: string;
  contentUrl: string;
}

export default function Card({
  date,
  title,
  subtitle,
  contentUrl,
}: ICardProps) {
  const navigate = useNavigate();

  const handleCardOpen: React.MouseEventHandler = (e) => {
    navigate(contentUrl);
  };

  return (
    <Wrapper onClick={handleCardOpen}>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <Date>{date}</Date>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 12px 24px;
  display: flex;
  flex-flow: column;
  gap: 8px;
  border-bottom: 1px solid #bbbbbb;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #707070;
`;

const Date = styled.span`
  font-size: 0.8rem;
  color: #bbbbbb;
`;
