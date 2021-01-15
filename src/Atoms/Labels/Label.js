import React from 'react';
import PropTypes from 'prop-types';
import './Label.css';

const Label = (props) => {
  const {
    className = '',
    labelSize = '1.2rem',
    labelText = 'Sample Text',
    labelColour = '#000000',
    isBadge = false
  } = props;
  const style = {
    color: labelColour
  };

  return (
    <div style={style} className={isBadge ? 'batch-container' : 'text-container'}>
      <p style={{...style, fontSize: labelSize}} className={`${className} text-style`}>
        {labelText}
      </p>
    </div>
  );
};
// text-size-${labelSize}
Label.propTypes = {
  labelSize: PropTypes.oneOf(['0.875rem', '1rem', '1.2rem', '1.6rem']), // 'extraSmall', 'small', 'medium', 'large'
  className: PropTypes.string,
  labelText: PropTypes.string,
  labelColour: PropTypes.string,
  isBadge: PropTypes.bool
};

Label.defaultProps = {
  className: '',
  labelSize: '1.2 rem',
  labelText: 'Sample Text',
  labelColour: '#000000',
  isBadge: false
};
export default Label;
