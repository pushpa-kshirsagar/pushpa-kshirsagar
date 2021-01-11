import React from 'react';
import PropTypes from 'prop-types';
import './IconButton.css';
import { InputLabel } from '@material-ui/core';
import { Keyboard } from '@material-ui/icons';

/**
 * Primary UI component for user interaction
 */
const IconButton = ( props ) => {
  console.log(props);
  const { label, Icon, mode,className} = props;
  // const mode = primary ? 'icon-button-primary' : 'icon-button-secondary';
  return (
    <div>
      <button
        variant="fab"
        className={[`icon-button`,`icon-button-${mode}`,className].join(' ')}
        onClick={()=>{}}
      >
        <Icon />
      </button>
      <InputLabel>{label}</InputLabel>
    </div>
  );
};

IconButton.propTypes = {
  // size: PropTypes.oneOf(['small', 'medium', 'large']),
  label: PropTypes.string.isRequired,
  Icon: Keyboard,
  onClick: PropTypes.func,
  className:null
};

IconButton.defaultProps = {
  // size: 'medium',
  onClick: undefined,
  className:null
};
export default IconButton;
