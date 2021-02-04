import React, { useState, Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/Popup/Popup';
import PopupHeader from '../Molecules/Popup/PopupHeader';
import { InputLabel, FormControl, Checkbox } from '@material-ui/core';
import InputFeild from '../Atoms/InputField/InputField';
import SelectField from '../Atoms/SelectField/SelectField';
import '../Molecules/Popup/Popup.css';
import '../Atoms/InputField/InputField.css';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NEXT_POPUP, UPDATE_ASSESSEE_MOBILE_INFO } from '../actionType';

const PopUpMobileTelephone = (props) => {
  const { popupMode } = useSelector((state) => state.popUpReducer);
  const dispatch = useDispatch();

  const {
    isActive,
    primaryheader = '',
    inputHeader = '',
    headerPanelColour = '',
    headerOne = '',
    headerOneBadgeOne = '',
    nextPopUpValue,
    basicInfo
  } = props;

  const [state, setState] = useState({
    error: ''
  });
  const validate = () => {
    let isValidate = true;
    let regex = new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/);
    let mobilestr = basicInfo.mobileNumber;
    if (regex.test(mobilestr) === false && mobilestr !=='') {
      setState((prevState) => ({
        ...prevState,
        error: 'this information is incorrect'
      }));
      isValidate=false
    }
    return isValidate;
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      error: ''
    }));
    dispatch({ type: UPDATE_ASSESSEE_MOBILE_INFO, payload: { ...basicInfo, [name]: value } });
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
                <Fragment>
                  {inputHeader}&nbsp;
                  {primaryheader ? <span className={'headerBadge'}>{primaryheader}</span> : null}
                </Fragment>
                <div className={'infoSymbol'}></div>
              </InputLabel>
            </div>
          </div>
          <FormControl style={{ width: '100%' }}>
            <SelectField
              tag={'countryCode'}
              label={'country / region'}
              listSelect={[
                { countryCode: '91', name: 'India' },
                { countryCode: '22', name: 'USA' }
              ]}
              mappingValue={'countryCode'}
              errorMsg={''}
              onChange={handleChange}
              value={basicInfo.countryCode}
            />
            <InputFeild
              type={'text'}
              id={'mobileNumber'}
              label={'mobile number'}
              value={basicInfo.mobileNumber}
              errorMsg={state.error}
              onClick={handleChange}
            />
            <div className={'fitContent'}>
              <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
                <div className={'contFlex'}>
                  <div className={'f4'}>communication </div>
                  <div className={'checkedFontNew'}>
                    <Checkbox className={''} color="default" />
                  </div>
                </div>
              </div>
            </div>
            <div className={'fitContent'}>
              <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
                <div className={'contFlex'}>
                  <div className={'f4'}>verification</div>
                  <div className={'checkedFontNew'}>
                    <Checkbox className={''} color="default" />
                  </div>
                </div>
              </div>
            </div>
          </FormControl>
        </DialogContent>
      </Popup>
    </div>
  );
};

PopUpMobileTelephone.propTypes = {
  className: PropTypes.string,
  headerPanelColour: PropTypes.oneOf(['genericOne']),
  headerOne: PropTypes.string,
  headerOneBadgeOne: PropTypes.string,
  headerOneBadgeTwo: PropTypes.string,
  headerOneBadgeThree: PropTypes.string,
  isActive: PropTypes.bool
};

export default PopUpMobileTelephone;
