import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_USER_SAGA, SET_SELECTED_ASSOCIATE, SET_USER } from '../../actionType';
import { GET_USER_URL } from '../../endpoints';

function getUserApi(data) {
  return axios.get(GET_USER_URL);
}

function* workerGetUserSaga() {
  try {
    const userResponse = yield call(getUserApi);
    console.log('IN WORKER ====>', userResponse.data);
    if (userResponse.data.status === 'success')
      if (userResponse.data.responseObject.length === 1) {
        yield put({ type: SET_SELECTED_ASSOCIATE, payload: userResponse?.data.responseObject[0] });
      }
    yield put({ type: SET_USER, payload: userResponse?.data.responseObject });
  } catch (e) {
    console.log('ERROR==', e);
  }
}

export default function* watchGetUserSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(GET_USER_SAGA, workerGetUserSaga);
}
