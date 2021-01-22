import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_USER_SAGA, SET_USER } from '../../actionType';

const GET_USER_URL = 'https://run.mocky.io/v3/a8daa4c8-e6e5-4062-8d88-05f3ffdc324d';
function getUserApi(data) {
  return axios.get(GET_USER_URL);
}

function* workerGetUserSaga() {
  try {
    const userResponse = yield call(getUserApi);
    console.log('IN WORKER ====>', userResponse);
    if (userResponse.status === 200)
      yield put({ type: SET_USER, payload: userResponse?.data?.data });
  } catch (e) {
    console.log('ERROR==', e);
  }
}

export default function* watchGetUserSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(GET_USER_SAGA, workerGetUserSaga);
}
