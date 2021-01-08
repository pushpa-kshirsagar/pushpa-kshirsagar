import React from 'react';
import PropTypes from 'prop-types';
import './Label.css';

export const Label = (props) => {
  const {
    className = '',
    size = 'md',
    innerText = 'Demo Text',
    color = '#000000',
    isBadge = false,
  } = props;
  const style = {
    color: color,
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
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  className: PropTypes.string,
  innerText: PropTypes.string,
  color: PropTypes.string,
  isBadge: PropTypes.bool,
};

Label.defaultProps = {
  className: '',
  size: 'md',
  innerText: 'Demo Text',
  color: '#000000',
  isBadge: false,
};
