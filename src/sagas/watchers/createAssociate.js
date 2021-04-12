import { put, takeLatest, call } from 'redux-saga/effects';
import { signUpForAwsCognito } from '../../Actions/GenericActions';
import {
  CREATE_ASSOCIATE_SAGA,
  SET_ASSOCIATE_INFORMATION,
  SET_ASSESSEE_INFORMATION_DATA,
  LOADER_STOP,
  SET_DISPLAY_PANE_THREE_STATE,
  CLEAR_ASSOCIATE_INFO,
  POPUP_CLOSE,
  SET_MOBILE_PANE_STATE
} from '../../actionType';
import { ASSESSEE_CREATE_URL, ASSOCIATE_CREATE_URL } from '../../endpoints';
const createAssesseeApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL = ASSESSEE_CREATE_URL;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

const createAssociateApi = async (requestObj) => {
  console.log(requestObj.data);
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(ASSOCIATE_CREATE_URL, requestOptions);
  const json = await response.json();
  // console.log(json, '&&&&&&&&')
  // if(json.responseCode === '000'){

  // }
  return json;
  // return axios
  //   .post(URL,
  //     {
  //       data: requestObj.data,
  //       // headers: headers
  //     }
  //   )
  //   .then((res) => {
  //     console.log('-----res----');
  //     console.log(res.data);
  //     return res.data;
  //   })
  //   .catch(function (error) {
  //     console.log('-----error is given below----');
  //     console.log(error);
  //   });
};

function* workerCreateAssociateSaga(data) {
  try {
    // const userResponse = {
    //   responseCode: '000',
    //   responseObject: {
    //     id: '6050b575395ce6005c295fe0',
    //     informationBasic: {
    //       associateName: 'asdasd',
    //       associateNameVerification: false,
    //       associateDescription: '',
    //       associatePicture: '',
    //       associatePictureVerification: false,
    //       associateFlag: null
    //     },
    //     informationAlliance: null,
    //     informationAllocation: {
    //       associateGroup: { associateGroupPrimary: [], associateGroupSecondary: [] },
    //       associateManager: { associateManagerPrimary: [], associateManagerSecondary: [] },
    //       associateNode: { associateNodePrimary: [], associateNodeSecondary: [] },
    //       associateRole: { associateRolePrimary: ['3432342'], associateRoleSecondary: [] }
    //     },
    //     informationEngagement: {
    //       associateLog: null,
    //       associateStatus: 'UNCONFIRMED',
    //       associateTag: {
    //         associateTagPrimary: '6050b575395ce6005c295fe0',
    //         associateTagSecondary: null
    //       },
    //       associateTenureDate: null
    //     },
    //     informationSetup: null,
    //     informationContact: {
    //       associateAddressWebsite: null,
    //       associateAddressWebsiteVerification: false,
    //       associateAddressWorkPrimary: {
    //         associateAddressCountryRegion: '91',
    //         associateAddressProvinceState: '211',
    //         associateAddressPostcode: 'sadas',
    //         associateAddressCity: '345',
    //         associateAddress: 'dasd',
    //         associateAddressCommunication: false,
    //         associateAddressVerification: false
    //       },
    //       associateAddressWorkSecondary: null,
    //       associateTelephoneWorkPrimary: {
    //         associateTelephoneCountryRegion: '91',
    //         associateTelephoneAreaCity: '345',
    //         associateTelephoneNumber: 'dsad',
    //         associateTelephoneExtension: 'dasd',
    //         associateTelephoneCommunication: false,
    //         associateTelephoneVerification: false
    //       },
    //       associateTelephoneWorkSecondary: null
    //     },
    //     informationCredential: null,
    //     informationFramework: null,
    //     parentId: '605091f81edc573048fb467a'
    //   }
    // };
    const userResponse = yield call(createAssociateApi, { data: data.payload });
    console.log(userResponse);
    console.log("userResponse");
    if (userResponse.responseCode === '000')
      yield put({ type: SET_ASSOCIATE_INFORMATION, payload: userResponse.associate });
    // let obj = {
    //   ...data.payload,
    //   associateName: 'Boppo Technologies',
    //   associateId: userResponse.responseObject.id,
    //   associate: userResponse.responseObject
    // };

    // const assesseeRes = yield call(createAssesseeApi, { data: obj });
    // if (assesseeRes.responseCode === '000') {
    let validEmail =
      userResponse.assessee.informationContact.assesseeAddressEmailPrimary
        .assesseeAddressEmail;
    if (
      userResponse.assessee.informationContact.assesseeAddressEmailSecondary
        .assesseeAddressEmailCommunication
    ) {
      validEmail =
        userResponse.assessee.informationContact.assesseeAddressEmailSecondary
          .assesseeAddressEmail;
    }
    signUpForAwsCognito(
      validEmail,
      userResponse.assessee.informationSetup.assesseeSignInCredential,
      userResponse.assessee.informationSetup.assesseeSignInPassword
    );

    //   yield put({ type: SET_ASSESSEE_INFORMATION_DATA, payload: userResponse.responseObject }); //set asessee data
    // }
    console.log('loading end');
    yield put({
      type: SET_DISPLAY_PANE_THREE_STATE,
      payload: {
        headerOne: 'associate',
        headerOneBadgeOne: 'information',
        headerOneBadgeTwo: 'all',
        responseObject: userResponse.associate,
        createMode: 'associate',
        reviewMode: 'revise'
      }
    });
    yield put({ type: LOADER_STOP });
    yield put({ type: CLEAR_ASSOCIATE_INFO });
    yield put({ type: POPUP_CLOSE });
    yield put({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneThree' });

  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });
  }
}

export default function* watchcreateAssociateSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(CREATE_ASSOCIATE_SAGA, workerCreateAssociateSaga);
}
