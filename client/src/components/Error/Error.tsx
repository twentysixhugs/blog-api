interface IErrorProps {
  message: string;
}

export default function Error({ message }: IErrorProps) {
  return (
    <div className="c-error">
      <h1 className="c-error__title">Something went wrong</h1>
      <span className="c-error__text">{message}</span>
    </div>
  );
}
