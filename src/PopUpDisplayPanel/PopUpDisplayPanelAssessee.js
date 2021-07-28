import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import {
  CLEAR_DISPLAY_PANE_THREE,
  CLEAR_SIGN_ON_SINGLE_STATE,
  GET_ASSESSEE_INFO_SAGA,
  LOADER_START,
  POPUP_CLOSE,
  RESET_ALL_REDUCER,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_POPUP_SINGLE_STATE,
  SET_POPUP_STATE,
  SET_SECONDARY_OPTION_VALUE,
  GET_ASSESSEE_ASSIGNMENT_SAGA,
  FILTERMODE,
  SET_REQUEST_OBJECT,
  SET_PAGE_COUNT
} from '../actionType';
import {
  ASSIGNMENT_DISTINCT_POPUP,
  ASSESSEE_CARD_POPUP_OPTIONS,
  NOTIFICATION_REPORT_POPUP,
  REVIEW_REVISE_POPUP,
  SIGN_OUT_POPUP,
  SELF_POPUP
} from '../PopUpConfig';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import { setAssesseeCardPermissionInJson } from '../Actions/GenericActions';
import { AccountContext } from '../Account';
import { useHistory } from 'react-router-dom';
import { SIGN_IN_URL } from '../endpoints';
const PopUpDisplayPanelAssessee = (props) => {
  const {
    popupHeaderOne,
    popupHeaderOneBadgeOne,
    popupHeaderOneBadgeTwo,
    popupOpenType,
    secondaryOptionCheckValue
  } = useSelector((state) => state.PopUpReducer);
  const { assesseePermission } = useSelector((state) => state.UserReducer);
  const { selectedAssociateInfo, countPage } = useSelector((state) => state.DisplayPaneTwoReducer);
  const dispatch = useDispatch();
  const { headerPanelColour = 'displayPaneLeft', isActive } = props;
  // const { signOut } = useContext(AccountContext);
  const history = useHistory();
  const [isReviseMode, setIsReviseMode] = useState(false);
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
      revisepopupHeaderOneBadgeTwo = '';
      reviseisPopUpValue = 'ASSESSEE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = ASSIGNMENT_DISTINCT_POPUP;
      reviseSecondaryOptionCheckValue = 'active';
    }
    if (clickValue === 'notifications' || clickValue === 'reports') {
      revisePopupHeaderOne = clickValue;
      revisepopupHeaderOneBadgeOne = 'review';
      revisepopupHeaderOneBadgeTwo = '';
      reviseisPopUpValue = 'ASSESSEE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = NOTIFICATION_REPORT_POPUP;
      reviseSecondaryOptionCheckValue = 'unread';
    }
    if (clickValue === 'review' || clickValue === 'revise') {
      revisePopupHeaderOne = 'assessee';
      revisepopupHeaderOneBadgeOne = 'self';
      revisepopupHeaderOneBadgeTwo = clickValue;
      reviseisPopUpValue = 'ASSESSEE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = REVIEW_REVISE_POPUP;
      reviseSecondaryOptionCheckValue = 'all';
    }
    if (clickValue === 'sign-out') {
      revisePopupHeaderOne = 'assessee';
      revisepopupHeaderOneBadgeOne = 'self';
      revisepopupHeaderOneBadgeTwo = clickValue;
      reviseisPopUpValue = 'ASSESSEE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = SIGN_OUT_POPUP;
      reviseSecondaryOptionCheckValue = 'all';
    }
    if (clickValue === 'password') {
      revisePopupHeaderOne = 'assessee';
      revisepopupHeaderOneBadgeOne = clickValue;
      revisepopupHeaderOneBadgeTwo = 'self';
      reviseisPopUpValue = 'REVISE_PASSWORD_POPUP';
      revisePopupType = 'secondary';
      valueArr = SIGN_OUT_POPUP;
      reviseSecondaryOptionCheckValue = 'all';
    }
    if (clickValue === 'link') {
      revisePopupHeaderOne = 'assessee';
      revisepopupHeaderOneBadgeOne = 'self';
      revisepopupHeaderOneBadgeTwo = 'link';
      reviseisPopUpValue = 'REVISE_CREDENTIAL_SIGNIN_POPUP';
      revisePopupType = 'secondary';
      revisePopupMode = 'ASSOCIATE_LINK';
      valueArr = [];
      reviseSecondaryOptionCheckValue = '';
      dispatch({ type: CLEAR_SIGN_ON_SINGLE_STATE });
      dispatch({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: '',
          middlePaneHeaderBadgeOne: '',
          middlePaneHeaderBadgeTwo: '',
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: '',
          scanCount: null,
          showMiddlePaneState: false,
          selectedTagsArray: [],
          unselectedTagsArray: []
        }
      });
      dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
    }
    if (clickValue === 'revise') {
      setIsReviseMode(true);
    }
    if (clickValue === 'information' && popupHeaderOne === 'assessee') {
      dispatch({ type: LOADER_START });
      dispatch({
        type: GET_ASSESSEE_INFO_SAGA,
        payload: {
          secondaryOptionCheckValue,
          headerOne: 'assessee',
          isReviseMode,
          reqBody: {
            assesseeId: selectedAssociateInfo?.assesseeId,
            associateId:
              selectedAssociateInfo?.associate?.informationEngagement.associateTag
                .associateTagPrimary,
            filter: 'true',
            searchCondition: 'AND',
            search: [
              {
                condition: 'and',
                searchBy: [
                  {
                    dataType: 'string',
                    conditionColumn: 'id',
                    conditionValue: {
                      condition: 'eq',
                      value: {
                        from: selectedAssociateInfo?.assesseeId
                      }
                    }
                  }
                ]
              }
            ]
          }
        }
      });
      setIsReviseMode(false);
      dispatch({
        type: SET_POPUP_SINGLE_STATE,
        payload: { stateName: 'cardValue', value: 'Card' }
      });

      dispatch({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: '',
          middlePaneHeaderBadgeOne: '',
          middlePaneHeaderBadgeTwo: '',
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: 'assesseesSelfReview',
          scanCount: null,
          showMiddlePaneState: false
        }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'middlePaneListPopupOptions', value: SELF_POPUP }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'middlePaneSelectedValue', value: selectedAssociateInfo?.assesseeId }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
    }
    if (clickValue === 'distinct' && popupHeaderOne === 'assignments') {
      let reqBody = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
        countPage: countPage,
        numberPage: 0,
        filter: 'true',
        orderBy: {
          columnName: '',
          order: 'asc'
        },
        searchCondition: 'AND',
        search: [
          {
            condition: 'and',
            searchBy: [
              {
                dataType: 'string',
                conditionColumn: 'status',
                conditionValue: {
                  condition: 'eq',
                  value: {
                    from: secondaryOptionCheckValue.toUpperCase()
                  }
                }
              }
            ]
          }
        ]
      };
      dispatch({ type: SET_REQUEST_OBJECT, payload: reqBody });
      dispatch({ type: SET_PAGE_COUNT, payload: 0 });
      // let reqBody = {
      //   assesseeId: selectedAssociateInfo?.assesseeId,
      //   associateId:
      //     selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      //   countPage: countPage,
      //   numberPage: 0,
      //   filter: 'true',
      //   orderBy: {
      //     columnName: 'informationBasic.assesseeAssignmentName',
      //     order: 'asc'
      //   },
      //   search: [
      //     {
      //       condition: 'and',
      //       searchBy: [
      //         {
      //           dataType: 'string',
      //           conditionColumn: 'assesseeAssignmentStatus',
      //           conditionValue: {
      //             condition: 'eq',
      //             from: secondaryOptionCheckValue.toUpperCase()
      //           }
      //         }
      //       ]
      //     }
      //   ]
      // };
      dispatch({ type: LOADER_START });
      dispatch({
        type: GET_ASSESSEE_ASSIGNMENT_SAGA,
        payload: {
          request: reqBody,
          BadgeOne: secondaryOptionCheckValue,
          BadgeTwo: '',
          BadgeThree: ''
        }
      });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assesseeAssignmentDistinct' + secondaryOptionCheckValue }
      });
      dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'relatedReviewListDistinctData', value: [] }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
    }
    // dispatch({
    //   type: SET_DISPLAY_TWO_SINGLE_STATE,
    //   payload: { stateName: 'showMiddlePaneState', value: false }
    // });

    if (clickValue === 'yes') {
      //sign out
      history.push(SIGN_IN_URL);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('parentId');
      localStorage.removeItem('assesseeId');
      localStorage.clear();
      dispatch({ type: RESET_ALL_REDUCER });
      // signOut();
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
        selectedTagValue: selectedAssociateInfo?.assesseeId,
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
          popupHeaderOneBadgeOne: 'self',
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
          headerOneBadgeTwo={popupHeaderOneBadgeTwo}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            ChangeOptionPopup={ChangeOptionPopup}
            secondaryOptionCheckValue={secondaryOptionCheckValue}
          />
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpDisplayPanelAssessee;
