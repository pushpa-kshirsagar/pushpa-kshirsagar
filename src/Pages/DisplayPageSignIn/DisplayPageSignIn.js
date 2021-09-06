import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';
import iGuruLogo from '../../images/iglogo1.png';
import './DisplayPageSignIn.css';
import { FormControl, IconButton, InputLabel } from '@material-ui/core';
import InputField from '../../Atoms/InputField/InputField';
import Label from '../../Atoms/Label/Label';
import { CognitoUser } from 'amazon-cognito-identity-js';
import Pool from '../../UserPool';
import { AccountContext } from '../../Account';
import {
  INCORRECT_INFORMATION_ERROR_MESSAGE,
  INFORMATION_MISMATCHED_ERROR_MESSAGE,
  INVALID_AUTH_CODE_ERROR_MESSAGE,
  INVALID_PASSWORD_ERROR_MESSAGE,
  REQUIRED_ERROR_MESSAGE
} from '../../errorMessage';
import { useDispatch, useSelector } from 'react-redux';
import {
  ASSESSEE_SIGN_IN_SAGA,
  RESET_ALL_REDUCER,
  SET_SIGN_IN_STATUS,
  SEND_AUTH_CODE_FORGOT_PASS,
  FORGOT_PASSWORD_SAGA,
  SEND_FORGOT_CREDENTIAL_SAGA,
  LOADER_START,
  SET_DISPLAY_TWO_SINGLE_STATE
} from '../../actionType';
import LoadingComponent from '../../PopUpInformation/LoadingComponent';
import { Fragment } from 'react';
import { SIGN_IN_URL } from '../../endpoints';
import SelectField from '../../Atoms/SelectField/SelectField';
import ReviewList from '../../Molecules/ReviewList/ReviewList';

const DisplayPageSignIn = () => {
  const bgImg = './Image/bg.jpg';
  const style = {
    backgroundPosition: '50% 50%',
    backgroundImage: `url(${bgImg})`,
    backgroundSize: 'cover'
  };
  // const { authenticate } = useContext(AccountContext);
  const history = useHistory();
  const [stage, setStage] = useState('signIn'); // 'forgotPassword' 'confirmPassword'
  const [isCredentialsInValid, setIsCredentialsInValid] = useState('');
  const [isUserNameValid, setIsUserNameValid] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [forgotCredential, setForgotCredential] = useState('');
  const [forgotCredentialError, setForgotCredentialError] = useState('');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [revisedPassword, setRevisedPassword] = useState('');
  const [revisedPasswordError, setRevisedPasswordError] = useState('');
  const [confirmRevisedPassword, setConfirmRevisedPassword] = useState('');
  const [confirmRevisedPasswordError, setConfirmRevisedPasswordError] = useState('');
  const [credentialOptionError, setCredentialOptionError] = useState('');
  const [credentialOption, setCredentialOption] = useState('');
  const dispatch = useDispatch();
  const { assesseeSignInStatus } = useSelector((state) => state.UserReducer);
  const { credentialOptionArr, middlePaneSelectedValue } = useSelector(
    (state) => state.DisplayPaneTwoReducer
  );
  const { isLoading } = useSelector((state) => state.LoaderReducer);

  useEffect(() => {
    console.log('assesseeSignInStatus',assesseeSignInStatus);
    if (assesseeSignInStatus === 'success') {
      setIsCredentialsInValid('');
      let path = `/dashboard`;
      history.push(path);
      window.location.reload();
      dispatch({ type: RESET_ALL_REDUCER });
      dispatch({ type: SET_SIGN_IN_STATUS, payload: '' });
    }
    if (assesseeSignInStatus === 'confirmUSer') {
      setIsCredentialsInValid('');
      let path = '/confirm/' + userName;
      history.push(path);
      dispatch({ type: SET_SIGN_IN_STATUS, payload: '' });
    }
    if (assesseeSignInStatus === 'error') {
      setIsCredentialsInValid(INCORRECT_INFORMATION_ERROR_MESSAGE);
      dispatch({ type: SET_SIGN_IN_STATUS, payload: '' });
    }
    if (assesseeSignInStatus === 'AUTH_CODE_SEND') {
      setStage('confirmPassword');
      dispatch({ type: SET_SIGN_IN_STATUS, payload: '' });
      setIsCredentialsInValid('');
    }
    if (assesseeSignInStatus === 'CREDENTIAL_SEND') {
      if (credentialOptionArr.length > 0) {
        setStage('credentialOptions');
        dispatch({ type: SET_SIGN_IN_STATUS, payload: '' });
        setIsCredentialsInValid('');
      } else {
        setIsCredentialsInValid(INCORRECT_INFORMATION_ERROR_MESSAGE);
      }
    }
    if (assesseeSignInStatus === 'CODE 400') {
      setCodeError(INCORRECT_INFORMATION_ERROR_MESSAGE);
      dispatch({ type: SET_SIGN_IN_STATUS, payload: '' });
      setIsCredentialsInValid('');
    }
    if (assesseeSignInStatus === 'CODE 001') {
      setForgotCredentialError(INCORRECT_INFORMATION_ERROR_MESSAGE);
      dispatch({ type: SET_SIGN_IN_STATUS, payload: '' });
      setIsCredentialsInValid('');
    }
    if (assesseeSignInStatus === 'PASSWORD_UPDATED') {
      let path = SIGN_IN_URL;
      history.push(path);
      window.location.reload();
    }
  }, [assesseeSignInStatus, history]);
  console.log('assesseeSignInStatus', assesseeSignInStatus);
  console.log('credentialOptionArr', credentialOptionArr);

  const onClickSignIn = () => {
    setIsCredentialsInValid('in progress');
    if (userName && password) {
      setIsPasswordValid('');
      setIsUserNameValid('');
      dispatch({
        type: ASSESSEE_SIGN_IN_SAGA,
        payload: {
          credential: userName, // "607888f3226fc201a533a924",
          password: password //"NG36#:dqMO"
        }
      });
      // authenticate(userName, password)
      //   .then((data) => {
      //     setIsCredentialsInValid('');
      //     console.log('OnSuccess===>', data);
      //     let path = `/dashboard`;
      //     history.push(path);
      //   })
      //   .catch((err) => {
      //     setIsCredentialsInValid(INCORRECT_INFORMATION_ERROR_MESSAGE);
      //     console.log('onFailure===>', err);
      //   });
    } else {
      setIsCredentialsInValid('');
      if (userName === '') {
        setIsUserNameValid(REQUIRED_ERROR_MESSAGE);
      } else {
        setIsUserNameValid('');
      }
      if (password === '') {
        setIsPasswordValid(REQUIRED_ERROR_MESSAGE);
      } else {
        setIsPasswordValid('');
      }
    }
  };

  const getUser = (Username) => {
    return new CognitoUser({ Username, Pool });
  };
  const sendCode = () => {
    console.log('sendCode+++++++', forgotCredential, credentialOption);
    if (forgotCredential === '') {
      setForgotCredentialError(REQUIRED_ERROR_MESSAGE);
      // return;
    }
    if (credentialOption === '') {
      setCredentialOptionError(REQUIRED_ERROR_MESSAGE);
      // return;
    }
    if (credentialOption === 'password' && forgotCredential !== '' && credentialOption !== '') {
      // dispatch({ type: LOADER_START });
      setIsCredentialsInValid('in progress');
      dispatch({
        type: SEND_AUTH_CODE_FORGOT_PASS,
        payload: { assesseeSignInCredential: forgotCredential }
      });
      setForgotCredentialError('');
    }
    if (credentialOption === 'credential' && forgotCredential !== '' && credentialOption !== '') {
      // dispatch({ type: LOADER_START });
      setIsCredentialsInValid('in progress');
      dispatch({ type: SEND_FORGOT_CREDENTIAL_SAGA, payload: { assesseeEmail: forgotCredential } });
    }
  };

  const resetPassword = () => {
    console.log('resetPassword+++++++');
    const passwordRegExp = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    if (code !== '' && revisedPassword !== '' && confirmRevisedPassword !== '') {
      if (!passwordRegExp.test(revisedPassword)) {
        setRevisedPasswordError(INVALID_PASSWORD_ERROR_MESSAGE);
        setConfirmRevisedPasswordError(INVALID_PASSWORD_ERROR_MESSAGE);
        return;
      }
      if (revisedPassword === confirmRevisedPassword) {
        setRevisedPasswordError('');
        setConfirmRevisedPasswordError('');
        setCodeError('');
        //code for forgot password
        dispatch({ type: LOADER_START });
        dispatch({
          type: FORGOT_PASSWORD_SAGA,
          payload: {
            assesseeSignInCredential: forgotCredential,
            assesseeSignInPassword: confirmRevisedPassword,
            assesseeAuthenticationCode: code
          }
        });
        // getUser(forgotCredential).confirmPassword(code, revisedPassword, {
        //   onSuccess: (data) => {
        //     console.log('onSuccess IN Confirm PASSWORD', data);
        //     setStage('signIn');
        //   },
        //   onFailure: (err) => {
        //     console.log('onFailure IN Confirm PASSWORD', err);
        //   }
        // });
        console.log('========', code, revisedPassword, confirmRevisedPassword);
      } else {
        setRevisedPasswordError(INFORMATION_MISMATCHED_ERROR_MESSAGE);
        setConfirmRevisedPasswordError(INFORMATION_MISMATCHED_ERROR_MESSAGE);
      }
    } else {
      if (code === '') {
        setCodeError(REQUIRED_ERROR_MESSAGE);
      }
      if (revisedPassword === '') {
        setRevisedPasswordError(REQUIRED_ERROR_MESSAGE);
      }
      if (confirmRevisedPassword === '') {
        setConfirmRevisedPasswordError(REQUIRED_ERROR_MESSAGE);
      }
      console.log('ALL Field requred');
    }
  };
  const resetCredential = () => {
    setStage('signIn');
    setUserName(middlePaneSelectedValue);
    setPassword('');
    setCredentialOption('');
    setForgotCredential('');
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'middlePaneSelectedValue', value: '' }
    });
  };
  const onClickList = (e) => {
    dispatch({
      type: SET_DISPLAY_TWO_SINGLE_STATE,
      payload: { stateName: 'middlePaneSelectedValue', value: e.currentTarget.getAttribute('tag') }
    });
  };
  return (
    <Fragment>
      <LoadingComponent isActive={isLoading} />

      <div style={style} className="signin-container">
        <div className="form-box">
          <div className="form-header">
            <div className="inner-form-header">
              <div className="form-header-logo-container">
                <img className="form-header-logo-img" src={iGuruLogo} alt="iGuru logo" />
              </div>
              <div>
                {stage === 'signIn' && (
                  <IconButton className="form-icon-style">
                    <SendIcon style={{ height: 20, width: 20 }} onClick={onClickSignIn} />
                  </IconButton>
                )}
                {stage === 'forgotPassword' && (
                  <>
                    <IconButton
                      onClick={() => {
                        setStage('signIn');
                        setIsUserNameValid('');
                        setIsPasswordValid('');
                      }}
                      className="form-icon-style rotate-icon"
                    >
                      <SendIcon style={{ height: 20, width: 20 }} />
                    </IconButton>
                    <IconButton className="form-icon-style">
                      <SendIcon style={{ height: 20, width: 20 }} onClick={sendCode} />
                    </IconButton>
                  </>
                )}
                {stage === 'confirmPassword' && (
                  <>
                    <IconButton
                      onClick={() => {
                        setStage('forgotPassword');
                      }}
                      className="form-icon-style rotate-icon"
                    >
                      <SendIcon style={{ height: 20, width: 20 }} />
                    </IconButton>
                    <IconButton className="form-icon-style">
                      <SendIcon style={{ height: 20, width: 20 }} onClick={resetPassword} />
                    </IconButton>
                  </>
                )}
                {stage === 'credentialOptions' && (
                  <>
                    <IconButton
                      onClick={() => {
                        setStage('forgotPassword');
                      }}
                      className="form-icon-style rotate-icon"
                    >
                      <SendIcon style={{ height: 20, width: 20 }} />
                    </IconButton>
                    <IconButton className="form-icon-style">
                      <SendIcon style={{ height: 20, width: 20 }} onClick={resetCredential} />
                    </IconButton>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="sign-in-form-inputs-cantainer">
            {stage === 'signIn' && (
              <>
                <div className={'fitContent'}>
                  <div className={['PopupFormBox', 'labelPopupBox', 'popupMinHei'].join(' ')}>
                    <InputLabel htmlFor="name-input" className={'textForLabelPopup'}>
                      <span>{'sign-in'}&nbsp;</span>
                    </InputLabel>
                    {/* <div className={'infoSymbol'}></div>
              <div className={'infoSymbol'}>
                <InfoToolTip message="Click me, I will stay visible until you click outside." />
              </div> */}
                  </div>
                </div>
                <InputField
                  className=""
                  label="credential"
                  type="text"
                  errorMsg={isUserNameValid}
                  value={userName}
                  onClick={(e) => {
                    setIsUserNameValid('');
                    setIsCredentialsInValid('');
                    setUserName(e.target.value);
                  }}
                />
                <InputField
                  className=""
                  label="password"
                  type="password"
                  errorMsg={isPasswordValid}
                  value={password}
                  onClick={(e) => {
                    setIsPasswordValid('');
                    setIsCredentialsInValid('');
                    setPassword(e.target.value);
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '0 5px'
                  }}
                >
                  <div
                    style={{ cursor: 'pointer', width: 'fit-content' }}
                    onClick={() => {
                      // setIsForgotPassword(true);
                      setStage('forgotPassword');
                      setCredentialOptionError('');
                      setForgotCredentialError('');
                    }}
                  >
                    <Label text="forgot information" fontSize="1.2rem" colour="#0000008a" />
                  </div>
                  <div>
                    {isCredentialsInValid && (
                      <Label
                        text={isCredentialsInValid}
                        fontSize="1.2rem"
                        colour={
                          isCredentialsInValid === 'in progress' ? '#7DC832' : 'rgb(244, 67, 54)'
                        }
                      />
                    )}
                  </div>
                </div>
              </>
            )}
            {stage === 'forgotPassword' && (
              <>
                <div className={'fitContent'}>
                  <div className={['PopupFormBox', 'labelPopupBox', 'popupMinHei'].join(' ')}>
                    <InputLabel htmlFor="name-input" className={'textForLabelPopup'}>
                      <span>{'information'}&nbsp;</span>
                    </InputLabel>
                    {/* <div className={'infoSymbol'}></div>
              <div className={'infoSymbol'}>
                <InfoToolTip message="Click me, I will stay visible until you click outside." />
              </div> */}
                  </div>
                </div>
                <FormControl style={{ width: '100%' }}>
                  <div style={{ height: '70.5px' }}>
                    <SelectField
                      tag={'assesseeSignInInformation'}
                      label={'forgotten'}
                      listSelect={[
                        { id: '', name: '' },
                        { id: 'credential', name: 'credential' },
                        { id: 'password', name: 'password' }
                      ]}
                      mappingValue={'id'}
                      errorMsg={credentialOptionError}
                      onChange={(e) => {
                        setCredentialOption(e.target.value);
                        setCredentialOptionError('');
                        setForgotCredentialError('');
                        setIsCredentialsInValid('');
                      }}
                      value={credentialOption}
                    />
                  </div>
                  <InputField
                    id={'forgotCredential'}
                    value={forgotCredential}
                    label={'unforgotten'}
                    type="text"
                    errorMsg={
                      forgotCredentialError !== ''
                        ? forgotCredentialError
                        : credentialOption === 'credential'
                        ? 'email address'
                        : credentialOption === 'password'
                        ? 'email address, mobile telephone, tag'
                        : ''
                    }
                    isErrorMsg={
                      forgotCredentialError ? true : credentialOption !== '' ? false : false
                    }
                    onClick={(e) => {
                      setForgotCredentialError('');
                      setForgotCredential(e.target.value);
                    }}
                  />
                  <div className={'forgot-and-progress-flex'}>
                    <div></div>
                    <div>
                      {/* {isCredentialsInValid && ( */}
                      <Label
                        text={isCredentialsInValid}
                        fontSize="1.2rem"
                        colour={
                          isCredentialsInValid === 'in progress' ? '#7DC832' : 'rgb(244, 67, 54)'
                        }
                      />
                      {/* )} */}
                    </div>
                  </div>
                </FormControl>
              </>
            )}
            {stage === 'confirmPassword' && (
              <FormControl style={{ width: '100%' }}>
                <InputField
                  id={'code'}
                  value={code}
                  label={'authentication code'}
                  type="text"
                  errorMsg={codeError}
                  onClick={(e) => {
                    setCode(e.target.value);
                    setCodeError('');
                  }}
                />
                <InputField
                  id={'revised password'}
                  value={revisedPassword}
                  type="password"
                  label={'revised password'}
                  errorMsg={revisedPasswordError}
                  onClick={(e) => {
                    setRevisedPassword(e.target.value);
                    setRevisedPasswordError('');
                  }}
                />
                <InputField
                  id={'revised password'}
                  value={confirmRevisedPassword}
                  type="password"
                  label={'revised password'}
                  errorMsg={confirmRevisedPasswordError}
                  onClick={(e) => {
                    setConfirmRevisedPassword(e.target.value);
                    setConfirmRevisedPasswordError('');
                  }}
                />
              </FormControl>
            )}
            {stage === 'credentialOptions' && (
              <>
                {credentialOptionArr.map((item, index) => {
                  return (
                    <div className="containerPadding" key={index}>
                      <ReviewList
                        className=""
                        id={index}
                        tag={item.username}
                        isSelectedReviewList={middlePaneSelectedValue === item.username}
                        // status={item.informationEngagement.itemStatus}
                        // actualStatus={item.informationEngagement.itemStatus}
                        textOne={item.username}
                        textTwo={''}
                        isTooltipActive={false}
                        onClickEvent={onClickList}
                      />
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DisplayPageSignIn;
