import { put, takeLatest, call } from 'redux-saga/effects';
import {
  CLEAR_GROUP_REDUCER_STATE,
  CREATE_GROUP_SAGA,
  LOADER_STOP,
  POPUP_CLOSE,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_MOBILE_PANE_STATE
} from '../../actionType';
import {
  ASSESSEE_GROUP_CREATE_URL,
  ASSESSMENT_GROUP_CREATE_URL,
  ASSOCIATE_GROUP_CREATE_URL
} from '../../endpoints';

const createGroupApi = async (requestObj) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestObj.data)
  };
  let URL = '';
  if (requestObj.data.whichGroupCreate === 'assessees') {
    URL = ASSESSEE_GROUP_CREATE_URL;
  }
  if (requestObj.data.whichGroupCreate === 'assessments') {
    URL = ASSESSMENT_GROUP_CREATE_URL;
  }
  if (requestObj.data.whichGroupCreate === 'associates') {
    URL = ASSOCIATE_GROUP_CREATE_URL;
  }
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerCreateGroupSaga(data) {
  try {
    const userResponse = yield call(createGroupApi, { data: data.payload });
    if (userResponse.responseCode === '000') {
      console.log('loading end', data.payload.whichGroupCreate);
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: data.payload.whichGroupCreate,
          headerOneBadgeOne: 'group',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: 'revise',
          createMode: `${data.payload.whichGroupCreate}Group`
        }
      });
    }
    yield put({ type: LOADER_STOP });
    yield put({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
    yield put({ type: CLEAR_GROUP_REDUCER_STATE });
    yield put({ type: POPUP_CLOSE });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchcreateGroupSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(CREATE_GROUP_SAGA, workerCreateGroupSaga);
}
