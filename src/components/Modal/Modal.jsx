import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalWrap, Overlay } from './Modal.styled';

const modal = document.querySelector('#modal-root');

export const Modal = ({ onClose, largeImageURL, tags }) => {
  
  useEffect(() => {

    const onKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    }
    
  }, [onClose]);

  const onBackdropClick = event => {
    event.stopPropagation();
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  
  return createPortal(
    <Overlay onClick={onBackdropClick}>
      <ModalWrap>
        <img src={largeImageURL} alt={tags} />
      </ModalWrap>
    </Overlay>,
    modal
  );
  
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
