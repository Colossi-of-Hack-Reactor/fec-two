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
`;

const ModalMain = styled.div`
  position: fixed;
  background: white;
  width: 45%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CloseButton = styled.button`
  top:1%;
  left:85%;
  position: absolute;
`;

function Popup({ handleClose, show, children }) {
  return (
    <Modal show={show}>
      <div>
        <ModalMain>
          <CloseButton type="button" onClick={handleClose}>close</CloseButton>
          {children}
        </ModalMain>
      </div>
    </Modal>
  );
}

export default Popup;
