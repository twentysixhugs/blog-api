interface IPostProps {
  author: string;
  title: string;
  date: string;
  text: string;
}

export default function Post({ author, title, date, text }: IPostProps) {
  return (
    <div className="c-post">
      <span className="c-post__author">{author}</span>
      <span className="c-post__date">{date}</span>
      <h1 className="c-post__title">{title}</h1>
      <p className="c-post__text">{text}</p>
    </div>
  );
}
