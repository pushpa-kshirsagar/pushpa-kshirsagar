import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import PopUpWhiteHeader from '../Molecules/PopUp/PopUpWhiteHeader';
import { FormControl, InputLabel } from '@material-ui/core';
import SelectField from '../Atoms/SelectField/SelectField';

const PopUpAdministratorSignInCredentialRevise = (props) => {
  const { isActive, headerPanelColour, headerOne, headerOneBadgeOne, onClick, onClose } = props;
  const signInOptions = [
    { name: 'Dajw3h8736582hsYfjdyst&' },
    { name: 'shivam.s@boppotechologies.com' },
    { name: 'simple.sample@gmail.com' },
    { name: '8006777221' },
    { name: '8877665698' }
  ];
  const [signIn, setSignIn] = useState(signInOptions[0].name);
  const handleChange = (event) => {
    const { value } = event.target;
    setSignIn(value);
  };

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
          <FormControl style={{ width: '100%' }}>
            <SelectField
              tag={'assesseeSignIn'}
              label={'credential'}
              listSelect={signInOptions}
              mappingValue={'name'}
              errorMsg={''}
              onChange={handleChange}
              value={signIn}
            />
          </FormControl>
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpAdministratorSignInCredentialRevise;
