import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }
  closeModal = event => {
    if (event.code !== 'Escape') return;
    this.props.closeModalWindow();
  };
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }
  handleBackDropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModalWindow();
    }
  };
  render() {
    return createPortal(
      <div className={css.modalBackdrop} onClick={this.handleBackDropClick}>
        <div className={css.modalContent}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
