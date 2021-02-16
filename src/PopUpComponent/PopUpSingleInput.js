import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import FormControl from '@material-ui/core/FormControl';
import InputFeild from '../Atoms/InputField/InputField';
import Checkbox from '@material-ui/core/Checkbox';
import '../Molecules/PopUp/PopUp.css';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NEXT_POPUP } from '../actionType';
import PropTypes from 'prop-types';

const PopUpSingleInput = (props) => {
  const dispatch = useDispatch();
  const { popupMode } = useSelector((state) => state.PopUpReducer);
  const {
    headerPanelColour = '',
    headerOne = '',
    headerOneBadgeOne = '',
    isActive = false,
    isRequired = false,
    label = '',
    nextPopUpValue = '',
    basicInfo,
    typeOfSetObject
  } = props;

  const [state, setState] = useState({
    error: '',
    isVerified: true
  });

  const validateFun = () => {
    let isValidate = true;
    if (isRequired) {
      if (basicInfo) {
        if (basicInfo[label] === '') {
          setState((prevState) => ({ ...prevState, error: 'this information is required' }));
          return false;
        }
      }
    }
    return isValidate;
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: typeOfSetObject, payload: { ...basicInfo, [name]: value } });
    setState((prevState) => ({
      ...prevState,
      error: '',
      isVerified: false
    }));
  };
  const handleClick = () => {
    /*according to creation mode popup sequence will change*/
    if (validateFun()) {
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
          headerOneBadgeTwo={''}
          headerOneBadgeThree={''}
          onClick={handleClick}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          <FormControl style={{ width: '100%' }}>
            <InputFeild
              id={label}
              label={label}
              value={basicInfo && basicInfo[label]}
              onClick={handleChange}
              errorMsg={state.error}
            />
          </FormControl>
          {label === 'name' && (
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
                      disableRipple={true}
                      disabled={popupMode === 'ASSOCIATE_SIGN_ON' ? true : false}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Popup>
    </div>
  );
};

PopUpSingleInput.propTypes = {
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
export default PopUpSingleInput;
