import React, { useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';
import iGuruLogo from '../../images/iglogo1.png';
import './DisplayPageConfirmUser.css';
import { Button, InputLabel } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import InputField from '../../Atoms/InputField/InputField';
import Label from '../../Atoms/Labels/Label';
import PopUpConfirmation from '../../PopUpGeneric/PopUpConfirmation';
import PopUpAdministratorAssent from '../../PopUpDisplayPanel/PopUpAdministratorAssent';
import { signInButton } from '@aws-amplify/ui';
import PopUpAssociateAssent from '../../PopUpDisplayPanel/PopUpAssociateAssent';
import PopUpAssentConfirmation from '../../PopUpDisplayPanel/PopUpAssentConfirmation';
import PopUpAdministratorSignInCredentialRevise from '../../PopUpDisplayPanel/PopUpAdministratorSignInCredentialRevise';
import PopUpAdministratorSignInPasswordRevise from '../../PopUpDisplayPanel/PopUpAdministratorSignInPasswordRevise';
// import Label from '../../Atoms/Labels/Label';
// import { AccountContext } from '../../Account';

const DisplayPageConfirmUser = () => {
  const bgImg = '/Image/bg.jpg';
  const { id } = useParams();
  const style = {
    backgroundPosition: '50% 50%',
    backgroundImage: `url(${bgImg})`,
    backgroundSize: 'cover'
  };
  // const dispatch = useDispatch();
  const history = useHistory();
  // const [isforgotPassword, setIsForgotPassword] = useState(false);
  // const [isCredentialsInValid, setIsCredentialsInValid] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState('');
  const [password, setPassword] = useState('');
  const [stage, setStage] = useState(0); // index for popUpSequence
  const [cancelConfirm, setCancelConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [revisedPassword, setRevisedPassword] = useState('');
  const [revisedPasswordError, setRevisedPasswordError] = useState('');
  const [confirmRevisedPassword, setConfirmRevisedPassword] = useState('');
  const [confirmRevisedPasswordError, setConfirmRevisedPasswordError] = useState('');

  const onClickSignIn = () => {
    if (password) {
      setIsPasswordValid('');
      setStage(1);
    } else {
      // validation set validation message if any
      // setIsCredentialsInValid('');
      if (password === '') {
        setIsPasswordValid('this information is required');
      } else {
        setIsPasswordValid('');
      }
    }
  };
  const passwordRevise = () => {
    //according to creation mode popup sequence will change
    setConfirmRevisedPasswordError('');
    setRevisedPasswordError('');
    setCurrentPasswordError('');
    const passwordRegExp = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    if (currentPassword !== '' && revisedPassword !== '' && confirmRevisedPassword !== '') {
      if (!passwordRegExp.test(revisedPassword)) {
        setRevisedPasswordError('revised password invalid');
        return;
      }
      if (revisedPassword === confirmRevisedPassword) {
        setRevisedPasswordError('');
        setConfirmRevisedPasswordError('');
        let path = `/dashboard`;
        history.push(path);
        // TODO: call change password method in aws cognito
        // getSession()
        //   .then(({ user }) => {
        //     if (user) {
        //       user.changePassword(currentPassword, revisedPassword, (err, result) => {
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
        console.log('========', currentPassword, revisedPassword, confirmRevisedPassword);
      } else {
        setRevisedPasswordError('this information is mismatched');
        setConfirmRevisedPasswordError('this information is mismatched');
      }
    } else {
      if (currentPassword === '') {
        setCurrentPasswordError('this information is required');
      }
      if (revisedPassword === '') {
        setRevisedPasswordError('this information is required');
      }
      if (confirmRevisedPassword === '') {
        setConfirmRevisedPasswordError('this information is required');
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
          <div className="form-header-logo-container">
            <img className="form-header-logo-img" src={iGuruLogo} alt="iGuru logo" />
          </div>
          <div>
            <IconButton className="form-icon-style">
              <SendIcon style={{ height: 20, width: 20 }} onClick={onClickSignIn} />
            </IconButton>
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
              </>
            )}
          </>
        </div>
      </div>
      <PopUpAdministratorAssent
        isActive={stage === 1 && !cancelConfirm}
        headerPanelColour={''}
        headerOne={'administrator'}
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
        headerOne={'administrator'}
        headerOneBadgeOne={'assent'}
        mode={'cancel'}
        onClickYes={() => {
          setStage(3);
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
          setStage(5);
        }}
        onClickNo={() => {
          setStage(0);
        }}
      />
      <PopUpAdministratorSignInCredentialRevise
        isActive={stage === 5 && !cancelConfirm}
        headerPanelColour={''}
        headerOne={'administrator'}
        headerOneBadgeOne={'primary'}
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
        headerOne={'administrator'}
        headerOneBadgeOne={'primary'}
        currentPassword={currentPassword}
        currentPasswordError={currentPasswordError}
        setCurrentPassword={setCurrentPassword}
        revisedPassword={revisedPassword}
        revisedPasswordError={revisedPasswordError}
        setRevisedPassword={setRevisedPassword}
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
