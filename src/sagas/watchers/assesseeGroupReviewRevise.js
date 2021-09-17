import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GROUP_CLASSIFICATION_LIST_SAGA,
  ASSESSEE_GROUP_INFO_REVISE_SAGA,
  GET_ASSESSEEGROUP_ASSESSEE_REVIEW_LIST,
  GET_ASSESSEE_GROUP_REVIEW_INFO_SAGA,
  GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
  LOADER_STOP,
  SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_ASSESSEE_GROUP_REDUCER_STATE,
  SET_CORE_ROLE_REVIEW_LIST_DATA,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_POPUP_VALUE,
  SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST
} from '../../actionType';
import {
  ASSESSEE_GROUP_CLASSIFICATION_URL,
  ASSESSEE_GROUP_INFO_REVISE_URL,
  ASSESSEE_INFO_REVISE_URL,
  ASSESSEE_REVIEW_GROUP_URL,
  ASSESSEE_ROLE_GROUP_URL
} from '../../endpoints';
import { EXCEPTION_ERROR_MESSAGE } from '../../errorMessage';
import Store from '../../store';
const assesseeGroupInfoApi = async (requestObj) => {
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

function* workerReviewAssesseeGroupInfoSaga(data) {
  try {
    const userResponse = yield call(assesseeGroupInfoApi, {
      data: data.payload.reqBody,
      URL: ASSESSEE_REVIEW_GROUP_URL
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
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: EXCEPTION_ERROR_MESSAGE, popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}

function* workerReviseAssesseeGroupInfoSaga(data) {
  try {
    const userResponse = yield call(assesseeGroupInfoApi, {
      data: data.payload.reqBody,
      URL: ASSESSEE_GROUP_INFO_REVISE_URL
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
        type: GET_ASSESSEE_GROUP_REVIEW_LIST_SAGA,
        payload: {
          HeaderOne: 'assessees',
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
        payload: {
          isPopUpValue: userResponse.responseMessage || 'somthing went wrong',
          popupMode: 'responseErrorMsg'
        }
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
function* workerGroupClassificationListSaga(data) {
  try {
    const userResponse = yield call(assesseeGroupInfoApi, {
      data: data.payload.request,
      URL:
        data.payload.classificationType === 'assessees'
          ? ASSESSEE_GROUP_CLASSIFICATION_URL
          : ASSESSEE_GROUP_CLASSIFICATION_URL
    });
    if (userResponse.responseCode === '000') {
      yield put({
        type: SET_CORE_ROLE_REVIEW_LIST_DATA,
        payload: userResponse.responseObject
      });
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }
    yield put({ type: LOADER_STOP });
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
export default function* watchReviewAssesseeGroupInfoSaga() {
  yield takeLatest(GET_ASSESSEE_GROUP_REVIEW_INFO_SAGA, workerReviewAssesseeGroupInfoSaga);
  yield takeLatest(ASSESSEE_GROUP_INFO_REVISE_SAGA, workerReviseAssesseeGroupInfoSaga);
  yield takeLatest(GROUP_CLASSIFICATION_LIST_SAGA, workerGroupClassificationListSaga);
}
