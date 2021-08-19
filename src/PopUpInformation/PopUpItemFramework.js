import React, { Fragment, useEffect, useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import { InputLabel, FormControl, Checkbox } from '@material-ui/core';
import InputFeild from '../Atoms/InputField/InputField';
import SelectField from '../Atoms/SelectField/SelectField';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  POPUP_CLOSE,
  SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
  SET_NEXT_POPUP
} from '../actionType';
import InfoToolTip from '../Atoms/InfoToolTip/InfoToolTip';
import { REQUIRED_ERROR_MESSAGE } from '../errorMessage';
import { input } from 'aws-amplify';

const PopUpItemFramework = (props) => {
  const { popupMode } = useSelector((state) => state.PopUpReducer);
  const dispatch = useDispatch();
  const { itemInformation } = useSelector((state) => state.ItemCreateReducer);
  const itemFrameworkOneResponseChoice =
    itemInformation?.informationFramework?.itemFrameworkOne?.itemFrameworkOneResponseChoice || [];
  const itemFrameworkOne = itemInformation?.informationFramework.itemFrameworkOne;
  const {
    isActive,
    primaryheader,
    primaryheaderTwo = '',
    inputHeader,
    headerPanelColour,
    headerOne,
    headerOneBadgeOne,
    headerOneBadgeTwo = '',
    choiceOb = null,
    basicInfo,
    mode,
    isItemFramework = false,
    subQuestionId
  } = props;
  const [blank, setBlank] = useState('');
  const [classification, setclassification] = useState('');
  const [level, setlevel] = useState(null);
  const [polarity, setpolarity] = useState('');
  const [score, setscore] = useState();
  const [scale, setscale] = useState('');
  const [time, settime] = useState('');
  const [weightage, setweightage] = useState('');
  // console.log('ITEM ', itemFrameworkOneResponseChoice, choiceOb);
  // console.log('Choice ob ', choiceOb);
  useEffect(() =>{
    if(subQuestionId){
      let subques = itemFrameworkOne.itemFrameworkOneSection.filter(function (sub) {
        return sub.itemFrameworkOneSectionSequence === subQuestionId;
      });
      setscore(subques[0]?.itemFrameworkOneSection?.itemFrameworkOneScore);
    }
  },[subQuestionId]);
  const handleClick = () => {
    // alert(subQuestionId);
    console.log(
      blank,
      classification,
      level,
      polarity,
      score,
      scale,
      time,
      weightage,
      isItemFramework
    );
    if (isItemFramework) {
      dispatch({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: { stateName: 'itemFrameworkOneBlank', value: blank }
      });
      dispatch({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: { stateName: 'itemFrameworkOneLevel', value: level }
      });
      dispatch({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: { stateName: 'itemFrameworkOnePolarity', value: polarity }
      });
      dispatch({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: { stateName: 'itemFrameworkOneScore', value: parseInt(score) }
      });
      dispatch({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: { stateName: 'itemFrameworkOneTime', value: time }
      });
      dispatch({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: { stateName: 'itemFrameworkOneWeightage', value: weightage }
      });
    } else if (subQuestionId) {
      let opArr = itemFrameworkOne?.itemFrameworkOneSection;
      opArr.forEach((element) => {
        if (element.itemFrameworkOneSectionSequence === subQuestionId) {
          element.itemFrameworkOneSection.itemFrameworkOnePolarity = polarity;
          element.itemFrameworkOneSection.itemFrameworkOneWeightage = weightage;
          element.itemFrameworkOneSection.itemFrameworkOneScore = weightage;
        }
      });
      dispatch({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'itemFrameworkOneSection',
          value: opArr
        }
      });
    } else {
      if (choiceOb !== null) {
        let tempArr = itemFrameworkOneResponseChoice;
        tempArr.forEach((element) => {
          if (element.itemFrameworkOneResponseChoice === choiceOb.itemFrameworkOneResponseChoice) {
            element.itemFrameworkOneResponseChoiceScore = parseInt(score);
            element.itemFrameworkOneResponseChoiceWeightage = weightage;
            element.itemFrameworkOneResponseChoicePolarity = polarity;
          }
        });
        dispatch({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
          payload: {
            stateName: 'itemFrameworkOneResponseChoice',
            value: tempArr
          }
        });
      }
    }
    // setBlank(blank);
    // setlevel(level);
    // setweightage(weightage);
    // setscore(score);
    // setscale(scale);
    // settime(time);
    // setpolarity(polarity);
    dispatch({ type: POPUP_CLOSE });
  };

  return (
    <div>
      <Popup isActive={isActive}>
        <PopupHeader
          headerPanelColour={headerPanelColour}
          headerOne={headerOne}
          headerOneBadgeOne={headerOneBadgeOne}
          headerOneBadgeTwo={headerOneBadgeTwo}
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
                  {primaryheader ? (
                    <>
                      <span className={'headerBadge'}>{primaryheader}</span>&nbsp;
                    </>
                  ) : null}
                  {primaryheaderTwo ? (
                    <span className={'headerBadge'}>{primaryheaderTwo}</span>
                  ) : null}
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
                tag={'classification'}
                label={'classification'}
                dataValue={'classification'}
                listSelect={[
                  { id: '', name: '' },
                  { id: 'Simple-Sample1', name: 'Simple Sample' },
                  { id: 'Simple-Sample2', name: 'Simple Sample' },
                  { id: 'Simple-Sample3', name: 'Simple Sample' }
                ]}
                errorMsg={() => {}}
                onChange={(e) => {
                  setclassification(e.target.value);
                }}
                value={classification}
                mappingValue={'id'}
              />
            )}
            {isItemFramework && (
              <SelectField
                tag={'level'}
                label={'level'}
                dataValue={'level'}
                listSelect={[
                  { id: '', name: '' },
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
                { id: '', name: '' },
                { id: 'Negative', name: 'Negative' },
                { id: 'Positive', name: 'Positive' }
              ]}
              errorMsg={() => {}}
              onChange={(e) => {
                setpolarity(e.target.value);
              }}
              value={polarity}
              mappingValue={'id'}
            />
            {isItemFramework && (
              <SelectField
                tag={'scale'}
                label={'scale'}
                dataValue={'scale'}
                listSelect={[
                  { id: '', name: '' },
                  { id: 'Simple-Sample1', name: 'Simple Sample' },
                  { id: 'Simple-Sample2', name: 'Simple Sample' },
                  { id: 'Simple-Sample3', name: 'Simple Sample' }
                ]}
                errorMsg={() => {}}
                onChange={(e) => {
                  setscale(e.target.value);
                }}
                value={scale}
                mappingValue={'id'}
              />
            )}
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
