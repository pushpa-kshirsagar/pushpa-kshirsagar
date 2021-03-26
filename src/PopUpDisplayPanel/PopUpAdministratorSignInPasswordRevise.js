import React, { useState } from 'react';
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
    currentPassword,
    currentPasswordError,
    setCurrentPassword,
    revisedPassword,
    revisedPasswordError,
    setRevisedPassword,
    confirmRevisedPassword,
    confirmRevisedPasswordError,
    setConfirmRevisedPassword
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
              value={currentPassword}
              label={'current password'}
              type="password"
              errorMsg={currentPasswordError}
              onClick={(e) => {
                setCurrentPassword(e.target.value);
              }}
            />
            <InputField
              id={'revised password'}
              value={revisedPassword}
              type="password"
              label={'revised password'}
              errorMsg={revisedPasswordError}
              onClick={(e) => {
                setRevisedPassword(e.target.value);
              }}
            />
            <InputField
              id={'revised password'}
              value={confirmRevisedPassword}
              type="password"
              label={'revised password'}
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

export default PopUpAdministratorSignInPasswordRevise;
