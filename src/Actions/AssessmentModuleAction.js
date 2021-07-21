import {
  LOADER_START,
  SET_MOBILE_PANE_STATE,
  SET_RELATED_REQUEST_OBJECT,
  GET_ASSESSMENTGROUP_ASSESSMENT_REVIEWLIST_SAGA,
  GET_ASSESSMENTTYPE_ASSESSMENT_REVIEWLIST_SAGA,
  CLEAR_DISPLAY_PANE_THREE,
  FILTERMODE,
  SET_REQUEST_OBJECT,
  ASSESSMENT_REVIEW_DISTINCT_SAGA,
  GET_ASSESSMENT_GROUP_REVIEW_LIST_SAGA,
  GET_ASSESSMENT_TYPE_REVIEW_LIST_SAGA,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_POPUP_VALUE,
  SET_MIDDLEPANE_STATE,
  SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_TYPE_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  INTERNAL_NODE_LIST_SAGA,
  CLEAR_ASSESSMENT_INFO,
  GET_NODE_ASSESSMENTS_REVIEW_LIST_SAGA,
  SET_PAGE_COUNT,
  ASSESSMENT_INFO_REVISE_SAGA,
  ASSESSMENT_GROUP_REVISE_INFO_SAGA,
  ASSESSMENT_TYPE_REVISE_INFO_SAGA,
  SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
  ASSESSMENT_PUBLISH_SAGA,
  GET_ASSESSMENT_ITEM_REVIEW_LIST_SAGA
} from '../actionType';
import {
  getAssessmentGroupAssessmentReqObj,
  getAssessmentGroupAssessmentScanReqObj,
  getAssessmentItemReqObj,
  getAssessmentItemScanReqObj,
  getAssessmentTypeAssessmentReqObj,
  getAssessmentTypeAssessmentScanReqObj,
  getNodeAssessmentsReqObj,
  getNodeAssessmentsScanReqObj,
  makeAssessmentGroupObj,
  makeAssessmentReviewListRequestObject,
  makeAssessmentTypeObj,
  makeInternalNodeObj
} from './GenericActions';

export const createAssessmentPopup = (
  selectedAssociateInfo,
  dispatch,
  secondaryOptionCheckValue,
  targetValue
) => {
  dispatch({ type: LOADER_START });
  dispatch({ type: CLEAR_ASSESSMENT_INFO });
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'selectedInformationAllorKey', value: secondaryOptionCheckValue }
  });
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
  let roleRequestObj = makeAssessmentTypeObj(selectedAssociateInfo, 'active', 0, -1);
  dispatch({ type: SET_CORE_TYPE_REVIEW_LIST_REQ_OBJECT, payload: roleRequestObj });
  dispatch({
    type: GET_ASSESSMENT_TYPE_REVIEW_LIST_SAGA,
    payload: {
      request: roleRequestObj,
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: false
    }
  });
  let requestObj = makeAssessmentGroupObj(selectedAssociateInfo, 'active', 0, -1);
  dispatch({ type: SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT, payload: requestObj });
  dispatch({
    type: GET_ASSESSMENT_GROUP_REVIEW_LIST_SAGA,
    payload: {
      request: requestObj,
      BadgeOne: '',
      BadgeTwo: '',
      BadgeThree: '',
      isMiddlePaneList: false
    }
  });
  dispatch({
    type: SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
    payload: {
      stateName: 'assessmentGroup',
      actualStateName: 'assessmentGroupPrimary',
      value: []
    }
  });
  dispatch({
    type: SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
    payload: {
      stateName: 'assessmentManager',
      actualStateName: 'assessmentManagerPrimary',
      value: []
    }
  });
  dispatch({
    type: SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
    payload: {
      stateName: 'assessmentNode',
      actualStateName: 'assessmentNodePrimary',
      value: []
    }
  });
  dispatch({
    type: SET_ASSESSMENT_DYNAMIC_SINGLE_STATE,
    payload: {
      stateName: 'assessmentType',
      actualStateName: 'assessmentTypePrimary',
      value: []
    }
  });
  dispatch({
    type: SET_POPUP_VALUE,
    payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'ASSESSMENTCREATE' }
  });
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
};
export const getAssessmentGroupAssessmentDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  selectedTagValue,
  searchStr,
  isScan
) => {
  let reqBody = getAssessmentGroupAssessmentReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  if (isScan) {
    reqBody = getAssessmentGroupAssessmentScanReqObj(
      selectedAssociateInfo,
      selectedTagValue,
      secondaryOptionCheckValue,
      0,
      countPage,
      searchStr
    );
  }
  // dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({
    type: SET_RELATED_REQUEST_OBJECT,
    payload: reqBody
  });
  dispatch({ type: LOADER_START });
  // dispatch({ type: SET_REQUEST_OBJECT, payload: reqBody });
  dispatch({
    type: GET_ASSESSMENTGROUP_ASSESSMENT_REVIEWLIST_SAGA,
    payload: {
      request: reqBody,
      HeaderOne: 'items',
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};
export const getAssessmentItemDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  selectedTagValue,
  searchStr,
  isScan
) => {
  let reqBody = getAssessmentItemReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  if (isScan) {
    reqBody = getAssessmentItemScanReqObj(
      selectedAssociateInfo,
      selectedTagValue,
      secondaryOptionCheckValue,
      0,
      countPage,
      searchStr
    );
  }
  // dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({
    type: SET_RELATED_REQUEST_OBJECT,
    payload: reqBody
  });
  dispatch({ type: LOADER_START });
  dispatch({
    type: GET_ASSESSMENT_ITEM_REVIEW_LIST_SAGA,
    payload: {
      request: reqBody,
      HeaderOne: 'items',
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};
export const getAssessmentTypeAssessmentDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  selectedTagValue,
  searchStr,
  isScan
) => {
  let reqBody = getAssessmentTypeAssessmentReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  if (isScan) {
    reqBody = getAssessmentTypeAssessmentScanReqObj(
      selectedAssociateInfo,
      selectedTagValue,
      secondaryOptionCheckValue,
      0,
      countPage,
      searchStr
    );
  }
  // dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({
    type: SET_RELATED_REQUEST_OBJECT,
    payload: reqBody
  });
  dispatch({ type: LOADER_START });
  // dispatch({ type: SET_REQUEST_OBJECT, payload: reqBody });
  dispatch({
    type: GET_ASSESSMENTTYPE_ASSESSMENT_REVIEWLIST_SAGA,
    payload: {
      request: reqBody,
      HeaderOne: 'assessments',
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};
export const getAssessmentDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue
) => {
  let requestObect = makeAssessmentReviewListRequestObject(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'assessmentsDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  dispatch({
    type: ASSESSMENT_REVIEW_DISTINCT_SAGA,
    payload: {
      request: requestObect,
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue
    }
  });
};
export const getAssessmentGroupApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  cardValue = 'noCard'
) => {
  let requestObj = makeAssessmentGroupObj(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'assessmentGroupDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  dispatch({
    type: GET_ASSESSMENT_GROUP_REVIEW_LIST_SAGA,
    payload: {
      request: requestObj,
      BadgeOne: targetValue,
      BadgeTwo: cardValue === 'Card' ? 'distinct' : secondaryOptionCheckValue,
      BadgeThree: cardValue === 'Card' ? secondaryOptionCheckValue : '',
      isMiddlePaneList: true
    }
  });
};
export const getAssessmentTypeApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  cardValue = 'noCard'
) => {
  let requestObj = makeAssessmentTypeObj(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'assessmentsTypeDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  dispatch({
    type: GET_ASSESSMENT_TYPE_REVIEW_LIST_SAGA,
    payload: {
      request: requestObj,
      BadgeOne: targetValue,
      BadgeTwo: cardValue === 'Card' ? 'distinct' : secondaryOptionCheckValue,
      BadgeThree: cardValue === 'Card' ? secondaryOptionCheckValue : '',
      isMiddlePaneList: true
    }
  });
};

export const getNodeRelatedAssessmentsDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  selectedTagValue,
  searchStr,
  isScan,
  middlePaneHeader
) => {
  let reqBody = getNodeAssessmentsReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  if (isScan) {
    reqBody = getNodeAssessmentsScanReqObj(
      selectedAssociateInfo,
      selectedTagValue,
      secondaryOptionCheckValue,
      0,
      countPage,
      searchStr
    );
  }

  // dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'relatedReviewListDistinctData', value: [] }
  });
  dispatch({ type: LOADER_START });
  // dispatch({ type: SET_REQUEST_OBJECT, payload: reqBody });
  dispatch({
    type: GET_NODE_ASSESSMENTS_REVIEW_LIST_SAGA,
    payload: {
      request: reqBody,
      HeaderOne: middlePaneHeader,
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};
export const updateAssessmentDistinctStatus = (
  selectedAssociateInfo,
  assessmentId,
  dispatch,
  reviseStatus
) => {
  if (reviseStatus === 'PUBLISHED') {
    let reqBody = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      assessmentId: assessmentId
    };
    dispatch({ type: LOADER_START });
    dispatch({
      type: ASSESSMENT_PUBLISH_SAGA,
      payload: {
        secondaryOptionCheckValue: '',
        hideRightpane: true,
        headerOne: '',
        reqBody
      }
    });
  } else {
    let reqBody = {
      assesseeId: selectedAssociateInfo?.assesseeId,
      associateId:
        selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
      assessment: {
        id: assessmentId,
        informationEngagement: {
          assessmentStatus:
            reviseStatus === 'UNSUSPENDED' ||
            reviseStatus === 'UNTERMINATED' ||
            reviseStatus === 'UNARCHIVED'
              ? 'ACTIVE'
              : reviseStatus
        }
      }
    };
    dispatch({ type: LOADER_START });
    dispatch({
      type: ASSESSMENT_INFO_REVISE_SAGA,
      payload: {
        secondaryOptionCheckValue: '',
        hideRightpane: true,
        headerOne: '',
        reqBody
      }
    });
  }
};
export const updateAssessmentGroupStatus = (
  selectedAssociateInfo,
  groupId,
  dispatch,
  reviseStatus
) => {
  let reqBody = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    assessmentGroup: {
      id: groupId,
      informationEngagement: {
        assessmentGroupStatus:
          reviseStatus === 'UNSUSPENDED' ||
          reviseStatus === 'UNTERMINATED' ||
          reviseStatus === 'UNARCHIVED'
            ? 'ACTIVE'
            : reviseStatus
      }
    }
  };
  dispatch({ type: LOADER_START });
  dispatch({
    type: ASSESSMENT_GROUP_REVISE_INFO_SAGA,
    payload: {
      secondaryOptionCheckValue: '',
      assessmentGroupAssessmentReqBody: null,
      headerOne: '',
      reqBody
    }
  });
};
export const updateAssessmentTypeStatus = (
  selectedAssociateInfo,
  typeId,
  dispatch,
  reviseStatus
) => {
  let reqBody = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    assessmentType: {
      id: typeId,
      informationEngagement: {
        assessmentTypeStatus:
          reviseStatus === 'UNSUSPENDED' ||
          reviseStatus === 'UNTERMINATED' ||
          reviseStatus === 'UNARCHIVED'
            ? 'ACTIVE'
            : reviseStatus
      }
    }
  };
  dispatch({ type: LOADER_START });
  dispatch({
    type: ASSESSMENT_TYPE_REVISE_INFO_SAGA,
    payload: {
      secondaryOptionCheckValue: '',
      assessmentTypeAssessmentReqBody: null,
      headerOne: '',
      reqBody
    }
  });
};
