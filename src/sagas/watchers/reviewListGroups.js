import { put, takeLatest, call } from 'redux-saga/effects';
import {
    GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA,
  LOADER_STOP,
  REVIEWLIST_DISTINCT_DATA,
  SET_CORE_REVIEW_LIST_REQ_DATA,
  SET_MIDDLEPANE_STATE
} from '../../actionType';
import { ASSESSEE_ROLE_REVIEW_LIST_URL, ASSESSEE_GROUP_REVIEWLIST_URL } from '../../endpoints';

const GroupsReviewListDistinctApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSEE_GROUP_REVIEWLIST_URL;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};


function* workerReviewGroupListSaga(data) {
  try {
    const userResponse = yield call(GroupsReviewListDistinctApi, {
      data: data.payload.request
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000')
      yield put({
        type: data.payload.isMiddlePaneList
          ? REVIEWLIST_DISTINCT_DATA
          : SET_CORE_REVIEW_LIST_REQ_DATA,
        payload: userResponse.responseObject
      });

    if (data.payload.isMiddlePaneList) {
      yield put({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: 'assessees',
          middlePaneHeaderBadgeOne: data.payload.BadgeOne,
          middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
          middlePaneHeaderBadgeThree: data.payload.BadgeThree,
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: 'assesseeGroupDistinctReviewList',
          scanCount: userResponse && userResponse.countTotal,
          showMiddlePaneState: true
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

// export default function* watchReviewAssesseeRoleListSaga() {
//   yield takeLatest(GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA, workerReviewAssesseeRoleListSaga);
// }
export default function* watchReviewGroupsListSaga() {
  yield takeLatest(GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA, workerReviewGroupListSaga);
//   yield takeLatest(GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA, workerReviewAssociateRoleListSaga);
}
