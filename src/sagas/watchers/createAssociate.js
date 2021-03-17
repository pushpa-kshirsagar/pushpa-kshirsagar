import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import {
  SET_SELECTED_ASSOCIATE,
  SET_USER,
  CREATE_ASSOCIATE_SAGA,
  SET_ASSOCIATE_INFORMATION
} from '../../actionType';
import { GET_USER_URL } from '../../endpoints';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
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
    const userResponse = yield call(createAssociateApi, { data: data.payload });
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
    console.log('IN WORKER ====>', userResponse);
    console.log('IN WORKER ====>', JSON.stringify(userResponse));
    if (userResponse.responseCode === '000')
      yield put({ type: SET_ASSOCIATE_INFORMATION, payload: userResponse.responseObject });
  } catch (e) {
    console.log('ERROR==', e);
  }
}

export default function* watchcreateAssociateSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(CREATE_ASSOCIATE_SAGA, workerCreateAssociateSaga);
}
