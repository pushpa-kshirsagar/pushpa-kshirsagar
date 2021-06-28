import { put, takeLatest, call } from 'redux-saga/effects';
import {
  CLEAR_TYPE_REDUCER_STATE,
  CREATE_NODE_SAGA,
  LOADER_STOP,
  POPUP_CLOSE,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_POPUP_VALUE
} from '../../actionType';
import { NODE_CREATE_URL } from '../../endpoints';

const createNodeApi = async (requestObj) => {
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

function* workerCreateNodeSaga(data) {
  try {
    const userResponse = yield call(createNodeApi, { data: data.payload, URL: NODE_CREATE_URL });
    if (userResponse.responseCode === '000') {
      console.log('loading end', data.payload.whichTypeCreate);
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'associate',
          headerOneBadgeOne: 'node',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: 'revise',
          createMode: 'associatesNode' //`${data.payload.whichTypeCreate}Node`
        }
      });
      yield put({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
      yield put({ type: CLEAR_TYPE_REDUCER_STATE });
      yield put({ type: POPUP_CLOSE });
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
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchcreateNodeSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(CREATE_NODE_SAGA, workerCreateNodeSaga);
}
