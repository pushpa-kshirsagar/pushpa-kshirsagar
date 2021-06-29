import { put, takeLatest, call } from 'redux-saga/effects';
import Store from '../../store';
import {
  CREATE_ASSESSEE_SAGA,
  LOADER_STOP,
  SET_ASSESSEE_INFORMATION_DATA,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_POPUP_VALUE,
  UPDATE_ASSESSEE_BASIC_INFO,
  UPDATE_ASSESSEE_CONTACT_INFO,
  UPDATE_ASSESSEE_ENGAGEMENT_INFO,
  UPDATE_ASSESSEE_PERSONAL_INFO
} from '../../actionType';
import { ASSESSEE_CREATE_URL } from '../../endpoints';
import { EXCEPTION_ERROR_MESSAGE } from '../../errorMessage';

const createAssesseeApi = async (requestObj) => {
  console.log(requestObj.data);
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(ASSESSEE_CREATE_URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerCreateAssesseeSaga(data) {
  try {
    const userResponse = yield call(createAssesseeApi, { data: data.payload });
    console.log('IN WORKER ====>', userResponse);
    console.log('IN WORKER ====>', JSON.stringify(userResponse));
    if (userResponse.responseCode === '000') {
      yield put({ type: SET_ASSESSEE_INFORMATION_DATA, payload: userResponse.responseObject[0] });
      console.log('loading end');
      const {
        informationAllocation,
        informationBasic,
        informationContact,
        informationEngagement,
        informationPersonal,
        informationSetup
      } = userResponse.responseObject[0];
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: Store.getState().DisplayPaneTwoReducer.typeOfAssesseeCreate,
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: Store.getState().DisplayPaneTwoReducer.selectedInformationAllorKey,
          responseObject: userResponse.responseObject[0],
          reviewMode: 'revise',
          createMode: 'assessee'
        }
      });
      yield put({ type: UPDATE_ASSESSEE_BASIC_INFO, payload: informationBasic });
      yield put({ type: UPDATE_ASSESSEE_PERSONAL_INFO, payload: informationPersonal });
      yield put({ type: UPDATE_ASSESSEE_ENGAGEMENT_INFO, payload: informationEngagement });
      yield put({ type: UPDATE_ASSESSEE_CONTACT_INFO, payload: informationContact });
      yield put({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
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

export default function* watchcreateAssesseeSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(CREATE_ASSESSEE_SAGA, workerCreateAssesseeSaga);
}
