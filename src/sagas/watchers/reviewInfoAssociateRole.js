import { put, takeLatest, call } from 'redux-saga/effects';
import {
  ASSOCIATE_ROLE_REVISE_INFO_SAGA,
  GET_ASSOCIATE_ROLE_REVIEW_INFO_SAGA,
  LOADER_STOP,
  SET_ASSOCIATE_ROLE_REDUCER_STATE,
  SET_DISPLAY_PANE_THREE_STATE
} from '../../actionType';
import { ASSOCIATE_REVIEW_ROLE_URL, ASSOCIATE_ROLE_INFO_REVISE_URL } from '../../endpoints';

const assesseeRoleReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSOCIATE_REVIEW_ROLE_URL;
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

function* workerReviewAssociateRoleInfoSaga(data) {
  try {
    const userResponse = yield call(assesseeRoleReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN ASSOCIATE ROLE Review', userResponse);
      const { isReviseMode = false } = data.payload;
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'associates',
          headerOneBadgeOne: 'role',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        yield put({
          type: SET_ASSOCIATE_ROLE_REDUCER_STATE,
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

const assesseeRoleReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSOCIATE_ROLE_INFO_REVISE_URL;
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

function* workerReviseAssociateRoleInfoSaga(data) {
  try {
    const userResponse = yield call(assesseeRoleReviseInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN ASSOCIATE ROLE Review', userResponse);
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'associates',
          headerOneBadgeOne: 'role',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0]
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

export default function* watchReviewAssociateRoleInfoSaga() {
  yield takeLatest(GET_ASSOCIATE_ROLE_REVIEW_INFO_SAGA, workerReviewAssociateRoleInfoSaga);
  yield takeLatest(ASSOCIATE_ROLE_REVISE_INFO_SAGA, workerReviseAssociateRoleInfoSaga);
}
