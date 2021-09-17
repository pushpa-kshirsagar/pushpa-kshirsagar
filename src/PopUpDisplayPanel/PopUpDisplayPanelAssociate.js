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
  GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA,
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
  CLEAR_TYPE_REDUCER_STATE,
  GET_ASSESSEEROLE_ASSESSEE_REVIEW_LIST
} from '../actionType';
import {
  NOTIFICATION_REPORT_POPUP,
  ASSOCIATE_CARD_POPUP_OPTION,
  MODULE_POPUP_OPTION,
  REVIEW_REVISE_POPUP,
  EXCHANGE_POPUP_OPTION,
  REVIEW_POPUP_OPTIONS,
  REVIEW_DISTINCT_POPUP_OPTION,
  CREATE_INFORMATION_POPUP,
  ASSESSEE_REVIEW_REVISE_POPUP,
  NODE_POPUP_OPTION,
  SELF_POPUP,
  GROUP_TYPE_POPUP_OPTION,
  ANALYTICS_POPUP,
  MINE_REVIEW,
  UPLOAD_DOWNLOAD_POPUP,
  ROLE_POPUP_OPTION
} from '../PopUpConfig';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import {
  makeAssesseeRoleObj,
  makeAssociateRoleObj,
  makeAssignmentGroupObj,
  makeAssessmentTypeObj,
  makeAssesseeGroupClassificationObj,
  makeInternalNodeObj
} from '../Actions/GenericActions';
import {
  AssociateSetUpApiCalls,
  getAssociateGroupDistinctApiCall,
  getAssociatesTypeApiCall,
  getInternalNodeApiCall
} from '../Actions/AssociateModuleAction';
import {
  assesseeCreateApiCalls,
  getAdminManagerDistinctApiCall,
  getAdminManagerRoleApiCall,
  getAssesseeGroupDistinctApiCall,
  getAssesseeRoleAssesseeReqObj,
  getAssesseeTypeApiCall,
  getClassificationReviewListApi,
  getRoleGroupReviewListApi,
  getTypeGroupReviewListApi
} from '../Actions/AssesseeModuleAction';
import {
  createItemPopupApiCall,
  getItemGroupDistinctApiCall,
  getItemsDistinctApiCall,
  getItemsTypeApiCall
} from '../Actions/ItemModuleAction';
import IconButton from '../Molecules/IconButton/IconButton';
import { Fragment } from 'react';
import {
  getAssessmentGroupApiCall,
  getAssessmentTypeApiCall
} from '../Actions/AssessmentModuleAction';
import { ADMINISTRATOR_SECONDARY_ID } from '../endpoints';
import { assignmentTypeApiCall } from '../Actions/AssignmentModuleAction';
import {
  cultureProfileCreatePopup,
  getCultureProfileGroupApiCall,
  getCultureProfilesDistinctApiCall,
  getCultureProfileTypeApiCall
} from '../Actions/ActionCultureProfile';
import {
  getJobProfileGroupApiCall,
  getJobProfilesDistinctApiCall,
  getJobProfileTypeApiCall,
  jobProfileCreatePopup
} from '../Actions/ActionJobProfile';
const PopUpDisplayPanelAssociate = (props) => {
  const {
    popupHeaderOne,
    popupHeaderOneBadgeOne,
    popupHeaderOneBadgeTwo,
    popupHeaderOneBadgeThree,
    popupOpenType,
    secondaryOptionCheckValue,
    tertiaryOptionCheckValue,
    forthOptionCheckValue,
    currentPopUpOption,
    popupContentArrValue
  } = useSelector((state) => state.PopUpReducer);
  const { userData, assesseePermission } = useSelector((state) => state.UserReducer);
  const { countPage, selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const [isReviseMode, setIsReviseMode] = useState(false);
  const [exchageMode, setexchageMode] = useState(false);
  const [duplicateHeader, setDuplicateHeader] = useState('');
  const [duplicateBadgeOne, setDuplicateBadgeOne] = useState('');
  const [duplicateBadgeTwo, setDuplicateBadgeTwo] = useState('');
  const [duplicateValueArr, setDuplicateValueArr] = useState('');
  const [duplicateSecondaryOpt, setDuplicateSecondaryOpt] = useState('');
  const dispatch = useDispatch();
  const { headerPanelColour = 'displayPaneLeft', isActive } = props;
  useEffect(() => {
    setexchageMode(false);
  }, []);

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
        scanCount: '',
        showMiddlePaneState: false
      }
    });
    dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  };
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
      popupHeaderOne === 'culture profiles' ||
      popupHeaderOne === 'job profiles' ||
      popupHeaderOne === 'profiler' ||
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
    let reviseThiredOptionCheckValue = '';
    let reviseForthOptionCheckValue = '';
    let valueArr = [];

    if (
      (clickValue === 'administrators' || clickValue === 'managers') &&
      popupHeaderOne !== 'culture profiles' &&
      popupHeaderOne !== 'profiler' &&
      popupHeaderOne !== 'items' &&
      popupHeaderOne !== 'job profiles'
    ) {
      revisePopupHeaderOne = clickValue;
      revisepopupHeaderOneBadgeOne = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      // valueArr = setAssociateCardPermissionInJson(MODULE_POPUP_OPTION, assesseePermission);
      valueArr = MODULE_POPUP_OPTION;
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
      popupHeaderOne !== 'culture profiles' &&
      popupHeaderOne !== 'job profiles' &&
      popupHeaderOne !== 'profiler' &&
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
      popupHeaderOne !== 'assignments' &&
      popupHeaderOne !== 'profiler' &&
      popupHeaderOne !== 'culture profiles' &&
      popupHeaderOne !== 'job profiles' &&
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
      popupHeaderOne !== 'profiler' &&
      popupHeaderOne !== 'culture profiles' &&
      popupHeaderOne !== 'job profiles' &&
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
      popupHeaderOne !== 'profiler' &&
      popupHeaderOne !== 'assessments' &&
      popupHeaderOne !== 'assessments' &&
      popupHeaderOne !== 'items'
    ) {
      revisePopupHeaderOne = clickValue;
      revisepopupHeaderOneBadgeOne = '';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = ROLE_POPUP_OPTION;
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
        popupHeaderOne === 'assessment centres' ||
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
      reviseThiredOptionCheckValue = 'first-name other-name last-name';
      reviseForthOptionCheckValue = 'template';
      setexchageMode(true);
      clearMiddlePaneInfo();
    }
    if (
      clickValue === 'information' &&
      popupHeaderOne === 'associate' &&
      (popupHeaderOneBadgeTwo === 'review' || popupHeaderOneBadgeTwo === 'revise')
    ) {
      dispatch({ type: LOADER_START });
      let assesseeRoleAssesseeReqBody = getAssesseeRoleAssesseeReqObj(
        selectedAssociateInfo,
        ADMINISTRATOR_SECONDARY_ID,
        'active',
        0,
        countPage
      );
      dispatch({
        type: GET_ASSESSEEROLE_ASSESSEE_REVIEW_LIST,
        payload: {
          request: assesseeRoleAssesseeReqBody,
          HeaderOne: '',
          BadgeOne: '',
          BadgeTwo: '',
          BadgeThree: '',
          isMiddlePaneList: false,
          isAdministratorSecondary: true
        }
      });

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
      AssociateSetUpApiCalls(
        selectedAssociateInfo,
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
        dispatch
      );

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
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
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
      reviseSecondaryOptionCheckValue = clickValue === 'create' ? 'all' : 'active';
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
      clickValue === 'distinct' &&
      popupHeaderOne === 'culture profiles' &&
      popupHeaderOneBadgeOne === 'review'
    ) {
      getCultureProfilesDistinctApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        popupHeaderOne,
        dispatch
      );
    }
    if (
      clickValue === 'groups' &&
      popupHeaderOne === 'culture profiles' &&
      popupHeaderOneBadgeOne === 'review'
    ) {
      getCultureProfileGroupApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        'groups',
        popupHeaderOne
      );
    }
    if (
      clickValue === 'types' &&
      popupHeaderOne === 'culture profiles' &&
      popupHeaderOneBadgeOne === 'review'
    ) {
      getCultureProfileTypeApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        'types',
        popupHeaderOne
      );
    }
    if (
      clickValue === 'distinct' &&
      popupHeaderOne === 'job profiles' &&
      popupHeaderOneBadgeOne === 'review'
    ) {
      getJobProfilesDistinctApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        popupHeaderOne,
        dispatch
      );
    }
    if (
      clickValue === 'groups' &&
      popupHeaderOne === 'job profiles' &&
      popupHeaderOneBadgeOne === 'review'
    ) {
      getJobProfileGroupApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        'groups',
        popupHeaderOne
      );
    }
    if (
      clickValue === 'types' &&
      popupHeaderOne === 'job profiles' &&
      popupHeaderOneBadgeOne === 'review'
    ) {
      getJobProfileTypeApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        'types',
        popupHeaderOne
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
      clickValue === 'types' &&
      popupHeaderOne === 'items' &&
      popupHeaderOneBadgeOne === 'review'
    ) {
      getItemsTypeApiCall(
        selectedAssociateInfo,
        secondaryOptionCheckValue,
        countPage,
        dispatch,
        'types',
        popupHeaderOne
      );
    }
    if (
      clickValue === 'distinct' &&
      popupHeaderOne === 'assessees' &&
      popupHeaderOneBadgeOne === 'roles'
    ) {
      dispatch({
        type: SET_POPUP_SINGLE_STATE,
        payload: { stateName: 'cardValue', value: 'Card' }
      });
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
      dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
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
      dispatch({
        type: SET_POPUP_SINGLE_STATE,
        payload: { stateName: 'cardValue', value: 'Card' }
      });
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
      dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
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
        popupHeaderOne === 'assessments' ||
        popupHeaderOne === 'assignments' ||
        popupHeaderOne === 'associates' ||
        popupHeaderOne === 'items' ||
        popupHeaderOne === 'culture profiles' ||
        popupHeaderOne === 'job profiles') &&
      popupHeaderOneBadgeOne === 'groups'
    ) {
      let requestObj = {};
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
      dispatch({
        type: SET_POPUP_SINGLE_STATE,
        payload: { stateName: 'cardValue', value: 'Card' }
      });
      if (popupHeaderOne === 'assessees') {
        getAssesseeGroupDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'groups',
          'Card'
        );
      }
      if (popupHeaderOne === 'associates') {
        getAssociateGroupDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'groups',
          'Card'
        );
      }
      if (popupHeaderOne === 'assessments') {
        getAssessmentGroupApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'groups',
          'Card'
        );
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
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: popupHeaderOne + 'GroupDistinct' + secondaryOptionCheckValue }
        });
      }
      if (popupHeaderOne === 'items') {
        getItemGroupDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'groups',
          'Card'
        );
      }
      if (popupHeaderOne === 'culture profiles') {
        getCultureProfileGroupApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'groups',
          'Card'
        );
      }
      if (popupHeaderOne === 'job profiles') {
        getJobProfileGroupApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'groups',
          'Card'
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
      dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
    }
    if (
      clickValue === 'nodes' &&
      (popupHeaderOne === 'administrators' ||
        popupHeaderOne === 'managers' ||
        popupHeaderOne === 'culture profiles' ||
        popupHeaderOne === 'job profiles' ||
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
      dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
    }
    if (
      clickValue === 'distinct' &&
      (popupHeaderOne === 'assignments' ||
        popupHeaderOne === 'associates' ||
        popupHeaderOne === 'assessments' ||
        popupHeaderOne === 'items' ||
        popupHeaderOne === 'culture profiles' ||
        popupHeaderOne === 'job profiles' ||
        popupHeaderOne === 'assessees') &&
      popupHeaderOneBadgeOne === 'types'
    ) {
      let requestObj = {};
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
      dispatch({ type: LOADER_START });
      dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
      dispatch({
        type: SET_POPUP_SINGLE_STATE,
        payload: { stateName: 'cardValue', value: 'Card' }
      });
      if (popupHeaderOne === 'assessments') {
        getAssessmentTypeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'types',
          'Card'
        );
      }
      if (popupHeaderOne === 'assignments') {
        assignmentTypeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'types',
          'Card'
        );
      }
      if (popupHeaderOne === 'assessees') {
        getAssesseeTypeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'types',
          'Card',
          popupHeaderOne
        );
      }
      if (popupHeaderOne === 'associates') {
        getAssociatesTypeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'types',
          popupHeaderOne,
          'Card'
        );
      }
      if (popupHeaderOne === 'items') {
        getItemsTypeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'types',
          popupHeaderOne,
          'Card'
        );
      }
      if (popupHeaderOne === 'culture profiles') {
        getCultureProfileTypeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'types',
          'Card',
          popupHeaderOne
        );
      }
      if (popupHeaderOne === 'job profiles') {
        getJobProfileTypeApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          'types',
          popupHeaderOne,
          'Card'
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
        'Card',
        popupHeaderOne
      );
    }
    if (clickValue === 'notifications' || clickValue === 'reports') {
      setDuplicateHeader(popupHeaderOne);
      setDuplicateBadgeOne(popupHeaderOneBadgeOne);
      setDuplicateBadgeTwo(popupHeaderOneBadgeTwo);
      setDuplicateValueArr(popupContentArrValue);
      setDuplicateSecondaryOpt(secondaryOptionCheckValue);
      revisePopupHeaderOne = clickValue;
      revisepopupHeaderOneBadgeOne = 'review';
      reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
      revisePopupType = 'secondary';
      valueArr = NOTIFICATION_REPORT_POPUP;
      reviseSecondaryOptionCheckValue = 'unread';
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
      // getRoleGroupReviewListApi(selectedAssociateInfo, dispatch, popupHeaderOne);
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: popupHeaderOne + 'ROLECREATE' }
      });
      clearMiddlePaneInfo();
    } else if (
      clickValue === 'information' &&
      popupHeaderOneBadgeOne === 'create' &&
      (popupHeaderOne === 'culture profiles' || popupHeaderOne === 'job profiles')
    ) {
      if (popupHeaderOne === 'culture profiles') {
        cultureProfileCreatePopup(selectedAssociateInfo, secondaryOptionCheckValue, dispatch);
      } else {
        jobProfileCreatePopup(selectedAssociateInfo, secondaryOptionCheckValue, dispatch);
      }

      clearMiddlePaneInfo();
    } else if (
      clickValue === 'information' &&
      popupHeaderOne === 'items' &&
      popupHeaderOneBadgeOne === 'create'
    ) {
      createItemPopupApiCall(selectedAssociateInfo, secondaryOptionCheckValue, dispatch);
      clearMiddlePaneInfo();
    } else if (clickValue === 'information' && popupHeaderOneBadgeOne === 'groups') {
      dispatch({ type: CLEAR_GROUP_REDUCER_STATE });
      let nodeRequestObj = makeInternalNodeObj(selectedAssociateInfo, 'active', 0, -1);
      dispatch({ type: SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT, payload: nodeRequestObj });
      dispatch({
        type: INTERNAL_NODE_LIST_SAGA,
        payload: {
          request: nodeRequestObj,
          BadgeOne: '',
          BadgeTwo: '',
          BadgeThree: '',
          nodeViewState: 'list',
          isMiddlePaneList: false
        }
      });
      // getClassificationReviewListApi(selectedAssociateInfo, dispatch, popupHeaderOne);
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: popupHeaderOne + 'GROUPCREATE' }
      });
      clearMiddlePaneInfo();
    } else if (clickValue === 'information' && popupHeaderOneBadgeOne === 'types') {
      dispatch({ type: CLEAR_TYPE_REDUCER_STATE });
      if (
        popupHeaderOne === 'assessees' ||
        popupHeaderOne === 'associates' ||
        popupHeaderOne === 'items' ||
        popupHeaderOne === 'assessments' ||
        popupHeaderOne === 'culture profiles' ||
        popupHeaderOne === 'job profiles' ||
        popupHeaderOne === 'assignments'
      ) {
        getTypeGroupReviewListApi(selectedAssociateInfo, dispatch, popupHeaderOne);
      } else {
        dispatch({ type: SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT, payload: '' });
      }
      dispatch({ type: CLEAR_TYPE_REDUCER_STATE });
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
          tertiaryOptionCheckValue: reviseThiredOptionCheckValue,
          forthOptionCheckValue: reviseForthOptionCheckValue,
          popupContentArrValue: valueArr,
          currentPopUpOption: []
        }
      });
      // setIsReviseMode(false);
    }
  };

  const BackHandlerEvent = (e) => {
    let revisePopupHeaderOne = 'associate';
    let revisepopupHeaderOneBadgeOne = 'self';
    let revisepopupHeaderOneBadgeTwo = '';
    let revisepopupHeaderOneBadgeThree = '';
    let reviseisPopUpValue = 'ASSOCIATE_CARD_POPUP';
    let revisePopupType = 'primary';
    let reviseSecondryOpt = '';
    let reviseThiredOptionCheckValue = '';
    let reviseForthOptionCheckValue = '';
    // let valueArr = setAssociateCardPermissionInJson(
    //   ASSOCIATE_CARD_POPUP_OPTION,
    //   assesseePermission
    // );
    let valueArr = ASSOCIATE_CARD_POPUP_OPTION;
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
        reviseSecondryOpt = '';
      }
      if (
        (popupHeaderOne === 'assessees' || popupHeaderOne === 'associates') &&
        (popupHeaderOneBadgeOne === 'roles' || popupHeaderOneBadgeOne === 'role')
      ) {
        revisePopupHeaderOne = 'roles';
        revisepopupHeaderOneBadgeOne = '';
        valueArr = ROLE_POPUP_OPTION;
        reviseSecondryOpt = '';
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
          popupHeaderOne === 'profiler' ||
          popupHeaderOne === 'items') &&
        (popupHeaderOneBadgeOne === 'types' || popupHeaderOneBadgeOne === 'type')
      ) {
        revisePopupHeaderOne = 'types';
        revisepopupHeaderOneBadgeOne = '';
        valueArr = GROUP_TYPE_POPUP_OPTION;
        reviseSecondryOpt = '';
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
          popupHeaderOne === 'profiler' ||
          popupHeaderOne === 'interviews' ||
          popupHeaderOne === 'items') &&
        (popupHeaderOneBadgeOne === 'groups' || popupHeaderOneBadgeOne === 'group')
      ) {
        revisePopupHeaderOne = 'groups';
        revisepopupHeaderOneBadgeOne = '';
        valueArr = GROUP_TYPE_POPUP_OPTION;
        reviseSecondryOpt = '';
        revisePopupType = 'secondary';
      }
      if (popupHeaderOne === 'associates' && popupHeaderOneBadgeOne === 'nodes') {
        revisePopupHeaderOne = 'nodes';
        revisepopupHeaderOneBadgeOne = '';
        valueArr = NODE_POPUP_OPTION;
        reviseSecondryOpt = 'associates';
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
        reviseSecondryOpt = '';
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
        reviseSecondryOpt = '';
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
        reviseSecondryOpt = '';
        revisePopupType = 'secondary';
        setexchageMode(false);
      }
      if (
        (popupHeaderOne === 'assessment centres' ||
          popupHeaderOne === 'culture profiles' ||
          popupHeaderOne === 'profiler' ||
          popupHeaderOne === 'job profiles') &&
        (popupHeaderOneBadgeOne === 'create' || popupHeaderOneBadgeOne === 'review')
      ) {
        revisePopupHeaderOne = 'analytics';
        revisepopupHeaderOneBadgeOne = '';
        valueArr = ANALYTICS_POPUP;
        reviseSecondryOpt = '';
        revisePopupType = 'secondary';
      }
      if (popupHeaderOne === 'notifications' || popupHeaderOne === 'reports') {
        revisePopupHeaderOne = duplicateHeader;
        revisepopupHeaderOneBadgeOne = duplicateBadgeOne;
        revisepopupHeaderOneBadgeTwo = duplicateBadgeTwo;
        valueArr = duplicateValueArr;
        reviseSecondryOpt =
          popupHeaderOne === 'associates' && popupHeaderOneBadgeOne === 'nodes'
            ? duplicateSecondaryOpt
            : '';
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
        reviseSecondryOpt = '';
        revisePopupType = 'secondary';
      }
      dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: revisePopupHeaderOne,
          popupHeaderOneBadgeOne: revisepopupHeaderOneBadgeOne,
          popupHeaderOneBadgeTwo: revisepopupHeaderOneBadgeTwo,
          popupHeaderOneBadgeThree: revisepopupHeaderOneBadgeThree,
          tertiaryOptionCheckValue: reviseThiredOptionCheckValue,
          forthOptionCheckValue: reviseForthOptionCheckValue,
          isPopUpValue: reviseisPopUpValue,
          popupOpenType: revisePopupType,
          secondaryOptionCheckValue: reviseSecondryOpt,
          popupContentArrValue: valueArr,
          currentPopUpOption: []
        }
      });
    }
  };
  const onClosePopUpEvent = () => {
    dispatch({ type: POPUP_CLOSE });
    setexchageMode(false);
  };
  const setSecondaryOptionValueTwo = (e) => {
    dispatch({
      type: SET_POPUP_SINGLE_STATE,
      payload: {
        stateName: 'tertiaryOptionCheckValue',
        value: e.currentTarget.getAttribute('data-value')
      }
    });
  };
  const setSecondaryOptionValueThree = (e) => {
    dispatch({
      type: SET_POPUP_SINGLE_STATE,
      payload: {
        stateName: 'forthOptionCheckValue',
        value: e.currentTarget.getAttribute('data-value')
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
          headerOneBadgeThree={popupHeaderOneBadgeThree}
          onClosePopUpEvent={onClosePopUpEvent}
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            setSecondaryOptionValueTwo={setSecondaryOptionValueTwo}
            setSecondaryOptionValueThree={setSecondaryOptionValueThree}
            ChangeOptionPopup={ChangeOptionPopup}
            secondaryOptionCheckValue={secondaryOptionCheckValue}
            tertiaryOptionCheckValue={tertiaryOptionCheckValue}
            forthOptionCheckValue={forthOptionCheckValue}
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
                    { id: '', name: '' },
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
              <FormHelperText className={['helperTextCore'].join(' ')}>
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
