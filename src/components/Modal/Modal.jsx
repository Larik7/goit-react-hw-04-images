import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalWrap, Overlay } from './Modal.styled';

const modal = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  onBackdropClick = event => {
    event.stopPropagation();
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.onBackdropClick}>
        <ModalWrap>
          <img src={this.props.largeImageURL} alt={this.props.tags} />
        </ModalWrap>
      </Overlay>,
      modal
    );
  }
}
