import {
  CLEAR_DISPLAY_PANE_THREE,
  FILTERMODE,
  LOADER_START,
  SET_MOBILE_PANE_STATE,
  SET_REQUEST_OBJECT,
  GET_ITEM_REVIEW_LIST_SAGA,
  GET_ITEM_GROUP_REVIEW_LIST_SAGA,
  GET_ITEM_TYPE_REVIEW_LIST_SAGA
} from '../actionType';
import { makeItemGroupObj, makeItemObj, makeItemsTypeObj } from './GenericActions';

export const getItemsDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  popupHeaderOne,
  dispatch
) => {
  let requestObj = makeItemObj(selectedAssociateInfo, secondaryOptionCheckValue, countPage, 0);

  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'itemDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({
    type: GET_ITEM_REVIEW_LIST_SAGA,
    payload: {
      middlePaneHeader: 'items',
      request: requestObj,
      BadgeOne: 'distinct',
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};

export const getItemGroupDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue
) => {
  let requestObj = makeItemGroupObj(selectedAssociateInfo, secondaryOptionCheckValue, 0, countPage);
  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'itemGroupDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({
    type: GET_ITEM_GROUP_REVIEW_LIST_SAGA,
    payload: {
      request: requestObj,
      BadgeOne: targetValue,
      BadgeTwo: secondaryOptionCheckValue,
      BadgeThree: '',
      isMiddlePaneList: true
    }
  });
};
export const getItemsTypeApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  middlePaneHeader = 'items'
) => {
  let requestObj = makeItemsTypeObj(selectedAssociateInfo, secondaryOptionCheckValue, 0, countPage);

  dispatch({ type: CLEAR_DISPLAY_PANE_THREE });
  dispatch({
    type: FILTERMODE,
    payload: { FilterMode: 'itemsTypeDistinct' + secondaryOptionCheckValue }
  });
  dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
  dispatch({ type: LOADER_START });
  dispatch({ type: SET_REQUEST_OBJECT, payload: requestObj });
  dispatch({
    type: GET_ITEM_TYPE_REVIEW_LIST_SAGA,
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
