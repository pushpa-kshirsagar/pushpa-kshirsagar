import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_ASSIGNMENT_GROUP_REVIEW_INFO_SAGA,
  LOADER_STOP,
  SET_DISPLAY_PANE_THREE_STATE
} from '../../actionType';
import { ASSIGNMENT_REVIEW_GROUP_URL } from '../../endpoints';

const assignmentGroupReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSIGNMENT_REVIEW_GROUP_URL;
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

function* workerReviewAssignmentGroupInfoSaga(data) {
  try {
    const userResponse = yield call(assignmentGroupReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN GROUP REVIEW+++++', userResponse);
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'assignments',
          headerOneBadgeOne: 'group',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject
        }
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

export default function* watchReviewAssignmentGroupInfoSaga() {
  yield takeLatest(GET_ASSIGNMENT_GROUP_REVIEW_INFO_SAGA, workerReviewAssignmentGroupInfoSaga);
}
