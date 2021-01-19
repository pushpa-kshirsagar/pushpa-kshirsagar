import React from 'react';
import PropTypes from 'prop-types';
import './IconButton.css';
import { InputLabel } from '@material-ui/core';
import { Keyboard } from '@material-ui/icons';

/**
 * Primary UI component for user interaction
 */
const IconButton = (props) => {
  const { label, Icon, colour, className } = props;
  // const displayPane = primary ? 'icon-button-primary' : 'icon-button-secondary';

  return (
    <div>
      <div className={'iconBoxFooter'}>
        <button className={[`icon-button`, `icon-button-${colour}`, className].join(' ')}>
          <Icon />
        </button>
        <InputLabel className={'iconsFooterLabelDefault'}>{label}</InputLabel>
      </div>
    </div>
  );
};

IconButton.propTypes = {
  colour: PropTypes.oneOf([
    'displayPaneLeft',
    'displayPaneCentre',
    'displayPaneRight',
    'genericOne'
  ]), //new changes
  //displayPane: PropTypes.oneOf(['centre', 'default', 'left', 'right']),  //old
  label: PropTypes.string,
  Icon: Keyboard
  // onClick: PropTypes.func,
  // className: null,
};

IconButton.defaultProps = {
  // size: 'medium',
  // onClick: undefined,
  // className: null,
};
export default IconButton;
