import React from 'react';
import PropTypes from 'prop-types';
import './Label.css';

const Label = (props) => {
  const {
    className = '',
    fontSize = '1.2rem',
    text = 'Sample Text',
    colour = '#000000',
    isBadge = false
  } = props;
  const style = {
    color: colour
  };

  return (
    <div style={style} className={isBadge ? 'batch-container' : 'text-container'}>
      <p style={{ ...style, fontSize: fontSize }} className={`${className} text-style`}>
        {text}
      </p>
    </div>
  );
};
// text-size-${labelSize}
Label.propTypes = {
  className: PropTypes.string,
  fontSize: PropTypes.oneOf(['0.875rem', '1.0rem', '1.2rem', '1.6rem']), // 'extraSmall', 'small', 'medium', 'large'
  text: PropTypes.string,
  colour: PropTypes.string,
  isBadge: PropTypes.bool
};

Label.defaultProps = {
  className: '',
  fontSize: '1.2rem',
  text: 'Sample Text',
  colour: '#000000',
  isBadge: false
};
export default Label;
