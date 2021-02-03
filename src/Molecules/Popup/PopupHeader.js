import React, { Fragment } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { Clear, KeyboardTab } from '@material-ui/icons';
import Check from '@material-ui/icons/Check';
import Previous from '@material-ui/icons/ArrowBack';
import './Popup.css';
import { useDispatch } from 'react-redux';
import { POPUP_CLOSE, CLEAR_ASSESSEE_INFO } from '../../actionType';
const PopupHeader = (props) => {
  const {
    headerPanelColour,
    headerOne,
    headerOneBadgeOne,
    headerOneBadgeTwo,
    headerOneBadgeThree,
    onClick,
    mode = 'core'
  } = props;
  const dispatch = useDispatch();

  return (
    <DialogTitle id="dialog-title" className={'popupHeaderTitle'}>
      <Paper className={['popupMainHeader', `titleSolid-${headerPanelColour}`].join(' ')}>
        <div className={['componentInnerDiv', 'popupMainHeader'].join(' ')}>
          <div className={'titleBox'}>
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
                <Check className={'popupClose'} onClick={onClick} />
              ) : mode === 'confirm' ? (
                <KeyboardTab
                  className={['popupClose', 'previousToLast'].join(' ')}
                  onClick={onClick}
                />
              ) : mode === 'error' ? null : (
                <Previous className={'popupClose'} />
              )}
              {/* {headerPanelColour === 'genericOne' ? (
                <Check className={'popupClose'} onClick={onClick} />
              ) : headerPanelColour === 'genericTwo' ? null : (
                <Previous className={'popupClose'} />
              )} */}
            </IconButton>
          </div>
          <div className={'backArrow'}>
            <IconButton
              onClick={() => {
                dispatch({ type: CLEAR_ASSESSEE_INFO });
                dispatch({ type: POPUP_CLOSE });
              }}
              className="MuiIconButton-root-1602"
            >
              <Clear className={'popupClose'} />
            </IconButton>
          </div>
        </div>
      </Paper>
    </DialogTitle>
  );
};
export default PopupHeader;
