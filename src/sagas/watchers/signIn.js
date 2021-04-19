import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_ASSESSEE_SIGN_IN_INFO,
  ASSESSEE_SIGN_IN_SAGA,
  SET_SIGN_IN_STATUS,
  SET_SELECTED_ASSOCIATE,
  SET_ASSESSEE_PERMISSION,
  SET_USER,
  SET_DISPLAY_TWO_SINGLE_STATE,
  SET_USER_STATE,
  SET_MIDDLEPANE_STATE,
  CLEAR_DISPLAY_PANE_THREE,
  SET_MOBILE_PANE_STATE,
  LOADER_START,
  GET_ASSESSEE_INFO_SAGA,
  GET_SIGNED_ASSESSEE_PERMISSION_SAGA
} from '../../actionType';
import { ASSESSEE_SIGN_IN_URL, ASSESSEE_SIGN_IN_INFO_URL } from '../../endpoints';

const assesseeSignInApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSEE_SIGN_IN_URL;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerSignInAssesseeSaga(data) {
  try {
    const userResponse = yield call(assesseeSignInApi, { data: data.payload });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      console.log('SIGN IN ASSESSEE=======>', userResponse);
      localStorage.setItem('token', userResponse?.responseObject?.cognitoResponse?.accessToken);
      localStorage.setItem('assesseeId', data.payload.credential);
      localStorage.setItem(
        'refreshToken',
        userResponse?.responseObject?.cognitoResponse?.refreshToken
      );
      if (userResponse?.responseObject?.signInResponse.length > 1) {
        yield put({ type: SET_USER, payload: userResponse?.responseObject?.signInResponse });
      } else if (userResponse?.responseObject?.signInResponse.length === 1) {
        const selectedAssociate = userResponse?.responseObject?.signInResponse[0];
        console.log('SELECTED ASSOCIATE +++++ >', selectedAssociate);
        yield put({ type: LOADER_START });
        yield put({
          type: SET_SELECTED_ASSOCIATE,
          payload: selectedAssociate
        });
        yield put({
          type: GET_ASSESSEE_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'all',
            headerOne: '',
            setLeftPaneAssessee: true,
            reqBody: {
              assesseeId: '0123456',
              associateId:
                selectedAssociate.associate.informationEngagement.associateTag.associateTagPrimary,
              filter: 'true',
              searchCondition: 'AND',
              search: [
                {
                  condition: 'and',
                  searchBy: [
                    {
                      dataType: 'string',
                      conditionColumn: 'id',
                      conditionValue: {
                        condition: 'eq',
                        value: {
                          from: selectedAssociate.assesseeId
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
        yield put({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneOne' });
        yield put({ type: GET_SIGNED_ASSESSEE_PERMISSION_SAGA });
      } else {
        //show message
      }
      yield put({
        type: SET_USER_STATE,
        payload: { stateName: 'loginUserName', value: data.payload.credential }
      });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: {
          stateName: 'signInRes',
          value: userResponse?.responseObject
        }
      });
      yield put({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: '',
          middlePaneHeaderBadgeOne: '',
          middlePaneHeaderBadgeTwo: '',
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: '',
          scanCount: null,
          showMiddlePaneState: false
        }
      });
      yield put({ type: CLEAR_DISPLAY_PANE_THREE });
      // yield put({
      //   type: SET_SELECTED_ASSOCIATE,
      //   payload: ''
      // });
      yield put({
        type: SET_ASSESSEE_PERMISSION,
        payload: ''
      });
      yield put({ type: SET_SIGN_IN_STATUS, payload: 'success' });
    } else {
      yield put({ type: SET_SIGN_IN_STATUS, payload: 'error' });
    }
  } catch (e) {
    console.log('ERROR==', e);
    yield put({ type: SET_SIGN_IN_STATUS, payload: 'error' });
  }
}
const assesseeSignInInfoApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSEE_SIGN_IN_INFO_URL;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerSignInAssesseeInfo(data) {
  try {
    const userResponse = yield call(assesseeSignInInfoApi, { data: data.payload });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      if (userResponse?.responseObject.length > 1) {
        yield put({ type: SET_USER, payload: userResponse?.responseObject });
      } else if (userResponse?.responseObject.length === 1) {
        const selectedAssociate = userResponse?.responseObject[0];
        console.log('SELECTED ASSOCIATE +++++ >', selectedAssociate);
        yield put({ type: LOADER_START });
        yield put({
          type: SET_SELECTED_ASSOCIATE,
          payload: selectedAssociate
        });
        yield put({
          type: GET_ASSESSEE_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'all',
            headerOne: '',
            setLeftPaneAssessee: true,
            reqBody: {
              assesseeId: '0123456',
              associateId:
                selectedAssociate.associate.informationEngagement.associateTag.associateTagPrimary,
              filter: 'true',
              searchCondition: 'AND',
              search: [
                {
                  condition: 'and',
                  searchBy: [
                    {
                      dataType: 'string',
                      conditionColumn: 'id',
                      conditionValue: {
                        condition: 'eq',
                        value: {
                          from: selectedAssociate.assesseeId
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        });
        yield put({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneOne' });
        yield put({ type: GET_SIGNED_ASSESSEE_PERMISSION_SAGA });
      } else {
        //show message
      }
      yield put({
        type: SET_USER_STATE,
        payload: { stateName: 'loginUserName', value: data.payload.credential }
      });
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: {
          stateName: 'signInRes',
          value: userResponse?.responseObject
        }
      });
      yield put({
        type: SET_MIDDLEPANE_STATE,
        payload: {
          middlePaneHeader: '',
          middlePaneHeaderBadgeOne: '',
          middlePaneHeaderBadgeTwo: '',
          middlePaneHeaderBadgeThree: '',
          middlePaneHeaderBadgeFour: '',
          typeOfMiddlePaneList: '',
          scanCount: null,
          showMiddlePaneState: false
        }
      });
      yield put({ type: CLEAR_DISPLAY_PANE_THREE });
      // yield put({
      //   type: SET_SELECTED_ASSOCIATE,
      //   payload: ''
      // });
      yield put({
        type: SET_ASSESSEE_PERMISSION,
        payload: ''
      });
    }
  } catch (e) {
    console.log('ERROR==', e);
  }
}

export default function* watchSignInAssesseeSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(ASSESSEE_SIGN_IN_SAGA, workerSignInAssesseeSaga);
  yield takeLatest(GET_ASSESSEE_SIGN_IN_INFO, workerSignInAssesseeInfo);
}
