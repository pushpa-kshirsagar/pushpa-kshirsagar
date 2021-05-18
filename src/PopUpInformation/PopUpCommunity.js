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
import { POPUP_CLOSE, SET_NEXT_POPUP } from '../actionType';
import InfoToolTip from '../Atoms/InfoToolTip/InfoToolTip';
import { REQUIRED_ERROR_MESSAGE } from '../errorMessage';

const PopUpCommunity = (props) => {
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
    isRequired = false,
    mode
  } = props;
  const objectKeys = Object.keys(basicInfo);
  const { reviewMode } = useSelector((state) => state.DisplayPaneThreeReducer);

  const handleChange = (e) => {
    console.log(e);
    console.log(objectKeys.indexOf(e.target.name));
    console.log(e.currentTarget.getAttribute('data-value'));
    const { name, value } = e.target;
    dispatch({ type: typeOfSetObject, payload: { ...basicInfo, [name]: value } });
  };
  const handleClick = () => {
    if (reviewMode === 'revise') {
      dispatch({ type: POPUP_CLOSE });
    } else {
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
              onChange={handleChange}
              value={basicInfo && basicInfo[objectKeys[0]]}
              mappingValue={'countryCode'}
            />
            <SelectField
              tag={objectKeys[1]}
              label={`${primaryheader} community`}
              listSelect={[
                { stateCode: '01', name: 'Other Backward Class' },
                { stateCode: '02', name: 'Scheduled Class' },
                { stateCode: '03', name: 'Scheduled Tribe' },
                { stateCode: '04', name: 'Unlisted' }
              ]}
              onChange={handleChange}
              mappingValue={'name'}
              value={basicInfo && basicInfo[objectKeys[1]]}
            />
          </FormControl>
        </DialogContent>
      </Popup>
    </div>
  );
};

PopUpCommunity.propTypes = {
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

export default PopUpCommunity;
