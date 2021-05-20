import {
  ASSOCIATE_REVIEW_DISTINCT_SAGA,
  CLEAR_DISPLAY_PANE_THREE,
  FILTERMODE,
  GET_ASSOCIATEGROUP_ASSOCIATE_REVIEW_LIST_SAGA,
  GET_ASSOCIATEROLE_ASSOCIATE_REVIEW_LIST_SAGA,
  GET_ASSOCIATES_NODE_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_GROUP_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA,
  INTERNAL_NODE_LIST_SAGA,
  LOADER_START,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_PAGE_COUNT,
  SET_REQUEST_OBJECT
} from '../actionType';
import {
  makeAssociateGroupObj,
  makeAssociateNodeObj,
  makeAssociateReviewListRequestObject,
  makeAssociateRoleObj,
  makeInternalNodeObj
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
  // dispatch({ type: SET_PAGE_COUNT, payload: 1 });
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
  // dispatch({ type: SET_PAGE_COUNT, payload: 1 });
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

export const getAssociateNodeApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  nodeViewState
) => {
  let requestObj = makeAssociateNodeObj(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  dispatch({ type: SET_PAGE_COUNT, payload: 1 });
  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'nodeViewState', value: nodeViewState }
  });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'associatesNodeDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({
    type: GET_ASSOCIATES_NODE_REVIEW_LIST_SAGA,
    payload: {
      request: requestObj,
      BadgeOne: targetValue,
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
  dispatch({ type: SET_PAGE_COUNT, payload: 1 });
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
  dispatch({ type: SET_PAGE_COUNT, payload: 1 });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'associateDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
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
  targetValue
) => {
  let requestObj = makeAssociateGroupObj(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  dispatch({ type: SET_PAGE_COUNT, payload: 1 });
  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'associateGroupDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({
    type: GET_ASSOCIATE_GROUP_REVIEW_LIST_SAGA,
    payload: {
      request: requestObj,
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};
