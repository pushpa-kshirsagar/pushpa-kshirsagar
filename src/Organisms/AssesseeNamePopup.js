import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/Popup/Popup';
import PopupHeader from '../Molecules/Popup/PopupHeader';
import { InputLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import '../Molecules/Popup/Popup.css';
import InputFeild from '../Atoms/InputField/InputField';
import SelectField from '../Atoms/SelectField/SelectField';
import { SET_NEXT_POPUP } from '../actionType';

const AssesseeNamePopup = (props) => {
  const { popupMode, isPopUpValue } = useSelector((state) => state.popUpReducer);
  const [state, setState] = useState({
    prefix: '',
    firstName: '',
    otherName: '',
    lastName: '',
    suffix: '',
    firstNameErr: '',
    lastNameErr: '',
    isVerification: false,
    userNameverifyDisable: true
  });
  const dispatch = useDispatch();
  const {
    inputHeader = 'name',
    headerPanelColour = 'genericOne',
    errorMsg = '',
    headerOne = 'assessees',
    headerOneBadgeOne = 'information',
    isOpen = false
  } = props;

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setState((prevState) => ({ ...prevState, [name]: checked }));
  };
  const handleChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      [name + 'Err']: '',
      userNameverifyDisable: false
    }));
  };
  const validate = () => {
    let isValidate = true;
    if (state.firstName === '') {
      setState((prevState) => ({ ...prevState, firstNameErr: 'this information is required' }));
      isValidate = false;
    }
    if (state.lastName === '') {
      setState((prevState) => ({ ...prevState, lastNameErr: 'this information is required' }));
      isValidate = false;
    }
    return isValidate;
  };
  const handleClick = () => {
    if (validate()) {
      if (popupMode === 'SIGNON') {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'ALIASPOPUP' } });
      }
    }
  };
  return (
    <div>
      <Popup isActive={isOpen}>
        <PopupHeader
          headerPanelColour={headerPanelColour}
          headerOne={headerOne}
          headerOneBadgeOne={headerOneBadgeOne}
          onClick={handleClick}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <div className={'fitContent'}>
            <div className={['PopupFormBox', 'labelPopupBox', 'popupMinHei'].join(' ')}>
              <InputLabel htmlFor="name-input" className={'textForLabelPopup'}>
                <Fragment>{inputHeader}&nbsp;</Fragment>
                <div className={'infoSymbol'}></div>
              </InputLabel>
            </div>
          </div>

          <SelectField
            tag={'prefix'}
            label={'prefix'}
            listSelect={[
              ' ',
              'Dr.',
              'Dr. (Mrs.)',
              'Mr',
              'Mrs.',
              'Ms.',
              'Prof.',
              'Prof (Mrs.)',
              'Rev. Jr.',
              'Rev. Sr.'
            ]}
            errorMsg={errorMsg}
            onChange={handleChange}
            value={state.prefix}
          />
          <InputFeild
            id={'firstName'}
            label={'first name'}
            errorMsg={state.firstNameErr}
            onClick={handleChange}
            value={state.firstName}
          />
          <InputFeild
            id={'otherName'}
            label={'other name'}
            errorMsg={errorMsg}
            onClick={handleChange}
            value={state.otherName}
          />
          <InputFeild
            id={'lastName'}
            label={'last name'}
            errorMsg={state.lastNameErr}
            onClick={handleChange}
            value={state.lastName}
          />
          <SelectField
            tag={'suffix'}
            name={'suffix'}
            label={'suffix'}
            listSelect={[' ', 'Jr.', 'Sr.']}
            errorMsg={errorMsg}
            onChange={handleChange}
            value={state.suffix}
          />
          <div className={'fitContent'}>
            <div className={['PopupFormBox', 'popupMinHei0'].join(' ')}>
              <div className={'contFlex'}>
                <div
                  className={'f4'}
                  style={{ color: state.userNameverifyDisable ? 'dimgray' : '' }}
                >
                  verification
                </div>
                <div className={'checkedFontNew'}>
                  <Checkbox
                    className={''}
                    color="default"
                    name={'isVerification'}
                    checked={state.isVerification}
                    disableRipple={true}
                    onChange={handleCheckbox}
                    disableFocusRipple={true}
                    disabled={state.userNameverifyDisable}
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Popup>
    </div>
  );
};

export default AssesseeNamePopup;
