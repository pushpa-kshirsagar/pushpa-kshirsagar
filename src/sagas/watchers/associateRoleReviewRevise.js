import { put, takeLatest, call } from 'redux-saga/effects';
import {
  ASSOCIATE_ROLE_REVISE_INFO_SAGA,
  GET_ASSOCIATEROLE_ASSOCIATE_REVIEW_LIST_SAGA,
  GET_ASSOCIATE_ROLE_REVIEW_INFO_SAGA,
  GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA,
  LOADER_STOP,
  SET_ASSESSEE_ROLE_ASSESSEE_ID_LIST,
  SET_ASSOCIATE_ROLE_REDUCER_STATE,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_POPUP_VALUE,
  SET_ROLE_DYNAMIC_STATE,
  SET_UNSELECTED_ASSESSEE_ROLE_ASSESSEE_ID_LIST
} from '../../actionType';
import { ASSOCIATE_REVIEW_ROLE_URL, ASSOCIATE_ROLE_INFO_REVISE_URL } from '../../endpoints';
import Store from '../../store';

const assesseeRoleReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSOCIATE_REVIEW_ROLE_URL;
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

function* workerReviewAssociateRoleInfoSaga(data) {
  try {
    const userResponse = yield call(assesseeRoleReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN ASSOCIATE ROLE Review', userResponse);
      const { isReviseMode = false, associateRoleAssociateReqBody } = data.payload;
      if (associateRoleAssociateReqBody !== null) {
        yield put({
          type: GET_ASSOCIATEROLE_ASSOCIATE_REVIEW_LIST_SAGA,
          payload: {
            request: associateRoleAssociateReqBody,
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
          headerOneBadgeOne: 'role',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        yield put({
          type: SET_ASSOCIATE_ROLE_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
        });
        let associateRoleGroupObj =
          userResponse.responseObject[0].informationAllocation.associateRoleGroup;
        let tempList = [];
        if (associateRoleGroupObj) {
          tempList.push(associateRoleGroupObj.id);
        }
        yield put({
          type: SET_ROLE_DYNAMIC_STATE,
          payload: {
            objectName: 'associateRole',
            stateName: 'informationAllocation',
            actualStateName: 'associateRoleGroup',
            value: tempList
          }
        });
      }
      console.log('loading end');
      yield put({ type: LOADER_STOP });
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

const assesseeRoleReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSOCIATE_ROLE_INFO_REVISE_URL;
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

function* workerReviseAssociateRoleInfoSaga(data) {
  try {
    const userResponse = yield call(assesseeRoleReviseInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN ASSOCIATE ROLE Review', userResponse);
      const { associateRoleAssociateReqBody = null, createMode } = data.payload;
      if (associateRoleAssociateReqBody !== null) {
        yield put({
          type: GET_ASSOCIATEROLE_ASSOCIATE_REVIEW_LIST_SAGA,
          payload: {
            request: associateRoleAssociateReqBody,
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
            headerOneBadgeOne: 'role',
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
        type: GET_ASSOCIATE_ROLE_REVIEW_LIST_SAGA,
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
    } else {
      yield put({ type: LOADER_STOP });
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: userResponse.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }
    yield put({ type: SET_ASSESSEE_ROLE_ASSESSEE_ID_LIST, payload: [] });
    yield put({ type: SET_UNSELECTED_ASSESSEE_ROLE_ASSESSEE_ID_LIST, payload: [] });
  } catch (e) {
    console.log('ERROR==', e);
    yield put({
      type: SET_POPUP_VALUE,
      payload: { isPopUpValue: 'somthing went wrong', popupMode: 'responseErrorMsg' }
    });
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchReviewAssociateRoleInfoSaga() {
  yield takeLatest(GET_ASSOCIATE_ROLE_REVIEW_INFO_SAGA, workerReviewAssociateRoleInfoSaga);
  yield takeLatest(ASSOCIATE_ROLE_REVISE_INFO_SAGA, workerReviseAssociateRoleInfoSaga);
}
