import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import {
  GET_ASSESSEE_INFO_SAGA,
  LOADER_START,
  POPUP_CLOSE,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_POPUP_STATE,
  SET_SECONDARY_OPTION_VALUE
} from '../actionType';
import {
  ASSIGNMENT_DISTINCT_POPUP,
  ASSESSEE_CARD_POPUP_OPTIONS,
  NOTIFICATION_REPORT_POPUP,
  REVIEW_REVISE_POPUP,
  SIGN_OUT_POPUP
} from '../PopUpConfig';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import { setAssesseeCardPermissionInJson } from '../Actions/GenericActions';
import { AccountContext } from '../Account';
import { useHistory } from 'react-router-dom';
const PopUpDisplayPanelAssessee = (props) => {
  const { popupHeaderOne, popupHeaderOneBadgeOne, popupOpenType } = useSelector(
    (state) => state.PopUpReducer
  );
  const { assesseePermission } = useSelector((state) => state.UserReducer);

  const dispatch = useDispatch();
  const { headerPanelColour = 'displayPaneLeft', isActive } = props;
  const { signOut } = useContext(AccountContext);
  const history = useHistory();
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
    let revisePopupType = '';
    let reviseSecondaryOptionCheckValue = '';
    let valueArr = [];
    let revisePopupMode = '';
    if (clickValue === 'assesseeselfassignments') {
      revisePopupHeaderOne = 'assignments';
      revisepopupHeaderOneBadgeOne = 'review';
      reviseisPopUpValue = 'ASSESSEE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = ASSIGNMENT_DISTINCT_POPUP;
      reviseSecondaryOptionCheckValue = 'active';
    }
    if (clickValue === 'notifications' || clickValue === 'reports') {
      revisePopupHeaderOne = clickValue;
      revisepopupHeaderOneBadgeOne = 'review';
      reviseisPopUpValue = 'ASSESSEE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = NOTIFICATION_REPORT_POPUP;
      reviseSecondaryOptionCheckValue = 'unread';
    }
    if (clickValue === 'review' || clickValue === 'revise') {
      revisePopupHeaderOne = 'assessee';
      revisepopupHeaderOneBadgeOne = clickValue;
      reviseisPopUpValue = 'ASSESSEE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = REVIEW_REVISE_POPUP;
      reviseSecondaryOptionCheckValue = 'all';
    }
    if (clickValue === 'sign-out') {
      revisePopupHeaderOne = 'assessee';
      revisepopupHeaderOneBadgeOne = clickValue;
      reviseisPopUpValue = 'ASSESSEE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = SIGN_OUT_POPUP;
      reviseSecondaryOptionCheckValue = 'all';
    }
    if (clickValue === 'password') {
      revisePopupHeaderOne = 'assessee';
      revisepopupHeaderOneBadgeOne = clickValue;
      reviseisPopUpValue = 'REVISE_PASSWORD_POPUP';
      revisePopupType = 'secondary';
      valueArr = SIGN_OUT_POPUP;
      reviseSecondaryOptionCheckValue = 'all';
    }
    if (clickValue === 'link') {
      revisePopupHeaderOne = 'associate';
      revisepopupHeaderOneBadgeOne = clickValue;
      reviseisPopUpValue = 'REVISE_CREDENTIAL_SIGNIN_POPUP';
      revisePopupType = 'secondary';
      revisePopupMode = 'ASSOCIATE_LINK';
      valueArr = [];
      reviseSecondaryOptionCheckValue = '';
    }
    if (clickValue === 'information' && popupHeaderOne === 'assessee') {
      dispatch({ type: LOADER_START });
      dispatch({
        type: GET_ASSESSEE_INFO_SAGA,
        payload: {
          assesseeId: '0123456',
          associateId: '0654321',
          filter: 'true',
          search: {
            condition: 'and',
            searchBy: [
              {
                dataType: 'string',
                conditionColumn: 'id',
                conditionValue: {
                  condition: 'eq',
                  value: {
                    from: '6059e3407563fa25f48a3ec5' //'6059d8a32840824c559c40df' //'6051bec0b86b9a68e042cfeb' //'6054a4d6cb14fb2075aeec87'
                  }
                }
              }
            ]
          }
        }
      });
    }
    if (clickValue === 'yes') {
      //sign out
      let path = `/signIn`;
      history.push(path);
      signOut();
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
        popupContentArrValue: valueArr,
        popupMode: revisePopupMode
      }
    });
  };
  const BackHandlerEvent = (e) => {
    if (popupOpenType === 'primary') {
      dispatch({ type: POPUP_CLOSE });
    } else {
      let popupContentArrValue = setAssesseeCardPermissionInJson(
        ASSESSEE_CARD_POPUP_OPTIONS,
        assesseePermission
      );
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: 'assessee',
          popupHeaderOneBadgeOne: '',
          isPopUpValue: 'ASSESSEE_CARD_POPUP',
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

export default PopUpDisplayPanelAssessee;
