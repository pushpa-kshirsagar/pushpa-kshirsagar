import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import { SET_POPUP_STATE, SET_SECONDARY_OPTION_VALUE } from '../actionType';
import {
  NOTIFICATION_REPORT_POPUP,
  ASSOCIATE_CARD_POPUP_OPTION,
  GROUP_NODE_ROLE_TYPE_POPUP_OPTION,
  MODULE_POPUP_OPTION,
  REVIEW_REVISE_POPUP,
  EXCHANGE_POPUP_OPTION,
  REVIEW_POPUP_OPTIONS,
  MARKETPLACE_POPUP_OPTION,
  REVIEW_DISTINCT_POPUP_OPTION
} from '../PopUpConfig';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
const PopUpDisplayPanelAssociate = (props) => {
  const {
    popupHeaderOne,
    popupHeaderOneBadgeOne,
    popupHeaderOneBadgeTwo,
    popupOpenType
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
    let revisepopupHeaderOneBadgeTwo = '';
    let reviseisPopUpValue = '';
    let revisePopupType = 'primary';
    let reviseSecondaryOptionCheckValue = '';
    let valueArr = [];

    if (clickValue === 'administrators' || clickValue === 'managers') {
      revisePopupHeaderOne = clickValue;
      revisepopupHeaderOneBadgeOne = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = MODULE_POPUP_OPTION;
      reviseSecondaryOptionCheckValue = 'all';
    }
    if (clickValue === 'notifications' || clickValue === 'reports') {
      revisePopupHeaderOne = clickValue;
      revisepopupHeaderOneBadgeOne = 'review';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = NOTIFICATION_REPORT_POPUP;
      reviseSecondaryOptionCheckValue = 'unread';
    }
    if (
      (popupHeaderOne === 'administrators' || popupHeaderOne === 'managers') &&
      clickValue === 'review'
    ) {
      revisePopupHeaderOne = popupHeaderOne;
      revisepopupHeaderOneBadgeOne = 'review';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = REVIEW_POPUP_OPTIONS;
      reviseSecondaryOptionCheckValue = 'active';
    }
    if (
      (popupHeaderOne === 'groups' ||
        popupHeaderOne === 'nodes' ||
        popupHeaderOne === 'roles' ||
        popupHeaderOne === 'types') &&
      clickValue === 'review'
    ) {
      revisePopupHeaderOne = 'assessees';
      revisepopupHeaderOneBadgeOne = popupHeaderOne;
      revisepopupHeaderOneBadgeTwo = 'review';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = REVIEW_DISTINCT_POPUP_OPTION;
      reviseSecondaryOptionCheckValue = 'active';
    }
    if (clickValue === 'associatereview' || clickValue === 'associaterevise') {
      revisePopupHeaderOne = 'associate';
      revisepopupHeaderOneBadgeOne = clickValue === 'associatereview' ? 'review' : 'revise';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = REVIEW_REVISE_POPUP;
      reviseSecondaryOptionCheckValue = 'all';
    }
    if (
      clickValue === 'groups' ||
      clickValue === 'nodes' ||
      clickValue === 'roles' ||
      clickValue === 'types'
    ) {
      revisePopupHeaderOne = clickValue;
      revisepopupHeaderOneBadgeOne = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = GROUP_NODE_ROLE_TYPE_POPUP_OPTION;
      reviseSecondaryOptionCheckValue = 'assessees';
    }
    if (clickValue === 'exchange') {
      revisePopupHeaderOne = clickValue;
      revisepopupHeaderOneBadgeOne = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = EXCHANGE_POPUP_OPTION;
      reviseSecondaryOptionCheckValue = 'unread';
    }
    if (clickValue === 'download' || clickValue === 'upload') {
      revisePopupHeaderOne = 'assessee';
      revisepopupHeaderOneBadgeOne = clickValue;
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = REVIEW_POPUP_OPTIONS;
      reviseSecondaryOptionCheckValue = 'unread';
    }
    if (clickValue === 'marketplace') {
      revisePopupHeaderOne = 'marketplace';
      revisepopupHeaderOneBadgeOne = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = MARKETPLACE_POPUP_OPTION;
      reviseSecondaryOptionCheckValue = 'unread';
    }
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: revisePopupHeaderOne,
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
    let revisePopupHeaderOne = 'associate';
    let revisepopupHeaderOneBadgeOne = '';
    let revisepopupHeaderOneBadgeTwo = '';
    let reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
    let revisePopupType = 'primary';
    let reviseSecondaryOptionCheckValue = '';
    let valueArr = ASSOCIATE_CARD_POPUP_OPTION;
    if (
      (popupHeaderOne === 'administrators' || popupHeaderOne === 'managers') &&
      popupHeaderOneBadgeOne === 'review'
    ) {
      revisePopupHeaderOne = popupHeaderOne;
      revisepopupHeaderOneBadgeOne = '';
      valueArr = MODULE_POPUP_OPTION;
      revisePopupType = 'secondary';
    }

    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: revisePopupHeaderOne,
        popupHeaderOneBadgeOne: revisepopupHeaderOneBadgeOne,
        popupHeaderOneBadgeTwo: revisepopupHeaderOneBadgeTwo,
        isPopUpValue: reviseisPopUpValue,
        popupOpenType: revisePopupType,
        secondaryOptionCheckValue: '',
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
          headerOneBadgeTwo={popupHeaderOneBadgeTwo}
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

export default PopUpDisplayPanelAssociate;
