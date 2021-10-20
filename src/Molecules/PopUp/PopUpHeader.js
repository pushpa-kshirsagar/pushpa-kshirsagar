import React, { Fragment } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { Clear, KeyboardTab } from '@material-ui/icons';
import NextIcon from '@material-ui/icons/ArrowForward';
import Check from '@material-ui/icons/Check';
import Previous from '@material-ui/icons/ArrowBack';
import './PopUp.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  POPUP_CLOSE,
  SET_NEXT_POPUP,
  CLEAR_ASSESSEE_INFO,
  PREVIOUS_POPUP,
  CLEAR_ASSOCIATE_INFO,
  CLEAR_ASSESSMENT_INFO,
  CLEAR_ASSIGNMENT_INFO,
  CLEAR_IGAUGE_REDUCER,
  CLEAR_POPUP_INFO,
  CLEAR_ROLE_REDUCER_STATE
} from '../../actionType';

const PopupHeader = (props) => {
  const {
    headerPanelColour,
    headerOne,
    headerOneBadgeOne,
    headerOneBadgeTwo,
    headerOneBadgeThree,
    onClick,
    itemRoleType,
    mode = 'core',
    isNotRevised = false,
    onClosePopUpEvent = null,
    setexchageMode = null,
  } = props;
  const dispatch = useDispatch();
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);

  const onClose = () => {
    if (onClosePopUpEvent !== null) {
      onClosePopUpEvent();
    } else {
      if (mode === 'cancel' || mode === 'core' || mode === 'confirm') {
        dispatch({ type: PREVIOUS_POPUP, payload: { prevPopUpValue: isPopUpValue } });
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'CANCELPOPUP' } });
      } else if (mode === 'revise') {
        dispatch({ type: POPUP_CLOSE });
      } else {
        dispatch({ type: CLEAR_POPUP_INFO });
        dispatch({ type: CLEAR_ASSESSEE_INFO });
        // dispatch({ type: CLEAR_ASSESSMENT_INFO });
        dispatch({ type: POPUP_CLOSE });
        dispatch({ type: CLEAR_ROLE_REDUCER_STATE });
        dispatch({ type: CLEAR_ASSOCIATE_INFO });
        dispatch({ type: CLEAR_ASSIGNMENT_INFO });
        dispatch({ type: CLEAR_IGAUGE_REDUCER });
        // setexchageMode();
      }
    }
  };

  return (
    <DialogTitle id="dialog-title" className={'popupHeaderTitle'}>
      <Paper
        className={['popupMainHeader', 'iguru-box-shadow', `titleSolid-${headerPanelColour}`].join(
          ' '
        )}
      >
        <div
          style={{ padding: '0, 5px' }}
          className={['componentInnerDiv', 'popupMainHeader'].join(' ')}
        >
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
            {!isNotRevised && (
              <IconButton className="MuiIconButton-root-1602">
                {mode === 'core' || mode === 'search' || mode === 'revise' ? (
                  <Check className={'popupClose'} onClick={onClick}  />
                ) : mode === 'confirm' ? (
                  <KeyboardTab
                    className={['popupClose', 'previousToLast'].join(' ')}
                    onClick={onClick} 
                  />
                ) : mode === 'error' || mode === 'cancel' ? null : mode === 'next' ? (
                  <NextIcon className={'popupClose'} onClick={onClick} />
                ) : (
                  <Previous className={'popupClose'} onClick={onClick} />
                )}
                {/* {headerPanelColour === 'genericOne' ? (
                <Check className={'popupClose'} onClick={onClick} />
              ) : headerPanelColour === 'genericTwo' ? null : (
                <Previous className={'popupClose'} />
              )} */}
              </IconButton>
            )}
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
