import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ConfirmationModal from '../ConfirmationModal';

interface IContentActionProps {
  contentUrl?: string;
  actionEndpoint?: `/${string}`;
  iconDarkTheme?: string;
  iconLightTheme?: string;
  className?: string;
  confirmationMessage?: string;
  onActionSubmit?: () => void;
}

export default function ContentAction({
  contentUrl,
  actionEndpoint,
  iconDarkTheme,
  iconLightTheme,
  className,
  confirmationMessage,
  onActionSubmit,
}: IContentActionProps) {
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
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (contentUrl && actionEndpoint) {
      // if should redirect on action
      navigate(contentUrl + actionEndpoint);
    }
    onActionSubmit ? onActionSubmit() : null;
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
              handleSubmit();
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
