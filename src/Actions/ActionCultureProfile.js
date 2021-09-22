import {
  CLEAR_DISPLAY_PANE_THREE,
  FILTERMODE,
  GET_CULTUREPROFILE_REVIEW_LIST_SAGA,
  GET_CULTUREPROFILE_GROUP_REVIEW_LIST_SAGA,
  GET_CULTUREPROFILE_TYPE_REVIEW_LIST_SAGA,
  CULTURE_GROUP_CULTURE_REVIEWLIST_SAGA,
  CULTURE_TYPE_CULTURE_REVIEWLIST_SAGA,
  GET_CULTURE_NODE_CULTURE_REVIEW_LIST_SAGA,
  LOADER_START,
  SET_MOBILE_PANE_STATE,
  SET_REQUEST_OBJECT,
  CLEAR_CULTURE_REDUCER_STATE,
  SET_POPUP_VALUE,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  INTERNAL_NODE_LIST_SAGA,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_TYPE_REVIEW_LIST_REQ_OBJECT,
  SET_PAGE_COUNT,
  SET_RELATED_REQUEST_OBJECT,
  CULTURE_PROFILE_INFO_REVISE_SAGA,
  CULTURE_GROUP_REVISE_INFO_SAGA,
  CULTURE_TYPE_REVISE_INFO_SAGA,
  CULTURE_ASSESSMENTS_REVIEWLIST_SAGA,
  GET_ASSIGNMENTDISTINCT_CULTURE_PROFILE_REVIEWLIST_SAGA,
  SET_POPUP_SINGLE_STATE,
  GET_CULTURE_DIAMENTION_SAGA
} from '../actionType';
import { CULTURE_PROFILE_REVISE_INFO_URL } from '../endpoints';
import {
  getCultureGroupCultureReqObj,
  getCultureGroupCultureScanReqObj,
  makeCultureProfileGroupObj,
  makeCultureProfileObj,
  makeCultureProfileTypeObj,
  makeInternalNodeObj,
  getCultureTypeCultureReqObj,
  getCultureTypeCultureScanReqObj,
  getNodeCultureProfileReqObj,
  getNodeCultureProfileScanReqObj
} from './GenericActions';

const resetDataFunction = (dispatch) => {
  dispatch({
    type: SET_POPUP_SINGLE_STATE,
    payload: { stateName: 'cardValue', value: 'NoCard' }
  });
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'middlePaneSelectedValue', value: '' }
  });
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'selectedFlagedArray', value: [] }
  });
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'unselectedFlagedArray', value: [] }
  });
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'selectedTagsArray', value: [] }
  });
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'unselectedTagsArray', value: [] }
  });
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'flagedValue', value: '' }
  });
  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
};
export const cultureProfileCreatePopup = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  dispatch
) => {
  dispatch({ type: CLEAR_CULTURE_REDUCER_STATE });
  dispatch({ type: LOADER_START });
  let requestObj = makeCultureProfileGroupObj(selectedAssociateInfo, 'active', 0, -1);
  dispatch({ type: SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT, payload: requestObj });
  dispatch({
    type: GET_CULTUREPROFILE_GROUP_REVIEW_LIST_SAGA,
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
  let typeRequestObj = makeCultureProfileTypeObj(selectedAssociateInfo, 'active', 0, -1);
  dispatch({ type: SET_CORE_TYPE_REVIEW_LIST_REQ_OBJECT, payload: typeRequestObj });
  dispatch({
    type: GET_CULTUREPROFILE_TYPE_REVIEW_LIST_SAGA,
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
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: {
      stateName: 'responseObject',
      value: null
    }
  });
  resetDataFunction(dispatch);
  dispatch({
    type: SET_POPUP_VALUE,
    payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'CULTURECREATE' }
  });
};
export const getCultureProfilesDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  popupHeaderOne,
  dispatch
) => {
  let requestObj = makeCultureProfileObj(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    countPage,
    0
  );

  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'cultureProfileDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  resetDataFunction(dispatch);
  dispatch({
    type: GET_CULTUREPROFILE_REVIEW_LIST_SAGA,
    payload: {
      middlePaneHeader: 'culture profiles',
      request: requestObj,
      BadgeOne: 'distinct',
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};
export const getCultureProfileGroupApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  cardValue = 'noCard',
  isSelectActive = ''
) => {
  let requestObj = makeCultureProfileGroupObj(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'cultureProfileGroup' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  resetDataFunction(dispatch);
  dispatch({
    type: GET_CULTUREPROFILE_GROUP_REVIEW_LIST_SAGA,
    payload: {
      request: requestObj,
      BadgeOne: targetValue,
      BadgeTwo: cardValue === 'Card' ? 'distinct' : secondaryOptionCheckValue,
      BadgeThree: cardValue === 'Card' ? secondaryOptionCheckValue : '',
      isMiddlePaneList: true,
      isSelectActive: isSelectActive
    }
  });
};
export const getCultureProfileTypeApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  middlePaneHeader = 'culture profile',
  cardValue = 'noCard'
) => {
  let requestObj = makeCultureProfileTypeObj(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    0,
    countPage
  );

  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'cultureProfileTypeDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  resetDataFunction(dispatch);
  dispatch({
    type: GET_CULTUREPROFILE_TYPE_REVIEW_LIST_SAGA,
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
export const getCultureGroupCultureDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  selectedTagValue,
  searchStr,
  isScan
) => {
  let reqBody = getCultureGroupCultureReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  if (isScan) {
    reqBody = getCultureGroupCultureScanReqObj(
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
    type: CULTURE_GROUP_CULTURE_REVIEWLIST_SAGA,
    payload: {
      request: reqBody,
      HeaderOne: 'culture profiles',
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};
export const getCultureTypeCultureDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  selectedTagValue,
  searchStr,
  isScan
) => {
  let reqBody = getCultureTypeCultureReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  if (isScan) {
    reqBody = getCultureTypeCultureScanReqObj(
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
    type: CULTURE_TYPE_CULTURE_REVIEWLIST_SAGA,
    payload: {
      request: reqBody,
      HeaderOne: 'culture profiles',
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};

export const getCultureProfileNodeCultureProfileApiCall = (
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
  let reqBody = getNodeCultureProfileReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  if (isScan) {
    reqBody = getNodeCultureProfileScanReqObj(
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
    type: GET_CULTURE_NODE_CULTURE_REVIEW_LIST_SAGA,
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

export const updateCultureProfileDistinctStatus = (
  selectedAssociateInfo,
  cultureProfileId,
  dispatch,
  reviseStatus
) => {
  let reqBody = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    cultureProfile: {
      id: cultureProfileId,
      informationEngagement: {
        cultureProfileStatus:
          reviseStatus === 'UNSUSPENDED' ||
          reviseStatus === 'UNTERMINATED' ||
          reviseStatus === 'UNARCHIVED'
            ? 'ACTIVE'
            : reviseStatus
      }
    },
    createMode: ''
  };
  dispatch({ type: LOADER_START });
  dispatch({
    type: CULTURE_PROFILE_INFO_REVISE_SAGA,
    payload: { secondaryOptionCheckValue: '', isHideRightPane: true, headerOne: '', reqBody }
  });
};
export const updateCultureProfileGroupStatus = (
  selectedAssociateInfo,
  groupId,
  dispatch,
  reviseStatus
) => {
  let reqBody = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    cultureProfileGroup: {
      id: groupId,
      informationEngagement: {
        cultureProfileGroupStatus:
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
    type: CULTURE_GROUP_REVISE_INFO_SAGA,
    payload: {
      secondaryOptionCheckValue: '',
      cultureGroupCultureReqBody: null,
      headerOne: '',
      reqBody
    }
  });
};
export const updateCultureProfileTypeStatus = (
  selectedAssociateInfo,
  typeId,
  dispatch,
  reviseStatus
) => {
  let reqBody = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    cultureProfileType: {
      id: typeId,
      informationEngagement: {
        cultureProfileTypeStatus:
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
    type: CULTURE_TYPE_REVISE_INFO_SAGA,
    payload: {
      secondaryOptionCheckValue: '',
      cultureTypeCultureReqBody: null,
      headerOne: '',
      reqBody
    }
  });
};
export const getAssignmneCultureProfileDistinctApiCall = (
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
        in: ['SUSPENDED', 'TERMINATED', 'ACTIVE', 'ARCHIVED']
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
            conditionColumn: 'informationEngagement.cultureProfileStatus',
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
    type: GET_ASSIGNMENTDISTINCT_CULTURE_PROFILE_REVIEWLIST_SAGA,
    payload: {
      request: reqBody,
      HeaderOne: 'culture profiles',
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};
export const getCultureProfileAssessmentDistinctApiCall = (
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
        in: ['SUSPENDED', 'TERMINATED', 'ACTIVE', 'ARCHIVED']
      }
    };
  }
  let reqBody = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
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

  // dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({
    type: SET_RELATED_REQUEST_OBJECT,
    payload: reqBody
  });
  dispatch({ type: LOADER_START });
  // dispatch({ type: SET_REQUEST_OBJECT, payload: reqBody });
  dispatch({
    type: CULTURE_ASSESSMENTS_REVIEWLIST_SAGA,
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
export const getCultureProfileDiamentionList = (selectedAssociateInfo, dispatch) => {
  dispatch({ type: LOADER_START });
  let diamentionReqBody = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    filter: 'true',
    countPage: 0,
    search: [
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'iGuruAnalyticFrameworkOneName',
            conditionValue: {
              condition: 'eq',
              value: {
                from: 'Culture Profiler'
              }
            }
          }
        ]
      }
    ]
  };
  dispatch({ type: GET_CULTURE_DIAMENTION_SAGA, payload: { request: diamentionReqBody } });
};
