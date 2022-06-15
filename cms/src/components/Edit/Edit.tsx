import editPencilSVG from '../../globalAssets/edit_pencil.svg';
import editPencilDarkThemeSVG from '../../globalAssets/edit_pencil_dark_theme.svg';
import PostAction from '../PostAction';

interface IEditProps {
  contentUrl: string;
  className?: string;
}

export default function Edit({ contentUrl, className }: IEditProps) {
  return (
    <PostAction
      contentUrl={contentUrl}
      actionEndpoint="/edit"
      className={className}
      iconLightTheme={editPencilSVG}
      iconDarkTheme={editPencilDarkThemeSVG}
    />
  );
}
