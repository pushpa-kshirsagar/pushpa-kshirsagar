import { put, takeLatest, call } from 'redux-saga/effects';
import {
  CLEAR_ITEM_REDUCER_STATE,
  CREATE_ITEM_SAGA,
  LOADER_STOP,
  POPUP_CLOSE,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_POPUP_VALUE
} from '../../actionType';
import { ITEM_CREATE_URL } from '../../endpoints';
import Store from '../../store';

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

function* workerCreateItemSaga(data) {
  try {
    const userResponse = yield call(createNodeApi, { data: data.payload, URL: ITEM_CREATE_URL });
    if (userResponse.responseCode === '000') {
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'item',
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: Store.getState().DisplayPaneTwoReducer.selectedInformationAllorKey,
          headerOneBadgeThree: '',
          responseObject: userResponse.responseObject[0],
          reviewMode: 'revise',
          createMode: 'item' //`${data.payload.whichTypeCreate}Node`
        }
      });
      yield put({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
      // yield put({ type: CLEAR_ITEM_REDUCER_STATE });
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
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchcreateItemSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(CREATE_ITEM_SAGA, workerCreateItemSaga);
}
