import { put, takeLatest, call } from 'redux-saga/effects';
import {
  CLEAR_TYPE_REDUCER_STATE,
  CREATE_TYPE_SAGA,
  LOADER_STOP,
  POPUP_CLOSE,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_MOBILE_PANE_STATE
} from '../../actionType';
import { ASSESSMENT_TYPE_CREATE_URL, ASSIGNMENT_TYPE_CREATE_URL } from '../../endpoints';

const createTypeApi = async (requestObj) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestObj.data)
  };
  let URL = '';
  if (requestObj.data.whichTypeCreate === 'assessments') {
    URL = ASSESSMENT_TYPE_CREATE_URL;
  }
  if (requestObj.data.whichTypeCreate === 'assignments') {
    URL = ASSIGNMENT_TYPE_CREATE_URL;
  }

  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerCreateTypeSaga(data) {
  try {
    const userResponse = yield call(createTypeApi, { data: data.payload });
    if (userResponse.responseCode === '000') {
      console.log('loading end', data.payload.whichTypeCreate);
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: data.payload.whichTypeCreate,
          headerOneBadgeOne: 'type',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: 'revise',
          createMode: `${data.payload.whichTypeCreate}Type`
        }
      });
    }
    yield put({ type: LOADER_STOP });
    yield put({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
    yield put({ type: CLEAR_TYPE_REDUCER_STATE });
    yield put({ type: POPUP_CLOSE });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchcreateTypeSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(CREATE_TYPE_SAGA, workerCreateTypeSaga);
}
