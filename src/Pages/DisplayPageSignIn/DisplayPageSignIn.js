import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';
import iGuruLogo from '../../images/iglogo1.png';
import './DisplayPageSignIn.css';
import { IconButton } from '@material-ui/core';
import InputField from '../../Atoms/InputField/InputField';
// import bgImg from '../../images/bg.jpeg'; // old background Image
import Label from '../../Atoms/Labels/Label';
// import { useDispatch } from 'react-redux';
// import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
// import userPool from '../../UserPool';
import { AccountContext } from '../../Account';
// import Clear from 'material-ui-icons/Clear';

const DisplayPageSignIn = () => {
  const bgImg = './Image/bg.jpg';
  const style = {
    backgroundPosition: '50% 50%',
    backgroundImage: `url(${bgImg})`,
    backgroundSize: 'cover'
  };
  const { authenticate } = useContext(AccountContext);
  // const dispatch = useDispatch();
  const history = useHistory();
  const [isforgotPassword, setIsForgotPassword] = useState(false);
  const [isCredentialsInValid, setIsCredentialsInValid] = useState('');
  const [isUserNameValid, setIsUserNameValid] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  // const onClickEvent = () => {
  //   console.log('log In api');
  //   dispatch({ type: GET_USER_SAGA });
  //   let path = `/dashboard`;
  //   history.push(path);
  // };

  const onClickSignIn = () => {
    setIsCredentialsInValid('in progress');
    // get UserName and Password from inputs
    if (userName && password) {
      setIsPasswordValid('');
      setIsUserNameValid('');
      authenticate(userName, password)
        .then((data) => {
          setIsCredentialsInValid('');
          console.log('OnSuccess===>', data);
          let path = `/dashboard`;
          history.push(path);
          //TODO set AccessToken in localStorage
          //TODO: send AccessToken to backend
        })
        .catch((err) => {
          setIsCredentialsInValid('incorrect credentials');
          console.log('onFailure===>', err);
        });
      // ? Confirming a registered, unauthenticated user using a confirmation code received via mail id.
      // user.confirmRegistration('545566', true, function(err, result) {
      //   if (err) {
      //     alert(err.message || JSON.stringify(err));
      //     return;
      //   }
      //   console.log('call result: ' + result);
      // });
    } else {
      // validation set validation message if any
      setIsCredentialsInValid('');
      if (userName === '') {
        setIsUserNameValid('this information is required');
      } else {
        setIsUserNameValid('');
      }
      if (password === '') {
        setIsPasswordValid('this information is required');
      } else {
        setIsPasswordValid('');
      }
    }
  };

  return (
    <div style={style} className="signin-container">
      <div className="form-box">
        <div className="form-header">
          <div className="form-header-logo-container">
            <img className="form-header-logo-img" src={iGuruLogo} alt="iGuru logo" />
          </div>
          <div>
            {isforgotPassword && (
              <IconButton
                onClick={() => {
                  setIsForgotPassword(false);
                }}
                className="form-icon-style"
              >
                <SendIcon style={{ height: 20, width: 20 }} />
              </IconButton>
            )}
            <IconButton className="form-icon-style">
              <SendIcon style={{ height: 20, width: 20 }} onClick={onClickSignIn} />
            </IconButton>
          </div>
        </div>
        <div className="form-inputs-cantainer">
          {isforgotPassword ? (
            <>
              <InputField className="" label="email address" type="text" />
            </>
          ) : (
            <>
              <InputField
                className=""
                label="credential"
                type="text"
                errorMsg={isUserNameValid}
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
                    setIsForgotPassword(true);
                  }}
                >
                  <Label text="forgot information" fontSize="1.2rem" colour="#0000008a" />
                </div>
                <div>
                  {isCredentialsInValid && (
                    <Label
                      text={isCredentialsInValid}
                      fontSize="1.2rem"
                      colour={isCredentialsInValid === 'in progress' ? 'green' : 'rgb(244, 67, 54)'}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayPageSignIn;
