import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ICardProps {
  date: string;
  title: string;
  subtitle: string;
  imgUrl: string;
  contentUrl: string;
  className?: string;
}

export default function Card({
  date,
  title,
  subtitle,
  imgUrl,
  contentUrl,
  className,
}: ICardProps) {
  const navigate = useNavigate();

  const handleCardOpen: React.MouseEventHandler = (e) => {
    navigate(contentUrl);
  };

  return (
    <div
      className={`c-card ${className ? className : ''}`}
      onClick={handleCardOpen}
    >
      <img className="c-card__img" src={imgUrl} alt=""></img>
      <div className="c-card__info">
        <span className="c-card__date">{date}</span>
        <h2 className="c-card__title">{title}</h2>
        <p className="c-card__subtitle">{subtitle}</p>
      </div>
    </div>
  );
}
