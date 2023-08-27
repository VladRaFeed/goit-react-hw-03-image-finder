import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ onCLick, largeImageUrl }) => {
  return (
    <div onClick={onCLick} className={css.overlay}>
      <div className={css.modal}>
        <img src={largeImageUrl} alt="" />
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
};
