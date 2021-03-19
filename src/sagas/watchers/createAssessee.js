import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { signUpForAwsCognito } from '../../Actions/GenericActions';
import { CREATE_ASSESSEE_SAGA, LOADER_STOP, SET_ASSESSEE_INFORMATION_DATA } from '../../actionType';
import { ASSESSEE_CREATE_URL } from '../../endpoints';

const createAssesseeApi = async (requestObj) => {
  console.log(requestObj.data);
  let URL =ASSESSEE_CREATE_URL;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestObj.data)
  };
  const response = await fetch(URL, requestOptions);
  const json = await response.json();
  return json;
};

function* workerCreateAssesseeSaga(data) {
  try {
    const userResponse = yield call(createAssesseeApi, { data: data.payload });
    let validEmail='';
    console.log('IN WORKER ====>', userResponse);
    console.log('IN WORKER ====>', JSON.stringify(userResponse));
    if (userResponse.responseCode === '000')
      yield put({ type: SET_ASSESSEE_INFORMATION_DATA, payload: userResponse.responseObject[0] });
    validEmail =
      userResponse.responseObject[0].informationContact.assesseeAddressEmailPrimary
        .assesseeAddressEmail;
    if (
      userResponse.responseObject[0].informationContact.assesseeAddressEmailSecondary
        .assesseeAddressEmailCommunication
    ) {
      validEmail =
        userResponse.responseObject[0].informationContact.assesseeAddressEmailSecondary
          .assesseeAddressEmail;
    }
    signUpForAwsCognito(
      validEmail,
      userResponse.responseObject[0].informationSetup.assesseeSignInCredential,
      userResponse.responseObject[0].informationSetup.assesseeSignInPassword
    );
    console.log('loading end');
    yield put({ type: LOADER_STOP });

  } catch (e) {
    console.log('ERROR==', e);
    console.log('catch loading end');
    yield put({ type: LOADER_STOP });

  }
}

export default function* watchcreateAssesseeSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(CREATE_ASSESSEE_SAGA, workerCreateAssesseeSaga);
}
