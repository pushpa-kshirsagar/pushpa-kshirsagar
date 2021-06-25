import { put, takeLatest, call } from 'redux-saga/effects';
import { assesseeRole } from '../../Actions/AssesseeModuleAction';
import {
  ASSESSEE_ROLE_INFO_REVISE_SAGA,
  GET_ASSESSEEROLE_ASSESSEE_REVIEW_LIST,
  GET_ASSESSEE_ROLE_REVIEW_INFO_SAGA,
  GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
  LOADER_STOP,
  SET_ASSESSEE_ROLE_ASSESSEE_ID_LIST,
  SET_ASSESSEE_ROLE_REDUCER_STATE,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_ROLE_DYNAMIC_STATE,
  SET_UNSELECTED_ASSESSEE_ROLE_ASSESSEE_ID_LIST
} from '../../actionType';
import { ASSESSEE_REVIEW_ROLE_URL, ASSESSEE_ROLE_INFO_REVISE_URL } from '../../endpoints';
import Store from '../../store';
const assesseeRoleReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSEE_REVIEW_ROLE_URL;
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

function* workerReviewAssesseeRoleInfoSaga(data) {
  try {
    const userResponse = yield call(assesseeRoleReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      const { isReviseMode = false, assesseeRoleAssesseeReqBody = null } = data.payload;
      console.log('IN ROLE REVIEW+++++', userResponse);
      if (assesseeRoleAssesseeReqBody !== null) {
        yield put({
          type: GET_ASSESSEEROLE_ASSESSEE_REVIEW_LIST,
          payload: {
            request: assesseeRoleAssesseeReqBody,
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
          headerOne: Store.getState().DisplayPaneTwoReducer.middlePaneHeader,
          headerOneBadgeOne: 'role',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        yield put({
          type: SET_ASSESSEE_ROLE_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
        });
        let assesseeRoleGroupObj =
          userResponse.responseObject[0].informationAllocation.assesseeRoleGroup;
        let tempList = [];
        if (assesseeRoleGroupObj) {
          tempList.push(assesseeRoleGroupObj.id);
        }
        yield put({
          type: SET_ROLE_DYNAMIC_STATE,
          payload: {
            objectName: 'assesseeRole',
            stateName: 'informationAllocation',
            actualStateName: 'assesseeRoleGroup',
            value: tempList
          }
        });
      }
    } else {
      console.log('loading end');
      yield put({ type: LOADER_STOP });
    }
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}
const assesseeRoleReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSEE_ROLE_INFO_REVISE_URL;
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

function* workerReviseAssesseeRoleInfoSaga(data) {
  try {
    const userResponse = yield call(assesseeRoleReviseInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      let middlePaneHeader =
        Store.getState().DisplayPaneTwoReducer.middlePaneHeader === ''
          ? 'assessees'
          : Store.getState().DisplayPaneTwoReducer.middlePaneHeader;
      if (data.payload.assesseeRoleAssesseeReqBody !== null) {
        yield put({
          type: GET_ASSESSEEROLE_ASSESSEE_REVIEW_LIST,
          payload: {
            request: data.payload.assesseeRoleAssesseeReqBody,
            HeaderOne: middlePaneHeader,
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
          headerOne: middlePaneHeader,
          headerOneBadgeOne: 'role',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          createMode: data.payload.createMode
        }
      });
      yield put({ type: SET_ASSESSEE_ROLE_ASSESSEE_ID_LIST, payload: [] });
      yield put({ type: SET_UNSELECTED_ASSESSEE_ROLE_ASSESSEE_ID_LIST, payload: [] });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'reviewListDistinctData', value: [] }
      });
      yield put({
        type: GET_ASSESSEE_ROLE_REVIEW_LIST_SAGA,
        payload: {
          HeaderOne: middlePaneHeader,
          request: Store.getState().DisplayPaneTwoReducer.reviewListReqObj,
          BadgeOne: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeOne,
          BadgeTwo: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeTwo,
          BadgeThree: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeThree,
          middlePaneSelectedValue: Store.getState().DisplayPaneTwoReducer.middlePaneSelectedValue,
          isMiddlePaneList: true
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

export default function* watchReviewAssesseeRoleInfoSaga() {
  yield takeLatest(GET_ASSESSEE_ROLE_REVIEW_INFO_SAGA, workerReviewAssesseeRoleInfoSaga);
  yield takeLatest(ASSESSEE_ROLE_INFO_REVISE_SAGA, workerReviseAssesseeRoleInfoSaga);
}
