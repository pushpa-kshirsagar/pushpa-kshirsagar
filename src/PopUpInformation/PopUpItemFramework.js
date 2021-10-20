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
  SET_ASSESSMENT_FRAMEWORK_DYNAMIC_SINGLE_STATE
} from '../actionType';
import InfoToolTip from '../Atoms/InfoToolTip/InfoToolTip';

const PopUpItemFramework = (props) => {
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
    mode,
    isItemFramework = false,
    subQuestionId,
    //isAssessmentPreviewShow,
    itemFrameworkOne,
    itemFrameworkOneResponseChoice
  } = props;
  const dispatch = useDispatch();
  const { itemInformation } = useSelector((state) => state.ItemCreateReducer);
  const { itemConfigStates } = useSelector((state) => state.DisplayPaneTwoReducer);
  const { isAssessmentPreviewShow = false } = useSelector((state) => state.DisplayPaneThreeReducer);

  const { informationFramework } = useSelector((state) => state.AssessmentReducer);
  // // if(isAssessmentPreviewShow){
  //   const itemFrameworkOneResponseChoice =isAssessmentPreviewShow?informationFramework?.assessmentSection[currentItemIndex]?.assessmentSectionItemDistinct[currentItemIndex].itemFrameworkOne:
  //   itemInformation?.informationFramework?.itemFrameworkOne?.itemFrameworkOneResponseChoice || [];
  // const itemFrameworkOne = isAssessmentPreviewShow?informationFramework?.assessmentSection[currentItemIndex]?.assessmentSectionItemDistinct[currentItemIndex].itemFrameworkOne:
  // itemInformation?.informationFramework.itemFrameworkOne;
  // console.log(itemFrameworkOneResponseChoice);
  // console.log(itemFrameworkOne);

  // }else
  // {
  // const itemFrameworkOneResponseChoice =
  // itemInformation?.informationFramework?.itemFrameworkOne?.itemFrameworkOneResponseChoice || [];
  //const itemFrameworkOne = itemInformation?.informationFramework.itemFrameworkOne;
  // }

  const [blank, setBlank] = useState('');
  const [classification, setclassification] = useState([]);
  const [level, setlevel] = useState(null);
  const [polarity, setpolarity] = useState('');
  const [score, setscore] = useState(null);
  const [scale, setscale] = useState('');
  const [time, settime] = useState('');
  const [weightage, setweightage] = useState('');
  console.log('ITEM ', itemFrameworkOneResponseChoice, choiceOb);
  console.log('itemInformation ', itemInformation);
  console.log('itemConfigStates', itemConfigStates);
  useEffect(() => {
    if (subQuestionId) {
      let subques = itemFrameworkOne.itemFrameworkOneSection.filter(function (sub) {
        return sub.itemFrameworkOneSectionSequence === subQuestionId;
      });
      setscore(subques[0]?.itemFrameworkOneSection?.itemFrameworkOneScore);
    }
    if (itemFrameworkOne?.itemFrameworkOneCluster.length > 0) {
      let cluster = [];
      itemFrameworkOne?.itemFrameworkOneCluster.map((cc) => {
        cluster.push(cc.itemFrameworkOneClusterPrimary);
      });
      setclassification(cluster);
    }
    setlevel(itemFrameworkOne?.itemFrameworkOneLevel);
    setpolarity(itemFrameworkOne?.itemFrameworkOnePolarity);
    settime(itemFrameworkOne?.itemFrameworkOneTime);
  }, [subQuestionId, itemFrameworkOne?.itemFrameworkOneCluster]);
  const onChangeCluster = (event) => {
    const { value } = event.target;
    setclassification(typeof value === 'string' ? value.split(',') : value);
  };
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
      if (isAssessmentPreviewShow) {
        let reviseCluster = [];
        if (classification.length > 0) {
          reviseCluster = itemFrameworkOne.itemFrameworkOneGroupCluster.filter((clust) => {
            return classification.includes(clust.itemFrameworkOneClusterPrimary);
          });
        }
        dispatch({
          type: SET_ASSESSMENT_FRAMEWORK_DYNAMIC_SINGLE_STATE,
          payload: { stateName: 'itemFrameworkOneCluster', value: reviseCluster }
        });
        dispatch({
          type: SET_ASSESSMENT_FRAMEWORK_DYNAMIC_SINGLE_STATE,
          payload: { stateName: 'itemFrameworkOneBlank', value: blank }
        });
        dispatch({
          type: SET_ASSESSMENT_FRAMEWORK_DYNAMIC_SINGLE_STATE,
          payload: { stateName: 'itemFrameworkOneLevel', value: level }
        });
        dispatch({
          type: SET_ASSESSMENT_FRAMEWORK_DYNAMIC_SINGLE_STATE,
          payload: { stateName: 'itemFrameworkOnePolarity', value: polarity }
        });
        dispatch({
          type: SET_ASSESSMENT_FRAMEWORK_DYNAMIC_SINGLE_STATE,
          payload: { stateName: 'itemFrameworkOneScore', value: parseInt(score) }
        });
        dispatch({
          type: SET_ASSESSMENT_FRAMEWORK_DYNAMIC_SINGLE_STATE,
          payload: { stateName: 'itemFrameworkOneTime', value: time }
        });
        dispatch({
          type: SET_ASSESSMENT_FRAMEWORK_DYNAMIC_SINGLE_STATE,
          payload: { stateName: 'itemFrameworkOneWeightage', value: weightage }
        });
      } else {
        let reviseCluster = [];
        if (classification.length > 0) {
          reviseCluster = itemFrameworkOne.itemFrameworkOneGroupCluster.filter((clust) => {
            return classification.includes(clust.itemFrameworkOneClusterPrimary);
          });
        }
        dispatch({
          type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
          payload: { stateName: 'itemFrameworkOneCluster', value: reviseCluster }
        });
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
      }
    } else if (subQuestionId) {
      let opArr = itemFrameworkOne?.itemFrameworkOneSection;
      opArr.forEach((element) => {
        if (element.itemFrameworkOneSectionSequence === subQuestionId) {
          element.itemFrameworkOneSection.itemFrameworkOnePolarity = polarity;
          element.itemFrameworkOneSection.itemFrameworkOneWeightage = weightage;
          element.itemFrameworkOneSection.itemFrameworkOneScore = weightage;
        }
      });
      if (isAssessmentPreviewShow) {
        dispatch({
          type: SET_ASSESSMENT_FRAMEWORK_DYNAMIC_SINGLE_STATE,
          payload: {
            stateName: 'itemFrameworkOneSection',
            value: opArr
          }
        });
      } else {
        dispatch({
          type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
          payload: {
            stateName: 'itemFrameworkOneSection',
            value: opArr
          }
        });
      }
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
        if (isAssessmentPreviewShow) {
          dispatch({
            type: SET_ASSESSMENT_FRAMEWORK_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'itemFrameworkOneResponseChoice',
              value: tempArr
            }
          });
        } else {
          dispatch({
            type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
            payload: {
              stateName: 'itemFrameworkOneResponseChoice',
              value: tempArr
            }
          });
        }
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
            {isItemFramework && itemConfigStates.blankState && (
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
            {isItemFramework && itemConfigStates.classificationState && (
              <SelectField
                tag={'cluster'}
                label={'cluster'}
                dataValue={'cluster'}
                labelBadgeOne={'distinct'}
                listSelect={itemFrameworkOne?.itemFrameworkOneGroupCluster || []}
                errorMsg={() => {}}
                onChange={onChangeCluster}
                isMultiSelect={true}
                value={classification}
                mappingValue={'itemFrameworkOneClusterPrimary'}
              />
            )}
            {isItemFramework && itemConfigStates.levelState && (
              <SelectField
                tag={'level'}
                label={'level'}
                dataValue={'level'}
                listSelect={[
                  { id: '', name: '' },
                  { id: 'High', name: 'High' },
                  { id: 'Low', name: 'Low' },
                  { id: 'Medium', name: 'Medium' }
                ]}
                errorMsg={() => {}}
                onChange={(e) => {
                  setlevel(e.target.value);
                }}
                value={level}
                mappingValue={'id'}
              />
            )}
            {itemConfigStates.polarityState && (
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
            )}
            {itemConfigStates.scoreState && (
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
            )}

            {isItemFramework && itemConfigStates.timeState && (
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
            {itemConfigStates.weightageState && (
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
            )}
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
