import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import { DialogContent } from '@material-ui/core';
import JsonRenderComponent from '../Actions/JsonRenderComponent';
import {
  ASSESSEE_INFO_REVISE_SAGA,
  ASSOCIATE_INFO_REVISE_SAGA,
  GET_ASSESSEE_GROUP_REVIEW_INFO_SAGA,
  GET_ASSESSEE_INFO_SAGA,
  GET_ASSESSEE_ROLE_REVIEW_INFO_SAGA,
  GET_ASSESSMENT_GROUP_REVIEW_INFO_SAGA,
  GET_ASSESSMENT_INFO_SAGA,
  GET_ASSESSMENT_TYPE_REVIEW_INFO_SAGA,
  GET_ASSIGNMENT_GROUP_REVIEW_INFO_SAGA,
  GET_ASSIGNMENT_INFO_SAGA,
  GET_ASSIGNMENT_TYPE_REVIEW_INFO_SAGA,
  GET_ASSOCIATE_GROUP_REVIEW_INFO_SAGA,
  GET_ASSOCIATE_INFO_SAGA,
  GET_ASSOCIATE_ROLE_REVIEW_INFO_SAGA,
  SHARE_ROLES_TYPES_SAGA,
  LOADER_START,
  POPUP_CLOSE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_PREVIOUS_POPUP,
  SET_MIDDLEPANE_SECONDARY_OPTION,
  SET_MOBILE_PANE_STATE,
  SET_SECONDARY_CREATE_OPTION_VALUE,
  FILTERMODE,
  CLEAR_DISPLAY_PANE_THREE,
  LOADER_STOP,
  GET_ASSOCIATE_NODE_REVIEW_INFO_SAGA,
  CLEAR_NODE_REDUCER_STATE,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  INTERNAL_NODE_LIST_SAGA,
  SET_POPUP_VALUE,
  SET_NODE_DYNAMIC_SINGLE_STATE,
  SET_SINGLE_ASSOCIATE_INFORMATION,
  GET_ASSESSEE_TYPE_REVIEW_INFO_SAGA,
  GET_ASSOCIATE_TYPE_REVIEW_INFO_SAGA,
  GET_ITEM_INFO_SAGA,
  GET_ITEM_GROUP_REVIEW_INFO_SAGA,
  GET_ITEM_TYPE_REVIEW_INFO_SAGA,
  GET_ASSESSEENODE_ASSESSEE_REVIEW_LIST,
  GET_NODE_ASSESSMENTS_REVIEW_LIST_SAGA,
  GET_CULTURE_PROFILE_INFO_SAGA,
  GET_CULTURE_GROUP_REVIEW_INFO_SAGA,
  GET_JOB_GROUP_REVIEW_INFO_SAGA,
  GET_CULTURE_TYPE_REVIEW_INFO_SAGA,
  GET_JOB_TYPE_REVIEW_INFO_SAGA,
  GET_JOB_PROFILE_INFO_SAGA,
  GET_NODE_ITEMS_REVIEW_LIST_SAGA,
  GET_NODE_ASSIGNMENTS_REVIEW_LIST_SAGA,
  GET_CULTURE_NODE_CULTURE_REVIEW_LIST_SAGA,
  GET_JOB_NODE_JOB_REVIEW_LIST_SAGA,
  GET_NODE_ASSOCIATE_REVIEW_LIST,
  ASSESSEE_GROUP_INFO_REVISE_SAGA,
  ASSESSEE_ROLE_INFO_REVISE_SAGA,
  SET_POPUP_SINGLE_STATE,
  SET_MIDDLEPANE_STATE,
  RELATED_REVIEWLIST_DISTINCT_DATA
} from '../actionType';
import {
  assesseeReviewInformation,
  assesseeRoleReviewInformation,
  getAssesseeGroupAssesseeDistinctApiCall,
  getAssesseeGroupAssesseeReqObj,
  getAssesseeNodeAssesseeDistinctApiCall,
  getAssesseeNodeAssesseeReqObj,
  getAssesseeRoleAssesseeDistinctApiCall,
  getAssesseeRoleAssesseeReqObj,
  getAssesseeTypeAssesseeDistinctApiCall,
  updateAssesseeDistinctStatus,
  updateAssesseeGroupStatus,
  updateAssesseeRoleStatus,
  updateAssesseeTypeStatus
} from '../Actions/AssesseeModuleAction';
import {
  associateCreatePopup,
  getAssociateGroupAssociateDistinctApiCall,
  getAssociateGroupAssociateReqObj,
  getAssociateRoleAssociateDistinctApiCall,
  getAssociateRoleAssociateReqObj,
  getAssociateTypeAssociateDistinctApiCall,
  getNodeRelatedAssociateDistinctApiCall,
  updateAssociateDistinctStatus,
  updateAssociateGroupStatus,
  updateAssociateNodeStatus,
  updateAssociateRoleStatus,
  updateAssociateTypeStatus
} from '../Actions/AssociateModuleAction';
import {
  getAssessmentGroupAssessmentReqObj,
  makeInternalNodeObj,
  getAssignmentGroupAssignmentReqObj,
  getAssessmentTypeAssessmentReqObj,
  getNodeAssessmentsReqObj,
  getItemGroupItemReqObj,
  getItemTypeItemReqObj,
  getAssignmentTypeAssignmentReqObj,
  getCultureGroupCultureReqObj,
  getCultureTypeCultureReqObj,
  getJobProfileGroupJobProfileReqObj,
  getJobProfileTypeJobProfileReqObj,
  getNodeItemsReqObj,
  getNodeAssignmentsReqObj,
  getNodeAssociatesReqObj,
  getNodeCultureProfileReqObj,
  getNodeJobProfileReqObj,
  getAssociateTypeAssociateReqObj,
  getAssesseeTypeAssesseeReqObj,
  makeAssesseeReviewListRequestObject
} from '../Actions/GenericActions';
import {
  getItemGroupItemDistinctApiCall,
  getItemTypeItemDistinctApiCall,
  getNodeRelatedItemsDistinctApiCall,
  updateItemDistinctStatus,
  updateItemGroupStatus,
  updateItemTypeStatus
} from '../Actions/ItemModuleAction';
import {
  getAssessmentGroupAssessmentDistinctApiCall,
  getAssessmentItemDistinctApiCall,
  getAssessmentTypeAssessmentDistinctApiCall,
  getNodeRelatedAssessmentsDistinctApiCall,
  updateAssessmentDistinctStatus,
  updateAssessmentGroupStatus,
  updateAssessmentTypeStatus
} from '../Actions/AssessmentModuleAction';
import {
  getAssignmnetAssesseeDistinctApiCall,
  getAssignmnetAssessmentDistinctApiCall,
  getAssignmnetGroupAssignmnetDistinctApiCall,
  getAssignmnetTypeAssignmnetDistinctApiCall,
  getNodeRelatedAssignmentsDistinctApiCall,
  updateAssignmentDistinctStatus,
  updateAssignmentGroupStatus,
  updateAssignmentTypeStatus
} from '../Actions/AssignmentModuleAction';
import {
  getAssignmneCultureProfileDistinctApiCall,
  getCultureGroupCultureDistinctApiCall,
  getCultureProfileAssessmentDistinctApiCall,
  getCultureProfileNodeCultureProfileApiCall,
  getCultureTypeCultureDistinctApiCall,
  updateCultureProfileDistinctStatus,
  updateCultureProfileGroupStatus,
  updateCultureProfileTypeStatus
} from '../Actions/ActionCultureProfile';
import {
  getAssignmneJobProfileDistinctApiCall,
  getJobProfileAssessmentDistinctApiCall,
  getJobProfileGroupJobProfileDistinctApiCall,
  getJobProfileNodeJobProfileApiCall,
  getJobProfileTypeJobProfileDistinctApiCall,
  updateJobProfileDistinctStatus,
  updateJobProfileGroupStatus,
  updateJobProfileTypeStatus
} from '../Actions/ActionJobProfile';
import { SHARE_NEW_POPUP } from '../PopUpConfig';
import PopUpTextField from '../PopUpInformation/PopUpTextField';
import { Fragment } from 'react';
const PopUpDisplayPaneTwoReviewList = (props) => {
  const {
    popupHeaderOne,
    popupHeaderOneBadgeOne,
    popupHeaderOneBadgeTwo,
    popupHeaderOneBadgeThree,
    popupOpenType,
    secondaryOptionCheckValue,
    tertiaryOptionCheckValue = 'all',
    forthOptionCheckValue,
    selectedTagValue,
    selectedTagGroupId
  } = useSelector((state) => state.PopUpReducer);
  const {
    selectedAssociateInfo,
    countPage,
    middlePaneHeader,
    reviewListDistinctData
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const [isReviseMode, setIsReviseMode] = useState(false);
  const [shareFee, setshareFee] = useState(false);
  useEffect(() => {
    setshareFee(false);
  }, []);
  const dispatch = useDispatch();
  const {
    headerPanelColour = 'displayPaneCentre',
    isActive,
    popupAllClose,
    typeOfMiddlePaneList
  } = props;

  const setSecondaryOptionValue = (e) => {
    dispatch({
      type: SET_SECONDARY_CREATE_OPTION_VALUE,
      payload: e.currentTarget.getAttribute('data-value')
    });
  };
  const setSecondaryOptionValueTwo = (e) => {
    let arr = [];
    if (e.currentTarget.getAttribute('data-value') === 'distinct') {
      SHARE_NEW_POPUP.forEach((element) => {
        if (
          element.data === 'ascendant' ||
          element.data === 'peer' ||
          element.data === 'descendant'
        ) {
          arr.push({ ...element, disabled: true });
        } else {
          arr.push({ ...element, disabled: false });
        }
      });
      dispatch({
        type: SET_POPUP_SINGLE_STATE,
        payload: {
          stateName: 'popupContentArrValue',
          value: arr
        }
      });
      dispatch({
        type: SET_POPUP_SINGLE_STATE,
        payload: {
          stateName: 'forthOptionCheckValue',
          value: ''
        }
      });
    } else {
      SHARE_NEW_POPUP.forEach((element) => {
        arr.push({ ...element, disabled: false });
      });
      dispatch({
        type: SET_POPUP_SINGLE_STATE,
        payload: {
          stateName: 'popupContentArrValue',
          value: arr
        }
      });
      if (forthOptionCheckValue === '') {
        dispatch({
          type: SET_POPUP_SINGLE_STATE,
          payload: {
            stateName: 'forthOptionCheckValue',
            value: 'ascendant'
          }
        });
      }
    }
    dispatch({
      type: SET_POPUP_SINGLE_STATE,
      payload: {
        stateName: 'tertiaryOptionCheckValue',
        value: e.currentTarget.getAttribute('data-value')
      }
    });
  };
  const setSecondaryOptionValueThree = (e) => {
    let arr = [];
    let valueThree = e.currentTarget.getAttribute('data-value');
    if (valueThree === 'peer') {
      // if (popupHeaderOneBadgeOne === 'share') {
      SHARE_NEW_POPUP.forEach((element) => {
        if (
          element.data === 'distinct' ||
          element.data === 'primary' ||
          element.data === 'secondary'
        ) {
          arr.push({ ...element, disabled: true });
        } else {
          arr.push({ ...element, disabled: false });
        }
      });
      dispatch({
        type: SET_POPUP_SINGLE_STATE,
        payload: {
          stateName: 'tertiaryOptionCheckValue',
          value: 'all'
        }
      });
      // }
    } else {
      SHARE_NEW_POPUP.forEach((element) => {
        if (element.data === 'distinct') {
          arr.push({ ...element, disabled: true });
        } else {
          arr.push({ ...element, disabled: false });
        }
      });
      dispatch({
        type: SET_POPUP_SINGLE_STATE,
        payload: {
          stateName: 'tertiaryOptionCheckValue',
          value: 'primary'
        }
      });
    }
    dispatch({
      type: SET_POPUP_SINGLE_STATE,
      payload: {
        stateName: 'popupContentArrValue',
        value: arr
      }
    });

    dispatch({
      type: SET_POPUP_SINGLE_STATE,
      payload: {
        stateName: 'forthOptionCheckValue',
        value: e.currentTarget.getAttribute('data-value')
      }
    });
  };
  const ChangeOptionPopup = (e) => {
    let keyVal = e.currentTarget.getAttribute('data-key');
    let dataVal = e.currentTarget.getAttribute('data-value');
    console.log(dataVal);
    if (dataVal === 'information' && popupHeaderOneBadgeTwo !== 'create') {
      console.log(selectedTagValue);
      console.log(typeOfMiddlePaneList);
      console.log(isReviseMode);
      dispatch({ type: LOADER_START });
      if (
        typeOfMiddlePaneList === 'assesseesDistinctReviewList' ||
        typeOfMiddlePaneList === 'assesseesSelfReview' ||
        typeOfMiddlePaneList === 'administratorsDistinctReviewList' ||
        typeOfMiddlePaneList === 'assesseesGroupAssesseeReviewList' ||
        typeOfMiddlePaneList === 'assesseesGroupAssesseeReviewList' ||
        typeOfMiddlePaneList === 'assesseesRoleAssesseeReviewList' ||
        typeOfMiddlePaneList === 'assesseesNodeAssesseeReviewList' ||
        typeOfMiddlePaneList === 'managersDistinctReviewList'
      ) {
        assesseeReviewInformation(
          selectedAssociateInfo,
          dispatch,
          secondaryOptionCheckValue,
          isReviseMode,
          typeOfMiddlePaneList,
          selectedTagValue
        );
      }
      if (typeOfMiddlePaneList === 'assesseeRoleDistinctReviewList') {
        assesseeRoleReviewInformation(
          selectedAssociateInfo,
          dispatch,
          secondaryOptionCheckValue,
          isReviseMode,
          typeOfMiddlePaneList,
          selectedTagValue,
          countPage
        );
      }
      if (typeOfMiddlePaneList === 'associateRoleDistinctReviewList') {
        let associateRoleAssociateReqBody = getAssociateRoleAssociateReqObj(
          selectedAssociateInfo,
          selectedTagValue,
          'active',
          0,
          countPage
        );
        dispatch({
          type: GET_ASSOCIATE_ROLE_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue,
            associateRoleAssociateReqBody,
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
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (
        typeOfMiddlePaneList === 'associateDistinctReviewList' ||
        typeOfMiddlePaneList === 'associatesRoleAssociateReviewList' ||
        typeOfMiddlePaneList === 'associatesGroupAssociateReviewList' ||
        typeOfMiddlePaneList === 'associateSelfReview' ||
        typeOfMiddlePaneList === 'associatesNodeDistinctReviewList'
      ) {
        dispatch({
          type: GET_ASSOCIATE_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue,
            isReviseMode,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary, //605255729d3c823d3964e0ec
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
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (typeOfMiddlePaneList === 'associateNodeDistinctReviewList') {
        // alert("here");
        dispatch({ type: LOADER_START });
        let associateNodeReqBody = '';
        let sagaCall = '';
        let isShowAllModule = false;
        if (popupHeaderOne === 'assessees') {
          associateNodeReqBody = getAssesseeNodeAssesseeReqObj(
            selectedAssociateInfo,
            selectedTagValue,
            'active',
            0,
            countPage
          );
          isShowAllModule = false;
          sagaCall = GET_ASSESSEENODE_ASSESSEE_REVIEW_LIST;
        }
        if (popupHeaderOne === 'assessments') {
          associateNodeReqBody = getNodeAssessmentsReqObj(
            selectedAssociateInfo,
            selectedTagValue,
            'active',
            0,
            countPage
          );
          isShowAllModule = false;
          sagaCall = GET_NODE_ASSESSMENTS_REVIEW_LIST_SAGA;
        }
        if (popupHeaderOne === 'assignments') {
          associateNodeReqBody = getNodeAssignmentsReqObj(
            selectedAssociateInfo,
            selectedTagValue,
            'active',
            0,
            countPage
          );
          isShowAllModule = false;
          sagaCall = GET_NODE_ASSIGNMENTS_REVIEW_LIST_SAGA;
        }
        if (popupHeaderOne === 'associate') {
          isShowAllModule = true;
        }
        if (popupHeaderOne === 'associates') {
          associateNodeReqBody = getNodeAssociatesReqObj(
            selectedAssociateInfo,
            selectedTagValue,
            'active',
            0,
            countPage
          );
          isShowAllModule = false;
          sagaCall = GET_NODE_ASSOCIATE_REVIEW_LIST;
        }
        if (popupHeaderOne === 'items') {
          associateNodeReqBody = getNodeItemsReqObj(
            selectedAssociateInfo,
            selectedTagValue,
            'active',
            0,
            countPage
          );
          isShowAllModule = false;
          sagaCall = GET_NODE_ITEMS_REVIEW_LIST_SAGA;
        }
        if (popupHeaderOne === 'culture profiles') {
          associateNodeReqBody = getNodeCultureProfileReqObj(
            selectedAssociateInfo,
            selectedTagValue,
            'active',
            0,
            countPage
          );
          isShowAllModule = false;
          sagaCall = GET_CULTURE_NODE_CULTURE_REVIEW_LIST_SAGA;
        }
        if (popupHeaderOne === 'job profiles') {
          associateNodeReqBody = getNodeJobProfileReqObj(
            selectedAssociateInfo,
            selectedTagValue,
            'active',
            0,
            countPage
          );
          isShowAllModule = false;
          sagaCall = GET_JOB_NODE_JOB_REVIEW_LIST_SAGA;
        }
        dispatch({
          type: GET_ASSOCIATE_NODE_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue,
            associateNodeReqBody: associateNodeReqBody,
            selectedModule: middlePaneHeader,
            getReviewListSaga: sagaCall,
            isShowAllModule,
            isReviseMode,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary, //605255729d3c823d3964e0ec
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
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (typeOfMiddlePaneList === 'assessmentDistinctReviewList'||typeOfMiddlePaneList === 'assignmentDistinctAssessmentReviewList') {
        dispatch({
          type: GET_ASSESSMENT_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue,
            isReviseMode,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary, //605255729d3c823d3964e0ec
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
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (
        typeOfMiddlePaneList === 'assignmentDistinctReviewList' ||
        typeOfMiddlePaneList === 'assignmentTypeAssignmentReviewList' ||
        // typeOfMiddlePaneList === 'assignmentNodeAssignmentReviewList' ||
        typeOfMiddlePaneList === 'assignmentGroupAssignmentReviewList'
      ) {
        let relatedReqObj = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          assignmentId: selectedTagValue
        };
        dispatch({
          type: GET_ASSIGNMENT_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue,
            relatedReqObj,
            isReviseMode,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary, //605255729d3c823d3964e0ec
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
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (
        typeOfMiddlePaneList === 'itemsDistinctReviewList' ||
        typeOfMiddlePaneList === 'assessmentItemReviewList' ||
        typeOfMiddlePaneList === 'itemGroupItemReviewList'
      ) {
        dispatch({
          type: GET_ITEM_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue,
            isReviseMode,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary, //605255729d3c823d3964e0ec
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
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (
        typeOfMiddlePaneList === 'jobProfilesDistinctReviewList' ||
        typeOfMiddlePaneList === 'jobProfileGroupJobProfileReviewList' ||
        typeOfMiddlePaneList === 'jobProfileTypeJobProfileReviewList'
      ) {
        let searchObj = {
          condition: 'eq',
          value: {
            from: secondaryOptionCheckValue.toUpperCase()
          }
        };
        if (secondaryOptionCheckValue === 'all') {
          searchObj = {
            condition: 'in',
            value: {
              in: ['SUSPENDED', 'TERMINATED', 'ACTIVE', 'ARCHIVED']
            }
          };
        }
        let jobProfileReqBody = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          filter: 'true',
          numberPage: 0,
          countPage: countPage,
          searchCondition: 'AND',
          jobProfileId: selectedTagValue,
          search: [
            {
              condition: 'and',
              searchBy: [
                {
                  dataType: 'string',
                  conditionColumn: 'informationEngagement.assessmentStatus',
                  conditionValue: searchObj
                }
              ]
            }
          ]
        };

        dispatch({
          type: GET_JOB_PROFILE_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue,
            isReviseMode,
            jobProfileReqBody,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary, //605255729d3c823d3964e0ec
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
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (
        typeOfMiddlePaneList === 'cultureProfilesDistinctReviewList' ||
        typeOfMiddlePaneList === 'cultureProfileGroupCultureProfileReviewList' ||
        typeOfMiddlePaneList === 'cultureProfileTypeCultureProfileReviewList'
      ) {
        let searchObj = {
          condition: 'eq',
          value: {
            from: secondaryOptionCheckValue.toUpperCase()
          }
        };
        if (secondaryOptionCheckValue === 'all') {
          searchObj = {
            condition: 'in',
            value: {
              in: ['SUSPENDED', 'TERMINATED', 'ACTIVE', 'ARCHIVED']
            }
          };
        }
        const cultureAssessmentReqBody = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          filter: 'true',
          numberPage: 0,
          countPage: countPage,
          searchCondition: 'AND',
          cultureProfileId: selectedTagValue,
          search: [
            {
              condition: 'and',
              searchBy: [
                {
                  dataType: 'string',
                  conditionColumn: 'informationEngagement.assessmentStatus',
                  conditionValue: searchObj
                }
              ]
            }
          ]
        };
        dispatch({
          type: GET_CULTURE_PROFILE_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue,
            isReviseMode,
            cultureAssessmentReqBody,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary, //605255729d3c823d3964e0ec
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
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (typeOfMiddlePaneList === 'assesseesGroupDistinctReviewList') {
        let assesseeGroupAssesseeReqBody = getAssesseeGroupAssesseeReqObj(
          selectedAssociateInfo,
          selectedTagValue,
          'active',
          0,
          countPage
        );
        dispatch({
          type: GET_ASSESSEE_GROUP_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'key',
            isReviseMode,
            assesseeGroupAssesseeReqBody,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary, //605255729d3c823d3964e0ec
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
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (typeOfMiddlePaneList === 'associatesGroupDistinctReviewList') {
        let associateGroupAssociateReqBody = getAssociateGroupAssociateReqObj(
          selectedAssociateInfo,
          selectedTagValue,
          'active',
          0,
          countPage
        );
        dispatch({
          type: GET_ASSOCIATE_GROUP_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'key',
            isReviseMode,
            associateGroupAssociateReqBody,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary, //605255729d3c823d3964e0ec
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
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (typeOfMiddlePaneList === 'assessmentsGroupDistinctReviewList') {
        let assessmentGroupAssessmentReqBody = getAssessmentGroupAssessmentReqObj(
          selectedAssociateInfo,
          selectedTagValue,
          'active',
          0,
          countPage
        );
        dispatch({
          type: GET_ASSESSMENT_GROUP_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'key',
            isReviseMode,
            assessmentGroupAssessmentReqBody,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary,
              filter: 'true',
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
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (typeOfMiddlePaneList === 'assignmentsGroupDistinctReviewList') {
        // alert(selectedTagValue);
        let assignmentGroupAssignmentReqBody = getAssignmentGroupAssignmentReqObj(
          selectedAssociateInfo,
          selectedTagValue,
          'active',
          0,
          countPage
        );
        dispatch({
          type: GET_ASSIGNMENT_GROUP_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'key',
            isReviseMode,
            assignmentGroupAssignmentReqBody,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary,
              filter: 'true',
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
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }

      if (typeOfMiddlePaneList === 'cultureProfilesGroupDistinctReviewList') {
        let cultureGroupCultureReqBody = getCultureGroupCultureReqObj(
          selectedAssociateInfo,
          selectedTagValue,
          'active',
          0,
          countPage
        );
        dispatch({
          type: GET_CULTURE_GROUP_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'key',
            isReviseMode,
            cultureGroupCultureReqBody,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary,
              filter: 'true',
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
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (typeOfMiddlePaneList === 'jobProfilesGroupDistinctReviewList') {
        let jobGroupJobReqBody = getJobProfileGroupJobProfileReqObj(
          selectedAssociateInfo,
          selectedTagValue,
          'active',
          0,
          countPage
        );
        dispatch({
          type: GET_JOB_GROUP_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'key',
            isReviseMode,
            jobGroupJobReqBody,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary,
              filter: 'true',
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
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (typeOfMiddlePaneList === 'itemsGroupDistinctReviewList') {
        let itemGroupItemReqBody = getItemGroupItemReqObj(
          selectedAssociateInfo,
          selectedTagValue,
          'active',
          0,
          countPage
        );
        dispatch({
          type: GET_ITEM_GROUP_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'key',
            isReviseMode,
            itemGroupItemReqBody,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary,
              filter: 'true',
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
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (typeOfMiddlePaneList === 'cultureProfilesTypeDistinctReviewList') {
        let cultureTypeCultureReqBody = getCultureTypeCultureReqObj(
          selectedAssociateInfo,
          selectedTagValue,
          'active',
          0,
          countPage
        );
        dispatch({
          type: GET_CULTURE_TYPE_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'key',
            isReviseMode,
            cultureTypeCultureReqBody,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary,
              filter: 'true',
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
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (typeOfMiddlePaneList === 'jobProfilesTypeDistinctReviewList') {
        let jobTypeJobReqBody = getJobProfileTypeJobProfileReqObj(
          selectedAssociateInfo,
          selectedTagValue,
          'active',
          0,
          countPage
        );
        dispatch({
          type: GET_JOB_TYPE_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'key',
            isReviseMode,
            jobTypeJobReqBody,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary,
              filter: 'true',
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
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (typeOfMiddlePaneList === 'itemsTypeDistinctReviewList') {
        let itemTypeItemReqBody = getItemTypeItemReqObj(
          selectedAssociateInfo,
          selectedTagValue,
          'active',
          0,
          countPage
        );
        dispatch({
          type: GET_ITEM_TYPE_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'key',
            isReviseMode,
            itemTypeItemReqBody,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary,
              filter: 'true',
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
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (typeOfMiddlePaneList === 'assessmentsTypeDistinctReviewList') {
        let assessmentTypeAssessmentReqBody = getAssessmentTypeAssessmentReqObj(
          selectedAssociateInfo,
          selectedTagValue,
          'active',
          0,
          countPage
        );
        dispatch({
          type: GET_ASSESSMENT_TYPE_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'key',
            isReviseMode,
            assessmentTypeAssessmentReqBody,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary,
              filter: 'true',
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
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (typeOfMiddlePaneList === 'assignmentsTypeDistinctReviewList') {
        let assignmentTypeAssignmentReqBody = getAssignmentTypeAssignmentReqObj(
          selectedAssociateInfo,
          selectedTagValue,
          'active',
          0,
          countPage
        );
        dispatch({
          type: GET_ASSIGNMENT_TYPE_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'key',
            isReviseMode,
            assignmentTypeAssignmentReqBody,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary,
              filter: 'true',
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
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (typeOfMiddlePaneList === 'assesseesTypeDistinctReviewList') {
        let assesseeTypeAssesseeReqBody = getAssesseeTypeAssesseeReqObj(
          selectedAssociateInfo,
          selectedTagValue,
          'active',
          0,
          countPage
        );
        dispatch({
          type: GET_ASSESSEE_TYPE_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'key',
            assesseeTypeAssesseeReqBody,
            isReviseMode,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary,
              filter: 'true',
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
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      if (typeOfMiddlePaneList === 'associatesTypeDistinctReviewList') {
        let associateTypeAssociateReqBody = getAssociateTypeAssociateReqObj(
          selectedAssociateInfo,
          selectedTagValue,
          'active',
          0,
          countPage
        );
        dispatch({
          type: GET_ASSOCIATE_TYPE_REVIEW_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'key',
            isReviseMode,
            associateTypeAssociateReqBody,
            reqBody: {
              assesseeId: selectedAssociateInfo?.assesseeId,
              associateId:
                selectedAssociateInfo?.associate?.informationEngagement.associateTag
                  .associateTagPrimary,
              filter: 'true',
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
                          from: selectedTagValue
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
      }
      // if (typeOfMiddlePaneList === 'associatesNodeDistinctReviewList') {
      //   dispatch({ type: LOADER_STOP });
      // }
      // if(typeOfMiddlePaneList === ''){}
      dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'middlePaneSelectedValue', value: selectedTagValue }
      });
      popupAllClose();
      setIsReviseMode(false);
      // dispatch({ type: LOADER_STOP });

      // onClickInformation(secondaryOptionCheckValue);
    } else if (dataVal === 'distinct') {
      if (typeOfMiddlePaneList === 'assesseesGroupDistinctReviewList') {
        getAssesseeGroupAssesseeDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue, //group id
          '',
          false,
          true
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'assesseeGroupAssesseeDistinct' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'assesseeRoleDistinctReviewList') {
        getAssesseeRoleAssesseeDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue,
          '',
          false,
          middlePaneHeader
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'assesseeRoleAssesseeDistinct' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'assesseesTypeDistinctReviewList') {
        getAssesseeTypeAssesseeDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue,
          '',
          false,
          middlePaneHeader
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'assesseeRoleAssesseeDistinct' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'associateNodeDistinctReviewList') {
        if (popupHeaderOne === 'assessees') {
          getAssesseeNodeAssesseeDistinctApiCall(
            selectedAssociateInfo,
            secondaryOptionCheckValue,
            countPage,
            dispatch,
            dataVal,
            selectedTagValue,
            '',
            false,
            middlePaneHeader
          );
          dispatch({
            type: FILTERMODE,
            payload: { FilterMode: 'assesseeNodeAssesseeDistinct' + secondaryOptionCheckValue }
          });
        }
        if (popupHeaderOne === 'associates') {
          getNodeRelatedAssociateDistinctApiCall(
            selectedAssociateInfo,
            secondaryOptionCheckValue,
            countPage,
            dispatch,
            dataVal,
            selectedTagValue,
            '',
            false,
            middlePaneHeader
          );
          dispatch({
            type: FILTERMODE,
            payload: { FilterMode: 'associateNodeAssociateDistinct' + secondaryOptionCheckValue }
          });
        }
        if (popupHeaderOne === 'assessments') {
          getNodeRelatedAssessmentsDistinctApiCall(
            selectedAssociateInfo,
            secondaryOptionCheckValue,
            countPage,
            dispatch,
            dataVal,
            selectedTagValue,
            '',
            false,
            middlePaneHeader
          );
          dispatch({
            type: FILTERMODE,
            payload: { FilterMode: 'assessmentNodeAssessmentDistinct' + secondaryOptionCheckValue }
          });
        }
        if (popupHeaderOne === 'assignments') {
          getNodeRelatedAssignmentsDistinctApiCall(
            selectedAssociateInfo,
            secondaryOptionCheckValue,
            countPage,
            dispatch,
            dataVal,
            selectedTagValue,
            '',
            false,
            middlePaneHeader
          );
          dispatch({
            type: FILTERMODE,
            payload: { FilterMode: 'assessmentNodeAssessmentDistinct' + secondaryOptionCheckValue }
          });
        }
        if (popupHeaderOne === 'items') {
          getNodeRelatedItemsDistinctApiCall(
            selectedAssociateInfo,
            secondaryOptionCheckValue,
            countPage,
            dispatch,
            dataVal,
            selectedTagValue,
            '',
            false,
            middlePaneHeader
          );
          dispatch({
            type: FILTERMODE,
            payload: { FilterMode: 'itemNodeItemDistinct' + secondaryOptionCheckValue }
          });
        }
        if (popupHeaderOne === 'culture profiles') {
          getCultureProfileNodeCultureProfileApiCall(
            selectedAssociateInfo,
            secondaryOptionCheckValue,
            countPage,
            dispatch,
            dataVal,
            selectedTagValue,
            '',
            false,
            middlePaneHeader
          );
          dispatch({
            type: FILTERMODE,
            payload: {
              FilterMode: 'cultureProfileNodeCultureProfileDistinct' + secondaryOptionCheckValue
            }
          });
        }
        if (popupHeaderOne === 'job profiles') {
          getJobProfileNodeJobProfileApiCall(
            selectedAssociateInfo,
            secondaryOptionCheckValue,
            countPage,
            dispatch,
            dataVal,
            selectedTagValue,
            '',
            false,
            middlePaneHeader
          );
          dispatch({
            type: FILTERMODE,
            payload: { FilterMode: 'jobProfileNodeJobProfileDistinct' + secondaryOptionCheckValue }
          });
        }

        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'associatesGroupDistinctReviewList') {
        getAssociateGroupAssociateDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue,
          '',
          false
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'associateGroupAssociateDistinct' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'associateRoleDistinctReviewList') {
        getAssociateRoleAssociateDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue,
          '',
          false
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'associateRoleAssociateDistinct' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'associatesTypeDistinctReviewList') {
        getAssociateTypeAssociateDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue,
          '',
          false
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'associateRoleAssociateDistinct' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'itemsGroupDistinctReviewList') {
        getItemGroupItemDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue,
          '',
          false
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'itemGroupItemDistinct' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'itemsTypeDistinctReviewList') {
        getItemTypeItemDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue,
          '',
          false
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'itemTypeItemDistinct' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'assessmentDistinctReviewList') {
        getAssessmentItemDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue,
          '',
          false
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'assessmentItem' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'assessmentsGroupDistinctReviewList') {
        getAssessmentGroupAssessmentDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue,
          '',
          false
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'assessmentGroupAssessment' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'assessmentsTypeDistinctReviewList') {
        getAssessmentTypeAssessmentDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue,
          '',
          false
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'assessmentTypeAssessment' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'assignmentsTypeDistinctReviewList') {
        getAssignmnetTypeAssignmnetDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue,
          '',
          false
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'assignmnetTypeAssignment' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'assignmentsGroupDistinctReviewList') {
        getAssignmnetGroupAssignmnetDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue,
          '',
          false
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'assignmnetGroupAssignment' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'assignmentDistinctReviewList') {
        if (popupHeaderOne === 'assessees') {
          getAssignmnetAssesseeDistinctApiCall(
            selectedAssociateInfo,
            secondaryOptionCheckValue,
            countPage,
            dispatch,
            dataVal,
            selectedTagValue,
            '',
            false
          );
          dispatch({
            type: FILTERMODE,
            payload: {
              FilterMode: 'assignmentDistinctAssesseeDistinct' + secondaryOptionCheckValue
            }
          });
        }
        if (popupHeaderOne === 'assessments') {
          getAssignmnetAssessmentDistinctApiCall(
            selectedAssociateInfo,
            secondaryOptionCheckValue,
            countPage,
            dispatch,
            dataVal,
            selectedTagValue,
            '',
            false
          );
          dispatch({
            type: FILTERMODE,
            payload: { FilterMode: 'assignmentDistinctAssessment' + secondaryOptionCheckValue }
          });
        }
        if (popupHeaderOne === 'culture profiles') {
          getAssignmneCultureProfileDistinctApiCall(
            selectedAssociateInfo,
            secondaryOptionCheckValue,
            countPage,
            dispatch,
            dataVal,
            selectedTagValue,
            '',
            false
          );
          dispatch({
            type: FILTERMODE,
            payload: { FilterMode: 'assignmentDistinctAssessment' + secondaryOptionCheckValue }
          });
        }
        if (popupHeaderOne === 'job profiles') {
          getAssignmneJobProfileDistinctApiCall(
            selectedAssociateInfo,
            secondaryOptionCheckValue,
            countPage,
            dispatch,
            dataVal,
            selectedTagValue,
            '',
            false
          );
          dispatch({
            type: FILTERMODE,
            payload: { FilterMode: 'assignmentDistinctAssessment' + secondaryOptionCheckValue }
          });
        }

        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'cultureProfilesGroupDistinctReviewList') {
        getCultureGroupCultureDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue,
          '',
          false
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'cultureGroupCultureDistinct' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'cultureProfilesTypeDistinctReviewList') {
        getCultureTypeCultureDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue,
          '',
          false
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'cultureTypeCultureDistinct' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }

      if (typeOfMiddlePaneList === 'cultureProfilesDistinctReviewList') {
        getCultureProfileAssessmentDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue,
          '',
          false
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'cultureProfileAssessmentDistinct' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'jobProfilesDistinctReviewList') {
        getJobProfileAssessmentDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue,
          '',
          false
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'jobProfileAssessmentDistinct' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'jobProfilesGroupDistinctReviewList') {
        getJobProfileGroupJobProfileDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue,
          '',
          false
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'jobProfileGroupJobProfileDistinct' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'jobProfilesTypeDistinctReviewList') {
        getJobProfileTypeJobProfileDistinctApiCall(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          countPage,
          dispatch,
          dataVal,
          selectedTagValue,
          '',
          false
        );
        dispatch({
          type: FILTERMODE,
          payload: { FilterMode: 'jobProfileTypeJobProfileDistinct' + secondaryOptionCheckValue }
        });
        dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
        dispatch({ type: POPUP_CLOSE });
      }
    } else if (dataVal === 'revise') {
      // alert("IN REVISE");
      setIsReviseMode(true);
      dispatch({
        type: SET_MIDDLEPANE_SECONDARY_OPTION,
        payload: { badgeValue: dataVal, keyValue: keyVal }
      });
    } else if (dataVal === 'shareApiCall' || dataVal === 'unshareApiCall') {
      let reqBody = null;
      let shareVal = '';
      let typeShare =
        secondaryOptionCheckValue.toUpperCase() +
        '_' +
        forthOptionCheckValue.toUpperCase() +
        '_' +
        tertiaryOptionCheckValue.toUpperCase();
      console.log('typeShare', typeShare);
      if (typeOfMiddlePaneList === 'assesseeRoleDistinctReviewList') {
        reqBody = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          // assesseeRoleShare: typeShare,
          // assesseeRoleShareInformation: [],
          assesseeRoleShared: [
            {
              assesseeRoleId: selectedTagValue,
              assesseeRoleGroupId: selectedTagGroupId
            }
          ]
        };
        shareVal = 'assesseeRole';
      }
      if (typeOfMiddlePaneList === 'associateRoleDistinctReviewList') {
        reqBody = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          // associateRoleShare: typeShare,
          // associateRoleShareInformation: [],
          associateRoleShared: [
            {
              associateRoleId: selectedTagValue,
              associateRoleGroupId: selectedTagGroupId
            }
          ]
        };
        shareVal = 'associateRole';
      }
      if (typeOfMiddlePaneList === 'associatesTypeDistinctReviewList') {
        reqBody = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          // associateRoleShare: typeShare,
          // associateRoleShareInformation: [],
          associateTypeShared: [
            {
              associateTypeId: selectedTagValue,
              associateTypeGroupId: selectedTagGroupId
            }
          ]
        };
        shareVal = 'associateType';
      }
      if (typeOfMiddlePaneList === 'assesseesTypeDistinctReviewList') {
        reqBody = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          assesseeTypeShare: typeShare,
          assesseeTypeShareInformation: [],
          assesseeTypeShared: [
            {
              assesseeTypeId: selectedTagValue,
              assesseeTypeGroupId: selectedTagGroupId
            }
          ]
        };
        shareVal = 'assesseeType';
      }
      if (typeOfMiddlePaneList === 'assessmentsTypeDistinctReviewList') {
        reqBody = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          assessmentTypeShared: [
            {
              assessmentTypeId: selectedTagValue,
              assessmentTypeGroupId: selectedTagGroupId
            }
          ]
        };
        shareVal = 'assessmentType';
      }
      if (typeOfMiddlePaneList === 'itemsTypeDistinctReviewList') {
        reqBody = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          itemTypeShared: [
            {
              itemTypeId: selectedTagValue,
              itemTypeGroupId: selectedTagGroupId
            }
          ]
        };
        shareVal = 'itemType';
      }
      if (typeOfMiddlePaneList === 'assignmentsTypeDistinctReviewList') {
        reqBody = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          assignmentTypeShared: [
            {
              assignmentTypeId: selectedTagValue,
              assignmentTypeGroupId: selectedTagGroupId
            }
          ]
        };
        shareVal = 'assignmentType';
      }
      if (typeOfMiddlePaneList === 'cultureProfilesTypeDistinctReviewList') {
        reqBody = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          cultureProfileTypeShared: [
            {
              cultureProfileTypeId: selectedTagValue,
              cultureProfileTypeGroupId: selectedTagGroupId
            }
          ]
        };
        shareVal = 'cultureProfileType';
      }
      if (typeOfMiddlePaneList === 'jobProfilesTypeDistinctReviewList') {
        reqBody = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          jobProfileTypeShared: [
            {
              jobProfileTypeId: selectedTagValue,
              jobProfileTypeGroupId: selectedTagGroupId
            }
          ]
        };
        shareVal = 'jobProfileType';
      }
      if (reqBody) {
        dispatch({ type: LOADER_START });
        dispatch({
          type: SHARE_ROLES_TYPES_SAGA,
          payload: {
            secondaryOptionCheckValue: '',
            headerOne: '',
            request: reqBody,
            apiCall: dataVal,
            shareValue: shareVal
          }
        });
      }
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'SHAREFEE', popupMode: 'ITEMCREATE' }
      });
      // setshareFee(true);
      // dispatch({ type: POPUP_CLOSE });
    } else if (dataVal === 'flagedApiCall' || dataVal === 'unflagedApiCall') {
      let reqBody = null;
      if (typeOfMiddlePaneList === 'assesseesDistinctReviewList') {
        reqBody = {
          assesseeId: selectedAssociateInfo?.assesseeId,
          associateId:
            selectedAssociateInfo?.associate?.informationEngagement.associateTag
              .associateTagPrimary,
          assessee: {
            id: selectedTagValue,
            informationBasic: {
              assesseeFlag: dataVal === 'flagedApiCall' ? true : false
            }
          }
        };
        dispatch({ type: LOADER_START });
        dispatch({
          type: ASSESSEE_INFO_REVISE_SAGA,
          payload: { secondaryOptionCheckValue: '', headerOne: '', reqBody }
        });
        dispatch({ type: POPUP_CLOSE });
      }
    } else if (
      dataVal === 'suspendApiCall' ||
      dataVal === 'terminateApiCall' ||
      dataVal === 'unsuspendApiCall' ||
      dataVal === 'unarchiveApiCall' ||
      dataVal === 'publishApiCall' ||
      dataVal === 'unpublishApiCall' ||
      dataVal === 'archiveApiCall' ||
      dataVal === 'yesApiCall' ||
      dataVal === 'unterminateApiCall'
    ) {
      if (typeOfMiddlePaneList === 'assesseesDistinctReviewList') {
        updateAssesseeDistinctStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'assesseesGroupDistinctReviewList') {
        updateAssesseeGroupStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'assesseeRoleDistinctReviewList') {
        updateAssesseeRoleStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'assesseesTypeDistinctReviewList') {
        updateAssesseeTypeStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'assessmentDistinctReviewList') {
        updateAssessmentDistinctStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'assessmentsGroupDistinctReviewList') {
        updateAssessmentGroupStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'assessmentsTypeDistinctReviewList') {
        updateAssessmentTypeStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'assignmentDistinctReviewList') {
        updateAssignmentDistinctStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'assignmentsGroupDistinctReviewList') {
        updateAssignmentGroupStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'assignmentsTypeDistinctReviewList') {
        updateAssignmentTypeStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'associateDistinctReviewList') {
        updateAssociateDistinctStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'associatesGroupDistinctReviewList') {
        updateAssociateGroupStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'associatesTypeDistinctReviewList') {
        updateAssociateTypeStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'associateRoleDistinctReviewList') {
        updateAssociateRoleStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'associateNodeDistinctReviewList') {
        updateAssociateNodeStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'itemsDistinctReviewList') {
        updateItemDistinctStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'itemsGroupDistinctReviewList') {
        updateItemGroupStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'itemsTypeDistinctReviewList') {
        updateItemTypeStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'cultureProfilesDistinctReviewList') {
        updateCultureProfileDistinctStatus(
          selectedAssociateInfo,
          selectedTagValue,
          dispatch,
          keyVal
        );
      }
      if (typeOfMiddlePaneList === 'cultureProfilesGroupDistinctReviewList') {
        updateCultureProfileGroupStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'cultureProfilesTypeDistinctReviewList') {
        updateCultureProfileTypeStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'jobProfilesDistinctReviewList') {
        updateJobProfileDistinctStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'jobProfilesGroupDistinctReviewList') {
        updateJobProfileGroupStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'jobProfilesTypeDistinctReviewList') {
        updateJobProfileTypeStatus(selectedAssociateInfo, selectedTagValue, dispatch, keyVal);
      }
      if (typeOfMiddlePaneList === 'assesseeAssignmentDistinctReviewList') {
        dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
        alert(selectedTagValue)
        let assessmentList = reviewListDistinctData.filter((data) => {
          return data.id === selectedTagValue;
        });
        console.log('assessmentList',assessmentList);
         dispatch({
          type: RELATED_REVIEWLIST_DISTINCT_DATA,
          payload: assessmentList
        });
        dispatch({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'assessments',
            middlePaneHeaderBadgeOne: 'active',
            middlePaneHeaderBadgeTwo: '',
            middlePaneHeaderBadgeThree: '',
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'assesseesAssginmentAssessmentReviewList',
            scanCount: assessmentList[0].assesseeAssessment.length,
            showMiddlePaneState: true
          }
        });
      }
      dispatch({ type: POPUP_CLOSE });
    } else if (
      dataVal === 'information' &&
      popupHeaderOneBadgeTwo === 'create' &&
      middlePaneHeader === 'associate'
    ) {
      dispatch({ type: POPUP_CLOSE });
      let requestObj = makeInternalNodeObj(selectedAssociateInfo, 'active', 0, countPage);
      dispatch({ type: CLEAR_NODE_REDUCER_STATE });
      dispatch({ type: SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT, payload: requestObj });
      dispatch({
        type: INTERNAL_NODE_LIST_SAGA,
        payload: { request: requestObj, nodeViewState: 'list', isMiddlePaneList: false }
      });
      dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
      dispatch({
        type: SET_NODE_DYNAMIC_SINGLE_STATE,
        payload: {
          objectName: 'informationFramework',
          stateName: 'associateNodeAscendant',
          actualStateName: 'associateNodeAscendantPrimary',
          value: [selectedTagValue]
        }
      });
      dispatch({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'NODECREATE' }
      });
    } else if (
      dataVal === 'information' &&
      popupHeaderOneBadgeTwo === 'create' &&
      middlePaneHeader === 'associates'
    ) {
      dispatch({ type: POPUP_CLOSE });
      dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
      associateCreatePopup(
        selectedAssociateInfo,
        dispatch,
        secondaryOptionCheckValue,
        dataVal,
        selectedTagValue
      );
    } else {
      dispatch({
        type: SET_MIDDLEPANE_SECONDARY_OPTION,
        payload: { badgeValue: dataVal, keyValue: keyVal }
      });
    }
  };
  const BackHandlerEvent = (e) => {
    dispatch({ type: SET_MIDDLEPANE_PREVIOUS_POPUP });
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
          onClick={BackHandlerEvent}
          mode={''}
        />
        <DialogContent className={['popupContent', 'fixed05PadDim'].join(' ')}>
          {/* {shareFee ? (
            <Fragment>
              <PopUpTextField
                isActive={true}
                label={'fee'}
                actualLableValue={'fee'}
                headerPanelColour={'displayPaneCentre'}
                headerOne={popupHeaderOne}
                headerOneBadgeOne={popupHeaderOneBadgeOne}
                headerOneBadgeTwo={'fee'}
                basicInfo={0}
                // nextPopUpValue={''}
                // typeOfSetObject={SET_TYPE_REDUCER_STATE}
                // mode={reviewMode === 'revise' ? 'revise' : 'core'}
              />
            </Fragment>
          ) : ( */}
          <JsonRenderComponent
            setSecondaryOptionValue={setSecondaryOptionValue}
            setSecondaryOptionValueTwo={setSecondaryOptionValueTwo}
            setSecondaryOptionValueThree={setSecondaryOptionValueThree}
            ChangeOptionPopup={ChangeOptionPopup}
            secondaryOptionCheckValue={secondaryOptionCheckValue}
            tertiaryOptionCheckValue={tertiaryOptionCheckValue}
            forthOptionCheckValue={forthOptionCheckValue}
          />
          {/* )} */}
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpDisplayPaneTwoReviewList;
