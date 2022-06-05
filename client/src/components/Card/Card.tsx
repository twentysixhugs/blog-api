interface ICardProps {
  date: string;
  title: string;
  subtitle: string;
  imgUrl: string;
  className?: string;
}

export default function Card({
  date,
  title,
  subtitle,
  imgUrl,
  className,
}: ICardProps) {
  return (
    <div className={`c-card ${className ? className : ''}`}>
      <img className="c-card__img" src={imgUrl} alt=""></img>
      <div className="c-card__info">
        <span className="c-card__date">{date}</span>
        <h2 className="c-card__title">{title}</h2>
        <p className="c-card__subtitle">{subtitle}</p>
      </div>
    </div>
  );
}
