import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';
import iGuruLogo from '../../images/iglogo1.png';
import './DisplayPageConfirmUser.css';
import { InputLabel } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import InputField from '../../Atoms/InputField/InputField';
import PopUpAdministratorAssent from '../../PopUpDisplayPanel/PopUpAdministratorAssent';
import PopUpAssociateAssent from '../../PopUpDisplayPanel/PopUpAssociateAssent';
import PopUpAssentConfirmation from '../../PopUpDisplayPanel/PopUpAssentConfirmation';
import PopUpAdministratorSignInCredentialRevise from '../../PopUpDisplayPanel/PopUpAdministratorSignInCredentialRevise';
import PopUpAdministratorSignInPasswordRevise from '../../PopUpDisplayPanel/PopUpAdministratorSignInPasswordRevise';
import {
  INFORMATION_MISMATCHED_ERROR_MESSAGE,
  REQUIRED_ERROR_MESSAGE,
  INCORRECT_INFORMATION_ERROR_MESSAGE,
  INVALID_PASSWORD_ERROR_MESSAGE
} from '../../errorMessage';
import {
  SET_SIGN_ON_SINGLE_STATE,
  CLEAR_SIGN_ON_SINGLE_STATE,
  ASSESSEE_CONFIRM_SAGA,
  LOADER_START,
  ASSESSEE_SIGN_IN_SAGA,
  SET_SIGN_IN_STATUS,
  SET_USER_STATE
} from '../../actionType';
import { useDispatch, useSelector } from 'react-redux';
import Label from '../../Atoms/Label/Label';
import LoadingComponent from '../../PopUpInformation/LoadingComponent';
// import { AccountContext } from '../../Account';
const DisplayPageConfirmUser = () => {
  const bgImg = '/Image/bg.jpg';
  const { id } = useParams();
  const style = {
    backgroundPosition: '50% 50%',
    backgroundImage: `url(${bgImg})`,
    backgroundSize: 'cover'
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const { assesseeSignInStatus, assesseeConfirmStatus } = useSelector((state) => state.UserReducer);
  const { signInRes } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { isLoading } = useSelector((state) => state.LoaderReducer);
  // const [isforgotPassword, setIsForgotPassword] = useState(false);
  const [isCredentialsInValid, setIsCredentialsInValid] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState('');
  const [password, setPassword] = useState('');
  const [stage, setStage] = useState(0); // index for popUpSequence
  const [cancelConfirm, setCancelConfirm] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmRevisedPassword, setConfirmRevisedPassword] = useState('');
  const [confirmRevisedPasswordError, setConfirmRevisedPasswordError] = useState('');
  const { associateAssent, assesseeAssent, signInCredential } = useSelector(
    (state) => state.SignOnReducer
  );

  useEffect(() => {
    if (assesseeSignInStatus === 'success') {
      console.log(signInRes);
      console.log('signInRes');
      if (signInRes.signInResponse.isAssesseeAssent) {
        let path = `/dashboard`;
        history.push(path);
      } else if (signInRes.signInResponse.length > 0) {
        let path = `/dashboard`;
        history.push(path);
      } else {
        setStage(1);
        setIsCredentialsInValid('');
      }
      dispatch({ type: SET_SIGN_IN_STATUS, payload: '' });
    }
    if (assesseeSignInStatus === 'error') {
      setIsCredentialsInValid(INCORRECT_INFORMATION_ERROR_MESSAGE);
    }
    if (assesseeConfirmStatus === 'confirmSuccess') {
      let path = `/dashboard`;
      history.push(path);
      dispatch({
        type: SET_USER_STATE,
        payload: { stateName: 'assesseeConfirmStatus', value: '' }
      });
    }
  }, [assesseeSignInStatus, assesseeConfirmStatus, history]);
  const onClickSignIn = () => {
    setIsCredentialsInValid('in progress');
    if (password) {
      setIsPasswordValid('');
      dispatch({
        type: ASSESSEE_SIGN_IN_SAGA,
        payload: {
          credential: id, // "607888f3226fc201a533a924",
          password: password //"NG36#:dqMO"
        }
      });
    } else {
      // validation set validation message if any
      setIsCredentialsInValid('');
      if (password === '') {
        setIsPasswordValid(REQUIRED_ERROR_MESSAGE);
      } else {
        setIsPasswordValid('');
      }
    }
  };
  const passwordRevise = () => {
    //according to creation mode popup sequence will change
    setConfirmRevisedPasswordError('');
    setNewPasswordError('');
    setOldPasswordError('');
    const passwordRegExp = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!{~:<-?>}@#$%^&*])(?=.{8,})'
    );
    if (oldPassword !== '' && newPassword !== '' && confirmRevisedPassword !== '') {
      if (!passwordRegExp.test(newPassword)) {
        setNewPasswordError(INVALID_PASSWORD_ERROR_MESSAGE);
        setConfirmRevisedPasswordError(INVALID_PASSWORD_ERROR_MESSAGE);
        return;
      }
      if (newPassword === confirmRevisedPassword) {
        setNewPasswordError('');
        setConfirmRevisedPasswordError('');
        dispatch({
          type: SET_SIGN_ON_SINGLE_STATE,
          payload: {
            stateName: 'currentPassword',
            value: oldPassword
          }
        });
        dispatch({
          type: SET_SIGN_ON_SINGLE_STATE,
          payload: {
            stateName: 'revisedPassword',
            value: newPassword
          }
        });
        console.log(signInRes);
        console.log('signInRes=========');
        let reqObj = {
          assesseeId: signInRes?.signInResponse?.assesseeId,
          associateId: signInRes?.signInResponse?.associateId,
          associateAssent: associateAssent,
          assesseeAssent: assesseeAssent,
          signinId: signInCredential === '' ? id : signInCredential,
          currentPassword: oldPassword,
          revisedPassword: newPassword,
          accessToken: signInRes?.cognitoResponse.accessToken
        };
        console.log(reqObj);
        console.log('reqObj=========');
        dispatch({ type: LOADER_START });
        dispatch({
          type: ASSESSEE_CONFIRM_SAGA,
          payload: {
            requestObject: reqObj
          }
        });
        // let path = `/dashboard`;
        // history.push(path);
        // TODO: call change password method in aws cognito
        // getSession()
        //   .then(({ user }) => {
        //     if (user) {
        //       user.changePassword(currentPassword, newPassword, (err, result) => {
        //         if (err) {
        //           //TODO: Show error
        //           return;
        //         }
        //         signOut(); // sign-out current user
        //         //TODO: display success message and redirect to signIn page
        //         let path = `/signIn`;
        //         history.push(path);
        //         dispatch({ type: POPUP_CLOSE });
        //         console.log('call result: ' + result);
        //       });
        //     } else {
        //       console.log('USER NOT SIGN IN PLEASE SIGN IN');
        //     }
        //   })
        //   .catch((err) => {
        //     console.log('SESSION ERR=====', err);
        //   });
        console.log('========', oldPassword, newPassword, confirmRevisedPassword);
      } else {
        setNewPasswordError(INFORMATION_MISMATCHED_ERROR_MESSAGE);
        setConfirmRevisedPasswordError(INFORMATION_MISMATCHED_ERROR_MESSAGE);
      }
    } else {
      if (oldPassword === '') {
        setOldPasswordError(REQUIRED_ERROR_MESSAGE);
      }
      if (newPassword === '') {
        setNewPasswordError(REQUIRED_ERROR_MESSAGE);
      }
      if (confirmRevisedPassword === '') {
        setConfirmRevisedPasswordError(REQUIRED_ERROR_MESSAGE);
      }
      console.log('ALL Field requred');
    }
  };

  // administrator (assent) / associate (assent).

  // pop-up
  // administrator (assent)... text.
  // administrator (assent); no/yes.
  // associate (assent)... text.
  // associate (assent); no/yes.
  // administrator (primary)... sign-in credential... revise.
  // administrator (primary)... sign-in password... revise.

  // pop-up
  // assessee (assent)... text.
  // assessee (assent); no/yes.

  return (
    <div>
      <LoadingComponent isActive={isLoading} />
      <div style={style} className="signin-container">
        <div className="form-box">
          <div className="form-header">
            <div className="inner-form-header">
              <div className="form-header-logo-container">
                <img className="form-header-logo-img" src={iGuruLogo} alt="iGuru logo" />
              </div>
              <div>
                <IconButton className="form-icon-style">
                  <SendIcon style={{ height: 20, width: 20 }} onClick={onClickSignIn} />
                </IconButton>
              </div>
            </div>
          </div>
          <div style={{ padding: '5px' }}>
            <>
              {stage === 0 && (
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
                  <InputField className="" label="credential" type="text" value={id} />
                  <InputField
                    className=""
                    label="password"
                    type="password"
                    errorMsg={isPasswordValid}
                    onClick={(e) => {
                      setIsPasswordValid('');
                      // setIsCredentialsInValid('');
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
                      }}
                    ></div>
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
            </>
          </div>
        </div>
        <PopUpAdministratorAssent
          isActive={stage === 1 && !cancelConfirm}
          headerPanelColour={''}
          assessentText={signInRes?.signInResponse?.assesseeAssent}
          headerOne={'assessee'}
          headerOneBadgeOne={'assent'}
          onClick={() => {
            setStage(2);
          }}
          onClose={() => {
            setCancelConfirm(true);
          }}
        />
        <PopUpAssentConfirmation
          isActive={stage === 2 && !cancelConfirm}
          headerPanelColour={''}
          headerOne={'assessee'}
          headerOneBadgeOne={'assent'}
          mode={'cancel'}
          onClickYes={() => {
            dispatch({
              type: SET_SIGN_ON_SINGLE_STATE,
              payload: {
                stateName: 'assesseeAssent',
                value: true
              }
            });
            signInRes?.signInResponse.isAssociateAssent ? setStage(5) : setStage(3);
          }}
          onClickNo={() => {
            setStage(0);
          }}
        />
        <PopUpAssentConfirmation
          isActive={cancelConfirm}
          headerPanelColour={''}
          headerOne={'cancel'}
          headerOneBadgeOne={''}
          mode={'cancel'}
          onClickYes={() => {
            setStage(0);
            setNewPassword('');
            setPassword('');
            dispatch({ type: CLEAR_SIGN_ON_SINGLE_STATE });
            setCancelConfirm(false);
          }}
          onClickNo={() => {
            setCancelConfirm(false);
          }}
        />
        <PopUpAssociateAssent
          isActive={stage === 3 && !cancelConfirm}
          headerPanelColour={''}
          headerOne={'associate'}
          headerOneBadgeOne={'assent'}
          associateText={signInRes?.signInResponse?.associateAssent}
          onClick={() => {
            setStage(4);
          }}
          onClose={() => {
            setCancelConfirm(true);
          }}
        />
        <PopUpAssentConfirmation
          isActive={stage === 4 && !cancelConfirm}
          headerPanelColour={''}
          headerOne={'associate'}
          headerOneBadgeOne={'assent'}
          mode={'cancel'}
          onClickYes={() => {
            dispatch({
              type: SET_SIGN_ON_SINGLE_STATE,
              payload: {
                stateName: 'associateAssent',
                value: true
              }
            });
            setStage(5);
          }}
          onClickNo={() => {
            setStage(0);
          }}
        />
        <PopUpAdministratorSignInCredentialRevise
          isActive={stage === 5 && !cancelConfirm}
          headerPanelColour={''}
          headerOne={'assessee'}
          headerOneBadgeOne={''}
          signValue={signInCredential}
          // signInOptions={signInOptions}
          signInOptions={signInRes?.signInResponse?.credential}
          onClick={() => {
            setStage(6);
          }}
          onClose={() => {
            setCancelConfirm(true);
          }}
        />
        <PopUpAdministratorSignInPasswordRevise
          isActive={stage === 6 && !cancelConfirm}
          headerPanelColour={''}
          headerOne={'assessee'}
          headerOneBadgeOne={'password'}
          headerOneBadgeTwo={'revise'}
          oldPassword={oldPassword}
          oldPasswordError={oldPasswordError}
          setOldPassword={setOldPassword}
          setOldPasswordError={setOldPasswordError}
          newPassword={newPassword}
          newPasswordError={newPasswordError}
          setNewPassword={setNewPassword}
          setNewPasswordError={setNewPasswordError}
          confirmRevisedPassword={confirmRevisedPassword}
          confirmRevisedPasswordError={confirmRevisedPasswordError}
          setConfirmRevisedPassword={setConfirmRevisedPassword}
          setConfirmRevisedPasswordError={setConfirmRevisedPasswordError}
          onClick={passwordRevise}
          onClose={() => {
            setCancelConfirm(true);
          }}
        />
      </div>
    </div>
  );
};

export default DisplayPageConfirmUser;
