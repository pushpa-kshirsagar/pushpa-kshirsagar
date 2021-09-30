import { put, takeLatest, call } from 'redux-saga/effects';
import {
  CREATE_ASSOCIATE_ROLE_SAGA,
  LOADER_STOP,
  POPUP_CLOSE,
  SET_ASSOCIATE_ROLE_REDUCER_STATE,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_POPUP_VALUE
} from '../../actionType';
import { ASSOCIATE_ROLE_CREATE_URL } from '../../endpoints';
import { ASSOCIATE_GROUP_NODE_ROLE_REVIEW_LIST_POPUP_OPTION } from '../../PopUpConfig';

const createAssociateRoleApi = async (requestObj) => {
  console.log(requestObj.data);
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(ASSOCIATE_ROLE_CREATE_URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerCreateAssociateRoleSaga(data) {
  try {
    const userResponse = yield call(createAssociateRoleApi, { data: data.payload });
    if (userResponse.responseCode === '000') {
      console.log('loading end');
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'associates',
          headerOneBadgeOne: 'role',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: 'revise',
          createMode: 'associatesRole'
        }
      });
      yield put({
        type: SET_ASSOCIATE_ROLE_REDUCER_STATE,
        payload: userResponse.responseObject[0].informationBasic
      });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: {
          stateName: 'middlePaneListPopupOptions',
          value: ASSOCIATE_GROUP_NODE_ROLE_REVIEW_LIST_POPUP_OPTION
        }
      });
      yield put({ type: POPUP_CLOSE });
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

export default function* watchcreateAssociateRoleSaga() {
  yield takeLatest(CREATE_ASSOCIATE_ROLE_SAGA, workerCreateAssociateRoleSaga);
}
