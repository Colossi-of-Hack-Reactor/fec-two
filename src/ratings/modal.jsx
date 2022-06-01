import React from 'react';
import styled from 'styled-components';

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: ${({ show }) => (show ? 'block' : 'none')};
  z-index: 100;
`;

const ModalMain = styled.div`
  position: fixed;
  background: white;
  width: 60%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

const CloseButton = styled.label`
  font-size: 30px;
  top: 16px;
  right: 20px;
  position: absolute;
  cursor: pointer;
  background-color: white;
`;

function Popup({ handleClose, show, children }) {
  return (
    <Modal show={show}>
      <div>
        <ModalMain>
          <CloseButton onClick={handleClose}>&times;</CloseButton>
          {children}
        </ModalMain>
      </div>
    </Modal>
  );
}

export default Popup;
