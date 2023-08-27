import PropTypes from 'prop-types';
import { InfinitySpin } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loader_overlay}>
      <InfinitySpin width="200" color="#4fa94d" />
    </div>
  );
};

export default Loader;