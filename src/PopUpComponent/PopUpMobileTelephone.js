import React, { useState, Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import { InputLabel, FormControl, Checkbox } from '@material-ui/core';
import InputFeild from '../Atoms/InputField/InputField';
import SelectField from '../Atoms/SelectField/SelectField';
import '../Molecules/PopUp/PopUp.css';
import '../Atoms/InputField/InputField.css';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NEXT_POPUP } from '../actionType';

const PopUpMobileTelephone = (props) => {
  const { popupMode } = useSelector((state) => state.PopUpReducer);
  const dispatch = useDispatch();

  const {
    isActive,
    primaryheader = '',
    inputHeader = '',
    headerPanelColour = '',
    headerOne = '',
    headerOneBadgeOne = '',
    nextPopUpValue,
    basicInfo,
    typeOfSetObject
  } = props;

  const [state, setState] = useState({
    error: ''
  });

  const validate = () => {
    let isValidate = true;
    /* validation of moile number but still its not required
   let regex = new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/);
    let mobilestr = basicInfo.mobileNumber;
    if (regex.test(mobilestr) === false && mobilestr !=='') {
      setState((prevState) => ({
        ...prevState,
        error: 'this information is incorrect'
      }));
      isValidate=false
    }*/
    return isValidate;
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      error: ''
    }));
    dispatch({ type: typeOfSetObject, payload: { ...basicInfo, [name]: value } });
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
              value={basicInfo && basicInfo.countryCode}
            />
            <InputFeild
              type={'text'}
              id={'mobileNumber'}
              label={'mobile number'}
              value={basicInfo && basicInfo.mobileNumber}
              errorMsg={state.error}
              onClick={handleChange}
            />
            <div className={'fitContent'}>
              <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
                <div className={'contFlex'}>
                  <div
                    className={'f4'}
                    style={{
                      color:
                        (basicInfo &&
                          basicInfo.countryCode === '' &&
                          basicInfo.mobileNumber === '') ||
                        popupMode === 'ASSOCIATE_SIGN_ON' ||
                        popupMode === 'ASSESSEE_SIGN_ON'
                          ? 'dimgray'
                          : ''
                    }}
                  >
                    communication
                  </div>
                  <div className={'checkedFontNew'}>
                    <Checkbox
                      className={''}
                      color="default"
                      disabled={
                        popupMode === 'ASSESSEE_SIGN_ON' ||
                        popupMode === 'ASSOCIATE_SIGN_ON' ||
                        (basicInfo && basicInfo.countryCode === '' && basicInfo.mobileNumber === '')
                          ? true
                          : false
                      }
                      checked={
                        basicInfo.countryCode !== '' && basicInfo.mobileNumber !== '' ? true : false
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={'fitContent'}>
              <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
                <div className={'contFlex'}>
                  <div
                    className={'f4'}
                    style={{
                      color:
                        popupMode === 'ASSESSEE_SIGN_ON' || popupMode === 'ASSOCIATE_SIGN_ON'
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
                      disabled={
                        popupMode === 'ASSESSEE_SIGN_ON' || popupMode === 'ASSOCIATE_SIGN_ON'
                          ? true
                          : false
                      }
                    />
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
