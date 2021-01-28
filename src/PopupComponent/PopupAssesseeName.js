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
import { SET_NEXT_POPUP, UPDATE_ASSESSEE_INFO } from '../actionType';
import PropTypes from 'prop-types';

const PopupAssesseeName = (props) => {
  const { popupMode } = useSelector((state) => state.popUpReducer);
  const basicInfo = useSelector((state) => state.CreateAssesseeReducer);
  const [state, setState] = useState({
    nameFirstErr: '',
    nameLastErr: '',
    userNameverifyDisable: true
  });
  const dispatch = useDispatch();
  const {
    inputHeader = 'name',
    headerPanelColour = 'genericOne',
    errorMsg = '',
    headerOne = 'assessees',
    headerOneBadgeOne = 'information',
    isActive = false
  } = props;

  /* handling checkbox event for disable or enable*/
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setState((prevState) => ({ ...prevState, [name]: checked }));
  };
  /*handling the onchange event*/

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: UPDATE_ASSESSEE_INFO, payload: { ...basicInfo, [name]: value } });
    setState((prevState) => ({
      ...prevState,
      [name + 'Err']: '',
      userNameverifyDisable: false
    }));
  };
  /*this function for validation*/
  const validate = () => {
    let isValidate = true;
    if (basicInfo.nameFirst === '') {
      setState((prevState) => ({ ...prevState, nameFirstErr: 'this information is required' }));
      isValidate = false;
    }
    if (basicInfo.nameLast === '') {
      setState((prevState) => ({ ...prevState, nameLastErr: 'this information is required' }));
      isValidate = false;
    }
    return isValidate;
  };

  const handleClick = () => {
    if (validate()) {
      /*according to creation mode popup sequence will change*/
      if (popupMode === 'SIGNON') {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'ALIASPOPUP' } });
      }
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
            value={state.prefix}
          />
          <InputFeild
            id={'nameFirst'}
            label={'first name'}
            errorMsg={state.nameFirstErr}
            onClick={handleChange}
            value={basicInfo.nameFirst}
          />
          <InputFeild
            id={'nameOther'}
            label={'other name'}
            errorMsg={errorMsg}
            onClick={handleChange}
            value={state.nameOther}
          />
          <InputFeild
            id={'nameLast'}
            label={'last name'}
            errorMsg={state.nameLastErr}
            onClick={handleChange}
            value={basicInfo.nameLast}
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
                    name={'isNameVerified'}
                    checked={state.isNameVerified}
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

PopupAssesseeName.propTypes = {
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

export default PopupAssesseeName;
