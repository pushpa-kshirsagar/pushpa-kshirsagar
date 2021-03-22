import React, { Fragment } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { Clear, KeyboardTab } from '@material-ui/icons';
import Check from '@material-ui/icons/Check';
import Previous from '@material-ui/icons/ArrowBack';
import './PopUp.css';
const PopUpWhiteHeader = (props) => {
  const {
    headerPanelColour,
    headerOne,
    headerOneBadgeOne,
    headerOneBadgeTwo,
    headerOneBadgeThree,
    onClick,
    onClose,
    mode
  } = props;

  return (
    <DialogTitle id="dialog-title" className={'popupHeaderTitle'}>
      <Paper className={['popupMainHeader', `titleSolid-${headerPanelColour}`].join(' ')}>
        <div
          style={{ padding: '0 5px' }}
          className={['componentInnerDiv', 'popupMainHeader'].join(' ')}
        >
          <div
            style={{ color: headerPanelColour === '' ? 'rgba(0, 0, 0, 0.87)' : '#ffffff' }}
            className={'titleBox'}
          >
            <span>{headerOne}</span>&nbsp;
            {headerOneBadgeOne ? (
              <Fragment>
                <span className={'iguru-header-badge1_0'}>{headerOneBadgeOne}</span>
                &nbsp;
              </Fragment>
            ) : null}
            {headerOneBadgeTwo ? (
              <Fragment>
                <span className={'iguru-header-badge1_0'}>{headerOneBadgeTwo}</span>
                &nbsp;
              </Fragment>
            ) : null}
            {headerOneBadgeThree ? (
              <Fragment>
                <span className={'iguru-header-badge1_0'}>{headerOneBadgeThree}</span>
                &nbsp;
              </Fragment>
            ) : null}
          </div>
          <div className={'backArrow'}>
            <IconButton className="MuiIconButton-root-1602">
              {mode === 'core' ? (
                <Check
                  className={'popupClose'}
                  style={{ color: headerPanelColour === '' ? 'rgba(0, 0, 0, 0.87)' : '#ffffff' }}
                  onClick={onClick}
                />
              ) : mode === 'confirm' ? (
                <KeyboardTab
                  className={['popupClose', 'previousToLast'].join(' ')}
                  onClick={onClick}
                />
              ) : mode === 'error' || mode === 'cancel' ? null : (
                <Previous
                  style={{ color: headerPanelColour === '' ? 'rgba(0, 0, 0, 0.87)' : '#ffffff' }}
                  className={'popupClose'}
                  onClick={onClick}
                />
              )}
              {/* {headerPanelColour === 'genericOne' ? (
                <Check className={'popupClose'} onClick={onClick} />
              ) : headerPanelColour === 'genericTwo' ? null : (
                <Previous className={'popupClose'} />
              )} */}
            </IconButton>
          </div>
          <div className={'backArrow'}>
            <IconButton onClick={onClose} className="MuiIconButton-root-1602">
              {mode !== 'cancel' && (
                <Clear
                  style={{ color: headerPanelColour === '' ? 'rgba(0, 0, 0, 0.87)' : '#ffffff' }}
                  className={'popupClose'}
                />
              )}
            </IconButton>
          </div>
        </div>
      </Paper>
    </DialogTitle>
  );
};
export default PopUpWhiteHeader;
