import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_DISPLAY_PANE_THREE_STATE,
  LOADER_STOP,
  GET_ASSESSEE_INFO_SAGA,
  SET_DISPLAY_TWO_SINGLE_STATE,
  UPDATE_ASSESSEE_BASIC_INFO,
  UPDATE_ASSESSEE_PERSONAL_INFO,
  UPDATE_ASSESSEE_ENGAGEMENT_INFO,
  UPDATE_ASSESSEE_CONTACT_INFO,
  SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
  UPDATE_ASSESSEE_SETUP_PRIMARY_INFO,
  SET_ASSESSEE_CREATE_SINGLE_STATE,
  ASSESSEE_INFO_REVISE_SAGA,
  SET_DISPLAY_PANE_THREE_REVIEW_MODE,
  ASSESSEE_REVIEW_DISTINCT_SAGA,
  SET_POPUP_VALUE
} from '../../actionType';
import { ASSESSEE_INFO_REVISE_URL, ASSESSEE_REVIEW_INFO_URL } from '../../endpoints';
import Store from '../../store';

const assesseesReviewInfoApi = async (requestObj) => {
  let URL = ASSESSEE_REVIEW_INFO_URL;
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

function* workerReviewInfoAssesseeSaga(data) {
  try {
    const userResponse = yield call(assesseesReviewInfoApi, { data: data.payload.reqBody });
    // const userResponse ={responseCode:'000',countTotal:30}
    if (userResponse.responseCode === '000') {
      // console.log('ASSESSEE_REVIEW_INFO=======>', userResponse);
      const { isReviseMode = false } = data.payload;
      if (data.payload.setLeftPaneAssessee) {
        yield put({
          type: SET_DISPLAY_TWO_SINGLE_STATE,
          payload: {
            stateName: 'leftPaneAssesseeInfo',
            value: userResponse?.responseObject[0]
          }
        });
      } else {
        const {
          informationAllocation,
          informationBasic,
          informationContact,
          informationEngagement,
          informationPersonal,
          informationSetup
        } = userResponse.responseObject[0];
        yield put({
          type: SET_DISPLAY_PANE_THREE_STATE,
          payload: {
            headerOne: data.payload.headerOne,
            headerOneBadgeOne: 'information',
            headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
            responseObject: userResponse.responseObject[0],
            reviewMode: isReviseMode ? 'revise' : ''
          }
        });
        if (
          informationAllocation &&
          informationAllocation?.assesseeGroup?.assesseeGroupPrimary &&
          informationAllocation?.assesseeGroup?.assesseeGroupPrimary.length > 0
        ) {
          let tempArr = informationAllocation.assesseeGroup.assesseeGroupPrimary.map((ob) => ob.id);
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeGroup',
              actualStateName: 'assesseeGroupPrimary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeGroup',
              actualStateName: 'assesseeGroupPrimary',
              value: []
            }
          });
        }

        if (
          informationAllocation &&
          informationAllocation?.assesseeRole?.assesseeRolePrimary &&
          informationAllocation?.assesseeRole?.assesseeRolePrimary.length > 0
        ) {
          let tempArr = informationAllocation.assesseeRole.assesseeRolePrimary.map((ob) => ob.id);
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeRole',
              actualStateName: 'assesseeRolePrimary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeRole',
              actualStateName: 'assesseeRolePrimary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.assesseeType?.assesseeTypePrimary &&
          informationAllocation?.assesseeType?.assesseeTypePrimary.length > 0
        ) {
          let tempArr = informationAllocation.assesseeType.assesseeTypePrimary.map((ob) => ob.id);
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeType',
              actualStateName: 'assesseeTypePrimary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeType',
              actualStateName: 'assesseeTypePrimary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.assesseeNode?.assesseeNodePrimary &&
          informationAllocation?.assesseeNode?.assesseeNodePrimary.length > 0
        ) {
          let tempArr = informationAllocation.assesseeNode.assesseeNodePrimary.map((ob) => ob.id);
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeNode',
              actualStateName: 'assesseeNodePrimary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeNode',
              actualStateName: 'assesseeNodePrimary',
              value: []
            }
          });
        }

        if (
          informationAllocation &&
          informationAllocation?.assesseeGroup?.assesseeGroupSecondary &&
          informationAllocation?.assesseeGroup?.assesseeGroupSecondary.length > 0
        ) {
          let tempArr = informationAllocation.assesseeGroup.assesseeGroupSecondary.map(
            (ob) => ob.id
          );
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeGroup',
              actualStateName: 'assesseeGroupSecondary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeGroup',
              actualStateName: 'assesseeGroupSecondary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.assesseeNode?.assesseeNodeSecondary &&
          informationAllocation?.assesseeNode?.assesseeNodeSecondary.length > 0
        ) {
          let tempArr = informationAllocation.assesseeNode.assesseeNodeSecondary.map((ob) => ob.id);
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeNode',
              actualStateName: 'assesseeNodeSecondary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeNode',
              actualStateName: 'assesseeNodeSecondary',
              value: []
            }
          });
        }

        if (
          informationAllocation &&
          informationAllocation?.assesseeRole?.assesseeRoleSecondary &&
          informationAllocation?.assesseeRole?.assesseeRoleSecondary.length > 0
        ) {
          let tempArr = informationAllocation.assesseeRole.assesseeRoleSecondary.map((ob) => ob.id);
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeRole',
              actualStateName: 'assesseeRoleSecondary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeRole',
              actualStateName: 'assesseeRoleSecondary',
              value: []
            }
          });
        }
        if (
          informationAllocation &&
          informationAllocation?.assesseeType?.assesseeTypeSecondary &&
          informationAllocation?.assesseeType?.assesseeTypeSecondary.length > 0
        ) {
          let tempArr = informationAllocation.assesseeType.assesseeTypeSecondary.map((ob) => ob.id);
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeType',
              actualStateName: 'assesseeTypeSecondary',
              value: tempArr
            }
          });
        } else {
          yield put({
            type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'assesseeType',
              actualStateName: 'assesseeTypeSecondary',
              value: []
            }
          });
        }
        // yield put({
        //   type: SET_ASSESSEE_DYNAMIC_SINGLE_STATE,
        //   payload: {
        //     stateName: 'assesseeGroup',
        //     actualStateName: 'assesseeGroupPrimary',
        //     value: roleArr
        //   }
        // });
        if (informationContact?.assesseeAddressEmailPrimary?.assesseeAddressEmailCommunication) {
          yield put({
            type: SET_ASSESSEE_CREATE_SINGLE_STATE,
            payload: { stateName: 'tempCommunication', value: 'email address (primary)' }
          });
        }
        if (informationContact?.assesseeAddressEmailSecondary?.assesseeAddressEmailCommunication) {
          yield put({
            type: SET_ASSESSEE_CREATE_SINGLE_STATE,
            payload: { stateName: 'tempCommunication', value: 'email address (secondary)' }
          });
        }
        if (informationContact?.assesseeAddressHomePrimary?.assesseeAddressCommunication) {
          yield put({
            type: SET_ASSESSEE_CREATE_SINGLE_STATE,
            payload: { stateName: 'tempAddressCommunication', value: 'home address primary' }
          });
        }
        if (informationContact?.assesseeAddressHomeSecondary?.assesseeAddressCommunication) {
          yield put({
            type: SET_ASSESSEE_CREATE_SINGLE_STATE,
            payload: { stateName: 'tempAddressCommunication', value: 'home address secondary' }
          });
        }
        if (informationContact?.assesseeAddressWorkPrimary?.assesseeAddressCommunication) {
          yield put({
            type: SET_ASSESSEE_CREATE_SINGLE_STATE,
            payload: { stateName: 'tempAddressCommunication', value: 'work address primary' }
          });
        }
        if (informationContact?.assesseeAddressWorkSecondary?.assesseeAddressCommunication) {
          yield put({
            type: SET_ASSESSEE_CREATE_SINGLE_STATE,
            payload: { stateName: 'tempAddressCommunication', value: 'work address secondary' }
          });
        }
        if (informationContact?.assesseeTelephoneHomePrimary?.assesseeTelephoneCommunication) {
          yield put({
            type: SET_ASSESSEE_CREATE_SINGLE_STATE,
            payload: { stateName: 'tempTelephoneCommunication', value: 'home telephone primary' }
          });
        }
        if (informationContact?.assesseeTelephoneHomeSecondary?.assesseeTelephoneCommunication) {
          yield put({
            type: SET_ASSESSEE_CREATE_SINGLE_STATE,
            payload: { stateName: 'tempTelephoneCommunication', value: 'home telephone secondary' }
          });
        }
        //
        if (informationContact?.assesseeTelephoneWorkPrimary?.assesseeTelephoneCommunication) {
          yield put({
            type: SET_ASSESSEE_CREATE_SINGLE_STATE,
            payload: { stateName: 'tempTelephoneCommunication', value: 'work telephone primary' }
          });
        }
        if (informationContact?.assesseeTelephoneWorkSecondary?.assesseeTelephoneCommunication) {
          yield put({
            type: SET_ASSESSEE_CREATE_SINGLE_STATE,
            payload: { stateName: 'tempTelephoneCommunication', value: 'work telephone secondary' }
          });
        }
        //
        if (informationContact?.assesseeTelephoneMobilePrimary?.assesseeTelephoneCommunication) {
          yield put({
            type: SET_ASSESSEE_CREATE_SINGLE_STATE,
            payload: { stateName: 'tempTelephoneCommunication', value: 'mobile telephone primary' }
          });
        }
        if (informationContact?.assesseeTelephoneMobileSecondary?.assesseeTelephoneCommunication) {
          yield put({
            type: SET_ASSESSEE_CREATE_SINGLE_STATE,
            payload: {
              stateName: 'tempTelephoneCommunication',
              value: 'mobile telephone secondary'
            }
          });
        }
        yield put({ type: UPDATE_ASSESSEE_BASIC_INFO, payload: informationBasic });
        yield put({ type: UPDATE_ASSESSEE_PERSONAL_INFO, payload: informationPersonal });
        yield put({ type: UPDATE_ASSESSEE_ENGAGEMENT_INFO, payload: informationEngagement });
        yield put({ type: UPDATE_ASSESSEE_CONTACT_INFO, payload: informationContact });
        yield put({ type: UPDATE_ASSESSEE_SETUP_PRIMARY_INFO, payload: informationSetup });
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

const assesseesReviseInfoApi = async (requestObj) => {
  let URL = ASSESSEE_INFO_REVISE_URL;
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

function* workerReviseInfoAssesseeSaga(data) {
  try {
    console.log('reviewLsit', data);
    const userResponse = yield call(assesseesReviseInfoApi, { data: data.payload.reqBody });
    if (userResponse.responseCode === '000') {
      if (data.payload.secondaryOptionCheckValue !== '') {
        yield put({
          type: SET_DISPLAY_PANE_THREE_STATE,
          payload: {
            headerOne: data.payload.headerOne,
            headerOneBadgeOne: 'information',
            headerOneBadgeTwo: data.payload.secondaryOptionCheckValue,
            responseObject: userResponse.responseObject[0]
          }
        });
        yield put({
          type: SET_DISPLAY_PANE_THREE_REVIEW_MODE,
          payload: 'review'
        });
      }
      if (Store.getState().PopUpReducer.cardValue === 'Card') {
        yield put({
          type: SET_DISPLAY_TWO_SINGLE_STATE,
          payload: {
            stateName: 'leftPaneAssesseeInfo',
            value: userResponse?.responseObject[0]
          }
        });
        yield put({ type: LOADER_STOP });
      } else {
        // refreshMiddlePaneList(ASSESSEE_REVIEW_DISTINCT_SAGA, 'assessees');
        yield put({
          type: SET_DISPLAY_TWO_SINGLE_STATE,
          payload: { stateName: 'reviewListDistinctData', value: [] }
        });
        yield put({
          type: ASSESSEE_REVIEW_DISTINCT_SAGA,
          payload: {
            HeaderOne: 'assessees',
            request: Store.getState().DisplayPaneTwoReducer.reviewListReqObj,
            BadgeOne: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeOne,
            BadgeTwo: Store.getState().DisplayPaneTwoReducer.middlePaneHeaderBadgeTwo,
            middlePaneSelectedValue: Store.getState().DisplayPaneTwoReducer.middlePaneSelectedValue
          }
        });
      }
      // if (Store.getState().PopUpReducer.cardValue === 'NoCard') {

      // }
    } else {
      console.log('loading end');
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

export default function* watchReviewInfoAssesseeSaga() {
  yield takeLatest(GET_ASSESSEE_INFO_SAGA, workerReviewInfoAssesseeSaga);
  yield takeLatest(ASSESSEE_INFO_REVISE_SAGA, workerReviseInfoAssesseeSaga);
}
