import React, { Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/Popup/Popup';
import PopupHeader from '../Molecules/Popup/PopupHeader';
import { InputLabel, FormControl, Checkbox } from '@material-ui/core';
import InputFeild from '../Atoms/InputField/InputField';
import '../Molecules/Popup/Popup.css';
import '../Atoms/InputField/InputField.css';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NEXT_POPUP, UPDATE_ASSESSEE_INFO } from '../actionType';

const PopUpDatePicker = (props) => {
  const { popupMode } = useSelector((state) => state.popUpReducer);
  const dispatch = useDispatch();
  const basicInfo = useSelector((state) => state.CreateAssesseeReducer);
  console.log(basicInfo);
  console.log('basicInfo');
  const {
    isActive,
    primaryheader = 'start',
    inputHeader = 'tenure',
    headerPanelColour = 'genericOne',
    headerOne = 'assessees',
    headerOneBadgeOne = 'information',
    valueState = 'tenure' + 'start',
    isVerification = false
  } = props;

  const handleChange = (event) => {
    console.log(event);
    console.log(event.target);
    const { name, value } = event.target;
    dispatch({ type: UPDATE_ASSESSEE_INFO, payload: { ...basicInfo, [name]: value } });
  };
  const handleClick = () => {
    /*according to creation mode popup sequence will change*/
    if (popupMode === 'SIGNON') {
      dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'NAMEPOPUP' } });
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
          <FormControl style={{ width: '100%' }}>
            <InputFeild
              type={'datetime-local'}
              id={inputHeader + primaryheader}
              label={inputHeader + ' ' + primaryheader}
              value={basicInfo[valueState]}
              errorMsg={''}
              onClick={handleChange}
            />
            {isVerification && (
              <div className={'fitContent'}>
                <div
                  className={['PopupFormBox', 'popupMinHei0'].join(' ')}
                  style={{ minHeight: 0 }}
                >
                  <div className={'contFlex'}>
                    <div className={'f4'}>verification</div>
                    <div className={'checkedFontNew'}>
                      <Checkbox className={''} color="default" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </FormControl>
        </DialogContent>
      </Popup>
    </div>
  );
};

PopUpDatePicker.propTypes = {
  className: PropTypes.string,
  headerPanelColour: PropTypes.oneOf(['genericOne']),
  headerOne: PropTypes.string,
  headerOneBadgeOne: PropTypes.string,
  headerOneBadgeTwo: PropTypes.string,
  headerOneBadgeThree: PropTypes.string,
  isActive: PropTypes.bool
};

export default PopUpDatePicker;
