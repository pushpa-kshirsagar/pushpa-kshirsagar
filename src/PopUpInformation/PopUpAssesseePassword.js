import React, { useContext, useEffect, useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LOADER_START, SET_ASSESSEE_REVISE_PASSWORD } from '../actionType';
import { FormControl } from '@material-ui/core';
import InputFeild from '../Atoms/InputField/InputField';
import { useHistory } from 'react-router-dom';
import { AccountContext } from '../Account';
import {
  INFORMATION_MISMATCHED_ERROR_MESSAGE,
  INVALID_PASSWORD_ERROR_MESSAGE,
  REQUIRED_ERROR_MESSAGE
} from '../errorMessage';

const PopUpAssesseePassword = (props) => {
  const dispatch = useDispatch();
  const {
    isActive = false,
    headerPanelColour = 'genericOne',
    headerOne = 'assessee',
    headerOneBadgeOne = 'self',
    headerOneBadgeTwo = 'password',
    headerOneBadgeThree = 'revise'
  } = props;
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [revisedPassword, setRevisedPassword] = useState('');
  const [revisedPasswordError, setRevisedPasswordError] = useState('');
  const [confirmRevisedPassword, setConfirmRevisedPassword] = useState('');
  const [confirmRevisedPasswordError, setConfirmRevisedPasswordError] = useState('');
  const { getSession, signOut } = useContext(AccountContext);
  const history = useHistory();
  const { assesseeConfirmStatus } = useSelector((state) => state.UserReducer);
  useEffect(() => {
    if (assesseeConfirmStatus === 'passwordReviseSuccess') {
      let path = `/signIn`;
      history.push(path);
    }
  }, [assesseeConfirmStatus, history]);
  const handleClick = () => {
    //according to creation mode popup sequence will change
    setConfirmRevisedPasswordError('');
    setRevisedPasswordError('');
    setCurrentPasswordError('');
    const passwordRegExp = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!{~:<-?>}@#$%^&*])(?=.{8,})'
    );
    if (currentPassword !== '' && revisedPassword !== '' && confirmRevisedPassword !== '') {
      if (!passwordRegExp.test(revisedPassword)) {
        setRevisedPasswordError(INVALID_PASSWORD_ERROR_MESSAGE);
        setConfirmRevisedPasswordError(INVALID_PASSWORD_ERROR_MESSAGE);
        return;
      }
      if (revisedPassword === confirmRevisedPassword) {
        setRevisedPasswordError('');
        setConfirmRevisedPasswordError('');
        // TODO: call change password method in aws cognito
        dispatch({ type: LOADER_START });
        dispatch({
          type: SET_ASSESSEE_REVISE_PASSWORD,
          payload: {
            reqObj: {
              prevPssword: currentPassword,
              newPassword: revisedPassword
            }
          }
        });
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
        setRevisedPasswordError(INFORMATION_MISMATCHED_ERROR_MESSAGE);
        setConfirmRevisedPasswordError(INFORMATION_MISMATCHED_ERROR_MESSAGE);
      }
    } else {
      if (currentPassword === '') {
        setCurrentPasswordError(REQUIRED_ERROR_MESSAGE);
      }
      if (revisedPassword === '') {
        setRevisedPasswordError(REQUIRED_ERROR_MESSAGE);
      }
      if (confirmRevisedPassword === '') {
        setConfirmRevisedPasswordError(REQUIRED_ERROR_MESSAGE);
      }
      console.log('ALL Field requred');
    }
    // dispatch({ type: POPUP_CLOSE });
  };

  return (
    <div>
      <Popup isActive={isActive}>
        <PopupHeader
          headerPanelColour={headerPanelColour}
          headerOne={headerOne}
          headerOneBadgeOne={headerOneBadgeOne}
          headerOneBadgeTwo={headerOneBadgeTwo}
          headerOneBadgeThree={headerOneBadgeThree}
          onClick={handleClick}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <FormControl style={{ width: '100%' }}>
            <InputFeild
              id={'current password'}
              value={currentPassword}
              label={'password'}
              labelBadgeOne={'current'}
              type="password"
              errorMsg={currentPasswordError}
              onClick={(e) => {
                setCurrentPassword(e.target.value);
              }}
            />
            <InputFeild
              id={'revised password'}
              value={revisedPassword}
              type="password"
              label={'password'}
              labelBadgeOne={'revised'}
              errorMsg={revisedPasswordError}
              onClick={(e) => {
                setRevisedPassword(e.target.value);
              }}
            />
            <InputFeild
              id={'revised password'}
              value={confirmRevisedPassword}
              type="password"
              label={'password'}
              labelBadgeOne={'revised'}
              errorMsg={confirmRevisedPasswordError}
              onClick={(e) => {
                setConfirmRevisedPassword(e.target.value);
              }}
            />
          </FormControl>
        </DialogContent>
      </Popup>
    </div>
  );
};
PopUpAssesseePassword.propTypes = {
  className: PropTypes.string,
  headerPanelColour: PropTypes.oneOf([
    'displayPaneLeft',
    'displayPaneCentre',
    'displayPaneRight',
    'genericOne',
    'genericTwo'
  ]),
  headerOne: PropTypes.string,
  headerOneBadgeOne: PropTypes.string,
  headerOneBadgeTwo: PropTypes.string,
  headerOneBadgeThree: PropTypes.string,
  isActive: PropTypes.bool
};
export default PopUpAssesseePassword;
