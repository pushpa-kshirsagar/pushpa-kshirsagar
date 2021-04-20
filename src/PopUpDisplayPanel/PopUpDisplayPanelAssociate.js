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
  SET_SECONDARY_CREATE_OPTION_VALUE,
  SET_POPUP_STATE,
  SET_SECONDARY_OPTION_VALUE,
  ASSESSEE_SIGN_ON,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_PAGE_COUNT,
  FILTERMODE,
  SET_REQUEST_OBJECT,
  GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
  GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_GROUP_REVIEW_LIST_SAGA,
  GET_ASSESSMENT_GROUP_REVIEW_LIST_SAGA,
  GET_ASSIGNMENT_GROUP_REVIEW_LIST_SAGA,
  GET_ASSESSMENT_TYPE_REVIEW_LIST_SAGA,
  GET_ASSIGNMENT_TYPE_REVIEW_LIST_SAGA,
  CLEAR_DISPLAY_PANE_THREE,
  ASSESSEE_REVIEW_DISTINCT_SAGA
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
  CREATE_INFORMATION_POPUP,
  ASSESSEE_REVIEW_REVISE_POPUP
} from '../PopUpConfig';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import {
  setAssociateCardPermissionInJson,
  makeAssesseeRoleObj,
  makeAssociateRoleObj,
  makeAssesseeGroupObj,
  makeAssociateGroupObj,
  makeAssessmentGroupObj,
  makeAssignmentGroupObj,
  makeAssessmentTypeObj,
  makeAssignmentTypeObj,
  makeAdministratorsReviewListRequestObject,
  makeManagersReviewListRequestObject
} from '../Actions/GenericActions';
const PopUpDisplayPanelAssociate = (props) => {
  const {
    popupHeaderOne,
    popupHeaderOneBadgeOne,
    popupHeaderOneBadgeTwo,
    popupOpenType,
    secondaryOptionCheckValue,
    currentPopUpOption
  } = useSelector((state) => state.PopUpReducer);
  const { userData, assesseePermission } = useSelector((state) => state.UserReducer);
  const { countPage, selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);

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
    } else if (popupHeaderOne === 'types') {
      if (
        e.currentTarget.getAttribute('data-value') === 'assignments' ||
        e.currentTarget.getAttribute('data-value') === 'assessments'
      ) {
        dispatch({
          type: SET_SECONDARY_OPTION_VALUE,
          payload: e.currentTarget.getAttribute('data-value')
        });
      }
    } else if (
      popupHeaderOne === 'administrators' ||
      popupHeaderOne === 'managers' ||
      popupHeaderOne === 'associate'
    ) {
      dispatch({
        type: SET_SECONDARY_CREATE_OPTION_VALUE,
        payload: e.currentTarget.getAttribute('data-value')
      });
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
      revisePopupHeaderOne = secondaryOptionCheckValue;
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
      reviseSecondaryOptionCheckValue = '';
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
      reviseSecondaryOptionCheckValue = '';
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
      dispatch({ type: LOADER_START });
      dispatch({
        type: GET_ASSOCIATE_INFO_SAGA,
        payload: {
          secondaryOptionCheckValue,
          reqBody: {
            assesseeId: selectedAssociateInfo?.assesseeId,
            associateId:
              selectedAssociateInfo?.associate?.informationEngagement.associateTag
                .associateTagPrimary,
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
                        from:
                          selectedAssociateInfo?.associate?.informationEngagement.associateTag
                            .associateTagPrimary
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
    if (clickValue === 'create' && popupHeaderOne === 'roles') {
      revisePopupHeaderOne = secondaryOptionCheckValue;
      revisepopupHeaderOneBadgeOne = 'role';
      revisepopupHeaderOneBadgeTwo = 'create';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = CREATE_INFORMATION_POPUP;
      reviseSecondaryOptionCheckValue = 'key';
    }
    if (clickValue === 'create' && popupHeaderOne === 'groups') {
      revisePopupHeaderOne = secondaryOptionCheckValue;
      revisepopupHeaderOneBadgeOne = 'group';
      revisepopupHeaderOneBadgeTwo = 'create';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = CREATE_INFORMATION_POPUP;
      reviseSecondaryOptionCheckValue = 'key';
    }
    if (clickValue === 'create' && popupHeaderOne === 'types') {
      revisePopupHeaderOne = secondaryOptionCheckValue;
      revisepopupHeaderOneBadgeOne = 'type';
      revisepopupHeaderOneBadgeTwo = 'create';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = CREATE_INFORMATION_POPUP;
      reviseSecondaryOptionCheckValue = 'key';
    }
    if (
      clickValue === 'create' &&
      (popupHeaderOne === 'administrators' || popupHeaderOne === 'managers')
    ) {
      revisePopupHeaderOne = popupHeaderOne;
      revisepopupHeaderOneBadgeOne = 'create';
      revisepopupHeaderOneBadgeTwo = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = ASSESSEE_REVIEW_REVISE_POPUP;
      reviseSecondaryOptionCheckValue = 'all';
    }
    if (
      clickValue === 'information' &&
      (popupHeaderOne === 'assessees' || popupHeaderOne === 'associates')
    ) {
      // console.log('*************IN ASSESSEE _*************');
      // dispatch({
      //   type: SET_POPUP_VALUE,
      //   payload: { isPopUpValue: 'NAMEPOPUP', popupMode: popupHeaderOne + 'ROLECREATE' }
      // });
    }
    if (
      clickValue === 'distinct' &&
      (popupHeaderOne === 'administrators' || popupHeaderOne === 'managers') &&
      popupHeaderOneBadgeOne === 'review'
    ) {
      let requestObj = makeAdministratorsReviewListRequestObject(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        0,
        countPage
      );
      if (popupHeaderOne === 'managers') {
        requestObj = makeManagersReviewListRequestObject(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          0,
          countPage
        );
      }
      dispatch({ type: SET_PAGE_COUNT, payload: 1 });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: popupHeaderOne + 'Distinct' + secondaryOptionCheckValue }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
      dispatch({
        type: ASSESSEE_REVIEW_DISTINCT_SAGA,
        payload: {
          request: requestObj,
          HeaderOne: popupHeaderOne,
          BadgeOne: 'distinct',
          BadgeTwo: secondaryOptionCheckValue,
          BadgeThree: '',
          isMiddlePaneList: true
        }
      });
    }
    if (
      clickValue === 'distinct' &&
      popupHeaderOne === 'assessees' &&
      popupHeaderOneBadgeOne === 'roles'
    ) {
      let requestObj = makeAssesseeRoleObj(
        secondaryOptionCheckValue,
        secondaryOptionCheckValue,
        0,
        countPage
      );
      dispatch({ type: SET_PAGE_COUNT, payload: 1 });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'assesseeRoleDistinct' + secondaryOptionCheckValue }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
      dispatch({
        type: GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
        payload: {
          request: requestObj,
          BadgeOne: 'roles',
          BadgeTwo: 'distinct',
          BadgeThree: secondaryOptionCheckValue,
          isMiddlePaneList: true
        }
      });
    }
    if (
      clickValue === 'distinct' &&
      popupHeaderOne === 'associates' &&
      popupHeaderOneBadgeOne === 'roles'
    ) {
      let requestObj = makeAssociateRoleObj(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        0,
        countPage
      );
      dispatch({ type: SET_PAGE_COUNT, payload: 1 });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: 'associateRoleDistinct' + secondaryOptionCheckValue }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
      dispatch({
        type: GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA,
        payload: {
          request: requestObj,
          BadgeOne: 'roles',
          BadgeTwo: 'distinct',
          BadgeThree: secondaryOptionCheckValue,
          isMiddlePaneList: true
        }
      });
    }
    if (
      clickValue === 'distinct' &&
      (popupHeaderOne === 'assessees' ||
        popupHeaderOne === 'assignments' ||
        popupHeaderOne === 'associates' ||
        popupHeaderOne === 'assessments') &&
      popupHeaderOneBadgeOne === 'groups'
    ) {
      let requestObj = {};
      dispatch({ type: SET_PAGE_COUNT, payload: 1 });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
      if (popupHeaderOne === 'assessees') {
        requestObj = makeAssesseeGroupObj(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          0,
          countPage
        );
        dispatch({
          type: GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
          payload: {
            request: requestObj,
            BadgeOne: 'groups',
            BadgeTwo: 'distinct',
            BadgeThree: secondaryOptionCheckValue,
            isMiddlePaneList: true
          }
        });
      }
      if (popupHeaderOne === 'associates') {
        requestObj = makeAssociateGroupObj(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          0,
          countPage
        );
        dispatch({
          type: GET_ASSOCIATE_GROUP_REVIEW_LIST_SAGA,
          payload: {
            request: requestObj,
            BadgeOne: 'groups',
            BadgeTwo: 'distinct',
            BadgeThree: secondaryOptionCheckValue,
            isMiddlePaneList: true
          }
        });
      }
      if (popupHeaderOne === 'assessments') {
        requestObj = makeAssessmentGroupObj(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          0,
          countPage
        );
        dispatch({
          type: GET_ASSESSMENT_GROUP_REVIEW_LIST_SAGA,
          payload: {
            request: requestObj,
            BadgeOne: 'groups',
            BadgeTwo: 'distinct',
            BadgeThree: secondaryOptionCheckValue,
            isMiddlePaneList: true
          }
        });
      }
      if (popupHeaderOne === 'assignments') {
        requestObj = makeAssignmentGroupObj(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          0,
          countPage
        );
        dispatch({
          type: GET_ASSIGNMENT_GROUP_REVIEW_LIST_SAGA,
          payload: {
            request: requestObj,
            BadgeOne: 'groups',
            BadgeTwo: 'distinct',
            BadgeThree: secondaryOptionCheckValue,
            isMiddlePaneList: true
          }
        });
      }
      dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: popupHeaderOne + 'GroupDistinct' + secondaryOptionCheckValue }
      });
    }
    if (
      clickValue === 'distinct' &&
      (popupHeaderOne === 'assignments' || popupHeaderOne === 'assessments') &&
      popupHeaderOneBadgeOne === 'types'
    ) {
      let requestObj = {};
      dispatch({ type: SET_PAGE_COUNT, payload: 1 });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
      if (popupHeaderOne === 'assessments') {
        requestObj = makeAssessmentTypeObj(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          0,
          countPage
        );
        dispatch({
          type: GET_ASSESSMENT_TYPE_REVIEW_LIST_SAGA,
          payload: {
            request: requestObj,
            BadgeOne: 'types',
            BadgeTwo: 'distinct',
            BadgeThree: secondaryOptionCheckValue,
            isMiddlePaneList: true
          }
        });
      }
      if (popupHeaderOne === 'assignments') {
        requestObj = makeAssignmentTypeObj(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          0,
          countPage
        );
        dispatch({
          type: GET_ASSIGNMENT_TYPE_REVIEW_LIST_SAGA,
          payload: {
            request: requestObj,
            BadgeOne: 'types',
            BadgeTwo: 'distinct',
            BadgeThree: secondaryOptionCheckValue,
            isMiddlePaneList: true
          }
        });
      }
      dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
      dispatch({
        type: FILTERMODE,
        payload: { FilterMode: popupHeaderOne + 'TypeDistinct' + secondaryOptionCheckValue }
      });
    }
    if (
      clickValue === 'information' &&
      (popupHeaderOne === 'administrators' || popupHeaderOne === 'managers')
    ) {
      dispatch({
        type: ASSESSEE_SIGN_ON,
        payload: { isPopUpValue: 'ASSESSEENAMEPOPUP', popupMode: 'ADMINISTRATOR_CREATE' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'selectedInformationAllorKey', value: secondaryOptionCheckValue }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: {
          stateName: 'typeOfAssesseeCreate',
          value: popupHeaderOne === 'administrators' ? 'administrator' : 'manager'
        }
      });
    } else if (clickValue === 'information' && popupHeaderOneBadgeOne === 'role') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: popupHeaderOne + 'ROLECREATE' }
      });
    } else if (clickValue === 'information' && popupHeaderOneBadgeOne === 'group') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: popupHeaderOne + 'GROUPCREATE' }
      });
    } else if (clickValue === 'information' && popupHeaderOneBadgeOne === 'type') {
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: popupHeaderOne + 'TYPECREATE' }
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
        (popupHeaderOneBadgeOne === 'review' || popupHeaderOneBadgeOne === 'create')
      ) {
        revisePopupHeaderOne = popupHeaderOne;
        revisepopupHeaderOneBadgeOne = '';
        valueArr = MODULE_POPUP_OPTION;
        revisePopupType = 'secondary';
      }
      if (
        (popupHeaderOne === 'assessees' || popupHeaderOne === 'associates') &&
        (popupHeaderOneBadgeOne === 'roles' || popupHeaderOneBadgeOne === 'role')
      ) {
        revisePopupHeaderOne = 'roles';
        revisepopupHeaderOneBadgeOne = '';
        valueArr = GROUP_NODE_ROLE_TYPE_POPUP_OPTION;
        revisePopupType = 'secondary';
      }
      if (
        (popupHeaderOne === 'assessments' || popupHeaderOne === 'assignments') &&
        (popupHeaderOneBadgeOne === 'types' || popupHeaderOneBadgeOne === 'type')
      ) {
        revisePopupHeaderOne = 'types';
        revisepopupHeaderOneBadgeOne = '';
        valueArr = GROUP_NODE_ROLE_TYPE_POPUP_OPTION;
        revisePopupType = 'secondary';
      }
      if (
        (popupHeaderOne === 'assessees' ||
          popupHeaderOne === 'assessments' ||
          popupHeaderOne === 'assignments' ||
          popupHeaderOne === 'associates') &&
        (popupHeaderOneBadgeOne === 'groups' || popupHeaderOneBadgeOne === 'group')
      ) {
        revisePopupHeaderOne = 'groups';
        revisepopupHeaderOneBadgeOne = '';
        valueArr = GROUP_NODE_ROLE_TYPE_POPUP_OPTION;
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
          popupContentArrValue: valueArr,
          currentPopUpOption: []
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
