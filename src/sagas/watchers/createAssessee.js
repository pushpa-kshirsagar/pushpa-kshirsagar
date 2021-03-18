import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { signUpForAwsCognito } from '../../Actions/GenericActions';
import { CREATE_ASSESSEE_SAGA, SET_ASSESSEE_INFORMATION } from '../../actionType';

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

function* workerCreateAssesseeSaga(data) {
  try {
    const userResponse = yield call(createAssesseeApi, { data: data.payload });
    console.log('IN WORKER ====>', userResponse);
    console.log('IN WORKER ====>', JSON.stringify(userResponse));
    if (userResponse.responseCode === '000')
      yield put({ type: SET_ASSESSEE_INFORMATION, payload: userResponse.responseObject });
    signUpForAwsCognito(
      userResponse.responseObject[0].informationContact.assesseeAddressEmailPrimary
        .assesseeAddressEmail,
      userResponse.responseObject[0].informationSetup.assesseeSignInCredential,
      userResponse.responseObject[0].informationSetup.assesseeSignInPassword
    );
  } catch (e) {
    console.log('ERROR==', e);
  }
}

export default function* watchcreateAssesseeSaga() {
  console.log('IN WATCH ====>');
  yield takeLatest(CREATE_ASSESSEE_SAGA, workerCreateAssesseeSaga);
}
