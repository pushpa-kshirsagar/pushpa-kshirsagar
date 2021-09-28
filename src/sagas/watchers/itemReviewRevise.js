import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_DISPLAY_PANE_THREE_STATE,
  LOADER_STOP,
  GET_ITEM_INFO_SAGA,
  ITEM_INFO_REVISE_SAGA,
  ITEM_MULTI_STATUS_REVISE_SAGA,
  SET_TYPE_REDUCER_STATE,
  SET_ITEM_DYNAMIC_SINGLE_STATE,
  SET_POPUP_VALUE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  GET_ITEM_REVIEW_LIST_SAGA,
  SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
  SET_DISPLAY_THREE_SINGLE_STATE
} from '../../actionType';
import { ITEM_REVISE_URL, ITEM_REVIEW_URL, UPDATE_ITEM_MULTI_STATUS_URL } from '../../endpoints';
import Store from '../../store';

const itemApiInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(requestObj.URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviewInfoItemSaga(data) {
  try {
    const userResponse = yield call(itemApiInfoApi, {
      data: data.payload.reqBody,
      URL: ITEM_REVIEW_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      const { isReviseMode = false } = data.payload;
      console.log('Item Review=======>', userResponse);
      let response = { ...userResponse.responseObject[0] };
      yield put({
        type: SET_DISPLAY_THREE_SINGLE_STATE,
        payload: { stateName: 'originResponseObj', value: JSON.stringify(response) }
      });
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'item',
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
          responseObject: response,
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      // if (isReviseMode) {
      const { informationBasic, informationAllocation, informationFramework } = response;
      yield put({
        type: SET_TYPE_REDUCER_STATE,
        payload: informationBasic
      });
      if (
        informationAllocation &&
        informationAllocation?.itemGroup?.itemGroupPrimary &&
        informationAllocation?.itemGroup?.itemGroupPrimary.length > 0
      ) {
        let tempArr = informationAllocation.itemGroup.itemGroupPrimary.map((ob) => ob.id);
        yield put({
          type: SET_ITEM_DYNAMIC_SINGLE_STATE,
          payload: {
            objectName: 'informationAllocation',
            stateName: 'itemGroup',
            actualStateName: 'itemGroupPrimary',
            value: tempArr
          }
        });
      } else {
        yield put({
          type: SET_ITEM_DYNAMIC_SINGLE_STATE,
          payload: {
            objectName: 'informationAllocation',
            stateName: 'itemGroup',
            actualStateName: 'itemGroupPrimary',
            value: []
          }
        });
      }
      if (
        informationAllocation &&
        informationAllocation?.itemGroup?.itemGroupSecondary &&
        informationAllocation?.itemGroup?.itemGroupSecondary.length > 0
      ) {
        let tempArr = informationAllocation.itemGroup.itemGroupSecondary.map((ob) => ob.id);
        yield put({
          type: SET_ITEM_DYNAMIC_SINGLE_STATE,
          payload: {
            objectName: 'informationAllocation',
            stateName: 'itemGroup',
            actualStateName: 'itemGroupSecondary',
            value: tempArr
          }
        });
      } else {
        yield put({
          type: SET_ITEM_DYNAMIC_SINGLE_STATE,
          payload: {
            objectName: 'informationAllocation',
            stateName: 'itemGroup',
            actualStateName: 'itemGroupSecondary',
            value: []
          }
        });
      }
      if (
        informationAllocation &&
        informationAllocation?.itemNode?.itemNodePrimary &&
        informationAllocation?.itemNode?.itemNodePrimary.length > 0
      ) {
        let tempArr = informationAllocation.itemNode.itemNodePrimary.map((ob) => ob.id);
        yield put({
          type: SET_ITEM_DYNAMIC_SINGLE_STATE,
          payload: {
            objectName: 'informationAllocation',
            stateName: 'itemNode',
            actualStateName: 'itemNodePrimary',
            value: tempArr
          }
        });
      } else {
        yield put({
          type: SET_ITEM_DYNAMIC_SINGLE_STATE,
          payload: {
            objectName: 'informationAllocation',
            stateName: 'itemNode',
            actualStateName: 'itemNodePrimary',
            value: []
          }
        });
      }
      if (
        informationAllocation &&
        informationAllocation?.itemNode?.itemNodeSecondary &&
        informationAllocation?.itemNode?.itemNodeSecondary.length > 0
      ) {
        let tempArr = informationAllocation.itemNode.itemNodeSecondary.map((ob) => ob.id);
        yield put({
          type: SET_ITEM_DYNAMIC_SINGLE_STATE,
          payload: {
            objectName: 'informationAllocation',
            stateName: 'itemNode',
            actualStateName: 'itemNodeSecondary',
            value: tempArr
          }
        });
      } else {
        yield put({
          type: SET_ITEM_DYNAMIC_SINGLE_STATE,
          payload: {
            objectName: 'informationAllocation',
            stateName: 'itemNode',
            actualStateName: 'itemNodeSecondary',
            value: []
          }
        });
      }
      if (
        informationAllocation &&
        informationAllocation?.itemType?.itemTypePrimary &&
        informationAllocation?.itemType?.itemTypePrimary.length > 0
      ) {
        let tempArr = informationAllocation.itemType.itemTypePrimary.map((ob) => ob.id);
        yield put({
          type: SET_ITEM_DYNAMIC_SINGLE_STATE,
          payload: {
            objectName: 'informationAllocation',
            stateName: 'itemType',
            actualStateName: 'itemTypePrimary',
            value: tempArr
          }
        });
      } else {
        yield put({
          type: SET_ITEM_DYNAMIC_SINGLE_STATE,
          payload: {
            objectName: 'informationAllocation',
            stateName: 'itemType',
            actualStateName: 'itemTypePrimary',
            value: []
          }
        });
      }
      if (
        informationAllocation &&
        informationAllocation?.itemType?.itemTypeSecondary &&
        informationAllocation?.itemType?.itemTypeSecondary.length > 0
      ) {
        let tempArr = informationAllocation.itemType.itemTypeSecondary.map((ob) => ob.id);
        yield put({
          type: SET_ITEM_DYNAMIC_SINGLE_STATE,
          payload: {
            objectName: 'informationAllocation',
            stateName: 'itemType',
            actualStateName: 'itemTypeSecondary',
            value: tempArr
          }
        });
      } else {
        yield put({
          type: SET_ITEM_DYNAMIC_SINGLE_STATE,
          payload: {
            objectName: 'informationAllocation',
            stateName: 'itemType',
            actualStateName: 'itemTypeSecondary',
            value: []
          }
        });
      }
      const {
        itemFrameworkOneBlank = '',
        itemFrameworkOneExplanation = '',
        itemFrameworkOneLabel = '',
        itemFrameworkOneLevel = null,
        itemFrameworkOneMedia = '',
        itemFrameworkOnePolarity = '',
        itemFrameworkOneResponseChoice = [],
        itemFrameworkOneResponseCorrect = '',
        itemFrameworkOneResponseExplanation = '',
        itemFrameworkOneResponseLabel = '',
        itemFrameworkOneScore = '',
        itemFrameworkOneTime = '',
        itemFrameworkOneType = '',
        itemFrameworkOneWeightage = '',
        itemFrameworkOneSection = [],
        itemFrameworkOneScale = []
      } = informationFramework?.itemFrameworkOne;

      yield put({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: { stateName: 'itemFrameworkOneScale', value: itemFrameworkOneScale }
      });
      yield put({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: { stateName: 'itemFrameworkOneSection', value: itemFrameworkOneSection }
      });
      yield put({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: { stateName: 'itemFrameworkOneBlank', value: itemFrameworkOneBlank }
      });
      yield put({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: { stateName: 'itemFrameworkOneExplanation', value: itemFrameworkOneExplanation }
      });
      yield put({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: { stateName: 'itemFrameworkOneLabel', value: itemFrameworkOneLabel }
      });
      yield put({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: { stateName: 'itemFrameworkOneLevel', value: itemFrameworkOneLevel }
      });
      yield put({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: { stateName: 'itemFrameworkOneMedia', value: itemFrameworkOneMedia }
      });
      yield put({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: { stateName: 'itemFrameworkOnePolarity', value: itemFrameworkOnePolarity }
      });
      yield put({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'itemFrameworkOneResponseChoice',
          value: itemFrameworkOneResponseChoice
        }
      });
      yield put({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'itemFrameworkOneResponseCorrect',
          value: itemFrameworkOneResponseCorrect
        }
      });
      yield put({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'itemFrameworkOneResponseExplanation',
          value: itemFrameworkOneResponseExplanation
        }
      });
      yield put({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'itemFrameworkOneResponseLabel',
          value: itemFrameworkOneResponseLabel
        }
      });
      yield put({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: { stateName: 'itemFrameworkOneScore', value: itemFrameworkOneScore }
      });
      yield put({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: { stateName: 'itemFrameworkOneTime', value: itemFrameworkOneTime }
      });
      yield put({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: { stateName: 'itemFrameworkOneType', value: itemFrameworkOneType }
      });
      yield put({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: { stateName: 'itemFrameworkOneWeightage', value: itemFrameworkOneWeightage }
      });
      yield put({ type: LOADER_STOP });
      // }
    } else {
      yield put({ type: LOADER_STOP });
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}
const itemReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ITEM_REVISE_URL;
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviseInfoItemSaga(data) {
  try {
    const userResponse = yield call(itemReviseInfoApi, { data: data.payload.reqBody });
    if (userResponse.responseCode === '000') {
      const { createMode } = data.payload;
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'item',
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
          responseObject: userResponse.responseObject,
          createMode
        }
      });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'reviewListDistinctData', value: [] }
      });
      yield put({
        type: GET_ITEM_REVIEW_LIST_SAGA,
        payload: {
          HeaderOne: 'items',
          request: Store.getState().DisplayPaneTwoReducer.reviewListReqObj,
          BadgeOne: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeOne,
          BadgeTwo: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeTwo,
          BadgeThree: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeThree,
          middlePaneSelectedValue: Store.getState().DisplayPaneTwoReducer.middlePaneSelectedValue,
          isMiddlePaneList: true
        }
      });
    } else {
      yield put({ type: LOADER_STOP });
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}
function* workerReviseMultuStatusSaga(data) {
  try {
    const userResponse = yield call(itemApiInfoApi, {
      data: data.payload.reqBody,
      URL: UPDATE_ITEM_MULTI_STATUS_URL
    });
    if (userResponse.responseCode === '000') {
      // const { createMode } = data.payload;
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'isSelectActive', value: '' }
      });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'selectedTagsArray', value: [] }
      });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'reviewListDistinctData', value: [] }
      });
      yield put({
        type: GET_ITEM_REVIEW_LIST_SAGA,
        payload: {
          HeaderOne: 'items',
          request: Store.getState().DisplayPaneTwoReducer.reviewListReqObj,
          BadgeOne: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeOne,
          BadgeTwo: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeTwo,
          BadgeThree: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeThree,
          middlePaneSelectedValue: Store.getState().DisplayPaneTwoReducer.middlePaneSelectedValue,
          isMiddlePaneList: true
        }
      });
    } else {
      yield put({ type: LOADER_STOP });
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewInfoItemSaga() {
  yield takeLatest(GET_ITEM_INFO_SAGA, workerReviewInfoItemSaga);
  yield takeLatest(ITEM_INFO_REVISE_SAGA, workerReviseInfoItemSaga);
  yield takeLatest(ITEM_MULTI_STATUS_REVISE_SAGA, workerReviseMultuStatusSaga);
}
