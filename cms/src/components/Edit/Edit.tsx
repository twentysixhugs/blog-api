import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import editPencilSVG from '../../globalAssets/edit_pencil.svg';
import editPencilDarkThemeSVG from '../../globalAssets/edit_pencil_dark_theme.svg';

interface IEditProps {
  contentUrl: string;
  className?: string;
}

export default function Edit({ contentUrl, className }: IEditProps) {
  const navigate = useNavigate();

  const handleEdit: React.MouseEventHandler = (e) => {
    e.stopPropagation();

    navigate(contentUrl + '/edit');
  };

  return <StyledEdit className={className} onClick={handleEdit} />;
}

const StyledEdit = styled.div`
  background: ${({ theme }) =>
      theme.isDark
        ? `url(${editPencilDarkThemeSVG})`
        : `url(${editPencilSVG})`}
    no-repeat;
  background-size: contain;

  transition: transform 0.2s ease-out;

  &:hover {
    transform: scale(1.3);
  }
`;
