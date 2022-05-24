import React from 'react';
import styled from 'styled-components';

const ModalPop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const ModalMain = styled.div`
  position: fixed;
  background: white;
  width: 80 %;
  height: auto;
  top: 50 %;
  left: 50 %;
  transform: translate(-50 %, -50 %);
`;

const ModalBlock = styled.div`
  display: block;
`;

const ModalNone = styled.div`
  display: none;
`;


export default function Modal({ handleClose, show, children }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassname}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
};