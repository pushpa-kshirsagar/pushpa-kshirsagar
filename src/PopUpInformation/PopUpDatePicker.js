import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import { FormControl, Checkbox } from '@material-ui/core';
import InputFeild from '../Atoms/InputField/InputField';
import '../Molecules/PopUp/PopUp.css';
import '../Atoms/InputField/InputField.css';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { POPUP_CLOSE, SET_NEXT_POPUP, UPDATE_ASSESSEE_INFO } from '../actionType';

const PopUpDatePicker = (props) => {
  const { popupMode } = useSelector((state) => state.PopUpReducer);
  const dispatch = useDispatch();
  // const basicInfo = useSelector((state) => state.AssesseeCreateReducer);
  const {
    isActive,
    primaryheader = 'start',
    inputHeader = 'tenure',
    headerPanelColour = 'genericOne',
    headerOne = 'assessees',
    headerOneBadgeOne = 'information',
    valueState = 'tenure' + 'start',
    isVerification = false,
    typeOfSetObject,
    basicInfo,
    mode
  } = props;

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: typeOfSetObject, payload: { ...basicInfo, [name]: value } });
  };
  const handleClick = () => {
    /*according to creation mode popup sequence will change*/
    if (mode === 'revise') {
      dispatch({ type: POPUP_CLOSE });
    } else {
      if (popupMode === 'ASSESSEE_SIGN_ON') {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'NAMEPOPUP' } });
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
          mode={mode}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <FormControl style={{ width: '100%' }}>
            <InputFeild
              type={'date'}
              id={'assesseeBirthdate'}
              label={'Birthdate'}
              value={basicInfo[valueState]}
              defaultValue="mm/dd/yyyy"
              InputLabelProps={{
                shrink: false
              }}
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
