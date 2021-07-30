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
  const [blank, setBlank] = useState('');
  const [group, setgroup] = useState('');
  const [level, setlevel] = useState('');
  const [polarity, setpolarity] = useState('');
  const [score, setscore] = useState('');
  const [time, settime] = useState('');
  const [weightage, setweightage] = useState('');

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
                value={blank}
                errorMsg={''}
                type={'number'}
                onClick={(e) => {
                  setBlank(e.target.value);
                }}
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
                onChange={(e) => {
                  setgroup(e.target.value);
                }}
                value={group}
                mappingValue={'id'}
              />
            )}
            {isItemFramework && (
              <SelectField
                tag={'level'}
                label={'level'}
                dataValue={'level'}
                listSelect={[
                  { id: 'High-Level', name: 'High-Level' },
                  { id: 'Low-Level', name: 'Low-Level' },
                  { id: 'Mid-Level', name: 'Mid-Level' }
                ]}
                errorMsg={() => {}}
                onChange={(e) => {
                  setlevel(e.target.value);
                }}
                value={level}
                mappingValue={'id'}
              />
            )}
            <SelectField
              tag={'polarity'}
              label={'polarity'}
              dataValue={'polarity'}
              listSelect={[
                { id: 'negativel', name: 'Negative' },
                { id: 'positive', name: 'Positive' }
              ]}
              errorMsg={() => {}}
              onChange={(e) => {
                setpolarity(e.target.value);
              }}
              value={polarity}
              mappingValue={'id'}
            />
            <InputFeild
              id={'score'}
              label={'score'}
              value={score}
              errorMsg={''}
              type={'number'}
              onClick={(e) => {
                setscore(e.target.value);
              }}
            />
            {isItemFramework && (
              <InputFeild
                id={'time'}
                label={'time'}
                value={time}
                type={'number'}
                errorMsg={''}
                onClick={(e) => {
                  settime(e.target.value);
                }}
              />
            )}
            <InputFeild
              id={'weightage'}
              label={'weightage'}
              value={weightage}
              type={'number'}
              errorMsg={''}
              onClick={(e) => {
                setweightage(e.target.value);
              }}
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
