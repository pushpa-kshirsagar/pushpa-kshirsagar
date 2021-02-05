import React, { useState, Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/Popup/Popup';
import PopupHeader from '../Molecules/Popup/PopupHeader';
import { InputLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import '../Molecules/Popup/Popup.css';
import InputFeild from '../Atoms/InputField/InputField';
import SelectField from '../Atoms/SelectField/SelectField';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NEXT_POPUP } from '../actionType';
const PopUpAssesseeName = (props) => {
  const {
    inputHeader = '',
    headerPanelColour = '',
    errorMsg = '',
    headerOne = '',
    headerOneBadgeOne = '',
    isActive = false,
    basicInfo,
    nextPopUpValue = '',
    typeOfSetObject
  } = props;
  const dispatch = useDispatch();
  const [state, setState] = useState({
    nameFirstErr: '',
    nameLastErr: '',
    userNameverifyDisable: true
  });
  const { popupMode } = useSelector((state) => state.PopUpReducer);

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    dispatch({ type: typeOfSetObject, payload: { ...basicInfo, [name]: checked } });
  };
  const validate = () => {
    let isValidate = true;
    if (basicInfo) {
      if (basicInfo.nameFirst === '') {
        setState((prevState) => ({ ...prevState, nameFirstErr: 'this information is required' }));
        isValidate = false;
      }
      if (basicInfo.nameLast === '') {
        setState((prevState) => ({ ...prevState, nameLastErr: 'this information is required' }));
        isValidate = false;
      }
      return isValidate;
    } else return false;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: typeOfSetObject, payload: { ...basicInfo, [name]: value } });
    setState((prevState) => ({
      ...prevState,
      [name + 'Err']: '',
      userNameverifyDisable: false
    }));
  };
  const handleClick = () => {
    if (validate()) {
      /*according to creation mode popup sequence will change*/
      dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: nextPopUpValue } });
    }
  };
  return (
    <div>
      <Popup isActive={isActive}>
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
            tag={'namePrefix'}
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
            value={basicInfo && basicInfo.namePrefix}
          />
          <InputFeild
            id={'nameFirst'}
            label={'first name'}
            errorMsg={state.nameFirstErr}
            onClick={handleChange}
            value={basicInfo && basicInfo.nameFirst}
          />
          <InputFeild
            id={'nameOther'}
            label={'other name'}
            errorMsg={errorMsg}
            onClick={handleChange}
            value={basicInfo && basicInfo.nameOther}
          />
          <InputFeild
            id={'nameLast'}
            label={'last name'}
            errorMsg={state.nameLastErr}
            onClick={handleChange}
            value={basicInfo && basicInfo.nameLast}
          />
          <SelectField
            tag={'nameSuffix'}
            label={'suffix'}
            listSelect={[' ', 'Jr.', 'Sr.']}
            errorMsg={errorMsg}
            onChange={handleChange}
            value={basicInfo && basicInfo.suffix}
          />
          <div className={'fitContent'}>
            <div className={['PopupFormBox', 'popupMinHei0'].join(' ')}>
              <div className={'contFlex'}>
                <div
                  className={'f4'}
                  style={{
                    color:
                      popupMode === 'ASSESSEE_SIGN_ON' || state.userNameverifyDisable
                        ? 'dimgray'
                        : ''
                  }}
                >
                  verification
                </div>
                <div className={'checkedFontNew'}>
                  <Checkbox
                    className={''}
                    color="default"
                    name={'isNameVerified'}
                    checked={basicInfo && basicInfo.isNameVerified}
                    disableRipple={true}
                    onChange={handleCheckbox}
                    disabled={popupMode === 'ASSESSEE_SIGN_ON' ? true : state.userNameverifyDisable}
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

PopUpAssesseeName.propTypes = {
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

export default PopUpAssesseeName;
