import { put, takeLatest, call } from 'redux-saga/effects';
import {
  LOADER_STOP,
  SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  GET_JOB_TYPE_REVIEW_INFO_SAGA,
  JOB_TYPE_REVISE_INFO_SAGA,
  SET_JOB_TYPE_REDUCER_STATE,
  JOB_TYPE_JOB_REVIEWLIST_SAGA,
  SET_TYPE_GROUP_ALLOCATION,
  SET_DISPLAY_TWO_SINGLE_STATE,
  GET_JOBPROFILE_TYPE_REVIEW_LIST_SAGA,
  SET_POPUP_VALUE
} from '../../actionType';
import { JOB_REVIEW_TYPE_URL, JOB_REVISE_TYPE_URL } from '../../endpoints';
import Store from '../../store';

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
        yield put({
          type: JOB_TYPE_JOB_REVIEWLIST_SAGA,
          payload: {
            request: jobTypeJobReqBody,
            HeaderOne: 'job profiles',
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
        yield put({
          type: SET_TYPE_GROUP_ALLOCATION,
          payload: {
            objectName: 'jobProfileType',
            stateName: 'jobProfileTypeGroup',
            value:
              userResponse?.responseObject[0]?.informationAllocation?.jobProfileTypeGroup?.id || ''
          }
        });
      }
    } else {
      yield put({ type: LOADER_STOP });
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
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
        yield put({
          type: JOB_TYPE_JOB_REVIEWLIST_SAGA,
          payload: {
            request: jobTypeJobReqBody,
            HeaderOne: 'job profiles',
            BadgeOne: '',
            BadgeTwo: '',
            BadgeThree: '',
            isMiddlePaneList: false
          }
        });
        yield put({
          type: SET_DISPLAY_PANE_THREE_STATE,
          payload: {
            headerOne: 'job profiles',
            headerOneBadgeOne: 'type',
            headerOneBadgeTwo: 'information',
            headerOneBadgeThree: 'key',
            responseObject: userResponse.responseObject[0],
            createMode
          }
        });
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
        type: GET_JOBPROFILE_TYPE_REVIEW_LIST_SAGA,
        payload: {
          HeaderOne: 'job profiles',
          request: Store.getState().DisplayPaneTwoReducer.reviewListReqObj,
          BadgeOne: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeOne,
          BadgeTwo: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeTwo,
          BadgeThree: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeThree,
          middlePaneSelectedValue: Store.getState().DisplayPaneTwoReducer.middlePaneSelectedValue,
          isMiddlePaneList: true
        }
      });
    } else {
      yield put({ type: LOADER_STOP });
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
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

export default function* watchReviewJobProfileTypeInfoSaga() {
  yield takeLatest(GET_JOB_TYPE_REVIEW_INFO_SAGA, workerReviewJobProfileTypeInfoSaga);
  yield takeLatest(JOB_TYPE_REVISE_INFO_SAGA, workerReviseJobProfileTypeInfoSaga);
}
