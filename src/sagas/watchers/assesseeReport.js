import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_ASSESSEE_REPORT_SAGA,
  LOADER_STOP,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_POPUP_VALUE
} from '../../actionType';
import { ASSESSEE_ASSESSMENT_RESULT_URL } from '../../endpoints';
import { EXCEPTION_ERROR_MESSAGE } from '../../errorMessage';

const apiCall = async (requestObj) => {
  console.log(requestObj.data);
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(ASSESSEE_ASSESSMENT_RESULT_URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerGetAssesseeReportSaga(data) {
  try {
    const userResponse = yield call(apiCall, { data: data.payload.request });
    //let userResponse = { responseCode: '000' };
    if (userResponse.responseCode === '000') {
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'assessee',
          headerOneBadgeOne: 'report',
          headerOneBadgeTwo: '',
          headerOneBadgeThree: '',
          responseObject: userResponse.responseObject,
          reviewMode: ''
        }
      });
      yield put({ type: LOADER_STOP });
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: EXCEPTION_ERROR_MESSAGE, popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchAssesseReporteSaga() {
  yield takeLatest(GET_ASSESSEE_REPORT_SAGA, workerGetAssesseeReportSaga);
}
