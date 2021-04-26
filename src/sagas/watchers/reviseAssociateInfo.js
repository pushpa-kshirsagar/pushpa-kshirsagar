import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_DISPLAY_PANE_THREE_STATE,
  LOADER_STOP,
  ASSESSEE_INFO_REVISE_SAGA,
  SET_DISPLAY_PANE_THREE_REVIEW_MODE,
  ASSESSEE_REVIEW_DISTINCT_SAGA,
  SET_DISPLAY_TWO_SINGLE_STATE,
  ASSOCIATE_INFO_REVISE_SAGA,
  ASSOCIATE_REVIEW_DISTINCT_SAGA
} from '../../actionType';
import { ASSOCIATE_INFO_REVISE_URL } from '../../endpoints';
import Store from '../../store';
const associateReviseInfoApi = async (requestObj) => {
  let URL = ASSOCIATE_INFO_REVISE_URL;
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

function* workerReviseInfoAssociateSaga(data) {
  try {
    const response = yield call(associateReviseInfoApi, { data: data.payload.reqBody });
    if (response.responseCode === '000') {
      if (data.payload.secondaryOptionCheckValue !== '') {
        yield put({
          type: SET_DISPLAY_PANE_THREE_STATE,
          payload: {
            headerOne: data.payload.headerOne,
            headerOneBadgeOne: 'information',
            headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
            responseObject: response.responseObject[0]
          }
        });
        yield put({
          type: SET_DISPLAY_PANE_THREE_REVIEW_MODE,
          payload: 'review'
        });
      }
      if (Store.getState().PopUpReducer.cardValue === 'NoCard') {
        yield put({
          type: SET_DISPLAY_TWO_SINGLE_STATE,
          payload: { stateName: 'reviewListDistinctData', value: [] }
        });
        yield put({
          type: ASSOCIATE_REVIEW_DISTINCT_SAGA,
          payload: {
            HeaderOne: 'associates',
            request: Store.getState().DisplayPaneTwoReducer.reviewListReqObj,
            BadgeOne: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeOne,
            BadgeTwo: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeTwo
          }
        });
      }

      console.log('loading end');
      yield put({ type: LOADER_STOP });
    }
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviseInfoAssociateSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(ASSOCIATE_INFO_REVISE_SAGA, workerReviseInfoAssociateSaga);
}
