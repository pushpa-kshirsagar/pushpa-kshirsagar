import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  POPUP_CLOSE,
  SET_POPUP_STATE,
  ASSESSEE_ASSOCIATE_LINK_LIST,
  SET_DISPLAY_TWO_SINGLE_STATE,
  LOADER_START,
  CLEAR_SIGN_ON_SINGLE_STATE,
  SET_REQUEST_OBJECT
} from '../actionType';
import { REQUIRED_ERROR_MESSAGE } from '../errorMessage';
import PopUpAdministratorSignInCredentialRevise from './PopUpAdministratorSignInCredentialRevise';
import PopUpAssociateLinkSignIn from './PopUpAssociateLinkSignIn';
const PopUpAssociateLink = () => {
  const dispatch = useDispatch();
  const { isPopUpValue, popupHeaderOne, popupHeaderOneBadgeOne } = useSelector(
    (state) => state.PopUpReducer
  );
  const { selectedAssociateInfo, leftPaneAssesseeInfo, errorResponse } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  const { signInCredential, signInCredentialSecondary, assesseeSignInPassword } = useSelector(
    (state) => state.SignOnReducer
  );
  const [errorMsg, setErrorMsg] = useState();
  const [signInOptions, setSignInOptions] = useState([]);
  const [isUserNameValid, setIsUserNameValid] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState('');
  const [isCredentialsInValid, setIsCredentialsInValid] = useState('');

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const setLinkUserNamePassword = (e) => {
    console.log('signInCredential', signInCredential);
    console.log('userName', userName);
    console.log('password', password);
    if (password === '') {
      setIsPasswordValid(REQUIRED_ERROR_MESSAGE);
    }
    if (userName === '') {
      setIsUserNameValid(REQUIRED_ERROR_MESSAGE);
    }
    if (password !== '' && userName !== '') {
      let reqObj = {
        assesseeId: selectedAssociateInfo?.assesseeId,
        associateId:
          selectedAssociateInfo?.associate?.informationEngagement.associateTag.associateTagPrimary,
        assessee: {
          assesseeSignInCredentialPrimary: userName, //assesseeSignInCredential
          assesseeSignInCredentialSecondary: signInCredential, //assesseePreferredUserName
          assesseeSignInPassword: password
        }
      };
      dispatch({ type: SET_REQUEST_OBJECT, payload: reqObj });
      setIsCredentialsInValid('in progress');
      // dispatch({ type: LOADER_START });
      dispatch({
        type: SET_DISPLAY_TWO_SINGLE_STATE,
        payload: { stateName: 'errorResponse', value: '' }
      });
      dispatch({ type: ASSESSEE_ASSOCIATE_LINK_LIST, payload: { request: reqObj } });
    }
  };

  useEffect(() => {
    setPassword('');
    setUserName('');
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'errorResponse', value: '' }
    });
    let preferedUserNames = [];
    let constactInfo = leftPaneAssesseeInfo.informationContact;
    if (constactInfo) {
      if (constactInfo?.assesseeAddressEmailPrimary?.assesseeAddressEmail !== '')
        preferedUserNames.push(constactInfo?.assesseeAddressEmailPrimary?.assesseeAddressEmail);
      if (constactInfo?.assesseeAddressEmailSecondary?.assesseeAddressEmail !== '')
        preferedUserNames.push(constactInfo?.assesseeAddressEmailSecondary?.assesseeAddressEmail);
      if (constactInfo?.assesseeTelephoneMobilePrimary?.assesseeTelephoneNumber !== '')
        preferedUserNames.push(
          constactInfo?.assesseeTelephoneMobilePrimary?.assesseeTelephoneNumber
        );
      if (constactInfo?.assesseeTelephoneMobileSecondary?.assesseeTelephoneNumber !== '')
        preferedUserNames.push(
          constactInfo?.assesseeTelephoneMobileSecondary?.assesseeTelephoneNumber
        );
    }
    setSignInOptions(preferedUserNames);
  }, [leftPaneAssesseeInfo]);
  const onClickSetPreUSerName = () => {
    if (signInCredential === '') {
      setErrorMsg(REQUIRED_ERROR_MESSAGE);
    } else {
      setPassword('');
      setUserName('');
      setIsCredentialsInValid('');
      dispatch({
        type: SET_POPUP_STATE,
        payload: {
          popupHeaderOne: 'associate',
          popupHeaderOneBadgeOne: 'link',
          popupHeaderOneBadgeTwo: '',
          isPopUpValue: 'SIGNIN_POPUP',
          popupOpenType: 'secondary',
          secondaryOptionCheckValue: '',
          popupContentArrValue: [],
          popupMode: 'ASSOCIATE_LINK'
        }
      });
    }
  };
  return (
    <div>
      <PopUpAdministratorSignInCredentialRevise
        isActive={isPopUpValue === 'REVISE_CREDENTIAL_SIGNIN_POPUP'}
        headerPanelColour={'genericOne'}
        headerOne={popupHeaderOne}
        headerOneBadgeOne={popupHeaderOneBadgeOne}
        signInOptions={signInOptions}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
        onClick={() => {
          onClickSetPreUSerName();
        }}
        onClose={() => {
          dispatch({ type: CLEAR_SIGN_ON_SINGLE_STATE });
          dispatch({ type: POPUP_CLOSE });
        }}
      />
      <PopUpAssociateLinkSignIn
        isActive={isPopUpValue === 'SIGNIN_POPUP'}
        headerPanelColour={'genericOne'}
        headerOne={popupHeaderOne}
        headerOneBadgeOne={popupHeaderOneBadgeOne}
        setIsPasswordValid={setIsPasswordValid}
        setIsUserNameValid={setIsUserNameValid}
        isUserNameValid={isUserNameValid}
        isPasswordValid={isPasswordValid}
        setUserName={setUserName}
        userName={userName}
        password={password}
        errorMsg={errorResponse.responseCode}
        setPassword={setPassword}
        setIsCredentialsInValid={setIsCredentialsInValid}
        isCredentialsInValid={isCredentialsInValid}
        onClick={() => {
          //TODO: Display associate list in displayPaneTwo
          setLinkUserNamePassword();
        }}
        onClose={() => {
          dispatch({ type: CLEAR_SIGN_ON_SINGLE_STATE });
          dispatch({ type: POPUP_CLOSE });
        }}
      />
    </div>
  );
};

export default PopUpAssociateLink;
