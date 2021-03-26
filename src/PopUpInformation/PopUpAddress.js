import React, { Fragment, useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import { InputLabel, FormControl, Checkbox } from '@material-ui/core';
import InputFeild from '../Atoms/InputField/InputField';
import SelectField from '../Atoms/SelectField/SelectField';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NEXT_POPUP } from '../actionType';
import InfoToolTip from '../Atoms/InfoToolTip/InfoToolTip';
import { REQUIRED_ERROR_MESSAGE } from '../errorMessage';

const PopUpAddress = (props) => {
  const { popupMode } = useSelector((state) => state.PopUpReducer);
  const dispatch = useDispatch();
  const {
    isActive,
    primaryheader,
    inputHeader,
    headerPanelColour,
    headerOne,
    headerOneBadgeOne,
    nextPopUpValue,
    typeOfSetObject,
    basicInfo,
    isRequired = false
  } = props;
  const objectKeys = Object.keys(basicInfo);

  const [countryErr, setCountryErr] = useState('');
  const [stateErr, setStateErr] = useState('');
  const [zipcodeErr, setZipcodeErr] = useState('');
  const [cityErr, setCityErr] = useState('');
  const [addressErr, setAddressErr] = useState('');

  const validateFun = () => {
    let isValidate = true;
    if (basicInfo && basicInfo[objectKeys[4]] === '') {
      setAddressErr(REQUIRED_ERROR_MESSAGE);
      isValidate = false;
    }
    if (basicInfo && basicInfo[objectKeys[3]] === '') {
      setCityErr(REQUIRED_ERROR_MESSAGE);
      isValidate = false;
    }
    if (basicInfo && basicInfo[objectKeys[0]] === '') {
      setCountryErr(REQUIRED_ERROR_MESSAGE);
      isValidate = false;
    }
    if (basicInfo && basicInfo[objectKeys[2]] === '') {
      setZipcodeErr(REQUIRED_ERROR_MESSAGE);
      isValidate = false;
    }
    if (basicInfo && basicInfo[objectKeys[1]] === '') {
      setStateErr(REQUIRED_ERROR_MESSAGE);
      isValidate = false;
    }
    return isValidate;
  };
  const handleChange = (e) => {
    console.log(e);
    console.log(objectKeys.indexOf(e.target.name));
    console.log(e.currentTarget.getAttribute('data-value'));
    const { name, value } = e.target;
    if (objectKeys.indexOf(e.target.name) === 0) {
      setCountryErr('');
    }
    if (objectKeys.indexOf(e.target.name) === 1) {
      setStateErr('');
    }
    if (objectKeys.indexOf(e.target.name) === 2) {
      setZipcodeErr('');
    }
    if (objectKeys.indexOf(e.target.name) === 3) {
      setCityErr('');
    }
    if (objectKeys.indexOf(e.target.name) === 4) {
      setAddressErr('');
    }
    dispatch({ type: typeOfSetObject, payload: { ...basicInfo, [name]: value } });
  };
  const handleClick = () => {
    if (isRequired) {
      if (validateFun()) {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: nextPopUpValue } });
      }
    } else {
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
              </InputLabel>
              <div className={'infoSymbol'}></div>
              <div className={'infoSymbol'}>
                <InfoToolTip message="Click me, I will stay visible until you click outside." />
              </div>
            </div>
          </div>
          <FormControl style={{ width: '100%' }}>
            <SelectField
              tag={objectKeys[0]}
              label={'country / region'}
              dataValue={'country'}
              listSelect={[
                { countryCode: '91', name: 'India' },
                { countryCode: '22', name: 'USA' }
              ]}
              errorMsg={countryErr}
              onChange={handleChange}
              value={basicInfo && basicInfo[objectKeys[0]]}
              mappingValue={'countryCode'}
            />
            <SelectField
              tag={objectKeys[1]}
              label={'province / state'}
              listSelect={[
                { stateCode: '211', name: 'Maharashtra' },
                { stateCode: '234', name: 'Karnataka' }
              ]}
              errorMsg={stateErr}
              onChange={handleChange}
              mappingValue={'stateCode'}
              value={basicInfo && basicInfo[objectKeys[1]]}
            />

            <InputFeild
              id={objectKeys[2]}
              label={'postcode / zip'}
              value={basicInfo && basicInfo[objectKeys[2]]}
              errorMsg={zipcodeErr}
              onClick={handleChange}
            />
            <SelectField
              tag={objectKeys[3]}
              label={'city'}
              listSelect={[
                { cityCode: '345', name: 'Mumbai' },
                { cityCode: '356', name: 'Pune' }
              ]}
              mappingValue={'cityCode'}
              errorMsg={cityErr}
              onChange={handleChange}
              value={basicInfo && basicInfo[objectKeys[3]]}
            />
            <InputFeild
              id={objectKeys[4]}
              label={'address'}
              value={basicInfo && basicInfo[objectKeys[4]]}
              errorMsg={addressErr}
              onClick={handleChange}
            />
            <div className={'fitContent'}>
              <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
                <div className={'contFlex'}>
                  <div
                    className={'f4'}
                    style={{ color: popupMode === 'ASSOCIATE_SIGN_ON' ? 'dimgray' : '' }}
                  >
                    communication
                  </div>
                  <div className={'checkedFontNew'}>
                    <Checkbox
                      className={''}
                      color="default"
                      disabled={popupMode === 'ASSOCIATE_SIGN_ON' ? true : false}
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
                    style={{ color: popupMode === 'ASSOCIATE_SIGN_ON' ? 'dimgray' : '' }}
                  >
                    verification
                  </div>
                  <div className={'checkedFontNew'}>
                    <Checkbox
                      className={''}
                      color="default"
                      disabled={popupMode === 'ASSOCIATE_SIGN_ON' ? true : false}
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

PopUpAddress.propTypes = {
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

export default PopUpAddress;
