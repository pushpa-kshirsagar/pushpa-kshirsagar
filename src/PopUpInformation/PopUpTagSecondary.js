import React, { Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import { InputLabel, FormControl, Checkbox } from '@material-ui/core';
import InputFeild from '../Atoms/InputField/InputField';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { POPUP_CLOSE, SET_NEXT_POPUP, UPDATE_ASSESSEE_SETUP_PRIMARY_INFO } from '../actionType';

const PopUpTagSecondary = (props) => {
  const dispatch = useDispatch();
  const basicInfo = useSelector((state) => state.AssesseeCreateReducer);
  const {
    isActive,
    primaryheader = 'secondary',
    inputHeader = 'tag',
    headerPanelColour = 'genericOne',
    headerOne = 'assessees',
    headerOneBadgeOne = 'information',
    tagSecondary,
    checkboxValue = 'tag (secondary)',
    typeOfSetObject,
    signInSetup,
    mode
  } = props;
  const { popupMode } = useSelector((state) => state.PopUpReducer);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target);
    let tagsec = '';
    if (value === '') {
      tagsec = '';
    } else {
      tagsec = 'tag (secondary)';
    }
    dispatch({
      type: UPDATE_ASSESSEE_SETUP_PRIMARY_INFO,
      payload: { assesseeSignIn: tagsec }
    });
    dispatch({ type: typeOfSetObject, payload: { ...basicInfo, [name]: value } });
  };
  const handleCheckbox = (event) => {
    dispatch({
      type: UPDATE_ASSESSEE_SETUP_PRIMARY_INFO,
      payload: { assesseeSignIn: event.target.checked ? 'tag (secondary)' : '' }
    });
  };
  const handleClick = () => {
    /*according to creation mode popup sequence will change*/
    if (mode === 'revise') {
      dispatch({ type: POPUP_CLOSE });
    } else {
      if (signInSetup.assesseeSignIn === '') {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'FORCETOSELECTSIGNIN' } });
      } else {
        dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'CONFIRMATIONPOPUP' } });
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
          <FormControl
            style={{ width: '100%', flexDirection: 'row' }}
            className={['inputFields', 'tagInputs'].join(' ')}
          >
            <Fragment>
              <InputFeild
                id="date"
                name="date"
                type="text"
                value={'xxxxxx'}
                InputProps={{
                  readOnly: true,
                  maxLength: 6
                }}
              />
              <span>-</span>
              <div style={{ width: 'min-content' }}>
                <InputFeild
                  id="assesseeTagSecondary"
                  label={''}
                  type="text"
                  value={tagSecondary.assesseeTagSecondary}
                  onClick={handleChange}
                />
              </div>
            </Fragment>
          </FormControl>
          <div className={'fitContent'}>
            <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
              <div className={'contFlex'}>
                <div
                  className={'f4'}
                  style={{
                    color: signInSetup && signInSetup.assesseeSignIn !== checkboxValue && 'dimgray'
                  }}
                >
                  sign-in
                </div>
                <div className={'checkedFontNew'}>
                  <Checkbox
                    className={''}
                    color="default"
                    name={'assesseeSignIn'}
                    value={checkboxValue}
                    checked={
                      signInSetup
                        ? signInSetup.assesseeSignIn === checkboxValue &&
                          tagSecondary.assesseeTagSecondary !== ''
                          ? true
                          : false
                        : false
                    }
                    onChange={
                      popupMode !== 'ASSESSEE_SIGN_ON' &&
                      popupMode !== 'ASSOCIATE_SIGN_ON' &&
                      handleCheckbox
                    }
                    disabled={
                      popupMode !== 'ASSESSEE_SIGN_ON' && popupMode !== 'ASSOCIATE_SIGN_ON'
                        ? false
                        : true
                    }
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

PopUpTagSecondary.propTypes = {
  className: PropTypes.string,
  headerPanelColour: PropTypes.oneOf(['genericOne']),
  headerOne: PropTypes.string,
  headerOneBadgeOne: PropTypes.string,
  headerOneBadgeTwo: PropTypes.string,
  headerOneBadgeThree: PropTypes.string,
  isActive: PropTypes.bool
};

export default PopUpTagSecondary;
