import styled from 'styled-components';
import PostAction from '../PostAction';
import deleteBinLightThemeSVG from '../../globalAssets/delete_bin_light_theme.svg';
import deleteBinDarkThemeSVG from '../../globalAssets/delete_bin_dark_theme.svg';

interface IDeletePostActionProps {
  contentUrl: string;
  className?: string;
}

export default function DeletePostAction({
  contentUrl,
  className,
}: IDeletePostActionProps) {
  return (
    <PostAction
      contentUrl={contentUrl}
      actionEndpoint="/delete"
      className={className}
      iconLightTheme={deleteBinLightThemeSVG}
      iconDarkTheme={deleteBinDarkThemeSVG}
      confirmationMessage="Are you sure you want to delete the post?"
    />
  );
}
