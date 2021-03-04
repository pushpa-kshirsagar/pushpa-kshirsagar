import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import { POPUP_CLOSE, SET_POPUP_STATE, SET_SECONDARY_OPTION_VALUE } from '../actionType';
import {
  ASSESSEE_REVIEW_REVISE_POPUP,
  NOTIFICATION_REPORT_POPUP,
  REVIEW_REVISE_POPUP,
  REVIEW_POPUP_OPTIONS,
  MODULE_POPUP_OPTION
} from '../PopUpConfig';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import { setAssesseeCardPermissionInJson } from '../Actions/GenericActions';

const PopUpDisplayPaneOneSectionTwo = (props) => {
  const {
    popupHeaderOne,
    popupHeaderOneBadgeOne,
    popupOpenType,
    previousPopupHeaderOne
  } = useSelector((state) => state.PopUpReducer);
  const { assesseePermission } = useSelector((state) => state.UserReducer);

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
    let revisePopupHeaderOne = popupHeaderOne;
    let revisepopupHeaderOneBadgeOne = '';
    let revisepopupHeaderOneBadgeTwo = '';
    let reviseisPopUpValue = '';
    let revisePopupType = '';
    let reviseSecondaryOptionCheckValue = '';
    let valueArr = [];

    if (clickValue === 'create') {
      revisepopupHeaderOneBadgeOne = 'create';
      reviseisPopUpValue = 'DISPLAY_PANE_ONE_SECTION_ONE_POPUP';
      revisePopupType = 'secondary';
      valueArr =
        popupHeaderOne === 'assessees' ? ASSESSEE_REVIEW_REVISE_POPUP : REVIEW_REVISE_POPUP;
      reviseSecondaryOptionCheckValue = 'all';
    }
    if (clickValue === 'review') {
      revisepopupHeaderOneBadgeOne = 'review';
      reviseisPopUpValue = 'DISPLAY_PANE_ONE_SECTION_ONE_POPUP';
      revisePopupType = 'secondary';
      valueArr = REVIEW_POPUP_OPTIONS;
      reviseSecondaryOptionCheckValue = 'active';
    }
    if (clickValue === 'notifications') {
      revisePopupHeaderOne = 'notifications';
      revisepopupHeaderOneBadgeOne = 'review';
      reviseisPopUpValue = 'DISPLAY_PANE_ONE_SECTION_ONE_POPUP';
      revisePopupType = 'secondary';
      valueArr = NOTIFICATION_REPORT_POPUP;
      reviseSecondaryOptionCheckValue = 'unread';
    }
    if (clickValue === 'reports') {
      revisePopupHeaderOne = 'reports';
      revisepopupHeaderOneBadgeOne = 'review';
      reviseisPopUpValue = 'DISPLAY_PANE_ONE_SECTION_ONE_POPUP';
      revisePopupType = 'secondary';
      valueArr = NOTIFICATION_REPORT_POPUP;
      reviseSecondaryOptionCheckValue = 'unread';
    }

    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: revisePopupHeaderOne,
        previousPopupHeaderOne: previousPopupHeaderOne,
        popupHeaderOneBadgeOne: revisepopupHeaderOneBadgeOne,
        popupHeaderOneBadgeTwo: revisepopupHeaderOneBadgeTwo,
        isPopUpValue: reviseisPopUpValue,
        popupOpenType: revisePopupType,
        secondaryOptionCheckValue: reviseSecondaryOptionCheckValue,
        popupContentArrValue: valueArr
      }
    });
  };
  const BackHandlerEvent = (e) => {
    if (popupOpenType === 'primary') {
      dispatch({ type: POPUP_CLOSE });
    } else {
      let popupContentArrValue = setAssesseeCardPermissionInJson(
        MODULE_POPUP_OPTION,
        assesseePermission
      );
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: previousPopupHeaderOne,
          previousPopupHeaderOne: previousPopupHeaderOne,
          popupHeaderOneBadgeOne: '',
          isPopUpValue: 'DISPLAY_PANE_ONE_SECTION_ONE_POPUP',
          popupOpenType: 'primary',
          secondaryOptionCheckValue: '',
          popupContentArrValue: popupContentArrValue
        }
      });
    }
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
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={ChangeOptionPopup}
          />
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpDisplayPaneOneSectionTwo;
