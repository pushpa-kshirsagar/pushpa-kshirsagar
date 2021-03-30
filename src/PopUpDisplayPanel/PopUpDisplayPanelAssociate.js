import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import {
  SET_POPUP_VALUE,
  GET_ASSOCIATE_INFO_SAGA,
  LOADER_START,
  POPUP_CLOSE,
  SET_MIDDLEPANE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_POPUP_SINGLE_STATE,
  SET_POPUP_STATE,
  SET_SECONDARY_OPTION_VALUE
} from '../actionType';
import {
  NOTIFICATION_REPORT_POPUP,
  ASSOCIATE_CARD_POPUP_OPTION,
  MODULE_POPUP_OPTION,
  REVIEW_REVISE_POPUP,
  EXCHANGE_POPUP_OPTION,
  REVIEW_POPUP_OPTIONS,
  MARKETPLACE_POPUP_OPTION,
  REVIEW_DISTINCT_POPUP_OPTION,
  GROUP_NODE_ROLE_TYPE_POPUP_OPTION,
  CREATE_INFORMATION_POPUP
} from '../PopUpConfig';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import {
  setAssociateCardPermissionInJson,
  setAssociateCardEnableInJson
} from '../Actions/GenericActions';
const PopUpDisplayPanelAssociate = (props) => {
  const {
    popupHeaderOne,
    popupHeaderOneBadgeOne,
    popupHeaderOneBadgeTwo,
    popupOpenType,
    secondaryOptionCheckValue,
    isPopUpValue,
    currentPopUpOption
  } = useSelector((state) => state.PopUpReducer);
  const { userData, assesseePermission } = useSelector((state) => state.UserReducer);

  const dispatch = useDispatch();
  const { headerPanelColour = 'displayPaneLeft', isActive } = props;

  const setSecondaryOptionValue = (e) => {
    if (popupHeaderOne === 'roles') {
      if (
        e.currentTarget.getAttribute('data-value') === 'assessees' ||
        e.currentTarget.getAttribute('data-value') === 'associates'
      ) {
        dispatch({
          type: SET_SECONDARY_OPTION_VALUE,
          payload: e.currentTarget.getAttribute('data-value')
        });
      }
    } else {
      dispatch({
        type: SET_SECONDARY_OPTION_VALUE,
        payload: e.currentTarget.getAttribute('data-value')
      });
    }

    // dispatch({type:SET_POPUP_SINGLE_STATE,payload:{stateName:'popupContentArrValue',value:''}})
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
      valueArr = setAssociateCardPermissionInJson(MODULE_POPUP_OPTION, assesseePermission);
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
    if (clickValue === 'nodes') {
      revisePopupHeaderOne = clickValue;
      revisepopupHeaderOneBadgeOne = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = GROUP_NODE_ROLE_TYPE_POPUP_OPTION;
      reviseSecondaryOptionCheckValue = 'associate';
    }
    if (clickValue === 'groups') {
      revisePopupHeaderOne = clickValue;
      revisepopupHeaderOneBadgeOne = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = GROUP_NODE_ROLE_TYPE_POPUP_OPTION;
      reviseSecondaryOptionCheckValue = 'assessees';
    }
    if (clickValue === 'roles') {
      revisePopupHeaderOne = clickValue;
      revisepopupHeaderOneBadgeOne = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = GROUP_NODE_ROLE_TYPE_POPUP_OPTION;
      reviseSecondaryOptionCheckValue = '';
    }
    if (clickValue === 'types') {
      revisePopupHeaderOne = clickValue;
      revisepopupHeaderOneBadgeOne = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = GROUP_NODE_ROLE_TYPE_POPUP_OPTION;
      reviseSecondaryOptionCheckValue = 'assessments';
    }
    if (clickValue === 'exchange') {
      revisePopupHeaderOne = clickValue;
      revisepopupHeaderOneBadgeOne = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = EXCHANGE_POPUP_OPTION;
      reviseSecondaryOptionCheckValue = 'assessees';
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
    if (clickValue === 'information' && popupHeaderOne === 'associate') {
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++');
      dispatch({ type: LOADER_START });
      dispatch({
        type: GET_ASSOCIATE_INFO_SAGA,
        payload: {
          secondaryOptionCheckValue,
          reqBody: {
            assesseeId: '0123456',
            associateId: '605255729d3c823d3964e0ec',
            filter: true,
            search: [
              {
                condition: 'and',
                searchBy: [
                  {
                    dataType: 'String',
                    conditionColumn: 'id',
                    conditionValue: {
                      condition: 'eq',
                      value: {
                        from: '605255729d3c823d3964e0ec'
                      }
                    }
                  }
                ]
              }
            ]
          }
        }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
    }
    if (clickValue === 'switch') {
      dispatch({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: 'associate',
          middlePaneHeaderBadgeOne: 'active',
          middlePaneHeaderBadgeTwo: '',
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: 'assesseeRelatedAssociate',
          scanCount: userData.length,
          showMiddlePaneState: true
        }
      });
    }
    if (clickValue === 'create') {
      revisePopupHeaderOne = secondaryOptionCheckValue;
      revisepopupHeaderOneBadgeOne = 'role';
      revisepopupHeaderOneBadgeTwo = 'create';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = CREATE_INFORMATION_POPUP;
      reviseSecondaryOptionCheckValue = 'key';
    }
    if (clickValue === 'information' && (popupHeaderOne==='assessees' || popupHeaderOne==='associates' )) {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: popupHeaderOne+'ROLECREATE' }
      });
    } else {
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: revisePopupHeaderOne,
          popupHeaderOneBadgeOne: revisepopupHeaderOneBadgeOne,
          popupHeaderOneBadgeTwo: revisepopupHeaderOneBadgeTwo,
          isPopUpValue: reviseisPopUpValue,
          popupOpenType: revisePopupType,
          secondaryOptionCheckValue: reviseSecondaryOptionCheckValue,
          popupContentArrValue: valueArr,
          currentPopUpOption: []
        }
      });
    }
  };
  const BackHandlerEvent = (e) => {
    let revisePopupHeaderOne = 'associate';
    let revisepopupHeaderOneBadgeOne = '';
    let revisepopupHeaderOneBadgeTwo = '';
    let reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
    let revisePopupType = 'primary';
    let valueArr = setAssociateCardPermissionInJson(
      ASSOCIATE_CARD_POPUP_OPTION,
      assesseePermission
    );
    if (popupOpenType === 'primary') {
      dispatch({ type: POPUP_CLOSE });
    } else {
      if (
        (popupHeaderOne === 'administrators' || popupHeaderOne === 'managers') &&
        popupHeaderOneBadgeOne === 'review'
      ) {
        revisePopupHeaderOne = popupHeaderOne;
        revisepopupHeaderOneBadgeOne = '';
        valueArr = valueArr = setAssociateCardPermissionInJson(
          MODULE_POPUP_OPTION,
          assesseePermission
        );
        revisePopupType = 'secondary';
      }
      if (
        popupHeaderOne === 'assessee' &&
        (popupHeaderOneBadgeOne === 'upload' || popupHeaderOneBadgeOne === 'download')
      ) {
        revisePopupHeaderOne = 'exchange';
        revisepopupHeaderOneBadgeOne = '';
        valueArr = EXCHANGE_POPUP_OPTION;
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
    }
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
            secondaryOptionCheckValue={secondaryOptionCheckValue}
            currentPopUpOption={currentPopUpOption}
          />
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpDisplayPanelAssociate;
