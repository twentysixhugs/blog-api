import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface IPostActionProps {
  contentUrl: string;
  actionEndpoint: `/${string}`;
  iconDarkTheme?: string;
  iconLightTheme?: string;
  className?: string;
}

export default function PostAction({
  contentUrl,
  actionEndpoint,
  iconDarkTheme,
  iconLightTheme,
  className,
}: IPostActionProps) {
  const navigate = useNavigate();

  const handleEdit: React.MouseEventHandler = (e) => {
    e.stopPropagation();

    navigate(contentUrl + actionEndpoint);
  };

  return (
    <Styled
      className={className}
      onClick={handleEdit}
      iconDarkTheme={iconDarkTheme}
      iconLightTheme={iconLightTheme}
    />
  );
}

interface IStyledProps {
  iconDarkTheme?: string;
  iconLightTheme?: string;
}

const Styled = styled.div<IStyledProps>`
  background: ${({ theme, iconDarkTheme, iconLightTheme }) =>
      theme.isDark
        ? `${iconDarkTheme ? `url(${iconDarkTheme})` : 'none'}`
        : `${iconLightTheme ? `url(${iconLightTheme})` : 'none'}`}
    no-repeat;
  background-size: contain;

  transition: transform 0.2s ease-out;

  &:hover {
    transform: scale(1.3);
  }

  cursor: pointer;
`;
