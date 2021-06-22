import { put, takeLatest, call } from 'redux-saga/effects';
import {
  ASSESSEE_NODE_INFO_REVISE_SAGA,
  GET_ASSESSEENODE_ASSESSEE_REVIEW_LIST,
  GET_ASSOCIATE_NODE_REVIEW_INFO_SAGA,
  INTERNAL_NODE_LIST_SAGA,
  LOADER_STOP,
  SET_ASSOCIATE_NODE_ASSESSEE_ID_LIST,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_NODE_DYNAMIC_SINGLE_STATE,
  SET_NODE_REDUCER_STATE,
  SET_UNSELECTED_ASSOCIATE_NODE_ASSESSEE_ID_LIST
} from '../../actionType';
import Store from '../../store';
import { ASSOCIATE_NODE_REVIEW_URL, ASSOCIATE_NODE_REVISE_URL } from '../../endpoints';

const associateNodeReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSOCIATE_NODE_REVIEW_URL;
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

function* workerReviewAssociateNodeInfoSaga(data) {
  try {
    const userResponse = yield call(associateNodeReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('IN Node REVIEW+++++', userResponse);
      const {
        selectedModule,
        associateNodeReqBody,
        createMode,
        getReviewListSaga,
        isShowAllModule = false,
        isReviseMode = false
      } = data.payload;
      if (associateNodeReqBody && !isShowAllModule) {
        yield put({
          type: getReviewListSaga,
          payload: {
            request: associateNodeReqBody,
            HeaderOne: selectedModule,
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
          headerOne: selectedModule,
          headerOneBadgeOne: 'node',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : '',
          selectedModule: selectedModule
        }
      });
      if (isReviseMode) {
        const { informationBasic, informationFramework } = userResponse.responseObject[0];
        yield put({
          type: SET_NODE_REDUCER_STATE,
          payload: informationBasic
        });
        let ascendantPrimaryList = [];
        if (informationFramework?.associateNodeAscendant?.associateNodeAscendantPrimary) {
          let ascendantPrimaryId =
            informationFramework?.associateNodeAscendant?.associateNodeAscendantPrimary?.id || '';
          ascendantPrimaryList.push(ascendantPrimaryId);
        }
        yield put({
          type: SET_NODE_DYNAMIC_SINGLE_STATE,
          payload: {
            objectName: 'informationFramework',
            stateName: 'associateNodeAscendant',
            actualStateName: 'associateNodeAscendantPrimary',
            value: ascendantPrimaryList
          }
        });
      }
    }
    console.log('loading end');
    if (data.payload.isShowAllModule) {
      yield put({ type: LOADER_STOP });
    }
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

const associateNodeReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSOCIATE_NODE_REVISE_URL;
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

function* workerReviseAssociateNodeInfoSaga(data) {
  try {
    const userResponse = yield call(associateNodeReviseInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      console.log('INter Node revise+++++', userResponse);
      const {
        selectedModule,
        associateNodeReqBody = null,
        createMode,
        getReviewListSaga,
        isShowAllModule = false
      } = data.payload;
      if (associateNodeReqBody && !isShowAllModule) {
        yield put({
          type: getReviewListSaga,
          payload: {
            request: associateNodeReqBody,
            HeaderOne: selectedModule,
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
          headerOne: selectedModule,
          headerOneBadgeOne: 'node',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          selectedModule: selectedModule,
          createMode
        }
      });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'reviewListDistinctData', value: [] }
      });
      if (createMode === '') {
        yield put({
          type: INTERNAL_NODE_LIST_SAGA,
          payload: {
            paneHeader: Store.getState().DisplayPaneTwoReducer.middlePaneHeader,
            request: Store.getState().DisplayPaneTwoReducer.reviewListReqObj,
            BadgeOne: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeOne,
            BadgeTwo: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeTwo,
            isMiddlePaneList: true,
            nodeViewState: Store.getState().DisplayPaneTwoReducer.nodeViewState,
            scanString: '',
            middlePaneSelectedValue: Store.getState().DisplayPaneTwoReducer.middlePaneSelectedValue
          }
        });
      }
    } else {
      yield put({ type: LOADER_STOP });
    }
    yield put({ type: SET_ASSOCIATE_NODE_ASSESSEE_ID_LIST, payload: [] });
    yield put({
      type: SET_UNSELECTED_ASSOCIATE_NODE_ASSESSEE_ID_LIST,
      payload: []
    });
    if (data.payload.isShowAllModule) {
      yield put({ type: LOADER_STOP });
    }
    // console.log('loading end');
  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}
export default function* watchReviewAssociateNodeInfoSaga() {
  yield takeLatest(GET_ASSOCIATE_NODE_REVIEW_INFO_SAGA, workerReviewAssociateNodeInfoSaga);
  yield takeLatest(ASSESSEE_NODE_INFO_REVISE_SAGA, workerReviseAssociateNodeInfoSaga);
}
