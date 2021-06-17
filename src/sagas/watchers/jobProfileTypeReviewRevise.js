import { put, takeLatest, call } from 'redux-saga/effects';
import {
  LOADER_STOP,
  SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  GET_JOB_TYPE_REVIEW_INFO_SAGA,
  JOB_TYPE_REVISE_INFO_SAGA,
  SET_JOB_TYPE_REDUCER_STATE
} from '../../actionType';
import { JOB_REVIEW_TYPE_URL, JOB_REVISE_TYPE_URL } from '../../endpoints';

const jobProfileTypeReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = JOB_REVIEW_TYPE_URL;
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('idToken')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviewJobProfileTypeInfoSaga(data) {
  try {
    const userResponse = yield call(jobProfileTypeReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      const { isReviseMode = false, jobTypeJobReqBody = null } = data.payload;
      if (jobTypeJobReqBody !== null) {
        // yield put({
        //   type: GET_ASSESSMENTGROUP_ASSESSMENT_REVIEWLIST_SAGA,
        //   payload: {
        //     request: cultureGroupCultureReqBody,
        //     HeaderOne: 'culture profiles',
        //     BadgeOne: '',
        //     BadgeTwo: '',
        //     BadgeThree: '',
        //     isMiddlePaneList: false
        //   }
        // });
      }
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'job profiles',
          headerOneBadgeOne: 'type',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        yield put({
          type: SET_JOB_TYPE_REDUCER_STATE,
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

const jobProfileTypeReviseInfoApi = async (requestObj) => {
  let URL = JOB_REVISE_TYPE_URL;
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('idToken')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerReviseJobProfileTypeInfoSaga(data) {
  try {
    const userResponse = yield call(jobProfileTypeReviseInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      const { createMode = '', jobTypeJobReqBody = null } = data.payload;
      if (jobTypeJobReqBody !== null) {
        // yield put({
        //   type: GET_ASSESSMENTGROUP_ASSESSMENT_REVIEWLIST_SAGA,
        //   payload: {
        //     request: assessmentGroupAssessmentReqBody,
        //     HeaderOne: 'culture profiles',
        //     BadgeOne: '',
        //     BadgeTwo: '',
        //     BadgeThree: '',
        //     isMiddlePaneList: false
        //   }
        // });
      }
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'job profiles',
          headerOneBadgeOne: 'type',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject,
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
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewJobProfileTypeInfoSaga() {
  yield takeLatest(GET_JOB_TYPE_REVIEW_INFO_SAGA, workerReviewJobProfileTypeInfoSaga);
  yield takeLatest(JOB_TYPE_REVISE_INFO_SAGA, workerReviseJobProfileTypeInfoSaga);
}
