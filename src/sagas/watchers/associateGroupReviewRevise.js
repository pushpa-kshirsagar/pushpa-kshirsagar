import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_ASSOCIATE_GROUP_REVIEW_INFO_SAGA,
  LOADER_STOP,
  SET_DISPLAY_PANE_THREE_STATE,
  ASSOCIATE_GROUP_REVISE_INFO_SAGA,
  SET_ASSOCIATE_GROUP_REDUCER_STATE,
  GET_ASSOCIATEGROUP_ASSOCIATE_REVIEW_LIST_SAGA,
  SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_POPUP_VALUE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  GET_ASSOCIATE_GROUP_REVIEW_LIST_SAGA,
  SET_GROUP_SETUP_STATE
} from '../../actionType';
import { ASSOCIATE_GROUP_INFO_REVISE_URL, ASSOCIATE_REVIEW_GROUP_URL } from '../../endpoints';
import Store from '../../store';

const associateGroupReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSOCIATE_REVIEW_GROUP_URL;
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

function* workerReviewAssociateGroupInfoSaga(data) {
  try {
    const userResponse = yield call(associateGroupReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN GROUP REVIEW+++++', userResponse);
      const { isReviseMode = false, associateGroupAssociateReqBody = null } = data.payload;
      if (associateGroupAssociateReqBody !== null) {
        yield put({
          type: GET_ASSOCIATEGROUP_ASSOCIATE_REVIEW_LIST_SAGA,
          payload: {
            request: associateGroupAssociateReqBody,
            HeaderOne: 'associates',
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
          headerOne: 'associates',
          headerOneBadgeOne: 'group',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        yield put({
          type: SET_ASSOCIATE_GROUP_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
        });
        yield put({
          type: SET_GROUP_SETUP_STATE,
          payload: {
            objectName: 'associateGroup',
            value: userResponse.responseObject[0].informationSetup
          }
        });
      }
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
const associateGroupReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSOCIATE_GROUP_INFO_REVISE_URL;
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

function* workerReviseAssociateGroupInfoSaga(data) {
  try {
    const userResponse = yield call(associateGroupReviseInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN GROUP REVIEW+++++', userResponse);
      const { associateGroupAssociateReqBody = null, createMode } = data.payload;
      if (associateGroupAssociateReqBody !== null) {
        yield put({
          type: GET_ASSOCIATEGROUP_ASSOCIATE_REVIEW_LIST_SAGA,
          payload: {
            request: associateGroupAssociateReqBody,
            HeaderOne: 'associates',
            BadgeOne: '',
            BadgeTwo: '',
            BadgeThree: '',
            isMiddlePaneList: false
          }
        });
        yield put({
          type: SET_DISPLAY_PANE_THREE_STATE,
          payload: {
            headerOne: 'associates',
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
        type: GET_ASSOCIATE_GROUP_REVIEW_LIST_SAGA,
        payload: {
          HeaderOne: 'associates',
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
      console.log('loading end');
      yield put({ type: LOADER_STOP });
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

export default function* watchReviewAssociateGroupInfoSaga() {
  yield takeLatest(GET_ASSOCIATE_GROUP_REVIEW_INFO_SAGA, workerReviewAssociateGroupInfoSaga);
  yield takeLatest(ASSOCIATE_GROUP_REVISE_INFO_SAGA, workerReviseAssociateGroupInfoSaga);
}
