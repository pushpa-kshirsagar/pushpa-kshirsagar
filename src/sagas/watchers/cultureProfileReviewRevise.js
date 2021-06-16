import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_DISPLAY_PANE_THREE_STATE,
  LOADER_STOP,
  SET_CULTURE_REDUCER_STATE,
  GET_CULTURE_PROFILE_INFO_SAGA,
  CULTURE_PROFILE_INFO_REVISE_SAGA
} from '../../actionType';
import { CULTURE_PROFILE_REVIEW_INFO_URL, CULTURE_PROFILE_REVISE_INFO_URL } from '../../endpoints';

const cultureProfileReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = CULTURE_PROFILE_REVIEW_INFO_URL;
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('idToken')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviewInfoCultureProfileSaga(data) {
  try {
    const userResponse = yield call(cultureProfileReviewInfoApi, { data: data.payload.reqBody });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      const { isReviseMode = false } = data.payload;
      console.log('cultureProfile=======>', userResponse);
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'culture profile',
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        const { informationBasic } = userResponse.responseObject[0];
        yield put({
          type: SET_CULTURE_REDUCER_STATE,
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
const cultureProfileReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = CULTURE_PROFILE_REVISE_INFO_URL;
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('idToken')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviseInfoCultureProfileSaga(data) {
  try {
    const userResponse = yield call(cultureProfileReviseInfoApi, { data: data.payload.reqBody });
    if (userResponse.responseCode === '000') {
      const { createMode } = data.payload;
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'culture profile',
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

export default function* watchReviewInfoCultureProfileSaga() {
  yield takeLatest(GET_CULTURE_PROFILE_INFO_SAGA, workerReviewInfoCultureProfileSaga);
  yield takeLatest(CULTURE_PROFILE_INFO_REVISE_SAGA, workerReviseInfoCultureProfileSaga);
}
