import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_ASSESSEE_GROUP_REVIEW_INFO_SAGA,
  LOADER_STOP,
  SET_DISPLAY_PANE_THREE_STATE
} from '../../actionType';
import { ASSESSEE_REVIEW_GROUP_URL } from '../../endpoints';

const assesseeGroupReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSEE_REVIEW_GROUP_URL;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviewAssesseeGroupInfoSaga(data) {
  try {
    const userResponse = yield call(assesseeGroupReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN GROUP REVIEW+++++', userResponse);
      // yield put({
      //   type: SET_DISPLAY_PANE_THREE_STATE,
      //   payload: {
      //     headerOne: 'assessees',
      //     headerOneBadgeOne: 'role',
      //     headerOneBadgeTwo: 'information',
      //     headerOneBadgeThree: 'key',
      //     responseObject: userResponse.responseObject[0]
      //   }
      // });
    }

    console.log('loading end');
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewAssesseeGroupInfoSaga() {
  yield takeLatest(GET_ASSESSEE_GROUP_REVIEW_INFO_SAGA, workerReviewAssesseeGroupInfoSaga);
}
