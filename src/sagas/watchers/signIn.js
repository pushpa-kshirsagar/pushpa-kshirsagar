import { put, takeLatest, call } from 'redux-saga/effects';
import { LOADER_STOP, ASSESSEE_SIGN_IN_SAGA, SET_SIGN_IN_STATUS, SET_SELECTED_ASSOCIATE, SET_ASSESSEE_PERMISSION, SET_USER, SET_DISPLAY_TWO_SINGLE_STATE, SET_USER_STATE, SET_MIDDLEPANE_STATE, CLEAR_DISPLAY_PANE_THREE } from '../../actionType';
import { ASSESSEE_SIGN_IN_URL } from '../../endpoints';

const assesseeSignInApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSEE_SIGN_IN_URL;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerSignInAssesseeSaga(data) {
  try {
    const userResponse = yield call(assesseeSignInApi, { data: data.payload });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      console.log('SIGN IN ASSESSEE=======>', userResponse);
      localStorage.setItem('token', userResponse?.responseObject?.cognitoResponse?.accessToken);
      localStorage.setItem(
        'refreshToken',
        userResponse?.responseObject?.cognitoResponse?.refreshToken
      );
      yield put({ type: SET_USER, payload: userResponse?.responseObject?.signInResponse });
      yield put({
        type: SET_USER_STATE,
        payload: { stateName: 'loginUserName', value: data.payload.credential }
      });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: {
          stateName: 'signInRes',
          value: userResponse?.responseObject
        }
      });
      yield put({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: '',
          middlePaneHeaderBadgeOne: '',
          middlePaneHeaderBadgeTwo: '',
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: '',
          scanCount: null,
          showMiddlePaneState: false
        }
      });
      yield put({ type: CLEAR_DISPLAY_PANE_THREE });
      yield put({
        type: SET_SELECTED_ASSOCIATE,
        payload: ''
      });
      yield put({
        type: SET_ASSESSEE_PERMISSION,
        payload: ''
      });
      yield put({ type: SET_SIGN_IN_STATUS, payload: 'success' });
    }
    else {
      yield put({ type: SET_SIGN_IN_STATUS, payload: 'error' });
    }
  } catch (e) {
    console.log('ERROR==', e);
    yield put({ type: SET_SIGN_IN_STATUS, payload: 'error' });
  }
}

export default function* watchSignInAssesseeSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(ASSESSEE_SIGN_IN_SAGA, workerSignInAssesseeSaga);
}
