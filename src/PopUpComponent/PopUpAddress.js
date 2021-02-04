import React, { Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/Popup/Popup';
import PopupHeader from '../Molecules/Popup/PopupHeader';
import { InputLabel, FormControl, Checkbox } from '@material-ui/core';
import InputFeild from '../Atoms/InputField/InputField';
import SelectField from '../Atoms/SelectField/SelectField';
import '../Molecules/Popup/Popup.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NEXT_POPUP } from '../actionType';

const PopUpAddress = (props) => {
  const { popupMode } = useSelector((state) => state.popUpReducer);
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
    basicInfo
  } = props;
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: typeOfSetObject, payload: { ...basicInfo, [name]: value } });
  };
  const handleClick = () => {
    /*according to creation mode popup sequence will change*/
    dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: nextPopUpValue } });
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
              errorMsg={''}
              onChange={handleChange}
              value={basicInfo && basicInfo.countryCode}
              mappingValue={'countryCode'}
            />
            <SelectField
              tag={'stateCode'}
              label={'province / state'}
              listSelect={[
                { stateCode: '211', name: 'Maharashtra' },
                { stateCode: '234', name: 'Karnataka' }
              ]}
              errorMsg={''}
              onChange={handleChange}
              mappingValue={'stateCode'}
              value={basicInfo && basicInfo.stateCode}
            />

            <InputFeild
              id={'postCode'}
              label={'postcode / zip'}
              value={basicInfo && basicInfo.postCode}
              errorMsg={''}
              onClick={handleChange}
            />
            <SelectField
              tag={'cityCode'}
              label={'city'}
              listSelect={[
                { cityCode: '345', name: 'Mumbai' },
                { cityCode: '345', name: 'Pune' }
              ]}
              mappingValue={'cityCode'}
              errorMsg={''}
              onChange={handleChange}
              value={basicInfo && basicInfo.cityCode}
            />
            <InputFeild
              id={'address'}
              label={'address'}
              value={basicInfo && basicInfo.address}
              errorMsg={''}
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
