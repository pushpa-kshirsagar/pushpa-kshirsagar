import {
  ASSESSEE_INFO_CREATE,
  ASSESSEE_REVIEW_DISTINCT_SAGA,
  ASSESSEE_SIGN_ON,
  CLEAR_ASSESSEE_INFO,
  CLEAR_DISPLAY_PANE_THREE,
  FILTERMODE,
  GET_ASSESSEEGROUP_ASSESSEE_REVIEW_LIST,
  GET_ASSESSEENODE_ASSESSEE_REVIEW_LIST,
  GET_ASSESSEEROLE_ASSESSEE_REVIEW_LIST,
  GET_ASSESSEETYPE_ASSESSEE_REVIEW_LIST,
  GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
  GET_ASSESSEE_TYPE_REVIEW_LIST_SAGA,
  GET_ASSESSEE_ROLE_GROUP_REVIEW_LIST_SAGA,
  GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
  INTERNAL_NODE_LIST_SAGA,
  LOADER_START,
  SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
  SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_ROLE_REVIEW_LIST_REQ_OBJECT,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_PAGE_COUNT,
  SET_REQUEST_OBJECT,
  GET_TYPE_GROUP_REVIEW_LIST_SAGA,
  SET_CORE_TYPE_REVIEW_LIST_REQ_OBJECT
} from '../actionType';
import {
  getAssesseeTypeAssesseeReqObj,
  getAssesseeTypeAssesseeScanReqObj,
  makeAdministratorRoleCreateObj,
  makeAdministratorsReviewListRequestObject,
  makeAssesseeGroupObj,
  makeAssesseeReviewListRequestObject,
  makeAssesseeRoleCreateObj,
  makeAssesseeRoleObj,
  makeAssesseeTypeObj,
  makeInternalNodeObj,
  makeManagerRoleCreateObj,
  makeManagersReviewListRequestObject
} from './GenericActions';

export const getAssesseeDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue
) => {
  let requestObect = makeAssesseeReviewListRequestObject(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });

  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'assesseeDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  dispatch({
    type: ASSESSEE_REVIEW_DISTINCT_SAGA,
    payload: {
      HeaderOne: 'assessees',
      request: requestObect,
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue
    }
  });
};

export const getAssesseeRoleAssesseeReqObj = (
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
            conditionColumn: 'informationAllocation.assesseeRole.assesseeRolePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: roleId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assesseeRole.assesseeRoleSecondary',
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
            conditionColumn: 'informationEngagement.assesseeStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getAssesseeRoleAssesseeScanReqObj = (
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
            conditionColumn: 'informationAllocation.assesseeRole.assesseeRolePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: roleId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assesseeRole.assesseeRoleSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: roleId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeNameFirst',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeNameOther',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeNameLast',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeAlias',
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
            conditionColumn: 'informationEngagement.assesseeStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};

export const getAssesseeNodeAssesseeReqObj = (
  selectedAssociateInfo,
  nodeId,
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
    nodeId: nodeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assesseeNode.assesseeNodePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assesseeNode.assesseeNodeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
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
            conditionColumn: 'informationEngagement.assesseeStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getAssesseeNodeAssesseeScanReqObj = (
  selectedAssociateInfo,
  nodeId,
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
    nodeId: nodeId,
    filter: 'true',
    searchCondition: 'AND',
    search: [
      {
        condition: 'or',
        searchBy: [
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assesseeNode.assesseeNodePrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assesseeNode.assesseeNodeSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: nodeId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeNameFirst',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeNameOther',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeNameLast',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeAlias',
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
            conditionColumn: 'informationEngagement.assesseeStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};

export const getAssesseeGroupAssesseeReqObj = (
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
            conditionColumn: 'informationAllocation.assesseeGroup.assesseeGroupPrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assesseeGroup.assesseeGroupSecondary',
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
            conditionColumn: 'informationEngagement.assesseeStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};
export const getAssesseeGroupAssesseeScanReqObj = (
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
            conditionColumn: 'informationAllocation.assesseeGroup.assesseeGroupPrimary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationAllocation.assesseeGroup.assesseeGroupSecondary',
            conditionValue: {
              condition: 'eq',
              value: {
                from: groupId
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeNameFirst',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeNameOther',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeNameLast',
            conditionValue: {
              condition: 'ct',
              value: {
                from: searchStr
              }
            }
          },
          {
            dataType: 'string',
            conditionColumn: 'informationBasic.assesseeAlias',
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
            conditionColumn: 'informationEngagement.assesseeStatus',
            conditionValue: searchObj
          }
        ]
      }
    ]
  };
};

export const getAssesseeGroupAssesseeDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  selectedTagValue,
  searchStr,
  isScan,
  isMiddlePaneList
) => {
  let reqBody = getAssesseeGroupAssesseeReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  if (isScan) {
    reqBody = getAssesseeGroupAssesseeScanReqObj(
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
    type: GET_ASSESSEEGROUP_ASSESSEE_REVIEW_LIST,
    payload: {
      request: reqBody,
      HeaderOne: 'assessees',
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: isMiddlePaneList
    }
  });
};
export const getAssesseeRoleAssesseeDistinctApiCall = (
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
  let reqBody = getAssesseeRoleAssesseeReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  if (isScan) {
    reqBody = getAssesseeRoleAssesseeScanReqObj(
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
    type: GET_ASSESSEEROLE_ASSESSEE_REVIEW_LIST,
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
export const getAssesseeTypeAssesseeDistinctApiCall = (
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
  let reqBody = getAssesseeTypeAssesseeReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  if (isScan) {
    reqBody = getAssesseeTypeAssesseeScanReqObj(
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
    type: GET_ASSESSEETYPE_ASSESSEE_REVIEW_LIST,
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
export const getAssesseeNodeAssesseeDistinctApiCall = (
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
  let reqBody = getAssesseeNodeAssesseeReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  if (isScan) {
    reqBody = getAssesseeNodeAssesseeScanReqObj(
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
    type: GET_ASSESSEENODE_ASSESSEE_REVIEW_LIST,
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

export const assesseeRole = (roleName) => {
  let txt = roleName;
  var arr = [];
  if (roleName) {
    let newRoles = roleName.split('(');
    let word = '';
    for (var j = 1; j < newRoles.length; j++) {
      word = newRoles[j].split(')')[0];
      let newwrd = word.replace(' ', '||');
      txt = txt.replace('(' + word + ')', '{' + newwrd + '}');
    }
    let finlastr = txt;
    var finalsplit = finlastr.split(' ');
    let str = '';
    for (var i = 0; i < finalsplit.length; i++) {
      if (finalsplit[i].charAt(0) === '{') {
        let nobadge = finalsplit[i];
        let finalentry = nobadge.replace('{', '').replace('}', '').replace('||', ' ');
        str =
          str +
          "<span class='headerBadge font1_0' style='top:2px'>" +
          finalentry +
          '</span><span>&nbsp;</span>';
        arr.push(str);
      }

      if (finalsplit[i].charAt(0) !== '{') {
        str = str + '<span>' + finalsplit[i] + '</span><span>&nbsp;</span>';
        arr.push(str);
      }
    }
    return str;
  }
};

export const getAssesseeRoleDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  targetValue,
  dispatch
) => {
  let requestObj = makeAssesseeRoleObj(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'assesseeRoleDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  dispatch({
    type: GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
    payload: {
      request: requestObj,
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};

export const getAssesseeGroupDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue
) => {
  let requestObj = makeAssesseeGroupObj(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    0,
    countPage
  );

  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'assesseesGroupDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  dispatch({
    type: GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
    payload: {
      request: requestObj,
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};

export const onClickCheckBoxSelection = (
  selectedTagsArray,
  unselectedTagsArray,
  event,
  dispatch
) => {
  console.log('EVENT', event);
  let id = event.target.id;
  let checkedArr = [...selectedTagsArray];
  let unCheckArr = [...unselectedTagsArray];
  if (checkedArr.includes(id)) {
    checkedArr = checkedArr.filter(function (number) {
      return number !== id;
    });
    unCheckArr.push(id);
  } else {
    checkedArr.push(id);
    unCheckArr = unCheckArr.filter(function (number) {
      return number !== id;
    });
  }
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'selectedTagsArray', value: checkedArr }
  });
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'unselectedTagsArray', value: unCheckArr }
  });
};
export const onClickFlagSelection = (
  selectedFlagedArray,
  unselectedFlagedArray,
  event,
  dispatch
) => {
  console.log('event', event);
  let id = event.target.id;
  let flagedArr = [...selectedFlagedArray];
  let unFlagedArr = [...unselectedFlagedArray];
  if (flagedArr.includes(id)) {
    flagedArr = flagedArr.filter(function (number) {
      return number !== id;
    });
    unFlagedArr.push(id);
  } else {
    flagedArr.push(id);
    unFlagedArr = unFlagedArr.filter(function (number) {
      return number !== id;
    });
  }
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'selectedFlagedArray', value: flagedArr }
  });
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'unselectedFlagedArray', value: unFlagedArr }
  });
};

export const setFlagedArray = (reviewListDistinctData, key, dispatch) => {
  let flagedArr = [];
  reviewListDistinctData.map((data) => {
    if (data.informationBasic[key]) {
      flagedArr.push(data.informationEngagement.assesseeTag.assesseeTagPrimary);
    }
  });
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'selectedFlagedArray', value: flagedArr }
  });
};

export const getRoleGroupReviewListApi = (selectedAssociateInfo, dispatch, popupHeaderOne) => {
  dispatch({ type: LOADER_START });
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    associateAscendantPrimary:
      localStorage.getItem('parentId') === 'null' ? null : localStorage.getItem('parentId')
  };
  dispatch({ type: SET_CORE_ROLE_REVIEW_LIST_REQ_OBJECT, payload: requestObj });
  dispatch({
    type: GET_ASSESSEE_ROLE_GROUP_REVIEW_LIST_SAGA,
    payload: { request: requestObj, typeGroup: popupHeaderOne }
  });
};
export const getTypeGroupReviewListApi = (selectedAssociateInfo, dispatch, popupHeaderOne) => {
  dispatch({ type: LOADER_START });
  let columnName = popupHeaderOne;
  if (popupHeaderOne === 'culture profiles') {
    columnName = 'cultureProfiles';
  }
  if (popupHeaderOne === 'job profiles') {
    columnName = 'jobProfiles';
  }
  let columnby = columnName.substring(0, columnName.length - 1);
  let requestObj = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    associateAscendantPrimary:
      localStorage.getItem('parentId') === 'null' ? null : localStorage.getItem('parentId'),
    filter: 'true',
    orderBy: {
      columnName: 'informationBasic.' + columnby + 'TypeGroupName',
      order: 'asc'
    }
  };
  dispatch({ type: SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT, payload: requestObj });
  dispatch({
    type: GET_TYPE_GROUP_REVIEW_LIST_SAGA,
    payload: { request: requestObj, typeGroup: popupHeaderOne }
  });
};

export const assesseeCreateApiCalls = (
  selectedAssociateInfo,
  dispatch,
  secondaryOptionCheckValue,
  typeOfAssesseeCreate
) => {
  dispatch({ type: ASSESSEE_INFO_CREATE });
  dispatch({ type: CLEAR_ASSESSEE_INFO });
  dispatch({ type: LOADER_START });
  let requestObj = makeAssesseeGroupObj(selectedAssociateInfo, 'active', 0, -1);
  dispatch({
    type: GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
    payload: {
      request: requestObj,
      BadgeOne: '',
      BadgeTwo: '',
      BadgeThree: '',
      isMiddlePaneList: false
    }
  });
  dispatch({ type: SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT, payload: requestObj });
  let roleRequestObj = makeAssesseeRoleCreateObj(selectedAssociateInfo, 'active', 0, -1);
  if (typeOfAssesseeCreate === 'administrator')
    roleRequestObj = makeManagerRoleCreateObj(selectedAssociateInfo, 'active', 0, -1);
  if (typeOfAssesseeCreate === 'manager')
    roleRequestObj = makeAdministratorRoleCreateObj(selectedAssociateInfo, 'active', 0, -1);
  dispatch({ type: SET_CORE_ROLE_REVIEW_LIST_REQ_OBJECT, payload: roleRequestObj });
  dispatch({
    type: GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
    payload: {
      request: roleRequestObj,
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
  let typeRequestObj = makeAssesseeTypeObj(selectedAssociateInfo, 'all', 0, -1);
  dispatch({ type: SET_CORE_TYPE_REVIEW_LIST_REQ_OBJECT, payload: typeRequestObj });
  dispatch({
    type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
    payload: {
      stateName: 'assesseeGroup',
      actualStateName: 'assesseeGroupPrimary',
      value: []
    }
  });
  dispatch({
    type: GET_ASSESSEE_TYPE_REVIEW_LIST_SAGA,
    payload: {
      middlePaneHeader: '',
      request: typeRequestObj,
      BadgeOne: '',
      BadgeTwo: '',
      BadgeThree: '',
      isMiddlePaneList: false
    }
  });
  dispatch({
    type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
    payload: {
      stateName: 'assesseeRole',
      actualStateName: 'assesseeRolePrimary',
      value: []
    }
  });
  dispatch({
    type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
    payload: {
      stateName: 'assesseeNode',
      actualStateName: 'assesseeNodePrimary',
      value: []
    }
  });
  dispatch({
    type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
    payload: {
      stateName: 'assesseeType',
      actualStateName: 'assesseeTypePrimary',
      value: []
    }
  });
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: { stateName: 'selectedInformationAllorKey', value: secondaryOptionCheckValue }
  });
  dispatch({
    type: SET_DISPLAY_TWO_SINGLE_STATE,
    payload: {
      stateName: 'typeOfAssesseeCreate',
      value: typeOfAssesseeCreate
    }
  });
  let popupMode = 'ASSESSEE_CREATE';
  if (typeOfAssesseeCreate === 'administrator') {
    popupMode = 'ADMINISTRATOR_CREATE';
  }
  if (typeOfAssesseeCreate === 'managers') {
    popupMode = 'MANAGER_CREATE';
  }
  dispatch({
    type: ASSESSEE_SIGN_ON,
    payload: { isPopUpValue: 'ASSESSEENAMEPOPUP', popupMode: popupMode }
  });
};

export const getAdminManagerRoleApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  popupHeaderOne,
  dispatch
) => {
  dispatch({ type: LOADER_START });
  let roleRequestObj =
    popupHeaderOne === 'administrators'
      ? makeAdministratorRoleCreateObj(
          selectedAssociateInfo,
          secondaryOptionCheckValue,
          0,
          countPage
        )
      : makeManagerRoleCreateObj(selectedAssociateInfo, secondaryOptionCheckValue, 0, countPage);
  dispatch({ type: SET_REQUEST_OBJECT, payload: roleRequestObj });
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  dispatch({
    type: GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
    payload: {
      request: roleRequestObj,
      middlePaneHeader: popupHeaderOne,
      BadgeOne: 'roles',
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};

export const getAdminManagerDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  popupHeaderOne,
  dispatch
) => {
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

  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: popupHeaderOne + 'Distinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
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
  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
};

export const getAssesseeTypeApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  middlePaneHeader = 'assessees'
) => {
  let requestObj = makeAssesseeTypeObj(
    selectedAssociateInfo,
    secondaryOptionCheckValue,
    0,
    countPage
  );

  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'assesseesTypeDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  dispatch({
    type: GET_ASSESSEE_TYPE_REVIEW_LIST_SAGA,
    payload: {
      middlePaneHeader: middlePaneHeader,
      request: requestObj,
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};
