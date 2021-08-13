import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_DISPLAY_PANE_THREE_STATE,
  LOADER_STOP,
  GET_ASSOCIATE_INFO_SAGA,
  UPDATE_ASSOCIATE_BASIC_INFO,
  UPDATE_ASSOCIATE_INFO_CONTACT_INFO,
  SET_IGURU_NODE_DYNAMIC_SINGLE_STATE,
  ASSOCIATE_INFO_REVISE_SAGA,
  SET_DISPLAY_PANE_THREE_REVIEW_MODE,
  SET_POPUP_VALUE,
  SET_DISPLAY_TWO_SINGLE_STATE,
  ASSOCIATE_REVIEW_DISTINCT_SAGA
} from '../../actionType';
import { ASSOCIATE_INFO_REVISE_URL, ASSOCIATE_REVIEW_INFO_URL } from '../../endpoints';
import Store from '../../store';

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

const associateReviseInfoApi = async (requestObj) => {
  let URL = ASSOCIATE_INFO_REVISE_URL;
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

function* workerReviseInfoAssociateSaga(data) {
  try {
    const response = yield call(associateReviseInfoApi, { data: data.payload.reqBody });
    if (response.responseCode === '000') {
      if (data.payload.secondaryOptionCheckValue !== '') {
        yield put({
          type: SET_DISPLAY_PANE_THREE_STATE,
          payload: {
            headerOne: data.payload.headerOne,
            headerOneBadgeOne: 'information',
            headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
            responseObject: response.responseObject[0]
          }
        });
        yield put({
          type: SET_DISPLAY_PANE_THREE_REVIEW_MODE,
          payload: 'review'
        });
      }
      if (Store.getState().PopUpReducer.cardValue === 'NoCard') {
        yield put({
          type: SET_DISPLAY_TWO_SINGLE_STATE,
          payload: { stateName: 'reviewListDistinctData', value: [] }
        });
        yield put({
          type: ASSOCIATE_REVIEW_DISTINCT_SAGA,
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
      }

      console.log('loading end');
      yield put({ type: LOADER_STOP });
    } else {
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

export default function* watchReviewInfoAssociateSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(GET_ASSOCIATE_INFO_SAGA, workerReviewInfoAssociateSaga);
  yield takeLatest(ASSOCIATE_INFO_REVISE_SAGA, workerReviseInfoAssociateSaga);
}
