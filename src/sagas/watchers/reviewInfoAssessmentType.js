import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_ASSESSMENT_TYPE_REVIEW_INFO_SAGA,
  LOADER_STOP,
  SET_ASSESSMENT_TYPE_REDUCER_STATE,
  ASSESSMENT_TYPE_REVISE_INFO_SAGA,
  SET_DISPLAY_PANE_THREE_STATE,
  GET_ASSESSMENTTYPE_ASSESSMENT_REVIEWLIST_SAGA
} from '../../actionType';
import { ASSESSMENT_REVIEW_TYPE_URL, ASSESSMENT_REVISE_TYPE_URL } from '../../endpoints';

const assessmentTypeReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSMENT_REVIEW_TYPE_URL;
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

function* workerReviewAssessmentTypeInfoSaga(data) {
  try {
    const userResponse = yield call(assessmentTypeReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN GROUP REVIEW+++++', userResponse);
      const { isReviseMode = false, assessmentTypeAssessmentReqBody = null } = data.payload;
      if (assessmentTypeAssessmentReqBody !== null) {
        yield put({
          type: GET_ASSESSMENTTYPE_ASSESSMENT_REVIEWLIST_SAGA,
          payload: {
            request: assessmentTypeAssessmentReqBody,
            HeaderOne: 'assessments',
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
          headerOne: 'assessments',
          headerOneBadgeOne: 'type',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject,
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        yield put({
          type: SET_ASSESSMENT_TYPE_REDUCER_STATE,
          payload: userResponse.responseObject.informationBasic
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
const assessmentTypeReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSMENT_REVISE_TYPE_URL;
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

function* workerReviseAssessmentTypeInfoSaga(data) {
  try {
    const userResponse = yield call(assessmentTypeReviseInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN GROUP REVIEW+++++', userResponse);
      const { createMode = '', assessmentTypeAssessmentReqBody = null } = data.payload;
      if (assessmentTypeAssessmentReqBody !== null) {
        yield put({
          type: GET_ASSESSMENTTYPE_ASSESSMENT_REVIEWLIST_SAGA,
          payload: {
            request: assessmentTypeAssessmentReqBody,
            HeaderOne: 'assessments',
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
          headerOne: 'assessments',
          headerOneBadgeOne: 'type',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject,
          createMode
        }
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

export default function* watchReviewAssessmentTypeInfoSaga() {
  yield takeLatest(GET_ASSESSMENT_TYPE_REVIEW_INFO_SAGA, workerReviewAssessmentTypeInfoSaga);
  yield takeLatest(ASSESSMENT_TYPE_REVISE_INFO_SAGA, workerReviseAssessmentTypeInfoSaga);
}
