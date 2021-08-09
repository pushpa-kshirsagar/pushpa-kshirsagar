import React, { useEffect, useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import FormControl from '@material-ui/core/FormControl';
import InputFeild from '../Atoms/InputField/InputField';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import '../Molecules/PopUp/PopUp.css';
import { useDispatch, useSelector } from 'react-redux';
import { POPUP_CLOSE, SET_NEXT_POPUP } from '../actionType';
import PropTypes from 'prop-types';
import { REQUIRED_ERROR_MESSAGE } from '../errorMessage';

const PopUpTextField = (props) => {
  const dispatch = useDispatch();
  const { popupMode } = useSelector((state) => state.PopUpReducer);
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  const {
    headerPanelColour = '',
    headerOne = '',
    headerOneBadgeOne = '',
    headerOneBadgeTwo = '',
    isActive = false,
    isRequired = false,
    label = '',
    nextPopUpValue = '',
    basicInfo,
    typeOfSetObject,
    actualLableValue,
    labelBadgeOne = '',
    mode,
    type = 'text',
    isNotRevised = false,
    inputHeader = '',
    inputHeaderBadgeOne = '',
    inputHeaderBadgeTwo = ''
  } = props;
  let errorMessage = isNotRevised ? 'this information cannot be revised' : '';
  const [state, setState] = useState({
    error: errorMessage,
    isVerified: true
  });
  const [localObject, setLocalObject] = useState(basicInfo);
  useEffect(() => {
    setLocalObject(basicInfo);
  }, [basicInfo]);

  const validateFun = () => {
    let isValidate = true;
    if (isRequired) {
      if (localObject) {
        if (localObject[actualLableValue] === '') {
          setState((prevState) => ({ ...prevState, error: REQUIRED_ERROR_MESSAGE }));
          return false;
        }
      }
    }
    return isValidate;
  };
  const handleChange = (event) => {
    if (!isNotRevised) {
      const { name, value } = event.target;
      dispatch({ type: typeOfSetObject, payload: { ...basicInfo, [name]: value } });
      setLocalObject({ ...basicInfo, [name]: value });
      setState((prevState) => ({
        ...prevState,
        error: '',
        isVerified: false
      }));
    }
  };
  const handleClick = () => {
    /*according to creation mode popup sequence will change*/
    if (validateFun() && !isNotRevised) {
      dispatch({ type: typeOfSetObject, payload: { ...localObject } });
      if (reviewMode === 'revise') {
        dispatch({ type: POPUP_CLOSE });
      } else {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: nextPopUpValue } });
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
          headerOneBadgeTwo={headerOneBadgeTwo}
          headerOneBadgeThree={''}
          onClick={handleClick}
          mode={mode}
          isNotRevised={isNotRevised}
        />
        <DialogContent
          className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
        >
          {inputHeader !== '' && (
            <div className={'fitContent'}>
              <div className={['PopupFormBox', 'labelPopupBox', 'popupMinHei'].join(' ')}>
                <InputLabel htmlFor="name-input" className={'textForLabelPopup'}>
                  <>
                    {inputHeader}&nbsp;
                    {inputHeaderBadgeOne ? (
                      <span className={'headerBadge'}>{inputHeaderBadgeOne}</span>
                    ) : null}
                    &nbsp;
                    {inputHeaderBadgeTwo ? (
                      <span className={'headerBadge'}>{inputHeaderBadgeTwo}</span>
                    ) : null}
                  </>
                </InputLabel>
                <div className={'infoSymbol'}></div>
                <div className={'infoSymbol'}>{/* <InfoToolTip message={infoMsg} /> */}</div>
              </div>
            </div>
          )}
          <FormControl style={{ width: '100%' }}>
            <InputFeild
              id={actualLableValue}
              label={label}
              type={type}
              value={basicInfo && isNotRevised ? basicInfo : localObject[actualLableValue]}
              onClick={handleChange}
              errorMsg={state.error}
              labelBadgeOne={labelBadgeOne}
            />
          </FormControl>
          {(label === 'name' || labelBadgeOne === 'statutory' || label === 'website address') && (
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

PopUpTextField.propTypes = {
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
export default PopUpTextField;
