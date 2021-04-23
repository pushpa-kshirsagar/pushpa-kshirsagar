import {
  ASSESSEE_REVIEW_DISTINCT_SAGA,
  CLEAR_DISPLAY_PANE_THREE,
  FILTERMODE,
  GET_ASSESSEEGROUP_ASSESSEE_REVIEW_LIST,
  LOADER_START,
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
          in: ['SUSPENDED', 'TERMINATED', 'ACTIVE']
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

export const getAssesseeGroupAssesseeDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  selectedTagValue
) => {
  let reqBody = getAssesseeGroupAssesseeReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  // dispatch({ type: SET_PAGE_COUNT, payload: 1 });
  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'assesseeGroupAssesseeDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  // dispatch({ type: LOADER_START });
  // dispatch({ type: SET_REQUEST_OBJECT, payload: reqBody });
  dispatch({
    type: GET_ASSESSEEGROUP_ASSESSEE_REVIEW_LIST,
    payload: {
      request: reqBody,
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};