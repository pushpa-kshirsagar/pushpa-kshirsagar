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
  INCORRECT_INFORMATION_ERROR_MESSAGE
} from '../../errorMessage';
import {
  SET_SIGN_ON_SINGLE_STATE,
  CLEAR_SIGN_ON_SINGLE_STATE,
  ASSESSEE_CONFIRM_SAGA,
  LOADER_START,
  ASSESSEE_SIGN_IN_SAGA,
  SET_SIGN_IN_STATUS
} from '../../actionType';
import { useDispatch, useSelector } from 'react-redux';
import Label from '../../Atoms/Labels/Label';
// import { AccountContext } from '../../Account';
const signInOptions = [
  { name: 'Dajw3h8736582hsYfjdyst&' },
  { name: 'DSjysf-asdahje' },
  { name: 'shivam.s@boppotechologies.com' },
  { name: 'simple.sample@gmail.com' },
  { name: '8006777221' },
  { name: '8877665698' }
];
const DisplayPageConfirmUser = () => {
  const bgImg = '/Image/bg.jpg';
  const { id } = useParams();
  const style = {
    backgroundPosition: '50% 50%',
    backgroundImage: `url(${bgImg})`,
    backgroundSize: 'cover'
  };
  const dispatch = useDispatch();
  const { assesseeSignInStatus } = useSelector((state) => state.UserReducer);
  const { signInRes } = useSelector((state) => state.DisplayPaneTwoReducer);
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
  // const signInRes = {
  //   assesseeId: '607888f3226fc201a533a924',
  //   associateId: '0654321',
  //   associateAssent: true,
  //   assesseeAssent: false,
  //   cognitoResponse: {
  //     accessToken:
  //       'eyJraWQiOiJrMytNQVZxM3JFbHhJYmFiczBjdlc4K1hTOEp2ZHBOdDArYStKUVJrRGl3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwZDZlN2E5ZS1iYmIwLTRhZTMtOWZmMy01ODZjZmFhNTIxZDMiLCJldmVudF9pZCI6IjQ5YTU2OWZhLTNhOWYtNDI2MC1iOTYxLWZiN2ZjM2JlMWFiYyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MTg1MTM0OTIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoLTFfZEphVDd0akw3IiwiZXhwIjoxNjE4NTE3MDkyLCJpYXQiOjE2MTg1MTM0OTIsImp0aSI6IjAwYTY3ODRlLWYxMDUtNDE1Zi1hNTA2LWRjNjYwOTk4ZmI0ZSIsImNsaWVudF9pZCI6Ijl1MjZjOTlmamloMG1laWpzZDM5MmJmbGIiLCJ1c2VybmFtZSI6IjYwNzg4OGYzMjI2ZmMyMDFhNTMzYTkyNCJ9.UOCz6uMvKM_7qd5FvP7lYuNIt-LbTDBkysWtx4mCI67tAb5j8Ct-oMbQ_xj07LqXZImdA4Zo7gVgFlMfpip_AM3XxwovOmaQCIXWnAYaDVcf2w6ZPuzfd7yOonj-g_SQgPNEALz-t-pk3PMu9g5Jdtw3bltbzTUm3yVMsFpIPVqTEVdHDvDU2gzIeume6cqFKn3qKJqS_IP1MCCwM84ltFd-fUTLzAECt6dkmzYVk1oTB2vLag1dAiFa-QW8CfA5xib45QmgQSMUuUH2dDGuoI6lCNUlz_Q3XIqHbPfXWVj6h_IxLlDOJz8Gw2u5pQ8kfgJLzOTgLk3oaG037EjWxQ',
  //     expiresIn: 3600,
  //     tokenType: 'Bearer',
  //     refreshToken:
  //       'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.PQpPD7M24iKXOomls4bD5FjiH4I1k04wq5Qfc7IgXRafBj-WAZo35SW1bcI9unSHQ0xNUNbvrgG9HhdptEvn2JmB0xd2dEgSp-sKF3MNsjLiDjUXwjyOYwjF7W_FWMXAeHtxrw306AcjmHS0ZB1n0JZ22WaAE4CgymnB4-xqnXrgzsbGyHq6WV_P9yxkKdqi67OOukqOSaSQ6etCjzkKATOvOID42Wo8GlXtk8qqBTbE6VAiaaQEzbKLCAeceeLyjQ1Bc54RiMZ53BEU6jRmnCzZ7daC1FGJEMxnGZeyCr1lHMyP5pPtxmlKYF7J9l55VpixnJm4_J-dRaR1m2-fVQ.QLlCuMO3gL8g-8og.6woeFicAsRWhtxQEx1f6a7z47ww8dGEyqyS4Cimo-CVsXjgedcpz3oxd8raFw7a3fcUus0kIHlO_XuMruq4noEgzQTEH-vIm0AXr9zE7GyWEbavBIFCEhMPaHFAM7nLSWVAc_ylHq1v1gq3rgbRYK0xkzQlj4NRa7wld07gP64mrwNm1Thf8G3-OUfXQTEVoaTzvzeOX4b0b1NaRN4HBnTWFnA-JtwEAd_Vk4nwcBEDLt2CMmI6KdDtdP6MrLE7QwtpmF_VXdOe8MA7irb4lUN1OJS-9B5SJshtFHT6ZCa-T6L7Fm9O4eEwnjXfybNjTIsZydw_CYTr6l4XeRbu72NmcxU9TS5YN82IGYs9bR-PqkBXD3PQy3Ac-IenToITEeBgP9wXuCjsPkBxK6VZS0-Jr1bWxddbqQmx9IQM--AFgaeQWQNdARF7tN8AjikBnHaFWxz56zBSKZSC1RhUBQAPkUIF-EIeBE2oi7oa5jIEEHpM0d78mpGG_zREpJQHUqkRGp1eWcJy6bAYZFjGTR2PoyqOv_mpkDIwfKnWbObYQ0Yd510asE8DXiqNUWnXMIJGhvPxnPMKV5OmNpc2wTgX4QkzjxxcLv3cPGhNDbAysQbsvYtSSQWzk88B_A9D3cToZseCKEz52I0-n0FCCHlRxHK5p_-pkSX_8goOFpmm53W8iQ-xo1hJRiWD4xAtqxTX3EiHvrbVP8DbPzJDReQVoKEArdp0PwdjRfDmDZT25c7nOecqYU2iqv4u6rfI_L-cJEokbAqNMjL34_YxTTUPdoCcKob-TQLE03o2e8U5Is6ZIyx50iAtBovE8I5KnVu0pwEqICIbgKyLAoLhTw4LOoztr6cywWDVdg54Qf-kVo5DODD6btq-G4rcCk5DPUvj4O6cv3n7u3a36cL0YYWoDZCFqhQsNuXKHUewlN8Rf0A94gbd0DfH8kb6VQNxLQCq0vOi2xvwzo6kKVENzJT8fKrn-Adg9q3zPxF24YzqgmDn7h9KDBUggQC8GX6JAt3_IqNvxxkDCtuzWtO_DDWmuUtolKPlcBQ7VbefsbmE2uistWaxNKpCBvCRcin5AeMsr_q7trZtZlUn_NGyn5nSXWNm88A8RRc0iF6Qk9gjbwBPHSCSbqS9iOW-A59yx33fKdsBXhksdbBALye8HZyOwLJA3F0lylNejPU9RvG8Duk36AO8vi-YrYl8wmz9l0xnfSLT-awUjGGhR5yErkeq3bEZ3IEBVy5AyhEXSyOB9LtEGemaBixxa6f71GIC6VAHpgJzgLfnjMUQTuNALjrX6JHMM5Ut71pFqzhl7VxvbCw.8gQlDGRvEf912TGRFSPSTw',
  //     idToken:
  //       'eyJraWQiOiJmK2YrVFRNZTJseSt2MmY0eFwvSmlcL1Z2M0k2UUhzSGlqRVZEcWlOQ05OVVE9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwZDZlN2E5ZS1iYmIwLTRhZTMtOWZmMy01ODZjZmFhNTIxZDMiLCJhdWQiOiI5dTI2Yzk5ZmppaDBtZWlqc2QzOTJiZmxiIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImV2ZW50X2lkIjoiNDlhNTY5ZmEtM2E5Zi00MjYwLWI5NjEtZmI3ZmMzYmUxYWJjIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2MTg1MTM0OTIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoLTFfZEphVDd0akw3IiwiY29nbml0bzp1c2VybmFtZSI6IjYwNzg4OGYzMjI2ZmMyMDFhNTMzYTkyNCIsImV4cCI6MTYxODUxNzA5MiwiaWF0IjoxNjE4NTEzNDkyLCJlbWFpbCI6InNhaW5hdGgudEBib3Bwb3RlY2hub2xvZ2llcy5jb20ifQ.r5GwyFtGnI7LJdzX3DXw7KbYCijn2Cev4fO0JhJzDkf3NHPdupQROC5h0RuMb_3MgKJwRoHIj0-Jwhx_NzUgcu3NoSBWzJcw8pP1uj1rSyLGKvL6la-jXfiLJNbfJCfD7jykt0thtaZlMFTqEZ1T7X2Awjmw7LRpQ9ZUsZrs_svOmvaYJf1tdb7Etc_GfQeoPJojJgTgJb8ACAp6llZyBBzVsuKClnTPIPEmwnaEFrgJRudna2Rk-K0AyVOfwoblYf-YJ7B60bEyccWiONYeQFAxFRkX0awNOqNxT6ggTupEgnkSxcFsc5tdtGIgySwP8HHXCs4x4c9NhTVwBpq83g',
  //     newDeviceMetadata: null
  //   },
  //   signInResponse: {
  //     associateAssent:
  //       '<p><strong>Terms of Use</strong></p><p>THIS IS AN AGREEMENT BETWEEN YOU OR THE ENTITY THAT YOU REPRESENT (hereinafter “You” or “Your”) AND iGURU VENTURES PRIVATE LIMITED (hereinafter “iGURU”). Your use of this website (“Site”) or any of the products and services offered on this Site (collectively, the “Services”) is conditioned on your acceptance without modification of these Terms of use (“Terms”).</p><p>iGURU may update and change the Terms of use from time to time without notice. Continued use of the Services after any such changes shall constitute your consent to such changes. You are responsible for regularly reviewing the most current version of the Terms of use which are currently available at http://insightGURU.com. These terms of use also include iGURU’S Privacy Policy which is available for review at http://insightGURU.com</p>',
  //     assesseeAssent:
  //       '<p><strong>Terms of Use</strong></p><p>THIS IS AN AGREEMENT BETWEEN YOU OR THE ENTITY THAT YOU REPRESENT (hereinafter “You” or “Your”) AND iGURU VENTURES PRIVATE LIMITED (hereinafter “iGURU”). Your use of this website (“Site”) or any of the products and services offered on this Site (collectively, the “Services”) is conditioned on your acceptance without modification of these Terms of use (“Terms”).</p><p>iGURU may update and change the Terms of use from time to time without notice. Continued use of the Services after any such changes shall constitute your consent to such changes. You are responsible for regularly reviewing the most current version of the Terms of use which are currently available at http://insightGURU.com. These terms of use also include iGURU’S Privacy Policy which is available for review at http://insightGURU.com</p>',
  //     credential: ['607888f3226fc201a533a924', 'sainath.t@boppotechnologies.com']
  //   }
  // };

  const {
    associateAssent,
    assesseeAssent,
    signInCredential,
    currentPassword,
    revisedPassword
  } = useSelector((state) => state.SignOnReducer);

  useEffect(() => {
    if (assesseeSignInStatus === 'success') {
      setStage(1);
      setIsCredentialsInValid('');
      // let path = `/dashboard`;
      // history.push(path);
      dispatch({ type: SET_SIGN_IN_STATUS, payload: '' });
    }
    if (assesseeSignInStatus === 'error') {
      setIsCredentialsInValid(INCORRECT_INFORMATION_ERROR_MESSAGE);
    }
  }, [assesseeSignInStatus]);
  const onClickSignIn = () => {
    if (password) {
      setIsPasswordValid('');
      setIsCredentialsInValid('');
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
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    if (oldPassword !== '' && newPassword !== '' && confirmRevisedPassword !== '') {
      if (!passwordRegExp.test(newPassword)) {
        setNewPasswordError('revised password invalid');
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
        let reqObj = {
          assesseeId: signInRes?.assesseeId,
          associateId: signInRes?.associateId,
          associateAssent: associateAssent,
          assesseeAssent: assesseeAssent,
          signInCredential: signInCredential,
          currentPassword: currentPassword,
          revisedPassword: revisedPassword,
          accessToken: signInRes?.cognitoResponse.accessToken
        };
        dispatch({ type: LOADER_START });
        dispatch({
          type: ASSESSEE_CONFIRM_SAGA,
          requestObject: reqObj
        });
        // let path = `/dashboard`;
        // history.push(path);
        // TODO: call change password method in aws cognito
        // getSession()
        //   .then(({ user }) => {
        //     if (user) {
        //       user.changePassword(currentPassword, newPassword, (err, result) => {
        //         if (err) {
        //           alert(err.message || JSON.stringify(err));
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
                >
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
          signInRes?.associateAssent ? setStage(5) : setStage(3);
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
        newPassword={newPassword}
        newPasswordError={newPasswordError}
        setNewPassword={setNewPassword}
        confirmRevisedPassword={confirmRevisedPassword}
        confirmRevisedPasswordError={confirmRevisedPasswordError}
        setConfirmRevisedPassword={setConfirmRevisedPassword}
        onClick={passwordRevise}
        onClose={() => {
          setCancelConfirm(true);
        }}
      />
    </div>
  );
};

export default DisplayPageConfirmUser;
