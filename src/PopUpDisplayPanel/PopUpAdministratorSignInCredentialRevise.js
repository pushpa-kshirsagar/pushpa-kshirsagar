import React, { useEffect, useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import '../Molecules/PopUp/PopUp.css';
import PopUpWhiteHeader from '../Molecules/PopUp/PopUpWhiteHeader';
import { FormControl, InputLabel } from '@material-ui/core';
import SelectField from '../Atoms/SelectField/SelectField';
import { SET_SIGN_ON_SINGLE_STATE } from '../actionType';
import { useDispatch } from 'react-redux';

const PopUpAdministratorSignInCredentialRevise = (props) => {
  const {
    isActive,
    headerPanelColour,
    headerOne,
    headerOneBadgeOne,
    signInOptions = [],
    signValue,
    onClick,
    onClose
  } = props;
  const dispatch = useDispatch();
  const [signIn, setSignIn] = useState();
  const handleChange = (event) => {
    const { value } = event.target;
    // setSignIn(value);
    dispatch({
      type: SET_SIGN_ON_SINGLE_STATE,
      payload: {
        stateName: 'signInCredential',
        value: value
      }
    });
  };
  // useEffect(() => {
  //  setSignIn(signInOptions[0]);
  // }, []);

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
              errorMsg={''}
              onChange={handleChange}
              value={signValue === '' ? signInOptions[0] : signValue}
            />
          </FormControl>
        </DialogContent>
      </Popup>
    </div>
  );
};

export default PopUpAdministratorSignInCredentialRevise;
