import { put, takeLatest, call } from 'redux-saga/effects';
import {
  CREATE_ASSESSEE_ROLE_SAGA,
  LOADER_STOP,
  POPUP_CLOSE,
  SET_ASSESSEE_ROLE_REDUCER_STATE,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_POPUP_VALUE
} from '../../actionType';
import { ASSESSEE_ROLE_CREATE_URL } from '../../endpoints';
import { ASSESSEE_GROUP_NODE_ROLE_REVIEW_LIST_POPUP_OPTION } from '../../PopUpConfig';

const createAssesseeRoleApi = async (requestObj) => {
  console.log(requestObj.data);
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(ASSESSEE_ROLE_CREATE_URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerCreateAssesseeRoleSaga(data) {
  try {
    const userResponse = yield call(createAssesseeRoleApi, { data: data.payload });
    if (userResponse.responseCode === '000') {
      console.log('loading end');
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'assessees',
          headerOneBadgeOne: 'role',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: 'revise',
          createMode: 'assesseesRole'
        }
      });
      yield put({
        type: SET_ASSESSEE_ROLE_REDUCER_STATE,
        payload: userResponse.responseObject[0].informationBasic
      });
      yield put({ type: POPUP_CLOSE });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: {
          stateName: 'middlePaneListPopupOptions',
          value: ASSESSEE_GROUP_NODE_ROLE_REVIEW_LIST_POPUP_OPTION
        }
      });
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }
    yield put({ type: LOADER_STOP });
    yield put({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchcreateAssesseeRoleSaga() {
  yield takeLatest(CREATE_ASSESSEE_ROLE_SAGA, workerCreateAssesseeRoleSaga);
}
