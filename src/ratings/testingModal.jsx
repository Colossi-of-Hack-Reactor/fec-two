import React from 'react';
import Modal from './modal.jsx'

export default function Popup() {
  state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  return (
    <main>
      <h1>React Modal</h1>
      <Modal show={this.state.show} handleClose={this.hideModal}>
        <p>Modal</p>
        <p>Data</p>
      </Modal>
      <button type="button" onClick={this.showModal}>
        Open
      </button>
    </main>
  );
}
