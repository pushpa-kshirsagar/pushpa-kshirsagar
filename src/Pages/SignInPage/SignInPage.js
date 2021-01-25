import React, { useState } from 'react';
import SendIcon from '@material-ui/icons/Send';
import iGuruLogo from '../../images/iglogo1.png';
import './SignInPage.css';
import { IconButton } from '@material-ui/core';
import InputField from '../../Atoms/InputField/InputField';
import bgImg from '../../images/bg.jpeg';
import Label from '../../Atoms/Labels/Label';
// import Clear from 'material-ui-icons/Clear';

const SignInPage = () => {
  const style = {
    backgroundPosition: '50% 50%',
    backgroundImage: `url(${bgImg})`,
    backgroundSize: 'cover'
  };
  const [isforgotPassword, setIsForgotPassword] = useState(false);
  console.log('SIgn In ===', isforgotPassword);
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
              <SendIcon style={{ height: 20, width: 20 }} />
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
              <InputField className="" label="sign-in" type="text" />
              <InputField className="" label="password" type="password" />
              <div
                style={{ cursor: 'pointer', width: 'fit-content' }}
                onClick={() => {
                  setIsForgotPassword(true);
                }}
              >
                <Label text="forgot credentials" fontSize="1.2rem" colour="#0000008a" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
