import { put, takeLatest, call } from 'redux-saga/effects';
import Store from '../../store';
import {
  CREATE_ASSESSMENT_SAGA,
  LOADER_STOP,
  POPUP_CLOSE,
  SET_ASSESSMENT_BASIC_REDUCER_STATE,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_POPUP_VALUE
} from '../../actionType';
import { ASSESSMENT_CREATE_URL } from '../../endpoints';

const createAssessmentApi = async (requestObj) => {
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(ASSESSMENT_CREATE_URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerCreateAssessmentSaga(data) {
  try {
    const apiResponse = yield call(createAssessmentApi, { data: data.payload });
    if (apiResponse.responseCode === '000') {
      console.log('loading end', data.payload.whichTypeCreate);
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'assessment',
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: Store.getState().DisplayPaneTwoReducer.selectedInformationAllorKey,
          responseObject: apiResponse.responseObject[0],
          reviewMode: 'revise',
          createMode: 'assessment'
        }
      });
      yield put({
        type: SET_ASSESSMENT_BASIC_REDUCER_STATE,
        payload: apiResponse.responseObject[0].informationBasic
      });
      yield put({ type: LOADER_STOP });
      yield put({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
      yield put({ type: POPUP_CLOSE });
    } else {
      yield put({ type: LOADER_STOP });
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: apiResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchCreateAssessmentSaga() {
  yield takeLatest(CREATE_ASSESSMENT_SAGA, workerCreateAssessmentSaga);
}
