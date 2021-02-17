import React, { Fragment } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { Clear, KeyboardTab } from '@material-ui/icons';
import Check from '@material-ui/icons/Check';
import Previous from '@material-ui/icons/ArrowBack';
import './PopUp.css';
import { useDispatch, useSelector } from 'react-redux';
import { POPUP_CLOSE, SET_NEXT_POPUP, CLEAR_ASSESSEE_INFO, PREVIOUS_POPUP } from '../../actionType';
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
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);

  const onClose = () => {
    if (mode === 'cancel' || mode === 'core' || mode === 'confirm') {
      dispatch({ type: PREVIOUS_POPUP, payload: { prevPopUpValue: isPopUpValue } });
      dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'CANCELPOPUP' } });
    } else {
      dispatch({ type: CLEAR_ASSESSEE_INFO });
      dispatch({ type: POPUP_CLOSE });
    }
  };

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
              ) : mode === 'error' || mode === 'cancel' ? null : (
                <Previous className={'popupClose'} onClick={onClick} />
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
              {mode !== 'cancel' && <Clear className={'popupClose'} />}
            </IconButton>
          </div>
        </div>
      </Paper>
    </DialogTitle>
  );
};
export default PopupHeader;
