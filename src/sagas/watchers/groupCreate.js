import { put, takeLatest, call } from 'redux-saga/effects';
import {
  CLEAR_GROUP_REDUCER_STATE,
  CREATE_GROUP_SAGA,
  LOADER_STOP,
  POPUP_CLOSE,
  SET_ASSESSEE_GROUP_REDUCER_STATE,
  SET_ASSOCIATE_GROUP_REDUCER_STATE,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_POPUP_VALUE
} from '../../actionType';
import {
  ASSESSEE_GROUP_CREATE_URL,
  ASSESSMENT_GROUP_CREATE_URL,
  ASSIGNMENT_GROUP_CREATE_URL,
  ASSOCIATE_GROUP_CREATE_URL,
  ITEM_GROUP_CREATE_URL
} from '../../endpoints';

const createGroupApi = async (requestObj) => {
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  let URL = '';
  if (requestObj.data.whichGroupCreate === 'assessees') {
    URL = ASSESSEE_GROUP_CREATE_URL;
  }
  if (requestObj.data.whichGroupCreate === 'assessments') {
    URL = ASSESSMENT_GROUP_CREATE_URL;
  }
  if (requestObj.data.whichGroupCreate === 'assignments') {
    URL = ASSIGNMENT_GROUP_CREATE_URL;
  }
  if (requestObj.data.whichGroupCreate === 'associates') {
    URL = ASSOCIATE_GROUP_CREATE_URL;
  }
  if (requestObj.data.whichGroupCreate === 'items') {
    URL = ITEM_GROUP_CREATE_URL;
  }
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerCreateGroupSaga(data) {
  try {
    const userResponse = yield call(createGroupApi, { data: data.payload });
    if (userResponse.responseCode === '000') {
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
      if (data.payload.whichGroupCreate === 'assessees') {
        yield put({
          type: SET_ASSESSEE_GROUP_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
        });
      }
      if (data.payload.whichGroupCreate === 'associates') {
        yield put({
          type: SET_ASSOCIATE_GROUP_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
        });
      }
      yield put({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
      // yield put({ type: CLEAR_GROUP_REDUCER_STATE });
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

export default function* watchcreateGroupSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(CREATE_GROUP_SAGA, workerCreateGroupSaga);
}
