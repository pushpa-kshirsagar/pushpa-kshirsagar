import {
  ASSOCIATE_CREATE_INFO,
  ASSOCIATE_REVIEW_DISTINCT_SAGA,
  ASSOCIATE_SIGN_ON,
  CLEAR_ASSESSEE_INFO,
  CLEAR_ASSOCIATE_INFO,
  CLEAR_DISPLAY_PANE_THREE,
  FILTERMODE,
  GET_ASSOCIATEGROUP_ASSOCIATE_REVIEW_LIST_SAGA,
  GET_ASSOCIATEROLE_ASSOCIATE_REVIEW_LIST_SAGA,
  GET_ASSOCIATETYPE_ASSOCIATE_REVIEW_LIST_SAGA,
  GET_ASSOCIATES_NODE_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_GROUP_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_TYPE_REVIEW_LIST_SAGA,
  INTERNAL_NODE_LIST_SAGA,
  LOADER_START,
  SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_ROLE_REVIEW_LIST_REQ_OBJECT,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_PAGE_COUNT,
  SET_POPUP_SINGLE_STATE,
  SET_REQUEST_OBJECT,
  SET_SINGLE_ASSOCIATE_INFORMATION,
  GET_NODE_ASSOCIATE_REVIEW_LIST,
  ASSOCIATE_INFO_REVISE_SAGA,
  ASSOCIATE_GROUP_REVISE_INFO_SAGA,
  ASSOCIATE_TYPE_INFO_REVISE_SAGA,
  ASSOCIATE_ROLE_REVISE_INFO_SAGA,
  GET_ASSOCIATE_NODE_REVIEW_INFO_SAGA,
  ASSESSEE_NODE_INFO_REVISE_SAGA
} from '../actionType';
import {
  getAssociateTypeAssociateReqObj,
  getAssociateTypeAssociateScanReqObj,
  getNodeAssociatesReqObj,
  makeAssociateGroupObj,
  makeAssociateNodeObj,
  makeAssociateReviewListRequestObject,
  makeAssociateRoleObj,
  makeAssociateTypeObj,
  makeInternalNodeObj,
  getNodeAssociatesScanReqObj
} from './GenericActions';

export const getAssociateGroupAssociateReqObj = (
  selectedAssociateInfo,
  groupId,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: [
            'CONFIRMED',
            'DISAPPROVED',
            'SUSPENDED',
            'TERMINATED',
            'UNAPPROVED',
            'UNCONFIRMED',
            'ARCHIVED',
            'DELETED'
          ]
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    groupId: groupId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.associateGroup.associateGroupPrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.associateGroup.associateGroupSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.associateStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getAssociateGroupAssociateScanReqObj = (
  selectedAssociateInfo,
  groupId,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: [
            'CONFIRMED',
            'DISAPPROVED',
            'SUSPENDED',
            'TERMINATED',
            'UNAPPROVED',
            'UNCONFIRMED',
            'ARCHIVED',
            'DELETED'
          ]
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    groupId: groupId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.associateGroup.associateGroupPrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.associateGroup.associateGroupSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.associateName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.associateDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.associateStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};

export const getAssociateRoleAssociateReqObj = (
  selectedAssociateInfo,
  roleId,
  filterKey,
  numberPage,
  countPage
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: [
            'CONFIRMED',
            'DISAPPROVED',
            'SUSPENDED',
            'TERMINATED',
            'UNAPPROVED',
            'UNCONFIRMED',
            'ARCHIVED',
            'DELETED'
          ]
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    roleId: roleId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.associateRole.associateRolePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: roleId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.associateRole.associateRoleSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: roleId
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.associateStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getAssociateRoleAssociateScanReqObj = (
  selectedAssociateInfo,
  roleId,
  filterKey,
  numberPage,
  countPage,
  searchStr
) => {
  let searchObj = {
    condition: 'eq',
    value: {
      from: filterKey.toUpperCase()
    }
  };
  if (filterKey === 'all') {
    {
      searchObj = {
        condition: 'in',
        value: {
          in: [
            'CONFIRMED',
            'DISAPPROVED',
            'SUSPENDED',
            'TERMINATED',
            'UNAPPROVED',
            'UNCONFIRMED',
            'ARCHIVED',
            'DELETED'
          ]
        }
      };
    }
  }
  return {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    countPage: countPage,
    numberPage: numberPage,
    roleId: roleId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.associateRole.associateRolePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: roleId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.associateRole.associateRoleSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: roleId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.associateName',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.associateDescription',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          }
        ]
      },
      {
        condition: 'and',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationEngagement.associateStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};

export const getAssociateGroupAssociateDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  selectedTagValue,
  searchStr,
  isScan
) => {
  let reqBody = getAssociateGroupAssociateReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  if (isScan) {
    reqBody = getAssociateGroupAssociateScanReqObj(
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
    type: GET_ASSOCIATEGROUP_ASSOCIATE_REVIEW_LIST_SAGA,
    payload: {
      request: reqBody,
      HeaderOne: 'assessees',
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};
export const getAssociateRoleAssociateDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  selectedTagValue,
  searchStr,
  isScan
) => {
  let reqBody = getAssociateRoleAssociateReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  if (isScan) {
    reqBody = getAssociateRoleAssociateScanReqObj(
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
    type: GET_ASSOCIATEROLE_ASSOCIATE_REVIEW_LIST_SAGA,
    payload: {
      request: reqBody,
      HeaderOne: 'assessees',
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};

export const getAssociateTypeAssociateDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  selectedTagValue,
  searchStr,
  isScan
) => {
  let reqBody = getAssociateTypeAssociateReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  if (isScan) {
    reqBody = getAssociateTypeAssociateScanReqObj(
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
    type: GET_ASSOCIATETYPE_ASSOCIATE_REVIEW_LIST_SAGA,
    payload: {
      request: reqBody,
      HeaderOne: 'associates',
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};
export const getAssociateNodeApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  badgeValue,
  nodeViewState
) => {
  let requestObj = makeAssociateNodeObj(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'nodeViewState', value: nodeViewState }
  });
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'middlePaneSelectedValue', value: '' }
  });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'associatesNodeDistinct' }
  });

  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  dispatch({
    type: GET_ASSOCIATES_NODE_REVIEW_LIST_SAGA,
    payload: {
      request: requestObj,
      BadgeOne: badgeValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      nodeViewState: nodeViewState,
      isMiddlePaneList: true
    }
  });
};
export const getInternalNodeApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  middlePaneHeaderBadgeThree,
  nodeViewState,
  paneheader
) => {
  let requestObj = makeInternalNodeObj(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'nodeViewState', value: nodeViewState }
  });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'associateNodeDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: {
      stateName: 'scanString',
      value: ''
    }
  });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  dispatch({
    type: INTERNAL_NODE_LIST_SAGA,
    payload: {
      request: requestObj,
      paneHeader: (paneheader && paneheader) || 'associate',
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: middlePaneHeaderBadgeThree,
      nodeViewState: nodeViewState,
      isMiddlePaneList: true
    }
  });
};

export function sortingListInAsc(array, key) {
  return array.sort(function (a, b) {
    if (a.informationBasic[key] && b.informationBasic[key]) {
      var x = a.informationBasic[key].toLowerCase().replace(/[()]/g, '');
      var y = b.informationBasic[key].toLowerCase().replace(/[()]/g, '');
      return x < y ? -1 : x > y ? 1 : 0;
    } else {
      return array;
    }
  });
}

export const getAssociateDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  dispatch,
  countPage,
  targetValue
) => {
  let requestObect = makeAssociateReviewListRequestObject(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'associateDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  dispatch({
    type: ASSOCIATE_REVIEW_DISTINCT_SAGA,
    payload: {
      request: requestObect,
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue
    }
  });
};

export const getAssociateRoleDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue
) => {
  let requestObj = makeAssociateRoleObj(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'associateRoleDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  dispatch({
    type: GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA,
    payload: {
      request: requestObj,
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};

export const getAssociateGroupDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  cardValue = 'noCard'
) => {
  let requestObj = makeAssociateGroupObj(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'associateGroupDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  dispatch({
    type: GET_ASSOCIATE_GROUP_REVIEW_LIST_SAGA,
    payload: {
      request: requestObj,
      BadgeOne: targetValue,
      BadgeTwo: cardValue === 'Card' ? 'distinct' : secondaryOptionCheckValue,
      BadgeThree: cardValue === 'Card' ? secondaryOptionCheckValue : '',
      isMiddlePaneList: true
    }
  });
};

export const associateCreatePopup = (
  selectedAssociateInfo,
  dispatch,
  secondaryOptionCheckValue,
  targetValue,
  parentAssociateId
) => {
  dispatch({ type: CLEAR_ASSOCIATE_INFO });
  dispatch({ type: CLEAR_ASSESSEE_INFO });
  dispatch({
    type: SET_POPUP_SINGLE_STATE,
    payload: { stateName: 'cardValue', value: 'Create' }
  });
  let requestObj = makeAssociateGroupObj(selectedAssociateInfo, 'active', 0, -1);
  dispatch({
    type: GET_ASSOCIATE_GROUP_REVIEW_LIST_SAGA,
    payload: {
      request: requestObj,
      BadgeOne: '',
      BadgeTwo: '',
      BadgeThree: '',
      isMiddlePaneList: false
    }
  });
  dispatch({ type: SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT, payload: requestObj });
  let roleRequestObj = makeAssociateRoleObj(selectedAssociateInfo, 'active', 0, -1);
  dispatch({ type: SET_CORE_ROLE_REVIEW_LIST_REQ_OBJECT, payload: roleRequestObj });
  dispatch({
    type: SET_SINGLE_ASSOCIATE_INFORMATION,
    payload: {
      stateName: 'parentAssociateId',
      value: parentAssociateId
    }
  });
  dispatch({
    type: ASSOCIATE_SIGN_ON,
    payload: { isPopUpValue: 'NAMEALIASPOPUP', popupMode: 'ASSOCIATE_CREATE' }
  });
  dispatch({
    type: GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA,
    payload: {
      request: roleRequestObj,
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: false
    }
  });
};
export const getAssociatesTypeApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  middlePaneHeader = 'associates',
  cardValue = 'noCard'
) => {
  let requestObj = makeAssociateTypeObj(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    0,
    countPage
  );

  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'associatesTypeDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  dispatch({
    type: GET_ASSOCIATE_TYPE_REVIEW_LIST_SAGA,
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

export const getNodeRelatedAssociateDistinctApiCall = (
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
  let reqBody = getNodeAssociatesReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  if (isScan) {
    reqBody = getNodeAssociatesScanReqObj(
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
    type: GET_NODE_ASSOCIATE_REVIEW_LIST,
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

export const updateAssociateDistinctStatus = (
  selectedAssociateInfo,
  associatereviseId,
  dispatch,
  reviseStatus
) => {
  let reqBody = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    associate: {
      id: associatereviseId,
      informationEngagement: {
        associateStatus: reviseStatus
      }
    }
  };
  dispatch({ type: LOADER_START });
  dispatch({
    type: ASSOCIATE_INFO_REVISE_SAGA,
    payload: {
      secondaryOptionCheckValue: '',
      secondaryOptionCheckValue: '',
      headerOne: '',
      reqBody
    }
  });
};

export const updateAssociateGroupStatus = (
  selectedAssociateInfo,
  groupId,
  dispatch,
  reviseStatus
) => {
  let reqBody = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    associateGroup: {
      id: groupId,
      informationEngagement: {
        associateGroupStatus:
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
    type: ASSOCIATE_GROUP_REVISE_INFO_SAGA,
    payload: {
      secondaryOptionCheckValue: '',
      associateGroupAssociateReqBody: null,
      headerOne: '',
      reqBody
    }
  });
};
export const updateAssociateTypeStatus = (
  selectedAssociateInfo,
  typeId,
  dispatch,
  reviseStatus
) => {
  let reqBody = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    associateType: {
      id: typeId,
      informationEngagement: {
        associateTypeStatus:
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
    type: ASSOCIATE_TYPE_INFO_REVISE_SAGA,
    payload: {
      secondaryOptionCheckValue: '',
      associateTypeAssociateReqBody: null,
      headerOne: '',
      reqBody
    }
  });
};
export const updateAssociateRoleStatus = (
  selectedAssociateInfo,
  roleId,
  dispatch,
  reviseStatus
) => {
  let reqBody = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    associateRole: {
      id: roleId,
      informationEngagement: {
        associateRoleStatus:
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
    type: ASSOCIATE_ROLE_REVISE_INFO_SAGA,
    payload: {
      secondaryOptionCheckValue: '',
      associateRoleAssociateReqBody: null,
      headerOne: '',
      reqBody
    }
  });
};
export const updateAssociateNodeStatus = (
  selectedAssociateInfo,
  nodeId,
  dispatch,
  reviseStatus
) => {
  let reqBody = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    associateNode: {
      id: nodeId,
      informationEngagement: {
        associateNodeStatus:
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
    type: ASSESSEE_NODE_INFO_REVISE_SAGA,
    payload: {
      secondaryOptionCheckValue: '',
      associateNodeReqBody: null,
      createMode: '',
      headerOne: '',
      reqBody
    }
  });
};
