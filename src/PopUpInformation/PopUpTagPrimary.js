import React, { Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import { InputLabel, Checkbox } from '@material-ui/core';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_ASSESSEE_SETUP_PRIMARY_INFO } from '../actionType';

const PopUpTagPrimary = (props) => {
  const dispatch = useDispatch();
  const {
    isActive,
    primaryheader = 'primary',
    inputHeader = 'tag',
    headerPanelColour = 'genericOne',
    headerOne = 'assessees',
    headerOneBadgeOne = 'information',
    signInSetup,
    checkboxValue = 'tag (primary)',
    handleNextPopupValue
  } = props;
  const { popupMode } = useSelector((state) => state.PopUpReducer);

  const handleCheckbox = (event) => {
    dispatch({
      type: UPDATE_ASSESSEE_SETUP_PRIMARY_INFO,
      payload: { assesseeSignIn: event.target.checked ? 'tag (primary)' : '' }
    });
  };
  const handleClick = () => {
    /*according to creation mode popup sequence will change*/
    handleNextPopupValue();
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
          <div style={{ height: 'fit-content' }}>
            <div className={'PopupFormBox'} style={{ minHeight: 0 }}>
              <div className={'contFlex'}>
                <div className={'f9'} style={{ fontSize: '1.6rem !important' }}>
                  tag&nbsp;
                  <span className={'headerBadge'}>primary</span>
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
                        ? signInSetup.assesseeSignIn === checkboxValue
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

PopUpTagPrimary.propTypes = {
  className: PropTypes.string,
  headerPanelColour: PropTypes.oneOf(['genericOne']),
  headerOne: PropTypes.string,
  headerOneBadgeOne: PropTypes.string,
  headerOneBadgeTwo: PropTypes.string,
  headerOneBadgeThree: PropTypes.string,
  isActive: PropTypes.bool
};

export default PopUpTagPrimary;
