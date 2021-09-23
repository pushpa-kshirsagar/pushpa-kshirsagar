import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_CULTURE_GROUP_REVIEW_INFO_SAGA,
  CULTURE_GROUP_REVISE_INFO_SAGA,
  LOADER_STOP,
  SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_CULTURE_GROUP_REDUCER_STATE,
  CULTURE_GROUP_CULTURE_REVIEWLIST_SAGA,
  SET_POPUP_VALUE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  GET_CULTUREPROFILE_GROUP_REVIEW_LIST_SAGA
} from '../../actionType';
import { CULTURE_REVIEW_GROUP_URL, CULTURE_REVISE_GROUP_URL } from '../../endpoints';
import Store from '../../store';

const cultureProfileGroupReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = CULTURE_REVIEW_GROUP_URL;
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

function* workerReviewCultureProfileGroupInfoSaga(data) {
  try {
    const userResponse = yield call(cultureProfileGroupReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      const { isReviseMode = false, cultureGroupCultureReqBody = null } = data.payload;
      if (cultureGroupCultureReqBody !== null) {
        yield put({
          type: CULTURE_GROUP_CULTURE_REVIEWLIST_SAGA,
          payload: {
            request: cultureGroupCultureReqBody,
            HeaderOne: 'culture profiles',
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
          headerOne: 'culture profiles',
          headerOneBadgeOne: 'group',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        yield put({
          type: SET_CULTURE_GROUP_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
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

const cultureProfileGroupReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = CULTURE_REVISE_GROUP_URL;
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

function* workerReviseCultureProfileGroupInfoSaga(data) {
  try {
    const userResponse = yield call(cultureProfileGroupReviseInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      const { createMode = '', cultureGroupCultureReqBody = null } = data.payload;
      if (cultureGroupCultureReqBody !== null) {
        yield put({
          type: CULTURE_GROUP_CULTURE_REVIEWLIST_SAGA,
          payload: {
            request: cultureGroupCultureReqBody,
            HeaderOne: 'culture profiles',
            BadgeOne: '',
            BadgeTwo: '',
            BadgeThree: '',
            isMiddlePaneList: false
          }
        });
        yield put({
          type: SET_DISPLAY_PANE_THREE_STATE,
          payload: {
            headerOne: 'culture profiles',
            headerOneBadgeOne: 'group',
            headerOneBadgeTwo: 'information',
            headerOneBadgeThree: 'key',
            responseObject: userResponse.responseObject,
            createMode
          }
        });
      }
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'reviewListDistinctData', value: [] }
      });
      yield put({
        type: GET_CULTUREPROFILE_GROUP_REVIEW_LIST_SAGA,
        payload: {
          HeaderOne: 'culture profiles',
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

export default function* watchReviewCultureProfileGroupInfoSaga() {
  yield takeLatest(GET_CULTURE_GROUP_REVIEW_INFO_SAGA, workerReviewCultureProfileGroupInfoSaga);
  yield takeLatest(CULTURE_GROUP_REVISE_INFO_SAGA, workerReviseCultureProfileGroupInfoSaga);
}
