import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import Check from '@material-ui/icons/Check';
import Previous from '@material-ui/icons/ArrowBack';
import './Popup.css';

const Popup = (props) => {
  const {
    isOpen,
    headerLabel,
    headerBadgeOne,
    headerBadgeTwo,
    headerBadgeThree,
    close,
    displayPane
  } = props;
  return (
    <div>
      <Dialog
        open={isOpen}
        disableEscapeKeyDown={true}
        onClose={close}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        // className={parentDialogue}
      >
        <DialogTitle id="dialog-title" className={'popupHeaderTitle'}>
          <Paper className={['popupMainHeader', `titleSolid-${displayPane}`].join(' ')}>
            <div className={['componentInnerDiv', 'popupMainHeader'].join(' ')}>
              <div className={'titleBox'}>
                <span>{headerLabel}</span>&nbsp;
                {headerBadgeOne !== '' ? (
                  <Fragment>
                    <span className={'iguru-header-badge1_0'}>{headerBadgeOne}</span>
                    &nbsp;
                  </Fragment>
                ) : null}
                {headerBadgeTwo !== '' ? (
                  <Fragment>
                    <span className={'iguru-header-badge1_0'}>{headerBadgeTwo}</span>
                    &nbsp;
                  </Fragment>
                ) : null}
                {headerBadgeThree !== '' ? (
                  <Fragment>
                    <span className={'iguru-header-badge1_0'}>{headerBadgeThree}</span>
                    &nbsp;
                  </Fragment>
                ) : null}
              </div>
              <div className={'backArrow'}>
                <IconButton className="MuiIconButton-root-1602">
                  {displayPane == 'core' ? (
                    <Check className={'popupClose'} />
                  ) : (
                    <Previous className={'popupClose'} />
                  )}
                </IconButton>
              </div>
              <div className={'backArrow'}>
                <IconButton className="MuiIconButton-root-1602">
                  <Clear className={'popupClose'} />
                </IconButton>
              </div>
            </div>
          </Paper>
        </DialogTitle>
        {/* {children} */}
        <DialogContent className={'popupContent'}>
          <div id="dialog-description">
            <div className="true">
              <div className={'tickOption'}>
                <div>
                  <Button className={'optionPrimary'} data-value="create">
                    create
                  </Button>
                </div>
                <div>
                  <Button className={'optionPrimary'} data-value="review">
                    review
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

Popup.propTypes = {
  displayPane: PropTypes.oneOf(['centre', 'core', 'left', 'right']),
  headerLabel: PropTypes.string,
  className: null,
  isOpen: PropTypes.bool
};
export default Popup;
