import React, { useEffect, useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import PopUpWhiteHeader from '../Molecules/PopUp/PopUpWhiteHeader';
import { InputLabel } from '@material-ui/core';
import InputField from '../Atoms/InputField/InputField';
import Label from '../Atoms/Label/Label';
import { useDispatch, useSelector } from 'react-redux';
import { SET_DISPLAY_TWO_SINGLE_STATE, SET_SIGN_ON_SINGLE_STATE } from '../actionType';
import { INCORRECT_INFORMATION_ERROR_MESSAGE } from '../errorMessage';

const PopUpAssociateLinkSignIn = (props) => {
  const {
    isActive,
    headerPanelColour,
    headerOne,
    headerOneBadgeOne,
    headerOneBadgetwo,
    onClick,
    onClose,
    setUserName,
    setPassword,
    userName,
    password,
    errorMsg = '',
    setIsUserNameValid = null,
    setIsPasswordValid = null,
    isUserNameValid = '',
    isPasswordValid = '',
    setIsCredentialsInValid = null,
    isCredentialsInValid = ''
  } = props;
  const dispatch = useDispatch();
  const { errorResponse } = useSelector((state) => state.DisplayPaneTwoReducer);
  useEffect(() => {
    if (errorResponse.responseCode === '2053' || errorResponse.responseCode === '5015')
      setIsCredentialsInValid(INCORRECT_INFORMATION_ERROR_MESSAGE);
    else setIsCredentialsInValid(errorResponse.responseMessage);
  }, [errorResponse]);
  // const [isUserNameValid, setIsUserNameValid] = useState('');
  // const [isPasswordValid, setIsPasswordValid] = useState('');
  // const [userName, setUserName] = useState('');
  // const [password, setPassword] = useState('');
  return (
    <div>
      <Popup isActive={isActive}>
        <PopUpWhiteHeader
          headerPanelColour={headerPanelColour}
          headerOne={headerOne}
          headerOneBadgeOne={headerOneBadgeOne}
          headerOneBadgeTwo={headerOneBadgetwo}
          mode={'core'}
          onClick={onClick}
          onClose={onClose}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
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
              value={userName}
              errorMsg={isUserNameValid}
              onClick={(e) => {
                setIsUserNameValid('');
                setIsCredentialsInValid('');
                setUserName(e.target.value);
                dispatch({
                  type: SET_DISPLAY_TWO_SINGLE_STATE,
                  payload: { stateName: 'errorResponse', value: '' }
                });
              }}
            />
            <InputField
              className=""
              label="password"
              type="password"
              value={password}
              errorMsg={isPasswordValid}
              onClick={(e) => {
                setIsPasswordValid('');
                setIsCredentialsInValid('');
                setPassword(e.target.value);
                dispatch({
                  type: SET_DISPLAY_TWO_SINGLE_STATE,
                  payload: { stateName: 'errorResponse', value: '' }
                });
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
                }}
              >
                {/* <Label text="forgot information" fontSize="1.2rem" colour="#0000008a" /> */}
              </div>
              <div>
                {isCredentialsInValid && (
                  <Label
                    text={isCredentialsInValid}
                    fontSize="1.2rem"
                    colour={isCredentialsInValid === 'in progress' ? '#7DC832' : 'rgb(244, 67, 54)'}
                  />
                )}
                {/* {errorMsg === '5015' && (
                  <Label
                    text={INCORRECT_INFORMATION_ERROR_MESSAGE}
                    fontSize="1.2rem"
                    colour={'rgb(244, 67, 54)'}
                  />
                )} */}
              </div>
            </div>
          </>
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpAssociateLinkSignIn;
