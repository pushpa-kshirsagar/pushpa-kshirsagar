import { put, takeLatest, call } from 'redux-saga/effects';
import {
  LOADER_STOP,
  ASSESSEE_CONFIRM_SAGA,
  SET_ASSESSEE_PERMISSION,
  SET_SELECTED_ASSOCIATE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_SIGN_IN_STATUS,
  SET_USER,
  SET_USER_STATE
} from '../../actionType';
import { CONFIRM_ASSESSEE_URL } from '../../endpoints';

const assesseesConfirmApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = CONFIRM_ASSESSEE_URL;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerConfirmAssesseeSaga(data) {
  console.log('WATCH+++', data.payload.requestObject);
  try {
    const response = yield call(assesseesConfirmApi, { data: data.payload.requestObject });
    if (response.responseCode === '000') {
      console.log('success==', response.responseObject);
      localStorage.setItem('token', response?.responseObject?.cognitoResponse?.accessToken);
      localStorage.setItem('refreshToken', response?.responseObject?.cognitoResponse?.refreshToken);
      yield put({ type: SET_USER, payload: response?.responseObject?.signInResponse });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: {
          stateName: 'signInRes',
          value: response?.responseObject
        }
      });
      yield put({
        type: SET_SELECTED_ASSOCIATE,
        payload: ''
      });
      yield put({
        type: SET_ASSESSEE_PERMISSION,
        payload: ''
      });
      yield put({
        type: SET_USER_STATE,
        payload: { stateName: 'assesseeConfirmStatus', value: 'confirmSuccess' }
      });
    }
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchConfirmAssesseeSaga() {
  yield takeLatest(ASSESSEE_CONFIRM_SAGA, workerConfirmAssesseeSaga);
}
