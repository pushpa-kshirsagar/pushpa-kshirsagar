import { put, takeLatest, call } from 'redux-saga/effects';
import {
  ASSESSEE_ASSESSMENT_START_SAGA,
  ASSESSMENT_START_SAGA,
  CLEAR_ASSIGNMENT_INFO,
  GET_ASSESSEE_ASSIGNMENT_SAGA,
  LOADER_STOP,
  RELATED_REVIEWLIST_DISTINCT_DATA,
  REVIEWLIST_DISTINCT_DATA,
  SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_MIDDLEPANE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_POPUP_VALUE
} from '../../actionType';
import {
  ASSESSEEASSIGNMENT_REVIEWLIST_URL,
  ASSESSMENT_START_URL,
  ASSESSEE_ASSESSMENT_START_URL
} from '../../endpoints';
import Store from '../../store';

const apiCallFun = async (requestObj) => {
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(requestObj.URL, requestOptions);
  const json = await response.json();
  return json;
};
function* workerAssesseeAssignmentListSaga(data) {
  try {
    const response = yield call(apiCallFun, {
      data: data.payload.request,
      URL: ASSESSEEASSIGNMENT_REVIEWLIST_URL,
      type: ''
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      if (data.payload.assessmentStarted) {
        yield put({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneTwo' });
        let assessmentList = response.responseObject.filter((list) => {
          return list.assignmentId === data.payload.assignmentId;
        });
        yield put({
          type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
          payload: { stateName: 'isExamMode', value: false }
        });
        yield put({
          type: RELATED_REVIEWLIST_DISTINCT_DATA,
          payload: assessmentList
        });
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'assessments',
            middlePaneHeaderBadgeOne: 'active',
            middlePaneHeaderBadgeTwo: '',
            middlePaneHeaderBadgeThree: '',
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'assesseesAssginmentAssessmentReviewList',
            scanCount: assessmentList[0].assesseeAssessment.length,
            showMiddlePaneState: true
          }
        });
      } else {
        yield put({
          type: SET_MIDDLEPANE_STATE,
          payload: {
            middlePaneHeader: 'assignments',
            middlePaneHeaderBadgeOne: data.payload.BadgeOne,
            middlePaneHeaderBadgeTwo: data.payload.BadgeTwo,
            middlePaneHeaderBadgeThree: '',
            middlePaneHeaderBadgeFour: '',
            typeOfMiddlePaneList: 'assesseeAssignmentDistinctReviewList',
            scanCount: response && response.countTotal,
            showMiddlePaneState: true
          }
        });
        yield put({ type: REVIEWLIST_DISTINCT_DATA, payload: response.responseObject });
        yield put({ type: CLEAR_ASSIGNMENT_INFO });
      }
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: response.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }

    console.log('loading end');
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}
function* workerAssessmentStartSaga(data) {
  try {
    const response = yield call(apiCallFun, {
      data: data.payload.request,
      URL: ASSESSMENT_START_URL,
      type: ''
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'typeOfMiddlePaneList', value: 'acutalAssessmentStart' }
      });
      yield put({
        type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
        payload: { stateName: 'assesseeAssignmentAssessmentData', value: response.responseObject }
      });
      yield put({
        type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
        payload: { stateName: 'isExamMode', value: true }
      });
      yield put({
        type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
        payload: { stateName: 'isAssessmentStart', value: 'START' }
      });
      yield put({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneSix' });
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: response.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }

    console.log('loading end');
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}
function* workerAssesseeAssessmentStartSaga(data) {
  try {
    const response = yield call(apiCallFun, {
      data: data.payload.request,
      URL: ASSESSEE_ASSESSMENT_START_URL,
      type: ''
    });
    // const response ={responseCode:'000',countTotal:30}
    if (response.responseCode === '000') {
      yield put({
        type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
        payload: { stateName: 'assesseeAssessmentStartData', value: response.responseObject }
      });
      yield put({
        type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
        payload: { stateName: 'isAssessmentStart', value: 'PROGRESS' }
      });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'isExamMode', value: false }
      });
      yield put({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneSeven' });

    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: response.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }

    console.log('loading end');
    yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}
export default function* watchAssesseeSelfSaga() {
  yield takeLatest(GET_ASSESSEE_ASSIGNMENT_SAGA, workerAssesseeAssignmentListSaga);
  yield takeLatest(ASSESSMENT_START_SAGA, workerAssessmentStartSaga);
  yield takeLatest(ASSESSEE_ASSESSMENT_START_SAGA, workerAssesseeAssessmentStartSaga);
}
