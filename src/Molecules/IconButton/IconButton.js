import React from 'react';
import PropTypes from 'prop-types';
import './IconButton.css';
import { InputLabel } from '@material-ui/core';
// import { Keyboard } from '@material-ui/icons';

/**
 * Primary UI component for user interaction
 */
const IconButton = (props) => {
  const {
    label = '',
    Icon,
    colour,
    className,
    labelTwo = '',
    onClick,
    dataValue,
    id,
    disabled = false,
    classNameOne = ''
  } = props;
  // const displayPane = primary ? 'icon-button-primary' : 'icon-button-secondary';

  return (
    <div>
      <div className={['iconBoxFooter', classNameOne].join(' ')}>
        <button
          className={[`icon-button`, `icon-button-${colour}`, className].join(' ')}
          onClick={onClick}
          id={id}
          data-value={dataValue}
          disabled={disabled}
        >
          <Icon />
        </button>
        {label !== '' && <InputLabel className={'iconsFooterLabelDefault'}>{label}</InputLabel>}
        {labelTwo !== '' && (
          <InputLabel className={'iconsFooterLabelDefault'}>{labelTwo}</InputLabel>
        )}
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
  label: PropTypes.string
  // onClick: PropTypes.func,
  // className: null,
};

IconButton.defaultProps = {
  // size: 'medium',
  // onClick: undefined,
  // className: null,
};
export default IconButton;
