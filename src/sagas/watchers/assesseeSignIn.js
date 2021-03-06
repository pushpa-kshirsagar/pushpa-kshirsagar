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
  SET_ASSESSEE_REVISE_PASSWORD,
  LOADER_STOP,
  POPUP_CLOSE,
  SET_POPUP_VALUE,
  GET_SIGNED_ASSESEE_NOTIFICATION
} from '../../actionType';
import {
  ASSESSEE_SIGN_IN_URL,
  ASSESSEE_SIGN_IN_INFO_URL,
  ASSESSEE_CHANGE_PASSWORD_URL,
  SIGNED_ASSESSEE_NOTIFICATION_URL
} from '../../endpoints';
import Store from '../../store';

const apiCallFunction = async (requestObj) => {
  console.log(requestObj.data);
  console.log('requestObj.data');
  // let URL = ASSESSEE_SIGN_IN_URL;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(requestObj.URL, requestOptions);
  const json = await response.json();
  console.log(response);
  console.log('response');
  return json;
};

function* workerSignInAssesseeSaga(data) {
  try {
    const userResponse = yield call(apiCallFunction, {
      data: data.payload,
      URL: ASSESSEE_SIGN_IN_URL
    });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      console.log('SIGN IN ASSESSEE=======>', userResponse);
      localStorage.setItem('token', userResponse?.responseObject?.cognitoResponse?.accessToken);
      localStorage.setItem(
        'idToken',
        userResponse?.responseObject?.cognitoResponse?.tokenType +
          ' ' +
          userResponse?.responseObject?.cognitoResponse?.idToken
      );
      localStorage.setItem('assesseeId', data.payload.credential);
      localStorage.setItem('assessmentItem', '[]');
      localStorage.setItem('navigationItem', '[]');
      localStorage.setItem(
        'refreshToken',
        userResponse?.responseObject?.cognitoResponse?.refreshToken
      );
      if (userResponse?.responseObject?.signInResponse.length > 1) {
        yield put({ type: SET_USER, payload: userResponse?.responseObject?.signInResponse });
      } else if (userResponse?.responseObject?.signInResponse.length === 1) {
        const selectedAssociate = userResponse?.responseObject?.signInResponse[0];
        localStorage.setItem(
          'parentId',
          userResponse?.responseObject?.signInResponse[0]?.associate?.informationFramework
            ?.associateAscendantPrimary || null
        );

        console.log('SELECTED ASSOCIATE +++++ >', selectedAssociate);
        yield put({ type: LOADER_START });
        yield put({
          type: SET_SELECTED_ASSOCIATE,
          payload: selectedAssociate
        });
        yield put({ type: LOADER_START });
        yield put({
          type: GET_ASSESSEE_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'all',
            headerOne: '',
            setLeftPaneAssessee: true,
            reqBody: {
              assesseeId: selectedAssociate.assesseeId,
              setLeftPaneAssessee:true,
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
        // yield put({ type: GET_SIGNED_ASSESSEE_PERMISSION_SAGA });
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
      yield put({
        type: SET_USER_STATE,
        payload: { stateName: 'assesseeConfirmStatus', value: null }
      });
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
const revisePasswordApi = async (requestObj) => {
  console.log('requestObj.data');
  console.log(requestObj.data);
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: localStorage.getItem('token')
    }),
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(requestObj.URL, requestOptions);
  const json = await response.json();
  console.log('json.data', json);
  console.log('response.data', response);
  console.log(requestObj.data);
  return json;
};
function* workerSetPassword(data) {
  try {
    const response = yield call(revisePasswordApi, {
      data: data.payload.reqObj,
      URL: ASSESSEE_CHANGE_PASSWORD_URL
    });
    console.log('response.responseCode', response);
    if (response.responseCode === '000') {
      console.log('response.responseCode', response.responseCode);
      yield put({ type: LOADER_STOP });
      yield put({
        type: SET_USER_STATE,
        payload: { stateName: 'assesseeConfirmStatus', value: 'passwordReviseSuccess' }
      });
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: response.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }
    yield put({ type: POPUP_CLOSE });
    yield put({ type: LOADER_STOP });
  } catch (error) {
    yield put({ type: LOADER_STOP });
  }
}
function* getSignedAsseseeNotificationSaga(data) {
  try {
    yield put({ type: LOADER_START });
    const response = yield call(revisePasswordApi, {
      data: data.payload.reqBody,
      URL: SIGNED_ASSESSEE_NOTIFICATION_URL
    });
    console.log('res', Store.getState().DisplayPaneTwoReducer.leftPaneAssesseeInfo);
    let b = Store.getState().DisplayPaneTwoReducer.leftPaneAssesseeInfo;
    console.log('BBB', b);

    if (response.responseCode === '000') {
      let newB = { ...b, notifications: response.responseObject };
      console.log('newBbb', newB);
      yield put({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: {
          stateName: 'leftPaneAssesseeInfo',
          value: newB
        }
      });
    } else {
      yield put({
        type: SET_POPUP_VALUE,
        payload: { isPopUpValue: response.responseMessage, popupMode: 'responseErrorMsg' }
      });
    }

    yield put({ type: POPUP_CLOSE });
    yield put({ type: LOADER_STOP });
  } catch (error) {
    yield put({ type: LOADER_STOP });
  }
}
function* workerSignInAssesseeInfo(data) {
  try {
    const userResponse = yield call(assesseeSignInInfoApi, { data: data.payload });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      if (userResponse?.responseObject.length > 1) {
        yield put({ type: SET_USER, payload: userResponse?.responseObject });
        yield put({ type: LOADER_STOP });
      } else if (userResponse?.responseObject.length === 1) {
        const selectedAssociate = userResponse?.responseObject[0];
        console.log('SELECTED ASSOCIATE +++++ >', selectedAssociate);
        yield put({ type: LOADER_START });
        yield put({
          type: SET_SELECTED_ASSOCIATE,
          payload: selectedAssociate
        });
        yield put({ type: LOADER_START });
        yield put({
          type: GET_ASSESSEE_INFO_SAGA,
          payload: {
            secondaryOptionCheckValue: 'all',
            headerOne: '',
            setLeftPaneAssessee: true,
            reqBody: {
              assesseeId: selectedAssociate.assesseeId,
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
        yield put({ type: LOADER_STOP })
        yield put({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneOne' });
        // yield put({ type: GET_SIGNED_ASSESSEE_PERMISSION_SAGA });
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
    // localStorage.setItem('token', null);
    // localStorage.setItem('assesseeId', null);
    // localStorage.setItem('refreshToken', null);
  }
}

export default function* watchSignInAssesseeSaga() {
  yield takeLatest(ASSESSEE_SIGN_IN_SAGA, workerSignInAssesseeSaga);
  yield takeLatest(GET_ASSESSEE_SIGN_IN_INFO, workerSignInAssesseeInfo);
  yield takeLatest(SET_ASSESSEE_REVISE_PASSWORD, workerSetPassword);
  yield takeLatest(GET_SIGNED_ASSESEE_NOTIFICATION, getSignedAsseseeNotificationSaga);
}
