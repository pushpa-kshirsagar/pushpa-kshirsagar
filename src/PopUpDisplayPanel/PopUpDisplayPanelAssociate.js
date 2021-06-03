import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent, FormControl, FormHelperText } from '@material-ui/core';
import InputFeild from '../Atoms/InputField/InputField';
import SelectField from '../Atoms/SelectField/SelectField';
import UploadIcon from '@material-ui/icons/Publish';
import DownloadIcon from '@material-ui/icons/GetApp';
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
  SET_DISPLAY_TWO_SINGLE_STATE,
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
  SET_POPUP_SINGLE_STATE,
  CLEAR_ROLE_REDUCER_STATE,
  INTERNAL_NODE_LIST_SAGA,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  CLEAR_NODE_REDUCER_STATE,
  CLEAR_GROUP_REDUCER_STATE,
  SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT,
  CLEAR_ITEM_REDUCER_STATE
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
  ASSESSEE_REVIEW_REVISE_POPUP,
  NODE_POPUP_OPTION,
  SELF_POPUP,
  GROUP_TYPE_POPUP_OPTION,
  ANALYTICS_POPUP,
  MINE_REVIEW,
  UPLOAD_DOWNLOAD_POPUP
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
  makeInternalNodeObj
} from '../Actions/GenericActions';
import {
  getAssociateGroupDistinctApiCall,
  getAssociatesTypeApiCall,
  getInternalNodeApiCall
} from '../Actions/AssociateModuleAction';
import {
  assesseeCreateApiCalls,
  getAdminManagerDistinctApiCall,
  getAdminManagerRoleApiCall,
  getAssesseeGroupDistinctApiCall,
  getAssesseeTypeApiCall,
  getRoleGroupReviewListApi,
  getTypeGroupReviewListApi
} from '../Actions/AssesseeModuleAction';
import { getItemGroupDistinctApiCall, getItemsDistinctApiCall } from '../Actions/ItemModuleAction';
import IconButton from '../Molecules/IconButton/IconButton';
import { Fragment } from 'react';
const PopUpDisplayPanelAssociate = (props) => {
  const {
    popupHeaderOne,
    popupHeaderOneBadgeOne,
    popupHeaderOneBadgeTwo,
    popupHeaderOneBadgeThree,
    popupOpenType,
    secondaryOptionCheckValue,
    currentPopUpOption
  } = useSelector((state) => state.PopUpReducer);
  const { userData, assesseePermission } = useSelector((state) => state.UserReducer);
  const { countPage, selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const [isReviseMode, setIsReviseMode] = useState(false);
  const [exchageMode, setexchageMode] = useState(false);
  const dispatch = useDispatch();
  const { headerPanelColour = 'displayPaneLeft', isActive } = props;
  useEffect(() => {
    setexchageMode(false);
  }, []);
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
    } else if (
      popupHeaderOne === 'administrators' ||
      popupHeaderOne === 'managers' ||
      popupHeaderOne === 'items' ||
      popupHeaderOne === 'interviews' ||
      // popupHeaderOne === 'exchange' ||
      popupHeaderOne === 'assessment centres' ||
      popupHeaderOne === 'associate'
    ) {
      dispatch({
        type: SET_SECONDARY_CREATE_OPTION_VALUE,
        payload: e.currentTarget.getAttribute('data-value')
      });
    } else if (popupHeaderOneBadgeOne === 'exchange') {
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
    if (clickValue === 'mine' || clickValue === 'interviews' || clickValue === 'marketplace') {
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
      (popupHeaderOne === 'administrators' ||
        popupHeaderOne === 'managers' ||
        popupHeaderOne === 'interviews') &&
      clickValue === 'review'
    ) {
      revisePopupHeaderOne = popupHeaderOne;
      revisepopupHeaderOneBadgeOne = 'review';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = REVIEW_POPUP_OPTIONS;
      reviseSecondaryOptionCheckValue = 'active';
    }
    if (clickValue === 'associatereview' || clickValue === 'associaterevise') {
      revisePopupHeaderOne = 'associate';
      revisepopupHeaderOneBadgeOne = 'self';
      revisepopupHeaderOneBadgeTwo = clickValue === 'associatereview' ? 'review' : 'revise';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = REVIEW_REVISE_POPUP;
      reviseSecondaryOptionCheckValue = 'all';
    }
    if (
      clickValue === 'nodes' &&
      popupHeaderOne !== 'administrators' &&
      popupHeaderOne !== 'items' &&
      popupHeaderOne !== 'interviews' &&
      popupHeaderOne !== 'managers'
    ) {
      revisePopupHeaderOne = clickValue;
      revisepopupHeaderOneBadgeOne = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      // valueArr = GROUP_TYPE_POPUP_OPTION;
      valueArr = NODE_POPUP_OPTION;
      reviseSecondaryOptionCheckValue = 'associates';
    }
    if (
      clickValue === 'groups' &&
      popupHeaderOne !== 'administrators' &&
      popupHeaderOne !== 'managers' &&
      popupHeaderOne !== 'assessees' &&
      popupHeaderOne !== 'assessments' &&
      popupHeaderOne !== 'assessments' &&
      popupHeaderOne !== 'items'
    ) {
      revisePopupHeaderOne = clickValue;
      revisepopupHeaderOneBadgeOne = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = GROUP_TYPE_POPUP_OPTION;
      reviseSecondaryOptionCheckValue = '';
    }
    if (
      clickValue === 'types' &&
      popupHeaderOne !== 'administrators' &&
      popupHeaderOne !== 'managers' &&
      popupHeaderOne !== 'assessees' &&
      popupHeaderOne !== 'assessments' &&
      popupHeaderOne !== 'assessments' &&
      popupHeaderOne !== 'items'
    ) {
      revisePopupHeaderOne = clickValue;
      revisepopupHeaderOneBadgeOne = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = GROUP_TYPE_POPUP_OPTION;
      reviseSecondaryOptionCheckValue = '';
    }
    if (
      clickValue === 'roles' &&
      popupHeaderOne !== 'administrators' &&
      popupHeaderOne !== 'managers' &&
      popupHeaderOne !== 'assessees' &&
      popupHeaderOne !== 'assessments' &&
      popupHeaderOne !== 'assessments' &&
      popupHeaderOne !== 'items'
    ) {
      revisePopupHeaderOne = clickValue;
      revisepopupHeaderOneBadgeOne = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = GROUP_NODE_ROLE_TYPE_POPUP_OPTION;
      // valueArr = GROUP_TYPE_POPUP_OPTION;
      reviseSecondaryOptionCheckValue = '';
    }
    if (
      (popupHeaderOne === 'administrators' || popupHeaderOne === 'managers') &&
      clickValue === 'roles'
    ) {
      //call admin and manager role api
      getAdminManagerRoleApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        popupHeaderOne,
        dispatch
      );
    }

    if (clickValue === 'exchange') {
      revisePopupHeaderOne = clickValue;
      revisepopupHeaderOneBadgeOne = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = EXCHANGE_POPUP_OPTION;
      reviseSecondaryOptionCheckValue = '';
    }
    if (
      ((clickValue === 'download' || clickValue === 'upload') &&
        secondaryOptionCheckValue === 'assessees') ||
      secondaryOptionCheckValue === 'associates' ||
      secondaryOptionCheckValue === 'assessments' ||
      secondaryOptionCheckValue === 'assignments' ||
      secondaryOptionCheckValue === 'assessment centres' ||
      secondaryOptionCheckValue === 'culture profiles' ||
      secondaryOptionCheckValue === 'job profiles' ||
      secondaryOptionCheckValue === 'interviews' ||
      secondaryOptionCheckValue === 'items'
    ) {
      revisePopupHeaderOne = secondaryOptionCheckValue;
      revisepopupHeaderOneBadgeOne = clickValue;
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = REVIEW_POPUP_OPTIONS;
      reviseSecondaryOptionCheckValue = 'active';
    }
    if (
      clickValue === 'distinct' &&
      (popupHeaderOne === 'assessees' ||
        popupHeaderOne === 'associates' ||
        popupHeaderOne === 'assessments' ||
        popupHeaderOne === 'assignments' ||
        popupHeaderOne === 'culture profiles' ||
        popupHeaderOne === 'job profiles' ||
        popupHeaderOne === 'interviews' ||
        popupHeaderOne === 'items') &&
      (popupHeaderOneBadgeOne === 'download' || popupHeaderOneBadgeOne === 'upload')
    ) {
      revisePopupHeaderOne = popupHeaderOne;
      revisepopupHeaderOneBadgeOne = 'exchange';
      revisepopupHeaderOneBadgeTwo = popupHeaderOneBadgeOne;
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = UPLOAD_DOWNLOAD_POPUP;
      reviseSecondaryOptionCheckValue = 'all';
      setexchageMode(true);
    }
    if (
      clickValue === 'information' &&
      popupHeaderOne === 'associate' &&
      (popupHeaderOneBadgeOne === 'review' || popupHeaderOneBadgeOne === 'revise')
    ) {
      dispatch({ type: LOADER_START });
      dispatch({
        type: GET_ASSOCIATE_INFO_SAGA,
        payload: {
          secondaryOptionCheckValue,
          isReviseMode,
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
      clearMiddlePaneInfo();
      dispatch({
        type: SET_POPUP_SINGLE_STATE,
        payload: { stateName: 'cardValue', value: 'Card' }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: {
          stateName: 'middlePaneSelectedValue',
          value:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary
        }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'middlePaneListPopupOptions', value: SELF_POPUP }
      });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'typeOfMiddlePaneList', value: 'associateSelfReview' }
      });
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
    }
    if (clickValue === 'associaterevise') {
      // alert('IN');
      setIsReviseMode(true);
    } else {
      setIsReviseMode(false);
    }
    if (clickValue === 'switch') {
      if (userData) {
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
        dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      }
    }
    if (clickValue === 'items') {
      revisePopupHeaderOne = 'items';
      revisepopupHeaderOneBadgeOne = '';
      revisepopupHeaderOneBadgeTwo = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = MODULE_POPUP_OPTION;
      reviseSecondaryOptionCheckValue = '';
    }
    if (clickValue === 'analytics') {
      revisePopupHeaderOne = 'analytics';
      revisepopupHeaderOneBadgeOne = '';
      revisepopupHeaderOneBadgeTwo = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = ANALYTICS_POPUP;
      reviseSecondaryOptionCheckValue = '';
    }
    if (
      clickValue === 'create' &&
      (popupHeaderOne === 'groups' ||
        popupHeaderOne === 'roles' ||
        popupHeaderOne === 'types' ||
        popupHeaderOne === 'nodes')
    ) {
      revisePopupHeaderOne = secondaryOptionCheckValue;
      revisepopupHeaderOneBadgeOne = popupHeaderOne;
      revisepopupHeaderOneBadgeTwo = 'create';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = CREATE_INFORMATION_POPUP;
      reviseSecondaryOptionCheckValue = 'key';
    }
    if ((clickValue === 'create' || clickValue === 'review') && popupHeaderOne === 'items') {
      revisePopupHeaderOne = popupHeaderOne;
      revisepopupHeaderOneBadgeOne = clickValue;
      revisepopupHeaderOneBadgeTwo = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = clickValue === 'create' ? REVIEW_REVISE_POPUP : REVIEW_POPUP_OPTIONS;
      reviseSecondaryOptionCheckValue = clickValue === 'create' ? 'all' : 'active';
    }
    if ((clickValue === 'create' || clickValue === 'review') && popupHeaderOne === 'analytics') {
      revisePopupHeaderOne = secondaryOptionCheckValue;
      revisepopupHeaderOneBadgeOne = clickValue;
      revisepopupHeaderOneBadgeTwo = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = clickValue === 'create' ? REVIEW_REVISE_POPUP : REVIEW_POPUP_OPTIONS;
      reviseSecondaryOptionCheckValue = clickValue === 'create' ? 'key' : 'active';
    }
    if (
      (popupHeaderOne === 'groups' ||
        popupHeaderOne === 'nodes' ||
        popupHeaderOne === 'roles' ||
        popupHeaderOne === 'types') &&
      clickValue === 'review'
    ) {
      revisePopupHeaderOne =
        secondaryOptionCheckValue === 'associate' ? 'associates' : secondaryOptionCheckValue;
      revisepopupHeaderOneBadgeOne = popupHeaderOne;
      revisepopupHeaderOneBadgeTwo = 'review';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = REVIEW_DISTINCT_POPUP_OPTION;
      reviseSecondaryOptionCheckValue = 'active';
    }
    if (
      clickValue === 'create' &&
      (popupHeaderOne === 'mine' || popupHeaderOne === 'marketplace')
    ) {
      revisePopupHeaderOne = popupHeaderOne;
      revisepopupHeaderOneBadgeOne = 'create';
      revisepopupHeaderOneBadgeTwo = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = CREATE_INFORMATION_POPUP;
      reviseSecondaryOptionCheckValue = 'key';
    }
    if (clickValue === 'create' && popupHeaderOne === 'interviews') {
      revisePopupHeaderOne = popupHeaderOne;
      revisepopupHeaderOneBadgeOne = 'create';
      revisepopupHeaderOneBadgeTwo = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = REVIEW_REVISE_POPUP;
      reviseSecondaryOptionCheckValue = 'all';
    }
    if (
      clickValue === 'review' &&
      (popupHeaderOne === 'mine' || popupHeaderOne === 'marketplace')
    ) {
      revisePopupHeaderOne = popupHeaderOne;
      revisepopupHeaderOneBadgeOne = 'review';
      revisepopupHeaderOneBadgeTwo = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = MINE_REVIEW;
      reviseSecondaryOptionCheckValue = 'active';
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
      getAdminManagerDistinctApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        popupHeaderOne,
        dispatch
      );
    }
    if (
      clickValue === 'distinct' &&
      popupHeaderOne === 'items' &&
      popupHeaderOneBadgeOne === 'review'
    ) {
      getItemsDistinctApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        popupHeaderOne,
        dispatch
      );
    }
    if (
      clickValue === 'groups' &&
      popupHeaderOne === 'items' &&
      popupHeaderOneBadgeOne === 'review'
    ) {
      getItemGroupDistinctApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        'groups'
      );
    }
    if (
      clickValue === 'distinct' &&
      popupHeaderOne === 'assessees' &&
      popupHeaderOneBadgeOne === 'roles'
    ) {
      let requestObj = makeAssesseeRoleObj(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        0,
        countPage
      );
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
        popupHeaderOne === 'items' ||
        popupHeaderOne === 'assessments') &&
      popupHeaderOneBadgeOne === 'groups'
    ) {
      let requestObj = {};
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
      if (popupHeaderOne === 'assessees') {
        getAssesseeGroupDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'groups'
        );
      }
      if (popupHeaderOne === 'associates') {
        getAssociateGroupDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'groups'
        );
      }
      if (popupHeaderOne === 'assessments') {
        requestObj = makeAssessmentGroupObj(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          0,
          countPage
        );
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
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
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: popupHeaderOne + 'GroupDistinct' + secondaryOptionCheckValue }
        });
      }
      if (popupHeaderOne === 'assignments') {
        requestObj = makeAssignmentGroupObj(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          0,
          countPage
        );
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
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
      if (popupHeaderOne === 'items') {
        getItemGroupDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'groups'
        );
      }
    }
    if (
      clickValue === 'distinct' &&
      popupHeaderOne === 'associates' &&
      popupHeaderOneBadgeOne === 'nodes'
    ) {
      getInternalNodeApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        popupHeaderOneBadgeOne,
        '',
        'hierarchy',
        'associate'
      );
    }
    if (
      clickValue === 'nodes' &&
      (popupHeaderOne === 'administrators' ||
        popupHeaderOne === 'managers' ||
        popupHeaderOne === 'items')
    ) {
      getInternalNodeApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        'nodes',
        '',
        'hierarchy',
        popupHeaderOne
      );
    }
    if (
      clickValue === 'distinct' &&
      (popupHeaderOne === 'assignments' ||
        popupHeaderOne === 'associates' ||
        popupHeaderOne === 'assessments' ||
        popupHeaderOne === 'assessees') &&
      popupHeaderOneBadgeOne === 'types'
    ) {
      let requestObj = {};
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
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: popupHeaderOne + 'TypeDistinct' + secondaryOptionCheckValue }
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
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: popupHeaderOne + 'TypeDistinct' + secondaryOptionCheckValue }
        });
      }
      if (popupHeaderOne === 'assessees') {
        getAssesseeTypeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'types'
        );
      }
      if (popupHeaderOne === 'associates') {
        getAssociatesTypeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'types',
          popupHeaderOne
        );
      }
    }
    if (
      (popupHeaderOne === 'administrators' || popupHeaderOne === 'managers') &&
      clickValue === 'types'
    ) {
      //call admin and manager type api
      getAssesseeTypeApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        'types',
        popupHeaderOne
      );
    }
    if (
      clickValue === 'information' &&
      (popupHeaderOne === 'administrators' || popupHeaderOne === 'managers')
    ) {
      assesseeCreateApiCalls(
        selectedAssociateInfo,
        dispatch,
        secondaryOptionCheckValue,
        popupHeaderOne === 'administrators' ? 'administrator' : 'manager'
      );

      clearMiddlePaneInfo();
    } else if (clickValue === 'information' && popupHeaderOneBadgeOne === 'roles') {
      dispatch({ type: CLEAR_ROLE_REDUCER_STATE });
      getRoleGroupReviewListApi(selectedAssociateInfo, dispatch, popupHeaderOne);
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: popupHeaderOne + 'ROLECREATE' }
      });
      clearMiddlePaneInfo();
    } else if (
      clickValue === 'information' &&
      popupHeaderOne === 'items' &&
      popupHeaderOneBadgeOne === 'create'
    ) {
      dispatch({ type: CLEAR_ITEM_REDUCER_STATE });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: {
          stateName: 'selectedInformationAllorKey',
          value: secondaryOptionCheckValue
        }
      });
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'ITEMCREATE' }
      });
      clearMiddlePaneInfo();
    } else if (clickValue === 'information' && popupHeaderOneBadgeOne === 'groups') {
      dispatch({ type: CLEAR_GROUP_REDUCER_STATE });
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: popupHeaderOne + 'GROUPCREATE' }
      });
      clearMiddlePaneInfo();
    } else if (clickValue === 'information' && popupHeaderOneBadgeOne === 'types') {
      if (popupHeaderOne === 'assessees' || popupHeaderOne === 'associates') {
        getTypeGroupReviewListApi(selectedAssociateInfo, dispatch, popupHeaderOne);
      } else {
        dispatch({ type: SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT, payload: '' });
      }
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: popupHeaderOne + 'TYPECREATE' }
      });
      clearMiddlePaneInfo();
    } else if (clickValue === 'information' && popupHeaderOneBadgeOne === 'nodes') {
      let requestObj = makeInternalNodeObj(selectedAssociateInfo, 'active', 0, countPage);
      dispatch({ type: CLEAR_NODE_REDUCER_STATE });
      dispatch({ type: LOADER_START });
      dispatch({ type: SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT, payload: requestObj });
      dispatch({
        type: INTERNAL_NODE_LIST_SAGA,
        payload: { request: requestObj, nodeViewState: 'list', isMiddlePaneList: false }
      });
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'NODECREATE' }
      });
      clearMiddlePaneInfo();
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
      // setIsReviseMode(false);
    }
  };
  const clearMiddlePaneInfo = () => {
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
        showMiddlePaneState: false
      }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
  const BackHandlerEvent = (e) => {
    let revisePopupHeaderOne = 'associate';
    let revisepopupHeaderOneBadgeOne = 'self';
    let revisepopupHeaderOneBadgeTwo = '';
    let revisepopupHeaderOneBadgeThree = '';
    let reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
    let revisePopupType = 'primary';
    let valueArr = setAssociateCardPermissionInJson(
      ASSOCIATE_CARD_POPUP_OPTION,
      assesseePermission
    );
    if (popupOpenType === 'primary') {
      dispatch({ type: POPUP_CLOSE });
      setexchageMode(false);
    } else {
      if (
        (popupHeaderOne === 'administrators' ||
          popupHeaderOne === 'managers' ||
          popupHeaderOne === 'interviews') &&
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
        (popupHeaderOne === 'assessees' ||
          popupHeaderOne === 'assessments' ||
          popupHeaderOne === 'assignments' ||
          popupHeaderOne === 'associates' ||
          popupHeaderOne === 'assessment centres' ||
          popupHeaderOne === 'culture profiles' ||
          popupHeaderOne === 'job profiles' ||
          popupHeaderOne === 'interviews' ||
          popupHeaderOne === 'items') &&
        (popupHeaderOneBadgeOne === 'types' || popupHeaderOneBadgeOne === 'type')
      ) {
        revisePopupHeaderOne = 'types';
        revisepopupHeaderOneBadgeOne = '';
        valueArr = GROUP_TYPE_POPUP_OPTION;
        revisePopupType = 'secondary';
      }
      if (
        (popupHeaderOne === 'assessees' ||
          popupHeaderOne === 'assessments' ||
          popupHeaderOne === 'assignments' ||
          popupHeaderOne === 'associates' ||
          popupHeaderOne === 'assessment centres' ||
          popupHeaderOne === 'culture profiles' ||
          popupHeaderOne === 'job profiles' ||
          popupHeaderOne === 'interviews' ||
          popupHeaderOne === 'items') &&
        (popupHeaderOneBadgeOne === 'groups' || popupHeaderOneBadgeOne === 'group')
      ) {
        revisePopupHeaderOne = 'groups';
        revisepopupHeaderOneBadgeOne = '';
        valueArr = GROUP_TYPE_POPUP_OPTION;
        revisePopupType = 'secondary';
      }
      if (
        (popupHeaderOne === 'assessees' ||
          popupHeaderOne === 'assessments' ||
          popupHeaderOne === 'assignments' ||
          popupHeaderOne === 'culture profiles' ||
          popupHeaderOne === 'job profiles' ||
          popupHeaderOne === 'items' ||
          popupHeaderOne === 'associates') &&
        (popupHeaderOneBadgeOne === 'items' || popupHeaderOneBadgeOne === 'item')
      ) {
        revisePopupHeaderOne = 'items';
        revisepopupHeaderOneBadgeOne = '';
        valueArr = GROUP_TYPE_POPUP_OPTION;
        revisePopupType = 'secondary';
      }
      if (
        (popupHeaderOne === 'assessees' ||
          popupHeaderOne === 'assignments' ||
          popupHeaderOne === 'assessments' ||
          popupHeaderOne === 'associates' ||
          popupHeaderOne === 'assessment centres' ||
          popupHeaderOne === 'culture profiles' ||
          popupHeaderOne === 'job profiles' ||
          popupHeaderOne === 'interviews' ||
          popupHeaderOne === 'items') &&
        (popupHeaderOneBadgeOne === 'upload' || popupHeaderOneBadgeOne === 'download')
      ) {
        revisePopupHeaderOne = 'exchange';
        revisepopupHeaderOneBadgeOne = '';
        valueArr = EXCHANGE_POPUP_OPTION;
        revisePopupType = 'secondary';
      }
      if (
        (popupHeaderOne === 'assessees' ||
          popupHeaderOne === 'associates' ||
          popupHeaderOne === 'assessments' ||
          popupHeaderOne === 'assignments' ||
          popupHeaderOne === 'assessment centres' ||
          popupHeaderOne === 'culture profiles' ||
          popupHeaderOne === 'job profiles' ||
          popupHeaderOne === 'interviews' ||
          popupHeaderOne === 'items') &&
        popupHeaderOneBadgeOne === 'exchange' &&
        (popupHeaderOneBadgeTwo === 'upload' || popupHeaderOneBadgeTwo === 'download')
      ) {
        revisePopupHeaderOne = popupHeaderOne;
        revisepopupHeaderOneBadgeOne = popupHeaderOneBadgeTwo;
        revisepopupHeaderOneBadgeTwo = '';
        valueArr = REVIEW_POPUP_OPTIONS;
        revisePopupType = 'secondary';
        setexchageMode(false);
      }
      if (
        (popupHeaderOne === 'assessment centres' ||
          popupHeaderOne === 'culture profiles' ||
          popupHeaderOne === 'job profiles') &&
        (popupHeaderOneBadgeOne === 'create' || popupHeaderOneBadgeOne === 'review')
      ) {
        revisePopupHeaderOne = 'analytics';
        revisepopupHeaderOneBadgeOne = '';
        valueArr = ANALYTICS_POPUP;
        revisePopupType = 'secondary';
      }
      if (
        (popupHeaderOne === 'mine' ||
          popupHeaderOne === 'marketplace' ||
          popupHeaderOne === 'items') &&
        (popupHeaderOneBadgeOne === 'review' || popupHeaderOneBadgeOne === 'create')
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
          popupHeaderOneBadgeThree: revisepopupHeaderOneBadgeThree,
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
          headerOneBadgeThree={popupHeaderOneBadgeThree}
          setexchageMode={setexchageMode}
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
          {exchageMode && (
            <Fragment>
              <FormControl style={{ width: '100%' }}>
                <SelectField
                  tag={'location'}
                  label={'location'}
                  // dataValue={'location'}
                  listSelect={[
                    { id: 'device', name: 'device' },
                    { id: 'google', name: 'google' },
                    { id: 'microsoft', name: 'microsoft' }
                  ]}
                  onChange={null}
                  value={''}
                  mappingValue={'id'}
                />
                <InputFeild id={'template'} label={'template'} value={''} labelBadgeOne={''} />
              </FormControl>
              <IconButton
                Icon={popupHeaderOneBadgeTwo === 'upload' ? UploadIcon : DownloadIcon}
                className=""
                colour="genericOne"
                label={popupHeaderOneBadgeTwo}
                dataValue={popupHeaderOneBadgeTwo}
                onClick={null}
              />
              <FormHelperText className={['helperText', 'helptextmargin'].join(' ')}>
                <span></span>
              </FormHelperText>
            </Fragment>
          )}
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpDisplayPanelAssociate;
