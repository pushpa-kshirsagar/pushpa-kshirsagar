import React, { useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';
import iGuruLogo from '../../images/iglogo1.png';
import './DisplayPageConfirmUser.css';
import { IconButton } from '@material-ui/core';
import InputField from '../../Atoms/InputField/InputField';
import Label from '../../Atoms/Labels/Label';
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
  // const history = useHistory();
  // const [isforgotPassword, setIsForgotPassword] = useState(false);
  const [isCredentialsInValid, setIsCredentialsInValid] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState('');
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
    if (password) {
      setIsPasswordValid('');
    } else {
      // validation set validation message if any
      setIsCredentialsInValid('');
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
            <IconButton className="form-icon-style">
              <SendIcon style={{ height: 20, width: 20 }} onClick={onClickSignIn} />
            </IconButton>
          </div>
        </div>
        <div className="form-inputs-cantainer">
          <>
            <InputField className="" label="credential" type="text" value={id} />
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
              <div style={{ cursor: 'pointer', width: 'fit-content' }} onClick={() => {}}>
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
        </div>
      </div>
    </div>
  );
};

export default DisplayPageConfirmUser;
