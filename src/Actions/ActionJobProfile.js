import {
  CLEAR_DISPLAY_PANE_THREE,
  CLEAR_JOB_REDUCER_STATE,
  FILTERMODE,
  GET_ASSIGNMENTDISTINCT_JOB_PROFILE_REVIEWLIST_SAGA,
  GET_JOBPROFILE_GROUP_REVIEW_LIST_SAGA,
  GET_JOBPROFILE_REVIEW_LIST_SAGA,
  GET_JOBPROFILE_TYPE_REVIEW_LIST_SAGA,
  GET_JOB_NODE_JOB_REVIEW_LIST_SAGA,
  INTERNAL_NODE_LIST_SAGA,
  JOB_GROUP_JOB_REVIEWLIST_SAGA,
  JOB_GROUP_REVISE_INFO_SAGA,
  JOB_PROFILE_INFO_REVISE_SAGA,
  JOB_TYPE_JOB_REVIEWLIST_SAGA,
  JOB_TYPE_REVISE_INFO_SAGA,
  LOADER_START,
  SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_TYPE_REVIEW_LIST_REQ_OBJECT,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_PAGE_COUNT,
  SET_POPUP_VALUE,
  SET_RELATED_REQUEST_OBJECT,
  SET_REQUEST_OBJECT
} from '../actionType';
import {
  makeInternalNodeObj,
  makeJobProfileObj,
  makeJobProfileGroupObj,
  makeJobProfileTypeObj,
  getJobProfileGroupJobProfileReqObj,
  getJobProfileGroupJobProfileScanReqObj,
  getJobProfileTypeJobProfileReqObj,
  getJobProfileTypeJobProfileScanReqObj,
  getNodeJobProfileReqObj,
  getNodeJobProfileScanReqObj
} from './GenericActions';

export const jobProfileCreatePopup = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  dispatch
) => {
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'responseStatus', value: '' }
  });
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'responseObject', value: '' }
  });
  dispatch({ type: CLEAR_JOB_REDUCER_STATE });
  dispatch({ type: LOADER_START });
  let requestObj = makeJobProfileGroupObj(selectedAssociateInfo, 'active', 0, -1);
  dispatch({ type: SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT, payload: requestObj });
  dispatch({
    type: GET_JOBPROFILE_GROUP_REVIEW_LIST_SAGA,
    payload: {
      request: requestObj,
      BadgeOne: '',
      BadgeTwo: '',
      BadgeThree: '',
      isMiddlePaneList: false
    }
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
  let typeRequestObj = makeJobProfileTypeObj(selectedAssociateInfo, 'active', 0, -1);
  dispatch({ type: SET_CORE_TYPE_REVIEW_LIST_REQ_OBJECT, payload: typeRequestObj });
  dispatch({
    type: GET_JOBPROFILE_TYPE_REVIEW_LIST_SAGA,
    payload: {
      request: typeRequestObj,
      BadgeOne: '',
      BadgeTwo: '',
      BadgeThree: '',
      isMiddlePaneList: false
    }
  });
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: {
      stateName: 'selectedInformationAllorKey',
      value: secondaryOptionCheckValue
    }
  });
  dispatch({
    type: SET_POPUP_VALUE,
    payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'JOBCREATE' }
  });
};
export const getJobProfilesDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  popupHeaderOne,
  dispatch
) => {
  let requestObj = makeJobProfileObj(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    countPage,
    0
  );

  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'jobProfileDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  dispatch({
    type: GET_JOBPROFILE_REVIEW_LIST_SAGA,
    payload: {
      middlePaneHeader: 'job profiles',
      request: requestObj,
      BadgeOne: 'distinct',
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};
export const getJobProfileGroupApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  cardValue = 'noCard'
) => {
  let requestObj = makeJobProfileGroupObj(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'jobProfileGroup' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  dispatch({
    type: GET_JOBPROFILE_GROUP_REVIEW_LIST_SAGA,
    payload: {
      request: requestObj,
      BadgeOne: targetValue,
      BadgeTwo: cardValue === 'Card' ? 'distinct' : secondaryOptionCheckValue,
      BadgeThree: cardValue === 'Card' ? secondaryOptionCheckValue : '',
      isMiddlePaneList: true
    }
  });
};
export const getJobProfileTypeApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  middlePaneHeader = 'job profiles',
  cardValue = 'noCard'
) => {
  let requestObj = makeJobProfileTypeObj(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    0,
    countPage
  );

  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'jobProfileTypeDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  dispatch({
    type: GET_JOBPROFILE_TYPE_REVIEW_LIST_SAGA,
    payload: {
      middlePaneHeader: middlePaneHeader,
      request: requestObj,
      BadgeOne: targetValue,
      BadgeTwo: cardValue === 'Card' ? 'distinct' : secondaryOptionCheckValue,
      BadgeThree: cardValue === 'Card' ? secondaryOptionCheckValue : '',
      isMiddlePaneList: true
    }
  });
};

export const getJobProfileGroupJobProfileDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  selectedTagValue,
  searchStr,
  isScan
) => {
  let reqBody = getJobProfileGroupJobProfileReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  if (isScan) {
    reqBody = getJobProfileGroupJobProfileScanReqObj(
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
    type: JOB_GROUP_JOB_REVIEWLIST_SAGA,
    payload: {
      request: reqBody,
      HeaderOne: 'job profiles',
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};
export const getJobProfileTypeJobProfileDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  selectedTagValue,
  searchStr,
  isScan
) => {
  let reqBody = getJobProfileTypeJobProfileReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  if (isScan) {
    reqBody = getJobProfileTypeJobProfileScanReqObj(
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
    type: JOB_TYPE_JOB_REVIEWLIST_SAGA,
    payload: {
      request: reqBody,
      HeaderOne: 'job profiles',
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};
export const getJobProfileNodeJobProfileApiCall = (
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
  let reqBody = getNodeJobProfileReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  if (isScan) {
    reqBody = getNodeJobProfileScanReqObj(
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
    type: GET_JOB_NODE_JOB_REVIEW_LIST_SAGA,
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
export const updateJobProfileDistinctStatus = (
  selectedAssociateInfo,
  jobProfileId,
  dispatch,
  reviseStatus
) => {
  let reqBody = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    jobProfile: {
      id: jobProfileId,
      informationEngagement: {
        jobProfileStatus:
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
    type: JOB_PROFILE_INFO_REVISE_SAGA,
    payload: { secondaryOptionCheckValue: '', isHideRightPane: true, headerOne: '', reqBody }
  });
};
export const updateJobProfileGroupStatus = (
  selectedAssociateInfo,
  groupId,
  dispatch,
  reviseStatus
) => {
  let reqBody = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    jobProfileGroup: {
      id: groupId,
      informationEngagement: {
        jobProfileGroupStatus:
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
    type: JOB_GROUP_REVISE_INFO_SAGA,
    payload: { secondaryOptionCheckValue: '', jobGroupJobReqBody: null, headerOne: '', reqBody }
  });
};
export const updateJobProfileTypeStatus = (
  selectedAssociateInfo,
  typeId,
  dispatch,
  reviseStatus
) => {
  let reqBody = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    jobProfileType: {
      id: typeId,
      informationEngagement: {
        jobProfileTypeStatus:
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
    type: JOB_TYPE_REVISE_INFO_SAGA,
    payload: { secondaryOptionCheckValue: '', jobTypeJobReqBody: null, headerOne: '', reqBody }
  });
};
export const getAssignmneJobProfileDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  selectedTagValue,
  searchStr,
  isScan
) => {
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
        in: [
          'SUSPENDED',
          'TERMINATED',
          'ACTIVE',
          'ARCHIVED'
        ]
      }
    };
  }
  let reqBody = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    assignmentId: selectedTagValue,
    numberPage: 0,
    countPage: countPage,
    searchCondition: 'AND',
    filter: true,
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.jobProfileStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
  // dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({
    type: SET_RELATED_REQUEST_OBJECT,
    payload: reqBody
  });
  dispatch({ type: LOADER_START });
  // dispatch({ type: SET_REQUEST_OBJECT, payload: reqBody });
  dispatch({
    type: GET_ASSIGNMENTDISTINCT_JOB_PROFILE_REVIEWLIST_SAGA,
    payload: {
      request: reqBody,
      HeaderOne: 'job profiles',
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};