import { put, takeLatest, call } from 'redux-saga/effects';
import {
  ASSESSEE_NODE_INFO_REVISE_SAGA,
  GET_ASSESSEENODE_ASSESSEE_REVIEW_LIST,
  GET_ASSOCIATE_NODE_REVIEW_INFO_SAGA,
  LOADER_STOP,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_NODE_REDUCER_STATE
} from '../../actionType';
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
      const { isReviseMode = false, selectedModule, associateNodeAssesseeReqBody } = data.payload;
      if(associateNodeAssesseeReqBody){
        yield put({
          type: GET_ASSESSEENODE_ASSESSEE_REVIEW_LIST,
          payload: {
            request: associateNodeAssesseeReqBody,
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
        yield put({
          type: SET_NODE_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
        });
      }
    }
    console.log('loading end');
    // yield put({ type: LOADER_STOP });
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
      console.log('IN Node revise+++++', userResponse);
      const { selectedModule } = data.payload;
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: selectedModule,
          headerOneBadgeOne: 'node',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          selectedModule: selectedModule
        }
      });
    }
    console.log('loading end');
    yield put({ type: LOADER_STOP });
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
