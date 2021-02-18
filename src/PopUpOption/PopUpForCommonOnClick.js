import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent, Button, Divider, IconButton } from '@material-ui/core';
import Check from '@material-ui/icons/Check';
import { SET_POPUP_STATE, SET_SECONDARY_OPTION_VALUE } from '../actionType';
import {
  ASSIGNMENT_DISTINCT_POPUP,
  ASSESSEE_CARD_POPUP_OPTIONS,
  NOTIFICATION_REPORT_POPUP
} from '../PopUpConfig';
const PopUpForCommonOnClick = (props) => {
  const {
    popupHeaderOne,
    popupHeaderOneBadgeOne,
    popupContentArrValue,
    popupOpenType,
    secondaryOptionCheckValue
  } = useSelector((state) => state.PopUpReducer);

  const dispatch = useDispatch();
  const { headerPanelColour = 'displayPaneLeft', isActive } = props;

  const setSecondaryOptionValue = (e) => {
    dispatch({
      type: SET_SECONDARY_OPTION_VALUE,
      payload: e.currentTarget.getAttribute('data-value')
    });
  };
  const ChangeOptionPopup = (e) => {
    console.log(e.currentTarget.getAttribute('data-value'));
    let clickValue = e.currentTarget.getAttribute('data-value');
    let revisePopupHeaderOne = '';
    let revisepopupHeaderOneBadgeOne = '';
    let reviseisPopUpValue = '';
    let revisePopupType = '';
    let reviseSecondaryOptionCheckValue = '';
    let valueArr = [];
    if (clickValue === 'assesseeselfassignments') {
      revisePopupHeaderOne = 'assignments';
      revisepopupHeaderOneBadgeOne = 'review';
      reviseisPopUpValue = 'CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = ASSIGNMENT_DISTINCT_POPUP;
      reviseSecondaryOptionCheckValue = 'active';
    }
    if (clickValue === 'notifications' || clickValue === 'reports') {
      revisePopupHeaderOne = clickValue;
      revisepopupHeaderOneBadgeOne = 'review';
      reviseisPopUpValue = 'CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = NOTIFICATION_REPORT_POPUP;
      reviseSecondaryOptionCheckValue = 'unread';
    }
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: revisePopupHeaderOne,
        popupHeaderOneBadgeOne: revisepopupHeaderOneBadgeOne,
        isPopUpValue: reviseisPopUpValue,
        popupOpenType: revisePopupType,
        secondaryOptionCheckValue: reviseSecondaryOptionCheckValue,
        popupContentArrValue: valueArr
      }
    });
  };
  const BackHandlerEvent = (e) => {
    let revisePopupHeaderOne = '';
    let revisepopupHeaderOneBadgeOne = '';
    let reviseisPopUpValue = '';
    let revisePopupType = '';
    let reviseSecondaryOptionCheckValue = '';
    let valueArr = [];
    if (popupHeaderOne === 'assignments') {
      revisePopupHeaderOne = 'assessee';
      revisepopupHeaderOneBadgeOne = '';
      reviseisPopUpValue = 'CARD_POPUP';
      revisePopupType = 'primary';
      valueArr = ASSESSEE_CARD_POPUP_OPTIONS;
      reviseSecondaryOptionCheckValue = '';
    }
    if (popupHeaderOne === 'notifications' || popupHeaderOne === 'reports') {
      revisePopupHeaderOne = 'assessee';
      revisepopupHeaderOneBadgeOne = '';
      reviseisPopUpValue = 'CARD_POPUP';
      revisePopupType = 'primary';
      valueArr = ASSESSEE_CARD_POPUP_OPTIONS;
      reviseSecondaryOptionCheckValue = '';
    }
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: revisePopupHeaderOne,
        popupHeaderOneBadgeOne: revisepopupHeaderOneBadgeOne,
        isPopUpValue: reviseisPopUpValue,
        popupOpenType: revisePopupType,
        secondaryOptionCheckValue: reviseSecondaryOptionCheckValue,
        popupContentArrValue: valueArr
      }
    });
  };
  return (
    <div>
      <Popup isActive={isActive}>
        <PopupHeader
          headerPanelColour={headerPanelColour + popupOpenType}
          headerOne={popupHeaderOne}
          headerOneBadgeOne={popupHeaderOneBadgeOne}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <div id="dialog-description">
            <div className="true">
              <div className={'tickOption'}>
                {popupContentArrValue &&
                  popupContentArrValue.map((item, index) => {
                    return (
                      <div key={index}>
                        <Button
                          className={item.optionClass}
                          data-value={item.dataValue}
                          onClick={
                            item.optionClass === 'optionSecondary'
                              ? setSecondaryOptionValue
                              : ChangeOptionPopup
                          }
                        >
                          {item.data}
                          {item.optionClass === 'optionSecondary' &&
                          secondaryOptionCheckValue === item.dataValue ? (
                            <IconButton className={'tick'}>
                              <Check className={'selectionIcon'} />
                            </IconButton>
                          ) : null}
                        </Button>
                        {item.divider && <Divider {...item.divider} key={index} />}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpForCommonOnClick;
