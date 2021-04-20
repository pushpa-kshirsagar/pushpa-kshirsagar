import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_DISPLAY_PANE_THREE_STATE,
  LOADER_STOP,
  GET_ASSESSEE_INFO_SAGA,
  SET_DISPLAY_TWO_SINGLE_STATE
} from '../../actionType';
import { ASSESSEE_REVIEW_INFO_URL } from '../../endpoints';
import store from '../../store';

const assesseesReviewInfoApi = async (requestObj) => {
  let URL = ASSESSEE_REVIEW_INFO_URL;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviewInfoAssesseeSaga(data) {
  try {
    const userResponse = yield call(assesseesReviewInfoApi, { data: data.payload.reqBody });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      // console.log('ASSESSEE_REVIEW_INFO=======>', userResponse);
      const { isReviseMode = false } = data.payload;
      if (data.payload.setLeftPaneAssessee) {
        yield put({
          type: SET_DISPLAY_TWO_SINGLE_STATE,
          payload: {
            stateName: 'leftPaneAssesseeInfo',
            value: userResponse?.responseObject[0]
          }
        });
      } else {
        yield put({
          type: SET_DISPLAY_PANE_THREE_STATE,
          payload: {
            headerOne: data.payload.headerOne,
            headerOneBadgeOne: 'information',
            headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
            responseObject: userResponse.responseObject[0],
            reviewMode: isReviseMode ? 'revise' : ''
          }
        });
      }
    }
    console.log('loading end');
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewInfoAssesseeSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(GET_ASSESSEE_INFO_SAGA, workerReviewInfoAssesseeSaga);
}
