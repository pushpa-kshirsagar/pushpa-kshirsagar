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
  GET_NODE_ITEMS_REVIEW_LIST_SAGA,
  SET_PAGE_COUNT,
  ITEM_INFO_REVISE_SAGA,
  ITEM_GROUP_REVISE_INFO_SAGA,
  ITEM_TYPE_REVISE_INFO_SAGA,
  CONFIG_ITEM_ROLE_TYPE,
  SET_POPUP_SINGLE_STATE
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
  dispatch({ type: CLEAR_ITEM_REDUCER_STATE });
};
export const createItemPopupApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  dispatch
) => {
  dispatch({ type: CLEAR_ITEM_REDUCER_STATE });
  dispatch({ type: LOADER_START });
  let requestObj = makeItemGroupObj(selectedAssociateInfo, 'active', 0, -1);
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
  let typeRequestObj = makeItemsTypeObj(selectedAssociateInfo, 'active', 0, -1);
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
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  resetDataFunction(dispatch);
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
  targetValue,
  cardValue = 'noCard',
  isSelectActive = ''
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
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  resetDataFunction(dispatch);
  dispatch({
    type: GET_ITEM_GROUP_REVIEW_LIST_SAGA,
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
export const getItemsTypeApiCall = (
  selectedAssociateInfo,
  secondaryOptionCheckValue,
  countPage,
  dispatch,
  targetValue,
  middlePaneHeader = 'items',
  cardValue = 'noCard'
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
  dispatch({ type: SET_PAGE_COUNT, payload: 0 });
  resetDataFunction(dispatch);
  dispatch({
    type: GET_ITEM_TYPE_REVIEW_LIST_SAGA,
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
export const updateItemDistinctStatus = (selectedAssociateInfo, itemId, dispatch, reviseStatus) => {
  let reqBody = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    item: {
      id: itemId,
      informationEngagement: {
        itemStatus:
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
    type: ITEM_INFO_REVISE_SAGA,
    payload: { secondaryOptionCheckValue: '', headerOne: '', reqBody }
  });
};
export const updateItemGroupStatus = (selectedAssociateInfo, groupId, dispatch, reviseStatus) => {
  let reqBody = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    itemGroup: {
      id: groupId,
      informationEngagement: {
        itemGroupStatus:
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
    type: ITEM_GROUP_REVISE_INFO_SAGA,
    payload: { secondaryOptionCheckValue: '', itemGroupItemReqBody: null, headerOne: '', reqBody }
  });
};
export const updateItemTypeStatus = (selectedAssociateInfo, typeId, dispatch, reviseStatus) => {
  let reqBody = {
    assesseeId: selectedAssociateInfo?.assesseeId,
    associateId:
      selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
    itemType: {
      id: typeId,
      informationEngagement: {
        itemTypeStatus:
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
    type: ITEM_TYPE_REVISE_INFO_SAGA,
    payload: { secondaryOptionCheckValue: '', itemTypeItemReqBody: null, headerOne: '', reqBody }
  });
};
