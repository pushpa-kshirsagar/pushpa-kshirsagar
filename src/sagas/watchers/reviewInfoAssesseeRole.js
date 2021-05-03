import { put, takeLatest, call } from 'redux-saga/effects';
import {
  ASSESSEE_ROLE_INFO_REVISE_SAGA,
  GET_ASSESSEEROLE_ASSESSEE_REVIEW_LIST,
  GET_ASSESSEE_ROLE_REVIEW_INFO_SAGA,
  LOADER_STOP,
  SET_ASSESSEE_ROLE_REDUCER_STATE,
  SET_DISPLAY_PANE_THREE_STATE
} from '../../actionType';
import { ASSESSEE_REVIEW_ROLE_URL, ASSESSEE_ROLE_INFO_REVISE_URL } from '../../endpoints';

const assesseeRoleReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSEE_REVIEW_ROLE_URL;
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

function* workerReviewAssesseeRoleInfoSaga(data) {
  try {
    const userResponse = yield call(assesseeRoleReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      const { isReviseMode = false, assesseeRoleAssesseeReqBody = null } = data.payload;
      console.log('IN ROLE REVIEW+++++', userResponse);
      if (assesseeRoleAssesseeReqBody !== null) {
        yield put({
          type: GET_ASSESSEEROLE_ASSESSEE_REVIEW_LIST,
          payload: {
            request: assesseeRoleAssesseeReqBody,
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
          headerOneBadgeOne: 'role',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        yield put({
          type: SET_ASSESSEE_ROLE_REDUCER_STATE,
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
const assesseeRoleReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSEE_ROLE_INFO_REVISE_URL;
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

function* workerReviseAssesseeRoleInfoSaga(data) {
  try {
    const userResponse = yield call(assesseeRoleReviseInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN ROLE REVIEW+++++', userResponse);
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'assessees',
          headerOneBadgeOne: 'role',
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

export default function* watchReviewAssesseeRoleInfoSaga() {
  yield takeLatest(GET_ASSESSEE_ROLE_REVIEW_INFO_SAGA, workerReviewAssesseeRoleInfoSaga);
  yield takeLatest(ASSESSEE_ROLE_INFO_REVISE_SAGA, workerReviseAssesseeRoleInfoSaga);
}
