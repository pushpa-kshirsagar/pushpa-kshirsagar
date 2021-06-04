import { put, takeLatest, call } from 'redux-saga/effects';
import {
  LOADER_STOP,
  GET_ITEM_TYPE_REVIEW_INFO_SAGA,
  SET_DISPLAY_PANE_THREE_STATE,
  ITEM_TYPE_REVISE_INFO_SAGA,
  SET_ITEM_TYPE_REDUCER_STATE
} from '../../actionType';
import { ITEM_REVIEW_TYPE_URL, ITEM_REVISE_TYPE_URL } from '../../endpoints';

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
      const { isReviseMode = false } = data.payload;
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
      }
    }

    console.log('loading end');
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
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
      const { createMode = '' } = data.payload;
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

    console.log('loading end');
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewItemTypeInfoSaga() {
  yield takeLatest(GET_ITEM_TYPE_REVIEW_INFO_SAGA, workerReviewItemTypeInfoSaga);
  yield takeLatest(ITEM_TYPE_REVISE_INFO_SAGA, workerReviseItemTypeInfoSaga);
}
