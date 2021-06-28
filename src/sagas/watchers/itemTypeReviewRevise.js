import { put, takeLatest, call } from 'redux-saga/effects';
import {
  LOADER_STOP,
  GET_ITEM_TYPE_REVIEW_INFO_SAGA,
  SET_DISPLAY_PANE_THREE_STATE,
  ITEM_TYPE_REVISE_INFO_SAGA,
  SET_ITEM_TYPE_REDUCER_STATE,
  GET_ITEMTYPEITEM_REVIEW_LIST_SAGA,
  SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_POPUP_VALUE,
  SET_TYPE_GROUP_ALLOCATION,
  SET_DISPLAY_TWO_SINGLE_STATE,
  GET_ITEM_TYPE_REVIEW_LIST_SAGA
} from '../../actionType';
import { ITEM_REVIEW_TYPE_URL, ITEM_REVISE_TYPE_URL } from '../../endpoints';
import Store from '../../store';

const itemTypeReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ITEM_REVIEW_TYPE_URL;
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

function* workerReviewItemTypeInfoSaga(data) {
  try {
    const userResponse = yield call(itemTypeReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN TYPE REVIEW+++++', userResponse);
      const { isReviseMode = false, itemTypeItemReqBody = null } = data.payload;
      if (itemTypeItemReqBody !== null) {
        yield put({
          type: GET_ITEMTYPEITEM_REVIEW_LIST_SAGA,
          payload: {
            request: itemTypeItemReqBody,
            HeaderOne: 'items',
            BadgeOne: '',
            BadgeTwo: '',
            BadgeThree: '',
            isMiddlePaneList: false
          }
        });
      }
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'items',
          headerOneBadgeOne: 'type',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        yield put({
          type: SET_ITEM_TYPE_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
        });
        yield put({
          type: SET_TYPE_GROUP_ALLOCATION,
          payload: {
            objectName: 'itemType',
            stateName: 'itemTypeGroup',
            value: userResponse?.responseObject[0]?.informationAllocation?.itemTypeGroup?.id || ''
          }
        });
      }
    }

    console.log('loading end');
    // yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}
const itemTypeReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ITEM_REVISE_TYPE_URL;
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

function* workerReviseItemTypeInfoSaga(data) {
  try {
    const userResponse = yield call(itemTypeReviseInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN Type revise+++++', userResponse);
      const { createMode = '', itemTypeItemReqBody = null } = data.payload;
      if (itemTypeItemReqBody !== null) {
        yield put({
          type: GET_ITEMTYPEITEM_REVIEW_LIST_SAGA,
          payload: {
            request: itemTypeItemReqBody,
            HeaderOne: 'items',
            BadgeOne: '',
            BadgeTwo: '',
            BadgeThree: '',
            isMiddlePaneList: false
          }
        });
      }
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'items',
          headerOneBadgeOne: 'type',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject,
          createMode
        }
      });
    }
    yield put({ type: SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST, payload: [] });
    yield put({
      type: SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
      payload: []
    });
    yield put({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'reviewListDistinctData', value: [] }
    });
    yield put({
      type: GET_ITEM_TYPE_REVIEW_LIST_SAGA,
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
    console.log('loading end');
    // yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewItemTypeInfoSaga() {
  yield takeLatest(GET_ITEM_TYPE_REVIEW_INFO_SAGA, workerReviewItemTypeInfoSaga);
  yield takeLatest(ITEM_TYPE_REVISE_INFO_SAGA, workerReviseItemTypeInfoSaga);
}
