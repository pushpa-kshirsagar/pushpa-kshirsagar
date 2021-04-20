import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_DISPLAY_PANE_THREE_STATE,
  LOADER_STOP,
  ASSESSEE_INFO_REVISE_SAGA,
  SET_DISPLAY_PANE_THREE_REVIEW_MODE
} from '../../actionType';
import { ASSESSEE_INFO_REVISE_URL } from '../../endpoints';

const assesseesReviseInfoApi = async (requestObj) => {
  let URL = ASSESSEE_INFO_REVISE_URL;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviseInfoAssesseeSaga(data) {
  try {
    const userResponse = yield call(assesseesReviseInfoApi, { data: data.payload.reqBody });
    if (userResponse.responseCode === '000') {
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: data.payload.headerOne,
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
          responseObject: userResponse.responseObject[0]
        }
      });
      yield put({
        type: SET_DISPLAY_PANE_THREE_REVIEW_MODE,
        payload: 'review'
      });
    }
    console.log('loading end');
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviseInfoAssesseeSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(ASSESSEE_INFO_REVISE_SAGA, workerReviseInfoAssesseeSaga);
}
