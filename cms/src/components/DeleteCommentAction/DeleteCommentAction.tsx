import ContentAction from '../ContentAction';
import deleteSVGLightTheme from '../../globalAssets/delete_close_light_theme.svg';
import deleteSVGDarkTheme from '../../globalAssets/delete_close_dark_theme.svg';

interface IDeleteCommentActionProps {
  onActionSubmit: () => void;
  className?: string;
}

export default function DeleteCommentAction({
  onActionSubmit,
  className,
}: IDeleteCommentActionProps) {
  return (
    <ContentAction
      onActionSubmit={onActionSubmit}
      confirmationMessage="Are you sure you want to delete this comment?"
      iconLightTheme={deleteSVGLightTheme}
      iconDarkTheme={deleteSVGDarkTheme}
      className={className}
    />
  );
}
