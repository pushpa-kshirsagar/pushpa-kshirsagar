import React from 'react';
import PropTypes from 'prop-types';
import './Label.css';

const Label = (props) => {
  const {
    className = '',
    size = 'medium',
    innerText = 'Sample Text',
    colour = '#000000',
    isBadge = false
  } = props;
  const style = {
    color: colour
  };

  return (
    <div style={style} className={isBadge ? 'batch-container' : 'text-container'}>
      <p style={style} className={`${className} text-style text-size-${size}`}>
        {innerText}
      </p>
    </div>
  );
};

Label.propTypes = {
  size: PropTypes.oneOf(['extraSmall', 'small', 'medium', 'large']),
  className: PropTypes.string,
  innerText: PropTypes.string,
  colour: PropTypes.string,
  isBadge: PropTypes.bool
};

Label.defaultProps = {
  className: '',
  size: 'medium',
  innerText: 'Sample Text',
  colour: '#000000',
  isBadge: false
};
export default Label;
