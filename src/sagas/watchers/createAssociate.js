import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { signUpForAwsCognito } from '../../Actions/GenericActions';
import {
  SET_SELECTED_ASSOCIATE,
  SET_USER,
  CREATE_ASSOCIATE_SAGA,
  SET_ASSOCIATE_INFORMATION,
  CREATE_ASSESSEE_SAGA
} from '../../actionType';
import { GET_USER_URL } from '../../endpoints';
import UserPool from '../../UserPool';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};
const createAssesseeApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL =
    'https://b5qcx708x7.execute-api.ap-south-1.amazonaws.com/dev/insightguru/api/assesseeDistinct/create';
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
  let URL =
    'https://xgis5z7671.execute-api.ap-south-1.amazonaws.com/dev/insightguru/api/associateDistinct/create';
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
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
    console.log('IN WORKER ====>', userResponse);
    console.log('IN WORKER ====>', JSON.stringify(userResponse));
    if (userResponse.responseCode === '000')
      yield put({ type: SET_ASSOCIATE_INFORMATION, payload: userResponse.responseObject });
    let obj = {
      ...data.payload,
      associateId: userResponse.responseObject.id
    };
    console.log('obj', obj);
    // yield put({ type: CREATE_ASSESSEE_SAGA, payload: obj });
    const assesseeRes = yield call(createAssesseeApi, { data: obj });
    if (assesseeRes.responseCode === '000') {
      signUpForAwsCognito(
        'pushpa.k@boppotechnologies.com',
        assesseeRes.responseObject[0].informationSetup.assesseeSignInCredential,
        assesseeRes.informationSetup.assesseeSignInPassword
      );
      // let attributeList = [];
      // const dataEmail = {
      //   Name: 'email',
      //   Value: 'pushpa.k@boppotechnologies.com' // 'shivam.s@boppotechnologies.com' //'pushpa.k@boppotechnologies.com'
      // };
      // const attributeEmail = new CognitoUserAttribute(dataEmail);
      // attributeList.push(attributeEmail);
      // console.log(assesseeRes.responseObject[0].informationSetup.assesseeSignInCredential)
      // console.log("AWSCall")
      // UserPool.signUp(
      //   assesseeRes.responseObject[0].informationSetup.assesseeSignInCredential, //username//shivam-sharma //pushpa-boppo //pushpa-admin
      //   'Admin@123', //password   assesseeInformationData.informationSetup.assesseeSignInPassword
      //   attributeList, // required attribute list
      //   null,
      //   (error, data) => {
      //     console.log('SIGN-ON DATA===>', data);
      //     console.log('SIGN-ON ERROR===>', error);
      //   }
      // );
    }
  } catch (e) {
    console.log('ERROR==', e);
  }
}

export default function* watchcreateAssociateSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(CREATE_ASSOCIATE_SAGA, workerCreateAssociateSaga);
}
