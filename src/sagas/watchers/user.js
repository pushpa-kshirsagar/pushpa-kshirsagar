import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_SELECTED_ASSOCIATE,
  SET_USER,
  SET_ASSESSEE_PERMISSION,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_SIGN_IN_STATUS,
  GET_USER_SAGA,
  GET_SIGNED_ASSESSEE_PERMISSION_SAGA,
  ASSESSEE_CONFIRM_SAGA
} from '../../actionType';
import { CONFIRM_ASSESSEE_URL, GET_ASSESSEE_PERMISSION_URL, GET_USER_URL } from '../../endpoints';
function getUserApi(data) {
  return axios.get(GET_USER_URL);
}
function getAssesseePermissionApi(data) {
  return axios.get(GET_ASSESSEE_PERMISSION_URL);
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

function* getAssesseePermission() {
  try {
    const response = yield call(getAssesseePermissionApi);
    console.log('IN WORKER ====>', response.data);
    if (response.data.status === 'success') {
      yield put({ type: SET_ASSESSEE_PERMISSION, payload: response?.data.responseObject });
    }
  } catch (e) {
    console.log('ERROR==', e);
  }
}
// export default function* watchGetUserSaga() {
//   console.log('IN WATCH ====>');
//   yield takeLatest(GET_USER_SAGA, workerGetUserSaga);
// }

export default function* rootSaga() {
  console.log('---(((__))))+++');
  yield takeLatest(GET_USER_SAGA, workerGetUserSaga);
  yield takeLatest(GET_SIGNED_ASSESSEE_PERMISSION_SAGA, getAssesseePermission);
}
