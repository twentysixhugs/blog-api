import GithubLink from './GithubLink';
import LinkedInLink from './LinkedInLink';

export default function Links() {
  return (
    <div className="c-game-result__links">
      <div className="c-game-result__links--image-links">
        <GithubLink />
        <LinkedInLink />
      </div>
      <a
        className="c-game-result__code-link"
        href="https://github.com/twentysixhugs/blog-api"
        target="_blank"
        rel="noreferrer"
      >
        View code
      </a>
    </div>
  );
}
