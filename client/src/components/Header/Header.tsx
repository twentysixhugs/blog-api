import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="c-header">
      <span className="c-header__logo">Self discipline database</span>
      <Link className="c-header__link" to="/">
        Home
      </Link>
      <Link className="c-header__link" to="/about">
        About
      </Link>
    </header>
  );
}
