import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_ASSOCIATE_GROUP_REVIEW_INFO_SAGA,
  LOADER_STOP,
  SET_DISPLAY_PANE_THREE_STATE,
  ASSOCIATE_GROUP_REVISE_INFO_SAGA,
  SET_ASSOCIATE_GROUP_REDUCER_STATE,
  GET_ASSOCIATEGROUP_ASSOCIATE_REVIEW_LIST_SAGA
} from '../../actionType';
import { ASSOCIATE_GROUP_INFO_REVISE_URL, ASSOCIATE_REVIEW_GROUP_URL } from '../../endpoints';

const associateGroupReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSOCIATE_REVIEW_GROUP_URL;
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

function* workerReviewAssociateGroupInfoSaga(data) {
  try {
    const userResponse = yield call(associateGroupReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN GROUP REVIEW+++++', userResponse);
      const { isReviseMode = false, associateGroupAssociateReqBody = null } = data.payload;
      if (associateGroupAssociateReqBody !== null) {
        yield put({
          type: GET_ASSOCIATEGROUP_ASSOCIATE_REVIEW_LIST_SAGA,
          payload: {
            request: associateGroupAssociateReqBody,
            HeaderOne: 'associates',
            BadgeOne: '',
            BadgeTwo: '',
            BadgeThree: '',
            isMiddlePaneList: false
          }
        });
      }
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'associates',
          headerOneBadgeOne: 'group',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        yield put({
          type: SET_ASSOCIATE_GROUP_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
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
const associateGroupReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSOCIATE_GROUP_INFO_REVISE_URL;
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

function* workerReviseAssociateGroupInfoSaga(data) {
  try {
    const userResponse = yield call(associateGroupReviseInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN GROUP REVIEW+++++', userResponse);
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'associates',
          headerOneBadgeOne: 'group',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0]
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

export default function* watchReviewAssociateGroupInfoSaga() {
  yield takeLatest(GET_ASSOCIATE_GROUP_REVIEW_INFO_SAGA, workerReviewAssociateGroupInfoSaga);
  yield takeLatest(ASSOCIATE_GROUP_REVISE_INFO_SAGA, workerReviseAssociateGroupInfoSaga);
}
