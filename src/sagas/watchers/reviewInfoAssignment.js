import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_DISPLAY_PANE_THREE_STATE,
  LOADER_STOP,
  GET_ASSIGNMENT_INFO_SAGA,
  SET_ASSIGNMENT_BASIC_REDUCER_STATE,
  ASSIGNMENT_INFO_REVISE_SAGA
} from '../../actionType';
import { ASSIGNMENT_REVIEW_INFO_URL, ASSIGNMENT_REVISE_INFO_URL } from '../../endpoints';

const assignmentReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSIGNMENT_REVIEW_INFO_URL;
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

function* workerReviewInfoAssignmentSaga(data) {
  try {
    const userResponse = yield call(assignmentReviewInfoApi, { data: data.payload.reqBody });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      console.log('ASSIGNMENT_REVIEW_INFO=======>', userResponse);
      const { isReviseMode = false } = data.payload;
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'assignment',
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
          responseObject: userResponse.responseObject,
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        yield put({
          type: SET_ASSIGNMENT_BASIC_REDUCER_STATE,
          payload: userResponse.responseObject.informationBasic
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

const assignmentReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSIGNMENT_REVISE_INFO_URL;
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

function* workerReviseInfoAssignmentSaga(data) {
  try {
    const userResponse = yield call(assignmentReviseInfoApi, { data: data.payload.reqBody });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      console.log('ASSIGNMENT_REVIEW_INFO=======>', userResponse);
      const { createMode = '' } = data.payload;
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'assignment',
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
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

export default function* watchReviewInfoAssignmentSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(GET_ASSIGNMENT_INFO_SAGA, workerReviewInfoAssignmentSaga);
  yield takeLatest(ASSIGNMENT_INFO_REVISE_SAGA, workerReviseInfoAssignmentSaga);
}
