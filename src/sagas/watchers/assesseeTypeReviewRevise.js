import { put, takeLatest, call } from 'redux-saga/effects';
import {
  ASSESSEE_TYPE_INFO_REVISE_SAGA,
  GET_ASSESSEETYPE_ASSESSEE_REVIEW_LIST,
  GET_ASSESSEE_TYPE_REVIEW_INFO_SAGA,
  GET_ASSESSEE_TYPE_REVIEW_LIST_SAGA,
  LOADER_STOP,
  SET_ASSESSEE_ROLE_ASSESSEE_ID_LIST,
  SET_ASSESSEE_TYPE_REDUCER_STATE,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_POPUP_VALUE,
  SET_TYPE_GROUP_ALLOCATION,
  SET_UNSELECTED_ASSESSEE_ROLE_ASSESSEE_ID_LIST
} from '../../actionType';
import { ASSESSEE_REVIEW_TYPE_URL, ASSESSEE_REVISE_TYPE_URL } from '../../endpoints';
import Store from '../../store';

const assesseeTypeReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSEE_REVIEW_TYPE_URL;
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

function* workerReviewAssesseeTypeInfoSaga(data) {
  try {
    const userResponse = yield call(assesseeTypeReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN GROUP REVIEW+++++', userResponse);
      const { isReviseMode = false, assesseeTypeAssesseeReqBody = null } = data.payload;
      if (assesseeTypeAssesseeReqBody !== null) {
        yield put({
          type: GET_ASSESSEETYPE_ASSESSEE_REVIEW_LIST,
          payload: {
            request: assesseeTypeAssesseeReqBody,
            HeaderOne: Store.getState().DisplayPaneTwoReducer.middlePaneHeader,
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
          headerOneBadgeOne: 'type',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        yield put({
          type: SET_ASSESSEE_TYPE_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
        });
        yield put({
          type: SET_TYPE_GROUP_ALLOCATION,
          payload: {
            objectName: 'assesseeType',
            value: userResponse?.responseObject[0]?.informationSetup
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

    console.log('loading end');
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}
const assesseeTypeReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSEE_REVISE_TYPE_URL;
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

function* workerReviseAssesseeTypeInfoSaga(data) {
  try {
    const userResponse = yield call(assesseeTypeReviseInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN GROUP REVIEW+++++', userResponse);
      const { createMode, assesseeTypeAssesseeReqBody = null } = data.payload;
      if (assesseeTypeAssesseeReqBody !== null) {
        yield put({
          type: GET_ASSESSEETYPE_ASSESSEE_REVIEW_LIST,
          payload: {
            request: assesseeTypeAssesseeReqBody,
            HeaderOne: Store.getState().DisplayPaneTwoReducer.middlePaneHeader,
            BadgeOne: '',
            BadgeTwo: '',
            BadgeThree: '',
            isMiddlePaneList: false
          }
        });
        yield put({
          type: SET_DISPLAY_PANE_THREE_STATE,
          payload: {
            headerOne: 'assessees',
            headerOneBadgeOne: 'type',
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
        type: GET_ASSESSEE_TYPE_REVIEW_LIST_SAGA,
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
    yield put({ type: SET_ASSESSEE_ROLE_ASSESSEE_ID_LIST, payload: [] });
    yield put({ type: SET_UNSELECTED_ASSESSEE_ROLE_ASSESSEE_ID_LIST, payload: [] });
    console.log('loading end');
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewAssesseeTypeInfoSaga() {
  yield takeLatest(GET_ASSESSEE_TYPE_REVIEW_INFO_SAGA, workerReviewAssesseeTypeInfoSaga);
  yield takeLatest(ASSESSEE_TYPE_INFO_REVISE_SAGA, workerReviseAssesseeTypeInfoSaga);
}
