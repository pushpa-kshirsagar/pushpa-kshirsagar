import React from 'react';
import PropTypes from 'prop-types';
import './IconButton.css';
import { Button, InputLabel } from '@material-ui/core';
import { Keyboard } from '@material-ui/icons';

/**
 * Primary UI component for user interaction
 */
export const IconButton = ( props ) => {
  console.log(props);
  const { primary, label, Icon } = props;
  const mode = primary ? 'icon-button-primary' : 'icon-button-secondary';
  return (
    <div>
      <button
        variant="fab"
        className={`icon-button ${mode}`}
        onClick={()=>{}}
      >
        <Icon />
      </button>
      <InputLabel>{label}</InputLabel>
    </div>
  );
};

IconButton.propTypes = {
  primary: PropTypes.bool,
  // size: PropTypes.oneOf(['small', 'medium', 'large']),
  label: PropTypes.string.isRequired,
  Icon: Keyboard,
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  primary: false,
  // size: 'medium',
  onClick: undefined,
};
