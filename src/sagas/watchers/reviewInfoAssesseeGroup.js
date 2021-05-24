import { put, takeLatest, call } from 'redux-saga/effects';
import {
  ASSESSEE_GROUP_INFO_REVISE_SAGA,
  GET_ASSESSEEGROUP_ASSESSEE_REVIEW_LIST,
  GET_ASSESSEE_GROUP_REVIEW_INFO_SAGA,
  LOADER_STOP,
  SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_ASSESSEE_GROUP_REDUCER_STATE,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST
} from '../../actionType';
import {
  ASSESSEE_GROUP_INFO_REVISE_URL,
  ASSESSEE_INFO_REVISE_URL,
  ASSESSEE_REVIEW_GROUP_URL
} from '../../endpoints';

const assesseeGroupReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSEE_REVIEW_GROUP_URL;
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

function* workerReviewAssesseeGroupInfoSaga(data) {
  try {
    const userResponse = yield call(assesseeGroupReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      const { isReviseMode = false, assesseeGroupAssesseeReqBody = null } = data.payload;
      console.log('IN GROUP REVIEW+++++', userResponse);
      if (assesseeGroupAssesseeReqBody !== null) {
        yield put({
          type: GET_ASSESSEEGROUP_ASSESSEE_REVIEW_LIST,
          payload: {
            request: assesseeGroupAssesseeReqBody,
            HeaderOne: 'assessees',
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
          headerOne: 'assessees',
          headerOneBadgeOne: 'group',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        yield put({
          type: SET_ASSESSEE_GROUP_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
        });
      }
    }

    console.log('loading end');
    // yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

const assesseeGroupReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSEE_GROUP_INFO_REVISE_URL;
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

function* workerReviseAssesseeGroupInfoSaga(data) {
  try {
    const userResponse = yield call(assesseeGroupReviseInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      const { assesseeGroupAssesseeReqBody = null, createMode } = data.payload;
      if (assesseeGroupAssesseeReqBody !== null) {
        yield put({
          type: GET_ASSESSEEGROUP_ASSESSEE_REVIEW_LIST,
          payload: {
            request: assesseeGroupAssesseeReqBody,
            HeaderOne: 'assessees',
            BadgeOne: '',
            BadgeTwo: '',
            BadgeThree: '',
            isMiddlePaneList: false
          }
        });
      }
      console.log('IN GROUP REVIEW+++++', userResponse);
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'assessees',
          headerOneBadgeOne: 'group',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          createMode
        }
      });
      yield put({ type: SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST, payload: [] });
      yield put({
        type: SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
        payload: []
      });
    }

    console.log('loading end');
    // yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewAssesseeGroupInfoSaga() {
  yield takeLatest(GET_ASSESSEE_GROUP_REVIEW_INFO_SAGA, workerReviewAssesseeGroupInfoSaga);
  yield takeLatest(ASSESSEE_GROUP_INFO_REVISE_SAGA, workerReviseAssesseeGroupInfoSaga);
}
