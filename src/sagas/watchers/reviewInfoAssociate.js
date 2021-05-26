import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_DISPLAY_PANE_THREE_STATE,
  LOADER_STOP,
  GET_ASSOCIATE_INFO_SAGA,
  UPDATE_ASSOCIATE_BASIC_INFO,
  UPDATE_ASSOCIATE_INFO_CONTACT_INFO,
  UPDATE_ASSOCIATE_SETUP_INFO,
  SET_IGURU_NODE_DYNAMIC_SINGLE_STATE
} from '../../actionType';
import { ASSOCIATE_REVIEW_INFO_URL } from '../../endpoints';

const associateReviewInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSOCIATE_REVIEW_INFO_URL;
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

function* workerReviewInfoAssociateSaga(data) {
  try {
    const userResponse = yield call(associateReviewInfoApi, { data: data.payload.reqBody });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      console.log('ASSESSEE_REVIEW_INFO=======>', userResponse);
      const { isReviseMode = false } = data.payload;
      yield put({
        type: SET_DISPLAY_PANE_THREE_STATE,
        payload: {
          headerOne: 'associate',
          headerOneBadgeOne: 'information',
          headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
          responseObject: userResponse.responseObject[0],
          reviewMode: isReviseMode ? 'revise' : ''
        }
      });
      const {
        informationBasic,
        informationContact,
        informationSetup,
        informationFramework
      } = userResponse.responseObject[0];
      yield put({ type: UPDATE_ASSOCIATE_BASIC_INFO, payload: informationBasic });
      yield put({ type: UPDATE_ASSOCIATE_INFO_CONTACT_INFO, payload: informationContact });
      // yield put({ type: UPDATE_ASSOCIATE_SETUP_INFO, payload: informationSetup });
      let ascendantPrimaryList = [];
      if (informationFramework?.associateAscendant?.associateAscendantPrimary) {
        let ascendantPrimaryId =
          informationFramework?.associateAscendant?.associateAscendantPrimary[0]?.id || '';
        ascendantPrimaryList.push(ascendantPrimaryId);
      }
      yield put({
        type: SET_IGURU_NODE_DYNAMIC_SINGLE_STATE,
        payload: {
          objectName: 'informationFramework',
          stateName: 'associateAscendant',
          actualStateName: 'associateAscendantPrimary',
          value: ascendantPrimaryList
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

export default function* watchReviewInfoAssociateSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(GET_ASSOCIATE_INFO_SAGA, workerReviewInfoAssociateSaga);
}
