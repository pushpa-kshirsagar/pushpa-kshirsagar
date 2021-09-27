import { put, takeLatest, call } from 'redux-saga/effects';
import {
  LOADER_STOP,
  SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  GET_JOB_GROUP_REVIEW_INFO_SAGA,
  JOB_GROUP_REVISE_INFO_SAGA,
  SET_JOB_GROUP_REDUCER_STATE,
  JOB_GROUP_JOB_REVIEWLIST_SAGA,
  SET_POPUP_VALUE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  GET_JOBPROFILE_GROUP_REVIEW_LIST_SAGA,
  SET_GROUP_SETUP_STATE
} from '../../actionType';
import { JOB_REVIEW_GROUP_URL, JOB_REVISE_GROUP_URL } from '../../endpoints';
import Store from '../../store';

const jobProfileGroupReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = JOB_REVIEW_GROUP_URL;
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

function* workerReviewJobProfileGroupInfoSaga(data) {
  try {
    const userResponse = yield call(jobProfileGroupReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      const { isReviseMode = false, jobGroupJobReqBody = null } = data.payload;
      if (jobGroupJobReqBody !== null) {
        yield put({
          type: JOB_GROUP_JOB_REVIEWLIST_SAGA,
          payload: {
            request: jobGroupJobReqBody,
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
          headerOneBadgeOne: 'group',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        yield put({
          type: SET_JOB_GROUP_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
        });
        yield put({
          type: SET_GROUP_SETUP_STATE,
          payload: {
            objectName: 'jobProfileGroup',
            value: userResponse.responseObject[0].informationSetup
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

const jobProfileGroupReviseInfoApi = async (requestObj) => {
  let URL = JOB_REVISE_GROUP_URL;
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

function* workerReviseJobProfileGroupInfoSaga(data) {
  try {
    const userResponse = yield call(jobProfileGroupReviseInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      const { createMode = '', jobGroupJobReqBody = null } = data.payload;
      if (jobGroupJobReqBody !== null) {
        yield put({
          type: JOB_GROUP_JOB_REVIEWLIST_SAGA,
          payload: {
            request: jobGroupJobReqBody,
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
            headerOneBadgeOne: 'group',
            headerOneBadgeTwo: 'information',
            headerOneBadgeThree: 'key',
            responseObject: userResponse.responseObject[0],
            createMode
          }
        });
      }
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'reviewListDistinctData', value: [] }
      });
      yield put({
        type: GET_JOBPROFILE_GROUP_REVIEW_LIST_SAGA,
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
      yield put({ type: SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST, payload: [] });
      yield put({
        type: SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
        payload: []
      });
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

export default function* watchReviewJobProfileGroupInfoSaga() {
  yield takeLatest(GET_JOB_GROUP_REVIEW_INFO_SAGA, workerReviewJobProfileGroupInfoSaga);
  yield takeLatest(JOB_GROUP_REVISE_INFO_SAGA, workerReviseJobProfileGroupInfoSaga);
}
