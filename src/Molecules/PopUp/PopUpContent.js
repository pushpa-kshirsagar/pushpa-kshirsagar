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
import './PopUp.css';

const PopupContent = (props) => {
  const {
    isActive,
    close,
    headerPanelColour = 'green',
    headerOne,
    headerOneBadgeOne,
    headerOneBadgeTwo,
    headerOneBadgeThree
  } = props;

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
        <DialogTitle id="dialog-title" className={'popupHeaderTitle'}>
          <Paper className={['popupMainHeader', `titleSolid-${headerPanelColour}`].join(' ')}>
            <div className={['componentInnerDiv', 'popupMainHeader'].join(' ')}>
              <div className={'titleBox'}>
                <span>{headerOne}</span>&nbsp;
                {headerOneBadgeOne !== '' ? (
                  <Fragment>
                    <span className={'iguru-header-badge1_0'}>{headerOneBadgeOne}</span>
                    &nbsp;
                  </Fragment>
                ) : null}
                {headerOneBadgeTwo !== '' ? (
                  <Fragment>
                    <span className={'iguru-header-badge1_0'}>{headerOneBadgeTwo}</span>
                    &nbsp;
                  </Fragment>
                ) : null}
                {headerOneBadgeThree !== '' ? (
                  <Fragment>
                    <span className={'iguru-header-badge1_0'}>{headerOneBadgeThree}</span>
                    &nbsp;
                  </Fragment>
                ) : null}
              </div>
              <div className={'backArrow'}>
                <IconButton className="MuiIconButton-root-1602">
                  {headerPanelColour === 'genericOne' ? (
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

PopupContent.propTypes = {
  headerPanelColour: PropTypes.oneOf([
    'displayPaneLeft',
    'displayPaneCentre',
    'displayPaneRight',
    'genericOne',
    'genericTwo'
  ]), //new changes
  // displayPane: PropTypes.oneOf(['centre', 'core', 'left', 'right']), //old
  headerOne: PropTypes.string,
  className: null,
  isActive: PropTypes.bool
};
export default PopupContent;
