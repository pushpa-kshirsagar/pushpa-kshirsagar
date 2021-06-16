import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import FormControl from '@material-ui/core/FormControl';
import InputFeild from '../Atoms/InputField/InputField';
import '../Molecules/PopUp/PopUp.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  ASSESSEE_INFO_CREATE,
  ASSESSEE_REVIEW_DISTINCT_SAGA,
  ASSESSMENT_REVIEW_DISTINCT_SAGA,
  ASSIGNMENT_REVIEW_DISTINCT_SAGA,
  ASSOCIATE_POPUP_CLOSE,
  ASSOCIATE_REVIEW_DISTINCT_SAGA,
  GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
  GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
  GET_ASSESSEE_TYPE_REVIEW_LIST_SAGA,
  GET_ASSESSMENT_GROUP_REVIEW_LIST_SAGA,
  GET_ASSESSMENT_TYPE_REVIEW_LIST_SAGA,
  GET_ASSIGNMENT_GROUP_REVIEW_LIST_SAGA,
  GET_ASSIGNMENT_TYPE_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_GROUP_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_TYPE_REVIEW_LIST_SAGA,
  GET_CULTUREPROFILE_GROUP_REVIEW_LIST_SAGA,
  GET_CULTUREPROFILE_REVIEW_LIST_SAGA,
  GET_ITEM_GROUP_REVIEW_LIST_SAGA,
  GET_ITEM_REVIEW_LIST_SAGA,
  GET_ITEM_TYPE_REVIEW_LIST_SAGA,
  LOADER_START,
  POPUP_CLOSE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_PAGE_COUNT,
  SET_REQUEST_OBJECT
} from '../actionType';
import PropTypes from 'prop-types';
import { FormHelperText } from '@material-ui/core';
import {
  makeAssesseeRoleScanRequestObject,
  makeAssesseeScanRequestObject,
  makeAssociateRoleScanRequestObject,
  makeAssociateScanRequestObject,
  makeAssesseeGroupScanRequestObject,
  makeAssessmentGroupScanRequestObject,
  makeAssignmentGroupScanRequestObject,
  makeAssociateGroupScanRequestObject,
  makeAssignmentTypeScanRequestObject,
  makeAssessmentTypeScanRequestObject,
  makeAssignmentScanRequestObject,
  makeAssessmentScanRequestObject,
  makeAdminmManagerRoleScanRequestObject,
  makeAssesseeTypeScanRequestObject,
  makeAssociateTypeScanRequestObject,
  getItemScanRequestObj,
  makeItemGroupScanObj,
  makeItemScanObj,
  makeItemTypeScanObj,
  makeCultureProfileScanObj,
  makeCultureProfileGroupScanObj
} from '../Actions/GenericActions';
import { ADMIN_ROLE_ID, MANAGER_ROLE_ID } from '../endpoints';
import {
  getAssociateGroupAssociateDistinctApiCall,
  getAssociateRoleAssociateDistinctApiCall
} from '../Actions/AssociateModuleAction';
import {
  getAssesseeGroupAssesseeDistinctApiCall,
  getAssesseeRoleAssesseeDistinctApiCall
} from '../Actions/AssesseeModuleAction';
import {
  getItemGroupItemDistinctApiCall,
  getItemTypeItemDistinctApiCall,
  getNodeRelatedItemsDistinctApiCall
} from '../Actions/ItemModuleAction';
import {
  getAssessmentGroupAssessmentDistinctApiCall,
  getAssessmentTypeAssessmentDistinctApiCall,
  getNodeRelatedAssessmentsDistinctApiCall
} from '../Actions/AssessmentModuleAction';
import {
  getAssignmnetGroupAssignmnetDistinctApiCall,
  getAssignmnetTypeAssignmnetDistinctApiCall
} from '../Actions/AssignmentModuleAction';

const PopUpScan = (props) => {
  const dispatch = useDispatch();
  const { isPopUpValue, selectedTagValue } = useSelector((state) => state.PopUpReducer);
  const {
    scanHeader,
    scanHeaderBadgeOne,
    scanHeaderBadgeTwo,
    typeOfMiddlePaneList,
    countPage,
    middlePaneHeader,
    middlePaneHeaderBadgeOne,
    middlePaneHeaderBadgeTwo,
    middlePaneHeaderBadgeThree,
    selectedAssociateInfo,
    reviewListDistinctData,
    nodeViewState
  } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { isActive = true } = props;
  const [state, setState] = useState({
    scanValue: ''
  });

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      scanValue: event.target.value
    }));
  };
  const handleClick = () => {
    /*according to seacrh will change*/
    if (state.scanValue !== '') {
      if (
        typeOfMiddlePaneList === 'assesseesDistinctReviewList' ||
        typeOfMiddlePaneList === 'administratorsDistinctReviewList' ||
        typeOfMiddlePaneList === 'managersDistinctReviewList'
      ) {
        let requestObect = makeAssesseeScanRequestObject(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo,
          0,
          countPage,
          state.scanValue
        );
        dispatch({ type: LOADER_START });
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
        dispatch({
          type: ASSESSEE_REVIEW_DISTINCT_SAGA,
          payload: {
            request: requestObect,
            HeaderOne: middlePaneHeader,
            BadgeOne: 'distinct',
            BadgeTwo: middlePaneHeaderBadgeTwo
          }
        });
        dispatch({ type: ASSESSEE_INFO_CREATE });
        document.getElementById('middleComponentId').scrollTop = '0px';
      }
      if (typeOfMiddlePaneList === 'assesseeRoleDistinctReviewList') {
        let requestObect = {};
        if (middlePaneHeader === 'administrators' || middlePaneHeader === 'managers') {
          requestObect = makeAdminmManagerRoleScanRequestObject(
            selectedAssociateInfo,
            middlePaneHeaderBadgeTwo === 'distinct'
              ? middlePaneHeaderBadgeThree
              : middlePaneHeaderBadgeTwo,
            0,
            countPage,
            state.scanValue,
            middlePaneHeader === 'administrators' ? ADMIN_ROLE_ID : MANAGER_ROLE_ID
          );
        } else {
          requestObect = makeAssesseeRoleScanRequestObject(
            selectedAssociateInfo,
            middlePaneHeaderBadgeTwo === 'distinct'
              ? middlePaneHeaderBadgeThree
              : middlePaneHeaderBadgeTwo,
            0,
            countPage,
            state.scanValue
          );
        }
        dispatch({ type: LOADER_START });
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
        dispatch({
          type: GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
          payload: {
            request: requestObect,
            BadgeOne: middlePaneHeaderBadgeOne,
            BadgeTwo: middlePaneHeaderBadgeTwo,
            BadgeThree: middlePaneHeaderBadgeThree,
            isMiddlePaneList: true
          }
        });
        dispatch({ type: ASSESSEE_INFO_CREATE });
        document.getElementById('middleComponentId').scrollTop = '0px';
      }
      if (typeOfMiddlePaneList === 'associateRoleDistinctReviewList') {
        let requestObect = makeAssociateRoleScanRequestObject(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo === 'distinct'
            ? middlePaneHeaderBadgeThree
            : middlePaneHeaderBadgeTwo,
          0,
          countPage,
          state.scanValue
        );
        dispatch({ type: LOADER_START });
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
        dispatch({
          type: GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA,
          payload: {
            request: requestObect,
            BadgeOne: middlePaneHeaderBadgeOne,
            BadgeTwo: middlePaneHeaderBadgeTwo,
            BadgeThree: middlePaneHeaderBadgeThree,
            isMiddlePaneList: true
          }
        });
        dispatch({ type: ASSOCIATE_POPUP_CLOSE });
        document.getElementById('middleComponentId').scrollTop = '0px';
      }
      if (typeOfMiddlePaneList === 'associateDistinctReviewList') {
        let requestObect = makeAssociateScanRequestObject(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo,
          0,
          countPage,
          state.scanValue
        );
        dispatch({ type: LOADER_START });
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
        dispatch({
          type: ASSOCIATE_REVIEW_DISTINCT_SAGA,
          payload: {
            request: requestObect,
            BadgeOne: middlePaneHeaderBadgeOne,
            BadgeTwo: middlePaneHeaderBadgeTwo,
            BadgeThree: middlePaneHeaderBadgeThree,
            isMiddlePaneList: true
          }
        });
        dispatch({ type: ASSOCIATE_POPUP_CLOSE });
        document.getElementById('middleComponentId').scrollTop = '0px';
      }
      if (typeOfMiddlePaneList === 'assesseesGroupDistinctReviewList') {
        let requestObect = makeAssesseeGroupScanRequestObject(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo === 'distinct'
            ? middlePaneHeaderBadgeThree
            : middlePaneHeaderBadgeTwo,
          0,
          countPage,
          state.scanValue
        );
        dispatch({ type: LOADER_START });
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
        dispatch({
          type: GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
          payload: {
            request: requestObect,
            BadgeOne: middlePaneHeaderBadgeOne,
            BadgeTwo: middlePaneHeaderBadgeTwo,
            BadgeThree: middlePaneHeaderBadgeThree,
            isMiddlePaneList: true
          }
        });
        dispatch({ type: ASSOCIATE_POPUP_CLOSE });
        document.getElementById('middleComponentId').scrollTop = '0px';
      }
      if (typeOfMiddlePaneList === 'assessmentsGroupDistinctReviewList') {
        let requestObect = makeAssessmentGroupScanRequestObject(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo === 'distinct'
            ? middlePaneHeaderBadgeThree
            : middlePaneHeaderBadgeTwo,
          0,
          countPage,
          state.scanValue
        );
        dispatch({ type: LOADER_START });
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
        dispatch({
          type: GET_ASSESSMENT_GROUP_REVIEW_LIST_SAGA,
          payload: {
            request: requestObect,
            BadgeOne: middlePaneHeaderBadgeOne,
            BadgeTwo: middlePaneHeaderBadgeTwo,
            BadgeThree: middlePaneHeaderBadgeThree,
            isMiddlePaneList: true
          }
        });
        dispatch({ type: ASSOCIATE_POPUP_CLOSE });
        document.getElementById('middleComponentId').scrollTop = '0px';
      }
      if (typeOfMiddlePaneList === 'assessmentGroupAssessmentReviewList') {
        getAssessmentGroupAssessmentDistinctApiCall(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo,
          countPage,
          dispatch,
          'distinct',
          selectedTagValue,
          state.scanValue,
          true
        );

        dispatch({ type: ASSOCIATE_POPUP_CLOSE });
        document.getElementById('middleComponentId').scrollTop = '0px';
      }
      if (typeOfMiddlePaneList === 'assessmentTypeAssessmentReviewList') {
        getAssessmentTypeAssessmentDistinctApiCall(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo,
          countPage,
          dispatch,
          'distinct',
          selectedTagValue,
          state.scanValue,
          true
        );

        dispatch({ type: ASSOCIATE_POPUP_CLOSE });
        document.getElementById('middleComponentId').scrollTop = '0px';
      }
      if (typeOfMiddlePaneList === 'assignmentsGroupDistinctReviewList') {
        let requestObect = makeAssignmentGroupScanRequestObject(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo === 'distinct'
            ? middlePaneHeaderBadgeThree
            : middlePaneHeaderBadgeTwo,
          0,
          countPage,
          state.scanValue
        );
        dispatch({ type: LOADER_START });
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
        dispatch({
          type: GET_ASSIGNMENT_GROUP_REVIEW_LIST_SAGA,
          payload: {
            request: requestObect,
            BadgeOne: middlePaneHeaderBadgeOne,
            BadgeTwo: middlePaneHeaderBadgeTwo,
            BadgeThree: middlePaneHeaderBadgeThree,
            isMiddlePaneList: true
          }
        });
        dispatch({ type: ASSOCIATE_POPUP_CLOSE });
        document.getElementById('middleComponentId').scrollTop = '0px';
      }
      if (typeOfMiddlePaneList === 'assesseesTypeDistinctReviewList') {
        let requestObect = makeAssesseeTypeScanRequestObject(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo === 'distinct'
            ? middlePaneHeaderBadgeThree
            : middlePaneHeaderBadgeTwo,
          0,
          countPage,
          state.scanValue
        );
        dispatch({ type: LOADER_START });
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
        dispatch({
          type: GET_ASSESSEE_TYPE_REVIEW_LIST_SAGA,
          payload: {
            request: requestObect,
            middlePaneHeader: middlePaneHeader,
            BadgeOne: middlePaneHeaderBadgeOne,
            BadgeTwo: middlePaneHeaderBadgeTwo,
            BadgeThree: middlePaneHeaderBadgeThree,
            isMiddlePaneList: true
          }
        });
        dispatch({ type: ASSOCIATE_POPUP_CLOSE });
        document.getElementById('middleComponentId').scrollTop = '0px';
      }
      if (typeOfMiddlePaneList === 'associatesTypeDistinctReviewList') {
        let requestObect = makeAssociateTypeScanRequestObject(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo === 'distinct'
            ? middlePaneHeaderBadgeThree
            : middlePaneHeaderBadgeTwo,
          0,
          countPage,
          state.scanValue
        );
        dispatch({ type: LOADER_START });
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
        dispatch({
          type: GET_ASSOCIATE_TYPE_REVIEW_LIST_SAGA,
          payload: {
            request: requestObect,
            middlePaneHeader: middlePaneHeader,
            BadgeOne: middlePaneHeaderBadgeOne,
            BadgeTwo: middlePaneHeaderBadgeTwo,
            BadgeThree: middlePaneHeaderBadgeThree,
            isMiddlePaneList: true
          }
        });
        dispatch({ type: ASSOCIATE_POPUP_CLOSE });
        document.getElementById('middleComponentId').scrollTop = '0px';
      }
      if (typeOfMiddlePaneList === 'itemsDistinctReviewList') {
        let requestObect = makeItemScanObj(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo === 'distinct'
            ? middlePaneHeaderBadgeThree
            : middlePaneHeaderBadgeTwo,
          0,
          countPage,
          state.scanValue
        );
        dispatch({ type: LOADER_START });
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
        dispatch({
          type: GET_ITEM_REVIEW_LIST_SAGA,
          payload: {
            request: requestObect,
            middlePaneHeader: middlePaneHeader,
            BadgeOne: middlePaneHeaderBadgeOne,
            BadgeTwo: middlePaneHeaderBadgeTwo,
            BadgeThree: middlePaneHeaderBadgeThree,
            isMiddlePaneList: true
          }
        });
        dispatch({ type: ASSOCIATE_POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'itemsGroupDistinctReviewList') {
        let requestObect = makeItemGroupScanObj(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo === 'distinct'
            ? middlePaneHeaderBadgeThree
            : middlePaneHeaderBadgeTwo,
          0,
          countPage,
          state.scanValue
        );
        dispatch({ type: LOADER_START });
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
        dispatch({
          type: GET_ITEM_GROUP_REVIEW_LIST_SAGA,
          payload: {
            request: requestObect,
            middlePaneHeader: middlePaneHeader,
            BadgeOne: middlePaneHeaderBadgeOne,
            BadgeTwo: middlePaneHeaderBadgeTwo,
            BadgeThree: middlePaneHeaderBadgeThree,
            isMiddlePaneList: true
          }
        });
        dispatch({ type: ASSOCIATE_POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'itemsTypeDistinctReviewList') {
        let requestObect = makeItemTypeScanObj(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo === 'distinct'
            ? middlePaneHeaderBadgeThree
            : middlePaneHeaderBadgeTwo,
          0,
          countPage,
          state.scanValue
        );
        dispatch({ type: LOADER_START });
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
        dispatch({
          type: GET_ITEM_TYPE_REVIEW_LIST_SAGA,
          payload: {
            request: requestObect,
            middlePaneHeader: middlePaneHeader,
            BadgeOne: middlePaneHeaderBadgeOne,
            BadgeTwo: middlePaneHeaderBadgeTwo,
            BadgeThree: middlePaneHeaderBadgeThree,
            isMiddlePaneList: true
          }
        });
        dispatch({ type: ASSOCIATE_POPUP_CLOSE });
      }
      if (typeOfMiddlePaneList === 'assignmentsTypeDistinctReviewList') {
        let requestObect = makeAssignmentTypeScanRequestObject(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo === 'distinct'
            ? middlePaneHeaderBadgeThree
            : middlePaneHeaderBadgeTwo,
          0,
          countPage,
          state.scanValue
        );
        dispatch({ type: LOADER_START });
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
        dispatch({
          type: GET_ASSIGNMENT_TYPE_REVIEW_LIST_SAGA,
          payload: {
            request: requestObect,
            BadgeOne: middlePaneHeaderBadgeOne,
            BadgeTwo: middlePaneHeaderBadgeTwo,
            BadgeThree: middlePaneHeaderBadgeThree,
            isMiddlePaneList: true
          }
        });
        dispatch({ type: ASSOCIATE_POPUP_CLOSE });
        document.getElementById('middleComponentId').scrollTop = '0px';
      }
      if (typeOfMiddlePaneList === 'assessmentsTypeDistinctReviewList') {
        let requestObect = makeAssessmentTypeScanRequestObject(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo === 'distinct'
            ? middlePaneHeaderBadgeThree
            : middlePaneHeaderBadgeTwo,
          0,
          countPage,
          state.scanValue
        );
        dispatch({ type: LOADER_START });
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
        dispatch({
          type: GET_ASSESSMENT_TYPE_REVIEW_LIST_SAGA,
          payload: {
            request: requestObect,
            BadgeOne: middlePaneHeaderBadgeOne,
            BadgeTwo: middlePaneHeaderBadgeTwo,
            BadgeThree: middlePaneHeaderBadgeThree,
            isMiddlePaneList: true
          }
        });
        dispatch({ type: ASSOCIATE_POPUP_CLOSE });
        document.getElementById('middleComponentId').scrollTop = '0px';
      }
      if (typeOfMiddlePaneList === 'associatesGroupDistinctReviewList') {
        let requestObect = makeAssociateGroupScanRequestObject(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo === 'distinct'
            ? middlePaneHeaderBadgeThree
            : middlePaneHeaderBadgeTwo,
          0,
          countPage,
          state.scanValue
        );
        dispatch({ type: LOADER_START });
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
        dispatch({
          type: GET_ASSOCIATE_GROUP_REVIEW_LIST_SAGA,
          payload: {
            request: requestObect,
            BadgeOne: middlePaneHeaderBadgeOne,
            BadgeTwo: middlePaneHeaderBadgeTwo,
            BadgeThree: middlePaneHeaderBadgeThree,
            isMiddlePaneList: true
          }
        });
        dispatch({ type: ASSOCIATE_POPUP_CLOSE });
        document.getElementById('middleComponentId').scrollTop = '0px';
      }
      if (typeOfMiddlePaneList === 'assignmentDistinctReviewList') {
        let requestObect = makeAssignmentScanRequestObject(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo,
          0,
          countPage,
          state.scanValue
        );
        dispatch({ type: LOADER_START });
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
        dispatch({
          type: ASSIGNMENT_REVIEW_DISTINCT_SAGA,
          payload: {
            request: requestObect,
            BadgeOne: middlePaneHeaderBadgeOne,
            BadgeTwo: middlePaneHeaderBadgeTwo,
            BadgeThree: middlePaneHeaderBadgeThree,
            isMiddlePaneList: true
          }
        });
        dispatch({ type: ASSOCIATE_POPUP_CLOSE });
        document.getElementById('middleComponentId').scrollTop = '0px';
      }
      if (typeOfMiddlePaneList === 'assessmentDistinctReviewList') {
        let requestObect = makeAssessmentScanRequestObject(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo,
          0,
          countPage,
          state.scanValue
        );
        dispatch({ type: LOADER_START });
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
        dispatch({
          type: ASSESSMENT_REVIEW_DISTINCT_SAGA,
          payload: {
            request: requestObect,
            BadgeOne: middlePaneHeaderBadgeOne,
            BadgeTwo: middlePaneHeaderBadgeTwo,
            BadgeThree: middlePaneHeaderBadgeThree,
            isMiddlePaneList: true
          }
        });
        dispatch({ type: ASSOCIATE_POPUP_CLOSE });
        document.getElementById('middleComponentId').scrollTop = '0px';
      }
      if (typeOfMiddlePaneList === 'cultureProfilesDistinctReviewList') {
        let requestObect = makeCultureProfileScanObj(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo,
          0,
          countPage,
          state.scanValue
        );
        dispatch({ type: LOADER_START });
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
        dispatch({
          type: GET_CULTUREPROFILE_REVIEW_LIST_SAGA,
          payload: {
            request: requestObect,
            BadgeOne: middlePaneHeaderBadgeOne,
            BadgeTwo: middlePaneHeaderBadgeTwo,
            BadgeThree: middlePaneHeaderBadgeThree,
            isMiddlePaneList: true
          }
        });
        dispatch({ type: ASSOCIATE_POPUP_CLOSE });
        document.getElementById('middleComponentId').scrollTop = '0px';
      }
      if (typeOfMiddlePaneList === 'cultureProfilesGroupDistinctReviewList') {
        let requestObect = makeCultureProfileGroupScanObj(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo,
          0,
          countPage,
          state.scanValue
        );
        dispatch({ type: LOADER_START });
        dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
        dispatch({
          type: GET_CULTUREPROFILE_GROUP_REVIEW_LIST_SAGA,
          payload: {
            request: requestObect,
            BadgeOne: middlePaneHeaderBadgeOne,
            BadgeTwo: middlePaneHeaderBadgeTwo,
            BadgeThree: middlePaneHeaderBadgeThree,
            isMiddlePaneList: true
          }
        });
        dispatch({ type: ASSOCIATE_POPUP_CLOSE });
        document.getElementById('middleComponentId').scrollTop = '0px';
      }
      if (typeOfMiddlePaneList === 'assesseesRoleAssesseeReviewList') {
        getAssesseeRoleAssesseeDistinctApiCall(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo,
          countPage,
          dispatch,
          'distinct',
          selectedTagValue,
          state.scanValue,
          true
        );
      }
      if (typeOfMiddlePaneList === 'assesseesGroupAssesseeReviewList') {
        getAssesseeGroupAssesseeDistinctApiCall(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo,
          countPage,
          dispatch,
          'distinct',
          selectedTagValue,
          state.scanValue,
          true
        );
      }
      if (typeOfMiddlePaneList === 'assignmentGroupAssignmentReviewList') {
        getAssignmnetGroupAssignmnetDistinctApiCall(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo,
          countPage,
          dispatch,
          'distinct',
          selectedTagValue,
          state.scanValue,
          true
        );
      }
      if (typeOfMiddlePaneList === 'associatesGroupAssociateReviewList') {
        getAssociateGroupAssociateDistinctApiCall(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo,
          countPage,
          dispatch,
          'distinct',
          selectedTagValue,
          state.scanValue,
          true
        );
      }
      if (typeOfMiddlePaneList === 'itemTypeItemReviewList') {
        getItemTypeItemDistinctApiCall(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo,
          countPage,
          dispatch,
          'distinct',
          selectedTagValue,
          state.scanValue,
          true
        );
      }
      if (typeOfMiddlePaneList === 'itemGroupItemReviewList') {
        getItemGroupItemDistinctApiCall(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo,
          countPage,
          dispatch,
          'distinct',
          selectedTagValue,
          state.scanValue,
          true
        );
      }

      if (typeOfMiddlePaneList === 'associatesRoleAssociateReviewList') {
        getAssociateRoleAssociateDistinctApiCall(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo,
          countPage,
          dispatch,
          'distinct',
          selectedTagValue,
          state.scanValue,
          true
        );
      }
      if (typeOfMiddlePaneList === 'assessmentNodeAssessmentReviewList') {
        getNodeRelatedAssessmentsDistinctApiCall(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo,
          countPage,
          dispatch,
          'distinct',
          selectedTagValue,
          state.scanValue,
          true,
          middlePaneHeader
        );
      }
      if (typeOfMiddlePaneList === 'itemNodeItemReviewList') {
        getNodeRelatedItemsDistinctApiCall(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo,
          countPage,
          dispatch,
          'distinct',
          selectedTagValue,
          state.scanValue,
          true,
          middlePaneHeader
        );
      }
      if (typeOfMiddlePaneList === 'assignmentTypeAssignmentReviewList') {
        getAssignmnetTypeAssignmnetDistinctApiCall(
          selectedAssociateInfo,
          middlePaneHeaderBadgeTwo,
          countPage,
          dispatch,
          'distinct',
          selectedTagValue,
          state.scanValue,
          true
        );
      }
      if (
        (typeOfMiddlePaneList === 'associatesNodeDistinctReviewList' ||
          typeOfMiddlePaneList === 'associateNodeDistinctReviewList') &&
        nodeViewState === 'list'
      ) {
        let listData = [];
        if (typeOfMiddlePaneList === 'associateNodeDistinctReviewList') {
          listData = reviewListDistinctData[0].filter(function (value) {
            let name = value.informationBasic.associateNodeName.toLowerCase();
            let desc = value.informationBasic.associateNodeDescription.toLowerCase();
            return name.includes(state.scanValue) || desc.includes(state.scanValue);
          });
        }
        if (typeOfMiddlePaneList === 'associatesNodeDistinctReviewList') {
          listData = reviewListDistinctData[0].filter(function (value) {
            let name = value.informationBasic.associateName.toLowerCase();
            let desc = value.informationBasic.associateDescription.toLowerCase();
            return name.includes(state.scanValue) || desc.includes(state.scanValue);
          });
        }
        dispatch({
          type: SET_DISPLAY_TWO_SINGLE_STATE,
          payload: { stateName: 'reviewListDistinctData', value: [listData] }
        });
      }
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'scanString', value: state.scanValue }
      });
      if (typeOfMiddlePaneList === 'assesseeRelatedAssociate') {
        console.log(typeOfMiddlePaneList);
      }
    }

    dispatch({ type: POPUP_CLOSE });
  };
  return (
    <div>
      <Popup isActive={isActive}>
        <PopupHeader
          headerPanelColour={'displayPaneCentre'}
          headerOne={scanHeader}
          headerOneBadgeOne={scanHeaderBadgeOne}
          headerOneBadgeTwo={scanHeaderBadgeTwo}
          headerOneBadgeThree={''}
          mode={'search'}
          onClick={handleClick}
        />

        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <FormControl style={{ width: '100%' }}>
            <InputFeild
              id={'scan'}
              label={'scan'}
              labelBadgeOne={''}
              isRequired={false}
              value={state.scanValue}
              classNames={'scanInputFields'}
              onClick={handleChange}
            />
            <FormHelperText
              className={['aliasName', 'helptextmargin'].join(' ')}
              style={{ paddingLeft: '5px' }}
            >
              {(isPopUpValue === 'assesseeRoleDistinctReviewList' ||
                isPopUpValue === 'assesseesGroupDistinctReviewList' ||
                isPopUpValue === 'assessmentsGroupDistinctReviewList' ||
                isPopUpValue === 'assignmentsGroupDistinctReviewList' ||
                isPopUpValue === 'associatesGroupDistinctReviewList' ||
                isPopUpValue === 'assignmentsTypeDistinctReviewList' ||
                isPopUpValue === 'assessmentsTypeDistinctReviewList' ||
                isPopUpValue === 'associatesGroupAssociateReviewList' ||
                isPopUpValue === 'associatesNodeDistinctReviewList' ||
                isPopUpValue === 'associateNodeDistinctReviewList' ||
                isPopUpValue === 'assesseesTypeDistinctReviewList' ||
                isPopUpValue === 'associatesTypeDistinctReviewList' ||
                isPopUpValue === 'itemsDistinctReviewList' ||
                isPopUpValue === 'itemsGroupDistinctReviewList' ||
                isPopUpValue === 'itemsTypeDistinctReviewList' ||
                isPopUpValue === 'itemTypeItemReviewList' ||
                isPopUpValue === 'itemGroupItemReviewList' ||
                isPopUpValue === 'assessmentGroupAssessmentReviewList' ||
                isPopUpValue === 'assessmentTypeAssessmentReviewList' ||
                isPopUpValue === 'assessmentNodeAssessmentReviewList' ||
                isPopUpValue === 'itemNodeItemReviewList' ||
                isPopUpValue === 'assignmentTypeAssignmentReviewList' ||
                isPopUpValue === 'assignmentGroupAssignmentReviewList' ||
                isPopUpValue === 'cultureProfilesGroupDistinctReviewList' ||
                isPopUpValue === 'associateRoleDistinctReviewList') && (
                <span>name, description.</span>
              )}
              {(isPopUpValue === 'assignmentDistinctReviewList' ||
                isPopUpValue === 'cultureProfilesDistinctReviewList' ||
                isPopUpValue === 'jobProfilesDistinctReviewList' ||
                isPopUpValue === 'assessmentDistinctReviewList') && (
                  <span>name, description, tag.</span>
                )}
              {(isPopUpValue === 'assesseesDistinctReviewList' ||
                isPopUpValue === 'administratorsDistinctReviewList' ||
                isPopUpValue === 'assesseesGroupAssesseeReviewList' ||
                isPopUpValue === 'assesseesRoleAssesseeReviewList' ||
                isPopUpValue === 'managersDistinctReviewList') && (
                <span>name, alias, email address, mobile telephone, tag.</span>
              )}
              {isPopUpValue === 'assesseeRelatedAssociate' ||
                isPopUpValue === 'associateDistinctReviewList' ||
                (isPopUpValue === 'associatesRoleAssociateReviewList' && (
                  <span>name, description, website address, tag.</span>
                ))}
            </FormHelperText>
          </FormControl>
        </DialogContent>
      </Popup>
    </div>
  );
};

PopUpScan.propTypes = {
  className: PropTypes.string,
  headerPanelColour: PropTypes.oneOf([
    'displayPaneLeft',
    'displayPaneCentre',
    'displayPaneRight',
    'genericOne',
    'genericTwo'
  ]),
  headerOne: PropTypes.string,
  headerOneBadgeOne: PropTypes.string,
  headerOneBadgeTwo: PropTypes.string,
  headerOneBadgeThree: PropTypes.string,
  isActive: PropTypes.bool
};
export default PopUpScan;
