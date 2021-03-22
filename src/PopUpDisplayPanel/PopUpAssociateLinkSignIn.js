import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import PopUpWhiteHeader from '../Molecules/PopUp/PopUpWhiteHeader';
import { InputLabel } from '@material-ui/core';
import InputField from '../Atoms/InputField/InputField';
import Label from '../Atoms/Labels/Label';

const PopUpAssociateLinkSignIn = (props) => {
  const { isActive, headerPanelColour, headerOne, headerOneBadgeOne, onClick, onClose } = props;
  const [isCredentialsInValid, setIsCredentialsInValid] = useState('');
  const [isUserNameValid, setIsUserNameValid] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <Popup isActive={isActive}>
        <PopUpWhiteHeader
          headerPanelColour={headerPanelColour}
          headerOne={headerOne}
          headerOneBadgeOne={headerOneBadgeOne}
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
                    colour={isCredentialsInValid === 'in progress' ? 'green' : 'rgb(244, 67, 54)'}
                  />
                )}
              </div>
            </div>
          </>
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpAssociateLinkSignIn;
