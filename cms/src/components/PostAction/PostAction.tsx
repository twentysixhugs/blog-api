import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ConfirmationModal from '../ConfirmationModal';

interface IPostActionProps {
  contentUrl: string;
  actionEndpoint: `/${string}`;
  iconDarkTheme?: string;
  iconLightTheme?: string;
  className?: string;
  confirmationMessage?: string;
}

export default function PostAction({
  contentUrl,
  actionEndpoint,
  iconDarkTheme,
  iconLightTheme,
  className,
  confirmationMessage,
}: IPostActionProps) {
  const navigate = useNavigate();

  const [shouldConfirm, setShouldConfirm] = useState(false);
  const [shouldShowConfirmPopup, setShouldShowConfirmPopup] =
    useState(false);

  useEffect(() => {
    if (confirmationMessage) {
      setShouldConfirm(true);
    }
  }, [confirmationMessage]);

  const handleEdit: React.MouseEventHandler = (e) => {
    e.stopPropagation();

    if (shouldConfirm) {
      setShouldShowConfirmPopup(true);
    } else {
      navigate(contentUrl + actionEndpoint);
    }
  };

  return (
    <>
      <Styled
        className={className}
        onClick={handleEdit}
        iconDarkTheme={iconDarkTheme}
        iconLightTheme={iconLightTheme}
      />
      {shouldShowConfirmPopup ? (
        <ConfirmationModal
          message={confirmationMessage!}
          onConfirm={() => {
            setTimeout(() => {
              setShouldShowConfirmPopup(false);
              navigate(contentUrl + actionEndpoint);
            }, 300);
          }}
          onCancel={() => {
            setTimeout(() => {
              setShouldShowConfirmPopup(false);
            }, 300);
          }}
        />
      ) : null}
    </>
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
