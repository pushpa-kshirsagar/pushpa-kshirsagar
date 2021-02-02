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
import { SET_NEXT_POPUP, UPDATE_ASSESSEE_INFO } from '../actionType';

const PopUpAddress = (props) => {
  const { popupMode } = useSelector((state) => state.popUpReducer);
  const dispatch = useDispatch();
  const basicInfo = useSelector((state) => state.CreateAssesseeReducer);
  const {
    isActive,
    primaryheader,
    inputHeader,
    headerPanelColour,
    headerOne,
    headerOneBadgeOne
  } = props;
  const handleChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    dispatch({ type: UPDATE_ASSESSEE_INFO, payload: { ...basicInfo, [name]: value } });
  };
  const handleClick = () => {
    /*according to creation mode popup sequence will change*/
    if (popupMode === 'ASSOCIATE_SIGN_ON') {
      dispatch({ type: SET_NEXT_POPUP, payload: { isPopUpValue: 'WORKTELEPHONE' } });
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
              listSelect={['India', 'USA']}
              errorMsg={''}
              onChange={handleChange}
              value={basicInfo.countryCode}
            />
            <SelectField
              tag={'stateCode'}
              label={'province / state'}
              listSelect={['Maharashtra', 'Karnataka']}
              errorMsg={''}
              onChange={handleChange}
              value={basicInfo.stateCode}
            />

            <InputFeild
              id={'postcode'}
              label={'postcode / zip'}
              value={basicInfo.postcode}
              errorMsg={''}
              onClick={handleChange}
            />
            <SelectField
              tag={'cityCode'}
              label={'province / state'}
              listSelect={['Mumbai', 'Pune']}
              errorMsg={''}
              onChange={handleChange}
              value={basicInfo.cityCode}
            />
            <InputFeild
              id={'address'}
              label={'address'}
              value={basicInfo.address}
              errorMsg={''}
              onClick={handleChange}
            />
            <div className={'fitContent'}>
              <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
                <div className={'contFlex'}>
                  <div className={'f4'}>communication</div>
                  <div className={'checkedFontNew'}>
                    <Checkbox className={''} color="default" />
                  </div>
                </div>
              </div>
            </div>
            <div className={'fitContent'}>
              <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
                <div className={'contFlex'}>
                  <div className={'f4'}>verification</div>
                  <div className={'checkedFontNew'}>
                    <Checkbox className={''} color="default" />
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
