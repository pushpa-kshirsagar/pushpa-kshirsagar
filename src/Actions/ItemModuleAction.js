import {
  CLEAR_DISPLAY_PANE_THREE,
  FILTERMODE,
  LOADER_START,
  SET_MOBILE_PANE_STATE,
  SET_REQUEST_OBJECT,
  GET_ITEM_REVIEW_LIST_SAGA,
  GET_ITEM_GROUP_REVIEW_LIST_SAGA,
  GET_ITEM_TYPE_REVIEW_LIST_SAGA,
  GET_ITEMGROUPITEM_REVIEW_LIST_SAGA,
  GET_ITEMTYPEITEM_REVIEW_LIST_SAGA,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_RELATED_REQUEST_OBJECT,
  CLEAR_ITEM_REDUCER_STATE,
  SET_POPUP_VALUE,
  SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_TYPE_REVIEW_LIST_REQ_OBJECT,
  SET_CORE_NODE_REVIEW_LIST_REQ_OBJECT,
  INTERNAL_NODE_LIST_SAGA,
  GET_NODE_ITEMS_REVIEW_LIST_SAGA
} from '../actionType';
import {
  getItemGroupItemReqObj,
  getItemGroupItemScanReqObj,
  getItemTypeItemReqObj,
  getItemTypeItemScanReqObj,
  getNodeItemsReqObj,
  getNodeItemsScanReqObj,
  makeInternalNodeObj,
  makeItemGroupObj,
  makeItemObj,
  makeItemsTypeObj
} from './GenericActions';

export const createItemPopupApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  dispatch
) => {
  dispatch({ type: CLEAR_ITEM_REDUCER_STATE });
  dispatch({ type: LOADER_START });
  let requestObj = makeItemGroupObj(selectedAssociateInfo, 'all', 0, -1);
  dispatch({ type: SET_CORE_GROUP_REVIEW_LIST_REQ_OBJECT, payload: requestObj });
  dispatch({
    type: GET_ITEM_GROUP_REVIEW_LIST_SAGA,
    payload: {
      request: requestObj,
      BadgeOne: '',
      BadgeTwo: '',
      BadgeThree: '',
      isMiddlePaneList: false
    }
  });
  let nodeRequestObj = makeInternalNodeObj(selectedAssociateInfo, 'all', 0, -1);
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
  let typeRequestObj = makeItemsTypeObj(selectedAssociateInfo, 'all', 0, -1);
  dispatch({ type: SET_CORE_TYPE_REVIEW_LIST_REQ_OBJECT, payload: typeRequestObj });
  dispatch({
    type: GET_ITEM_TYPE_REVIEW_LIST_SAGA,
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
    payload: { isPopUpValue: 'NAMEPOPUP', popupMode: 'ITEMCREATE' }
  });
};
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
export const getItemGroupItemDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  selectedTagValue,
  searchStr,
  isScan
) => {
  let reqBody = getItemGroupItemReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  if (isScan) {
    reqBody = getItemGroupItemScanReqObj(
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
    type: GET_ITEMGROUPITEM_REVIEW_LIST_SAGA,
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

export const getItemTypeItemDistinctApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  selectedTagValue,
  searchStr,
  isScan
) => {
  let reqBody = getItemTypeItemReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  if (isScan) {
    reqBody = getItemTypeItemScanReqObj(
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
    type: GET_ITEMTYPEITEM_REVIEW_LIST_SAGA,
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
export const getNodeRelatedItemsDistinctApiCall = (
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
  let reqBody = getNodeItemsReqObj(
    selectedAssociateInfo,
    selectedTagValue,
    secondaryOptionCheckValue,
    0,
    countPage
  );
  if (isScan) {
    reqBody = getNodeItemsScanReqObj(
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
    type: GET_NODE_ITEMS_REVIEW_LIST_SAGA,
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