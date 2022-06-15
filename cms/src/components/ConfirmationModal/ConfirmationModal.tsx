import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

const modalRootEl = document.querySelector(
  '#modal-root',
) as HTMLDivElement;

const rootEl = document.querySelector('#root') as HTMLDivElement;

function ModalPortal({ children }: { children: React.ReactNode }) {
  const container = document.createElement('div');

  useEffect(() => {
    rootEl.classList.add('is-blur');
    modalRootEl.appendChild(container);

    return () => {
      rootEl.classList.remove('is-blur');
      modalRootEl.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
}

interface IConfirmationProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Confirmation({
  message,
  onConfirm,
  onCancel,
}: IConfirmationProps) {
  const [displayState, setDisplayState] = useState<'showing' | 'hiding'>(
    'showing',
  );
  return (
    <ModalPortal>
      <Modal
        onClick={(e) => {
          e.stopPropagation();
        }}
        displayState={displayState}
      >
        <Box>
          {message}
          <Buttons>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onConfirm();
                setDisplayState('hiding');
              }}
            >
              Confirm
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onCancel();
                setDisplayState('hiding');
              }}
            >
              Cancel
            </Button>
          </Buttons>
        </Box>
      </Modal>
    </ModalPortal>
  );
}

const appear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const hide = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

interface IModalProps {
  displayState: 'showing' | 'hiding';
}

const Modal = styled.div<IModalProps>`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  animation: ${({ displayState }) =>
      displayState === 'showing' ? appear : hide}
    0.3s ease-out both;
`;

const Box = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 20px;

  padding: 30px;

  background: ${({ theme }) => (theme.isDark ? '#f09c00' : '#fff')};
  border-radius: 12px;
  box-shadow: ${({ theme }) =>
    theme.isDark ? 'none' : 'rgba(22, 21, 20, 0.2) 0px 7px 29px 0px'};
`;

const Buttons = styled.div`
  display: flex;
  gap: 16px;
`;

const Button = styled.button`
  width: max-content;
  padding: 10px 20px;
  border-radius: 8px;

  background: ${({ theme }) =>
    theme.isDark ? 'var(orange--dark)' : 'var(--orange--light)'};

  color: ${(props) => (props.theme.isDark ? '#000' : '#fff')};

  cursor: pointer;
`;
