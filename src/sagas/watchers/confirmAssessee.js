import { put, takeLatest, call } from 'redux-saga/effects';
import {
  LOADER_STOP,
  ASSESSEE_CONFIRM_SAGA,
  SET_ASSESSEE_PERMISSION,
  SET_SELECTED_ASSOCIATE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_USER,
  SET_USER_STATE,
  ASSESSEE_ASSOCIATE_LINK_LIST,
  REVIEWLIST_DISTINCT_DATA,
  SET_MIDDLEPANE_STATE,
  POPUP_CLOSE,
  ASSESSEE_ASSOCIATE_LINK_REVISE_SAGA
} from '../../actionType';
import { ASSESSEE_LINK_URL, CONFIRM_ASSESSEE_URL, LINKED_ASSOCIATE_URL } from '../../endpoints';

const assesseesConfirmApi = async (requestObj) => {
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(requestObj.URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerConfirmAssesseeSaga(data) {
  console.log('WATCH+++', data.payload.requestObject);
  try {
    const response = yield call(assesseesConfirmApi, {
      data: data.payload.requestObject,
      URL: CONFIRM_ASSESSEE_URL
    });
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
function* workerAssesseeAssociateLinkSaga(data) {
  try {
    const response = yield call(assesseesConfirmApi, {
      data: data.payload.request,
      URL: ASSESSEE_LINK_URL
    });
    if (response.responseCode === '000') {
      yield put({ type: POPUP_CLOSE });
      console.log('response+++', response.responseObject);
      yield put({ type: REVIEWLIST_DISTINCT_DATA, payload: response.responseObject });
      yield put({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: 'associates',
          middlePaneHeaderBadgeOne: 'active',
          middlePaneHeaderBadgeTwo: '',
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: 'assesseeassociatesReviewList',
          scanCount: response?.countTotal || 0,
          showMiddlePaneState: true
        }
      });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'isSelectActive', value: 'multiple' }
      });
      console.log('success==', response.responseObject);
    } else {
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'errorResponse', value: response }
      });
    }
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}
function* workerAssesseeAssociateLinkReviseSaga(data) {
  console.log('WATCH+++', data.payload.request);
  try {
    const response = yield call(assesseesConfirmApi, {
      data: data.payload.request,
      URL: LINKED_ASSOCIATE_URL
    });
    if (response.responseCode === '000') {
      console.log(response);
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'errorResponse', value: response }
      });
    } else {
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'errorResponse', value: response }
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
  yield takeLatest(ASSESSEE_ASSOCIATE_LINK_LIST, workerAssesseeAssociateLinkSaga);
  yield takeLatest(ASSESSEE_ASSOCIATE_LINK_REVISE_SAGA, workerAssesseeAssociateLinkReviseSaga);
}
