import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import './PopUp.css';

const PopUp = (props) => {
  const { isActive, close, children } = props;

  return (
    <div>
      <Dialog
        open={isActive}
        disableEscapeKeyDown={true}
        onClose={close}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        // className={parentDialogue}
      >
        {children}
      </Dialog>
    </div>
  );
};

PopUp.propTypes = {
  headerPanelColour: PropTypes.oneOf([
    'displayPaneLeft',
    'displayPaneCentre',
    'displayPaneRight',
    'genericOne',
    'genericTwo'
  ]), //new changes
  // displayPane: PropTypes.oneOf(['centre', 'core', 'left', 'right']), //old
  headerOne: PropTypes.string,
  className: PropTypes.string,
  isActive: PropTypes.bool
};
export default PopUp;
