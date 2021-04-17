import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import PopUpWhiteHeader from '../Molecules/PopUp/PopUpWhiteHeader';
import { FormControl, InputLabel } from '@material-ui/core';
import InputField from '../Atoms/InputField/InputField';
import InfoToolTip from '../Atoms/InfoToolTip/InfoToolTip';

const PopUpAdministratorSignInPasswordRevise = (props) => {
  const {
    isActive,
    headerPanelColour,
    headerOne,
    headerOneBadgeOne = '',
    headerOneBadgeTwo = '',
    onClick,
    onClose,
    oldPassword,
    oldPasswordError,
    setOldPassword,
    newPassword,
    newPasswordError,
    setNewPassword,
    confirmRevisedPassword,
    confirmRevisedPasswordError,
    setConfirmRevisedPassword,
    setConfirmRevisedPasswordError,
    setNewPasswordError,
    setOldPasswordError
  } = props;

  return (
    <div>
      <Popup isActive={isActive}>
        <PopUpWhiteHeader
          headerPanelColour={headerPanelColour}
          headerOne={headerOne}
          headerOneBadgeOne={headerOneBadgeOne}
          headerOneBadgeTwo={headerOneBadgeTwo}
          mode={'core'}
          onClick={onClick}
          onClose={onClose}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <div className={'fitContent'}>
            <div className={['PopupFormBox', 'labelPopupBox', 'popupMinHei'].join(' ')}>
              <InputLabel htmlFor="name-input" className={'textForLabelPopup'}>
                {/* <span>{inputHeader}&nbsp;</span> */}
              </InputLabel>
              <div className={'infoSymbol'}></div>
              <div className={'infoSymbol'}>
                <InfoToolTip message="Click me, I will stay visible until you click outside." />
              </div>
            </div>
          </div>
          <FormControl style={{ width: '100%' }}>
            <InputField
              id={'current password'}
              value={oldPassword}
              label={'current password'}
              type="password"
              errorMsg={oldPasswordError}
              onClick={(e) => {
                setOldPassword(e.target.value)
                setOldPasswordError('');
              }}
            />
            <InputField
              id={'revised password'}
              value={newPassword}
              type="password"
              label={'revised password'}
              errorMsg={newPasswordError}
              onClick={(e) => {
                setNewPassword(e.target.value)
                setNewPasswordError('');
              }}
            />
            <InputField
              id={'revised password'}
              value={confirmRevisedPassword}
              type="password"
              label={'revised password'}
              errorMsg={confirmRevisedPasswordError}
              onClick={(e) => {
                setConfirmRevisedPassword(e.target.value)
                setConfirmRevisedPasswordError('');
              }}
            />
          </FormControl>
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpAdministratorSignInPasswordRevise;
