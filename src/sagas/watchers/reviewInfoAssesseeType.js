import { put, takeLatest, call } from 'redux-saga/effects';
import {
  ASSESSEE_TYPE_INFO_REVISE_SAGA,
  GET_ASSESSEE_TYPE_REVIEW_INFO_SAGA,
  LOADER_STOP,
  SET_ASSESSEE_TYPE_REDUCER_STATE,
  SET_DISPLAY_PANE_THREE_STATE
} from '../../actionType';
import { ASSESSEE_REVIEW_TYPE_URL, ASSESSEE_REVISE_TYPE_URL } from '../../endpoints';

const assesseeTypeReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSEE_REVIEW_TYPE_URL;
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

function* workerReviewAssesseeTypeInfoSaga(data) {
  try {
    const userResponse = yield call(assesseeTypeReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN GROUP REVIEW+++++', userResponse);
      const { isReviseMode = false } = data.payload;
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'assessees',
          headerOneBadgeOne: 'type',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        yield put({
          type: SET_ASSESSEE_TYPE_REDUCER_STATE,
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
const assesseeTypeReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSEE_REVISE_TYPE_URL;
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

function* workerReviseAssesseeTypeInfoSaga(data) {
  try {
    const userResponse = yield call(assesseeTypeReviseInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN GROUP REVIEW+++++', userResponse);
      const { createMode } = data.payload;
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'assessees',
          headerOneBadgeOne: 'type',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
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

export default function* watchReviewAssesseeTypeInfoSaga() {
  yield takeLatest(GET_ASSESSEE_TYPE_REVIEW_INFO_SAGA, workerReviewAssesseeTypeInfoSaga);
  yield takeLatest(ASSESSEE_TYPE_INFO_REVISE_SAGA, workerReviseAssesseeTypeInfoSaga);
}
