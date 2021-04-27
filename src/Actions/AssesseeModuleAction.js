import { Fragment } from 'react';
import {
  ASSESSEE_REVIEW_DISTINCT_SAGA,
  CLEAR_DISPLAY_PANE_THREE,
  FILTERMODE,
  GET_ASSESSEEGROUP_ASSESSEE_REVIEW_LIST,
  LOADER_START,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_PAGE_COUNT,
  SET_REQUEST_OBJECT
} from '../actionType';
import { makeAssesseeReviewListRequestObject } from './GenericActions';

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
  dispatch({ type: SET_PAGE_COUNT, payload: 1 });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'assesseeDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObect });
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
  isScan
) => {
  let reqBody = getAssesseeGroupAssesseeReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  if (isScan) {
    alert(searchStr)
    reqBody = getAssesseeGroupAssesseeScanReqObj(
      selectedAssociateInfo,
      selectedTagValue,
      secondaryOptionCheckValue,
      0,
      countPage,
      searchStr
    );
  }
  // dispatch({ type: SET_PAGE_COUNT, payload: 1 });
  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
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
    for (var i = 1; i < newRoles.length; i++) {
      word = newRoles[i].split(')')[0];
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
