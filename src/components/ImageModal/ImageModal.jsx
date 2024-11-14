import Modal from 'react-modal';
import css from './ImageModal.module.css';

const ImageModal = ({ isOpen, onClose, currentImg, currentAlt }) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      padding: '0',
      margin: '0',
      width: '80%',
      height: 'auto',
      maxHeight: '90vh',
      overflow: 'hidden',
      borderRadius: '0',
      border: 'none',
    },
  };
  return (
    <div className={css.modalOverlay}>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img className={css.modalImg} src={currentImg} alt={currentAlt}></img>
      </Modal>
    </div>
  );
};

export default ImageModal;
