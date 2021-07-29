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
import { input } from 'aws-amplify';

const PopUpItemFramework = (props) => {
  const { popupMode } = useSelector((state) => state.PopUpReducer);
  const dispatch = useDispatch();
  const {
    isActive,
    primaryheader,
    inputHeader,
    headerPanelColour,
    headerOne,
    headerOneBadgeOne,
    basicInfo,
    mode,
    isItemFramework = false
  } = props;

  const handleClick = () => {};
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
            {isItemFramework && (
              <InputFeild
                id={'blank'}
                label={'blank'}
                value={''}
                errorMsg={''}
                type={'number'}
                onClick={() => {}}
              />
            )}
            {isItemFramework && (
              <SelectField
                tag={'difficulty'}
                label={'difficulty'}
                dataValue={'difficulty'}
                listSelect={[
                  { id: 'Low', name: 'Low' },
                  { id: 'Medium', name: 'Medium' },
                  { id: 'High', name: 'High' }
                ]}
                errorMsg={() => {}}
                onChange={() => {}}
                value={''}
                mappingValue={'id'}
              />
            )}
            {isItemFramework && (
              <SelectField
                tag={'group'}
                label={'group'}
                dataValue={'group'}
                listSelect={[
                  { id: 'Simple-Sample1', name: 'Simple Sample' },
                  { id: 'Simple-Sample2', name: 'Simple Sample' },
                  { id: 'Simple-Sample3', name: 'Simple Sample' }
                ]}
                errorMsg={() => {}}
                onChange={() => {}}
                value={''}
                mappingValue={'id'}
              />
            )}
            <InputFeild
              id={'polarity'}
              label={'polarity'}
              value={''}
              errorMsg={''}
              onClick={() => {}}
            />
            <InputFeild id={'score'} label={'score'} value={''} errorMsg={''} onClick={() => {}} />
            {isItemFramework && (
              <InputFeild id={'time'} label={'time'} value={''} errorMsg={''} onClick={() => {}} />
            )}
            <InputFeild
              id={'weightage'}
              label={'weightage'}
              value={''}
              errorMsg={''}
              onClick={() => {}}
            />
          </FormControl>
        </DialogContent>
      </Popup>
    </div>
  );
};

PopUpItemFramework.propTypes = {
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

export default PopUpItemFramework;
