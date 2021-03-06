import React, { useEffect, useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import { InputLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import '../Molecules/PopUp/PopUp.css';
import InputFeild from '../Atoms/InputField/InputField';
import SelectField from '../Atoms/SelectField/SelectField';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { POPUP_CLOSE, SET_NEXT_POPUP } from '../actionType';
import InfoToolTip from '../Atoms/InfoToolTip/InfoToolTip';
import { REQUIRED_ERROR_MESSAGE } from '../errorMessage';

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
    typeOfSetObject,
    mode
  } = props;
  const dispatch = useDispatch();
  const [state, setState] = useState({
    assesseeNameFirstErr: '',
    assesseeNameLastErr: '',
    userNameverifyDisable: true
  });
  const [localObject, setLocalObject] = useState(basicInfo);
  const { popupMode } = useSelector((state) => state.PopUpReducer);
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);
  useEffect(() => {
    setLocalObject(basicInfo);
  }, [basicInfo]);

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setLocalObject({ ...localObject, [name]: checked });
    // dispatch({ type: typeOfSetObject, payload: { ...basicInfo, [name]: checked } });
  };
  const validate = () => {
    let isValidate = true;

    if (localObject) {
      if (localObject.assesseeNameFirst === '') {
        setState((prevState) => ({
          ...prevState,
          assesseeNameFirstErr: REQUIRED_ERROR_MESSAGE
        }));
        isValidate = false;
      }
      if (localObject.assesseeNameLast === '') {
        setState((prevState) => ({
          ...prevState,
          assesseeNameLastErr: REQUIRED_ERROR_MESSAGE
        }));
        isValidate = false;
      }
      return isValidate;
    } else return false;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // dispatch({ type: typeOfSetObject, payload: { ...basicInfo, [name]: value } });
    setLocalObject({ ...localObject, [name]: value });
    setState((prevState) => ({
      ...prevState,
      [name + 'Err']: '',
      userNameverifyDisable: false
    }));
  };
  const handleClick = () => {
    if (validate()) {
      /*according to creation mode popup sequence will change*/
      Object.keys(localObject).map((k) =>
        typeof localObject[k] === 'string'
          ? (localObject[k] = localObject[k]?.trim())
          : localObject[k]
      );
      dispatch({ type: typeOfSetObject, payload: { ...localObject } });
      if (reviewMode === 'revise') {
        dispatch({ type: POPUP_CLOSE });
      } else {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: nextPopUpValue } });
      }
    }
  };
// console.log("LOCAL", localObject);

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
          <div className={'fitContent'}>
            <div className={['PopupFormBox', 'labelPopupBox', 'popupMinHei'].join(' ')}>
              <InputLabel htmlFor="name-input" className={'textForLabelPopup'}>
                <span>{inputHeader}&nbsp;</span>
              </InputLabel>
              <div className={'infoSymbol'}></div>
              <div className={'infoSymbol'}>
                <InfoToolTip message="Click me, I will stay visible until you click outside." />
              </div>
            </div>
          </div>

          <SelectField
            tag={'assesseeNamePrefix'}
            label={'prefix'}
            listSelect={[
              { name: ' ' },
              { name: 'Dr.' },
              { name: 'Dr. (Mrs.)' },
              { name: 'Mr.' },
              { name: 'Mrs.' },
              { name: 'Ms.' },
              { name: 'Prof.' },
              { name: 'Prof (Mrs.)' },
              { name: 'Rev. Jr.' },
              { name: 'Rev. Sr.' }
            ]}
            mappingValue={'name'}
            errorMsg={errorMsg}
            onChange={handleChange}
            value={localObject && localObject.assesseeNamePrefix}
          />
          <InputFeild
            id={'assesseeNameFirst'}
            label={'first name'}
            errorMsg={state.assesseeNameFirstErr}
            onClick={handleChange}
            value={localObject && localObject.assesseeNameFirst}
          />
          <InputFeild
            id={'assesseeNameOther'}
            label={'other name'}
            errorMsg={errorMsg}
            onClick={handleChange}
            value={localObject && localObject.assesseeNameOther}
          />
          <InputFeild
            id={'assesseeNameLast'}
            label={'last name'}
            errorMsg={state.assesseeNameLastErr}
            onClick={handleChange}
            value={localObject && localObject.assesseeNameLast}
          />
          <SelectField
            tag={'assesseeNameSuffix'}
            label={'suffix'}
            listSelect={[{ name: ' ' }, { name: 'Jr.' }, { name: 'Sr.' }]}
            mappingValue={'name'}
            errorMsg={errorMsg}
            onChange={handleChange}
            value={localObject && localObject.assesseeNameSuffix}
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
                    name={'assesseeNameVerification'}
                    checked={localObject && localObject.assesseeNameVerification}
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
