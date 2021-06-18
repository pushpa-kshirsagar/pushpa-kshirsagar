import { put, takeLatest, call } from 'redux-saga/effects';
import {
  LOADER_STOP,
  SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  SET_DISPLAY_PANE_THREE_STATE,
  SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
  GET_CULTURE_TYPE_REVIEW_INFO_SAGA,
  CULTURE_TYPE_REVISE_INFO_SAGA,
  SET_CULTURE_TYPE_REDUCER_STATE,
  CULTURE_TYPE_CULTURE_REVIEWLIST_SAGA,
  SET_TYPE_GROUP_ALLOCATION
} from '../../actionType';
import { CULTURE_REVIEW_TYPE_URL, CULTURE_REVISE_TYPE_URL } from '../../endpoints';

const cultureProfileTypeReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = CULTURE_REVIEW_TYPE_URL;
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

function* workerReviewCultureProfileTypeInfoSaga(data) {
  try {
    const userResponse = yield call(cultureProfileTypeReviewInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      const { isReviseMode = false, cultureTypeCultureReqBody = null } = data.payload;
      if (cultureTypeCultureReqBody !== null) {
        yield put({
          type: CULTURE_TYPE_CULTURE_REVIEWLIST_SAGA,
          payload: {
            request: cultureTypeCultureReqBody,
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
          headerOneBadgeOne: 'type',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      if (isReviseMode) {
        yield put({
          type: SET_CULTURE_TYPE_REDUCER_STATE,
          payload: userResponse.responseObject[0].informationBasic
        });
        yield put({
          type: SET_TYPE_GROUP_ALLOCATION,
          payload: {
            objectName: 'cultureProfileType',
            stateName: 'cultureProfileTypeGroup',
            value:
              userResponse?.responseObject?.informationAllocation?.cultureProfileTypeGroup?.id || ''
          }
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

const cultureProfileTypeReviseInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = CULTURE_REVISE_TYPE_URL;
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

function* workerReviseCultureProfileTypeInfoSaga(data) {
  try {
    const userResponse = yield call(cultureProfileTypeReviseInfoApi, {
      data: data.payload.reqBody
    });
    if (userResponse.responseCode === '000') {
      const { createMode = '', cultureTypeCultureReqBody = null } = data.payload;
      if (cultureTypeCultureReqBody !== null) {
        yield put({
          type: CULTURE_TYPE_CULTURE_REVIEWLIST_SAGA,
          payload: {
            request: cultureTypeCultureReqBody,
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
          headerOneBadgeOne: 'type',
          headerOneBadgeTwo: 'information',
          headerOneBadgeThree: 'key',
          responseObject: userResponse.responseObject,
          createMode
        }
      });
      yield put({ type: SET_ASSESSEE_GROUP_ASSESSEE_ID_LIST, payload: [] });
      yield put({
        type: SET_UNSELECTED_ASSESSEE_GROUP_ASSESSEE_ID_LIST,
        payload: []
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

export default function* watchReviewCultureProfileTypeInfoSaga() {
  yield takeLatest(GET_CULTURE_TYPE_REVIEW_INFO_SAGA, workerReviewCultureProfileTypeInfoSaga);
  yield takeLatest(CULTURE_TYPE_REVISE_INFO_SAGA, workerReviseCultureProfileTypeInfoSaga);
}
