import { put, takeLatest, call } from 'redux-saga/effects';
import {
  CREATE_TYPE_SAGA,
  LOADER_STOP,
  POPUP_CLOSE,
  SET_ASSESSEE_TYPE_REDUCER_STATE,
  SET_ASSESSMENT_TYPE_REDUCER_STATE,
  SET_ASSIGNMENT_TYPE_REDUCER_STATE,
  SET_ASSOCIATE_TYPE_REDUCER_STATE,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_ITEM_TYPE_REDUCER_STATE,
  SET_MOBILE_PANE_STATE,
  SET_POPUP_VALUE
} from '../../actionType';
import {
  ASSESSEE_TYPE_CREATE_URL,
  ASSESSMENT_TYPE_CREATE_URL,
  ASSIGNMENT_TYPE_CREATE_URL,
  ASSOCIATE_TYPE_CREATE_URL,
  ITEM_TYPE_CREATE_URL
} from '../../endpoints';

const createTypeApi = async (requestObj) => {
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  let URL = '';
  if (requestObj.data.whichTypeCreate === 'assessees') {
    URL = ASSESSEE_TYPE_CREATE_URL;
  }
  if (requestObj.data.whichTypeCreate === 'assessments') {
    URL = ASSESSMENT_TYPE_CREATE_URL;
  }
  if (requestObj.data.whichTypeCreate === 'assignments') {
    URL = ASSIGNMENT_TYPE_CREATE_URL;
  }
  if (requestObj.data.whichTypeCreate === 'associates') {
    URL = ASSOCIATE_TYPE_CREATE_URL;
  }
  if (requestObj.data.whichTypeCreate === 'items') {
    URL = ITEM_TYPE_CREATE_URL;
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
      if (data.payload.whichTypeCreate === 'assessees') {
        yield put({
          type: SET_ASSESSEE_TYPE_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
        });
      }
      if (data.payload.whichTypeCreate === 'assessments') {
        yield put({
          type: SET_ASSESSMENT_TYPE_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
        });
      }
      if (data.payload.whichTypeCreate === 'assignments') {
        yield put({
          type: SET_ASSIGNMENT_TYPE_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
        });
      }
      if (data.payload.whichTypeCreate === 'associates') {
        yield put({
          type: SET_ASSOCIATE_TYPE_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
        });
      }
      if (data.payload.whichTypeCreate === 'items') {
        yield put({
          type: SET_ITEM_TYPE_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
        });
      }
      yield put({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });
      // yield put({ type: CLEAR_TYPE_REDUCER_STATE });
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

export default function* watchcreateTypeSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(CREATE_TYPE_SAGA, workerCreateTypeSaga);
}
