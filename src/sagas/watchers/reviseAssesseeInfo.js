import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_DISPLAY_PANE_THREE_STATE,
  LOADER_STOP,
  ASSESSEE_INFO_REVISE_SAGA,
  SET_DISPLAY_PANE_THREE_REVIEW_MODE,
  ASSESSEE_REVIEW_DISTINCT_SAGA,
  SET_DISPLAY_TWO_SINGLE_STATE
} from '../../actionType';
import { ASSESSEE_INFO_REVISE_URL } from '../../endpoints';
import Store from '../../store';
const assesseesReviseInfoApi = async (requestObj) => {
  let URL = ASSESSEE_INFO_REVISE_URL;
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('token')
    }),
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
      if (data.payload.secondaryOptionCheckValue !== '') {
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
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'reviewListDistinctData', value: [] }
      });
      yield put({
        type: ASSESSEE_REVIEW_DISTINCT_SAGA,
        payload: {
          HeaderOne: 'assessees',
          request: Store.getState().DisplayPaneTwoReducer.reviewListReqObj,
          BadgeOne: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeOne,
          BadgeTwo: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeTwo
        }
      });
      console.log('loading end');
      yield put({ type: LOADER_STOP });
    }
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
