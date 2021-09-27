import { put, takeLatest, call } from 'redux-saga/effects';
import {
  ASSESSMENT_GROUP_REVISE_INFO_SAGA,
  GET_ASSESSMENTGROUP_ASSESSMENT_REVIEWLIST_SAGA,
  GET_ASSESSMENT_GROUP_REVIEW_INFO_SAGA,
  GET_ASSESSMENT_GROUP_REVIEW_LIST_SAGA,
  LOADER_STOP,
  SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_ASSESSMENT_GROUP_REDUCER_STATE,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_GROUP_SETUP_STATE,
  SET_POPUP_VALUE,
  SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST
} from '../../actionType';
import { ASSESSMENT_REVIEW_GROUP_URL, ASSESSMENT_REVISE_GROUP_URL } from '../../endpoints';
import Store from '../../store';

const assessmentGroupReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSMENT_REVIEW_GROUP_URL;
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

function* workerReviewAssessmentGroupInfoSaga(data) {
  try {
    const userResponse = yield call(assessmentGroupReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN GROUP REVIEW+++++', userResponse);
      const { isReviseMode = false, assessmentGroupAssessmentReqBody = null } = data.payload;
      if (assessmentGroupAssessmentReqBody !== null) {
        yield put({
          type: GET_ASSESSMENTGROUP_ASSESSMENT_REVIEWLIST_SAGA,
          payload: {
            request: assessmentGroupAssessmentReqBody,
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
          headerOneBadgeOne: 'group',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        yield put({
          type: SET_ASSESSMENT_GROUP_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
        });
        yield put({
          type: SET_GROUP_SETUP_STATE,
          payload: {
            objectName: 'assessmentGroup',
            value: userResponse.responseObject[0].informationSetup
          }
        });
      }
    }

    console.log('loading end');
    // yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}

const assessmentGroupReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSMENT_REVISE_GROUP_URL;
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

function* workerReviseAssessmentGroupInfoSaga(data) {
  try {
    const userResponse = yield call(assessmentGroupReviseInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN GROUP REVIEW+++++', userResponse);
      const { createMode = '', assessmentGroupAssessmentReqBody = null } = data.payload;
      if (assessmentGroupAssessmentReqBody !== null) {
        yield put({
          type: GET_ASSESSMENTGROUP_ASSESSMENT_REVIEWLIST_SAGA,
          payload: {
            request: assessmentGroupAssessmentReqBody,
            HeaderOne: 'assessments',
            BadgeOne: '',
            BadgeTwo: '',
            BadgeThree: '',
            isMiddlePaneList: false
          }
        });
        yield put({
          type: SET_DISPLAY_PANE_THREE_STATE,
          payload: {
            headerOne: 'assessments',
            headerOneBadgeOne: 'group',
            headerOneBadgeTwo: 'information',
            headerOneBadgeThree: 'key',
            responseObject: userResponse.responseObject[0],
            createMode
          }
        });
      } else {
        yield put({ type: LOADER_STOP });
      }
      yield put({ type: SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST, payload: [] });
      yield put({
        type: SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
        payload: []
      });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'reviewListDistinctData', value: [] }
      });
      yield put({
        type: GET_ASSESSMENT_GROUP_REVIEW_LIST_SAGA,
        payload: {
          middlePaneHeader: 'assessees',
          request: Store.getState().DisplayPaneTwoReducer.reviewListReqObj,
          BadgeOne: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeOne,
          BadgeTwo: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeTwo,
          BadgeThree: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeThree,
          middlePaneSelectedValue: Store.getState().DisplayPaneTwoReducer.middlePaneSelectedValue,
          isMiddlePaneList: true
        }
      });
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
      yield put({ type: LOADER_STOP });
    }

    console.log('loading end');
    // yield put({ type: LOADER_STOP });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewAssessmentGroupInfoSaga() {
  yield takeLatest(GET_ASSESSMENT_GROUP_REVIEW_INFO_SAGA, workerReviewAssessmentGroupInfoSaga);
  yield takeLatest(ASSESSMENT_GROUP_REVISE_INFO_SAGA, workerReviseAssessmentGroupInfoSaga);
}
