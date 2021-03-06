import editPencilSVG from '../../globalAssets/edit_pencil.svg';
import editPencilDarkThemeSVG from '../../globalAssets/edit_pencil_dark_theme.svg';
import ContentAction from '../ContentAction';

interface IEditPostActionProps {
  contentUrl: string;
  className?: string;
}

export default function EditPostAction({
  contentUrl,
  className,
}: IEditPostActionProps) {
  return (
    <ContentAction
      contentUrl={contentUrl}
      actionEndpoint="/edit"
      className={className}
      iconLightTheme={editPencilSVG}
      iconDarkTheme={editPencilDarkThemeSVG}
    />
  );
}
