import React, { Fragment, useEffect, useState } from 'react';
import ReactHTMLParser from 'react-html-parser';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ArrowRight from '@material-ui/icons/ChevronRight';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import HeaderCard from '../../Molecules/Header/HeaderCard';
import './DisplayPaneSeven.css';
import '../DisplayPaneFive/DisplayPaneFive.css';
import '../../Molecules/ReviewList/ReviewList.css';
import { useDispatch, useSelector } from 'react-redux';
import FooterIconTwo from '../../Molecules/FooterIcon/FooterIconTwo';
import PopUpAssessmentNavigator from '../../PopUpInformation/PopUpAssessmentNavigator';
import {
  POPUP_OPEN,
  SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
  SET_MOBILE_PANE_STATE,
  SET_POPUP_STATE
} from '../../actionType';
import { ASSESSMENT_FINISH_POPUP_OPTION } from '../../PopUpConfig';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { setAssesseeAssessmentItemSaveResCall } from '../../Actions/ActionAssesseeAssessment';
import { useTimer } from 'react-timer-hook';
import { InputLabel, Paper } from '@material-ui/core';
import EditorTemplate from '../DisplayPaneFive/EditorTemplate';

const AssessmentTimer = ({ expiryTimestamp, timerFinished }) => {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: timerFinished
    // onExpire: () => {
    //   console.warn('onExpire called');
    // }
  });
  return (
    <div>
      <span>{hours < 10 ? '0' + hours : hours}</span>:
      <span>{minutes < 10 ? '0' + minutes : minutes}</span>:
      <span>{seconds < 10 ? '0' + seconds : seconds}</span>
    </div>
  );
};
const AssessmentHeader = (props) => {
  return (
    <Fragment>
      <Paper className={'dossierContainerTop'}>
        <div className="containerPadding sticky-header">
          <div style={{ height: '49px', padding: '0 5px', display: 'flex' }} className={''}>
            <div style={{ display: 'inline-block', flex: '2' }}>
              <div
                className={[
                  'midPaneInformation',
                  props.assessmentDesc !== '' ? null : 'aliasmiddle'
                ].join(' ')}
              >
                {props.assessmentName}
              </div>
              <div className={['midPaneLabel', 'textOverflow'].join(' ')}>
                {props.assessmentDesc}
              </div>
            </div>
            <div
              style={{ flex: '1', display: 'flex', alignItems: 'center' }}
              className="flex-center"
            >
              <span
                className={['unitFlex', 'assessmenetStatusText', 'AssesseeNotifyStatus'].join(' ')}
                style={{ textAlign: 'center' }}
              >
                <InputLabel
                  className={['iconsFooterLabelDefault1', 'AssesseeNotifyStatusLabel'].join(' ')}
                >
                  {1 + '/' + 2}
                </InputLabel>
                <InputLabel
                  className={['iconsFooterLabelDefault1', 'AssesseeNotifyStatusLabel'].join(' ')}
                >
                  {props.qnumber + '/' + props.totalQuestion}
                </InputLabel>
              </span>
            </div>
            <div
              style={{ flex: '1', display: 'flex', alignItems: 'center' }}
              className="flex-center"
            >
              {props.score}
            </div>
            <div
              style={{ flex: '1', display: 'flex', alignItems: 'center' }}
              className="flex-center"
            >
              {props.timer && (
                <span style={{}}>
                  <AssessmentTimer
                    expiryTimestamp={props.timer}
                    key={props.timer}
                    timerFinished={props.timerFinished}
                  />
                </span>
              )}
            </div>
            <div
              style={{ flex: '1', display: 'flex', alignItems: 'center' }}
              className="flex-center"
            >
              <IconButton onClick={props.onClickFlag} className={'assessmentFlagButton'}>
                {props.isQuestionFlaged ? (
                  <i className="fa fa-flag" style={{ color: '#ff6464' }}></i>
                ) : (
                  <i className="far fa-flag"></i>
                )}
              </IconButton>
            </div>
          </div>
        </div>
      </Paper>
      <hr className={'assessmentHeaderHr'} />
    </Fragment>
  );
};
export const DisplayPaneSeven = () => {
  const [isQuestionFlaged, setIsQuestionFlaged] = useState(false);
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [currentQuestionChoice, setcurrentQuestionChoice] = useState(0);
  const [itemTimeStart, setItemTimeStart] = useState(0);
  const [itemTimeId, setItemTimeId] = useState('');
  const { isDisplayPaneSixShow } = useSelector((state) => state.AssessmentReducer);
  const { selectedAssociateInfo } = useSelector((state) => state.DisplayPaneTwoReducer);
  const flagQuestion = () => {
    setIsQuestionFlaged((state) => !state);
  };
  const dispatch = useDispatch();
  const { FilterMode } = useSelector((state) => state.FilterReducer);
  const { isPopUpValue } = useSelector((state) => state.PopUpReducer);
  const { assesseeAssessmentStartData } = useSelector(
    (state) => state.AssesseeAssignmentAssessmentReducer
  );
  const time = new Date();
  const [timer, setTimer] = useState(time);
  const timerFinished = () => {
    let tempArr = ASSESSMENT_FINISH_POPUP_OPTION;
    tempArr = [tempArr[0], { ...tempArr[1], disabled: true }];
    dispatch({
      type: SET_POPUP_STATE,
      payload: {
        popupHeaderOne: 'assessment',
        popupHeaderOneBadgeOne: 'time-out',
        popupHeaderOneBadgeTwo: '',
        isPopUpValue: '',
        popupOpenType: 'primary',
        popupContentArrValue: tempArr
      }
    });
    dispatch({ type: POPUP_OPEN, payload: 'paneSevenPopup' });
    dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneSix' });
  };
  const onClickFooter = (e) => {
    let clickedval = e.currentTarget.getAttribute('data-value');
    let itemId = assesseeAssessmentStartData.assessmentItem[currentQuestionIndex].itemId;
    // let id = assesseeAssessmentStartData.assessmentItem[currentQuestionIndex].id;
    let assesseeId = assesseeAssessmentStartData.assesseeId;
    if (clickedval === 'next') {
      alert(itemId)
      setAssesseeAssessmentItemSaveResCall(
        selectedAssociateInfo,
        dispatch,
        assesseeAssessmentStartData,
        itemId,
        assesseeId,
        currentQuestionChoice,
        itemTimeStart
      );
      if (currentQuestionIndex < assesseeAssessmentStartData.assessmentItem.length - 1) {
        setcurrentQuestionIndex(currentQuestionIndex + 1);
        setcurrentQuestionChoice(null);
        setItemTimeStart(new Date().getTime());
      } else {
        dispatch({
          type: SET_POPUP_STATE,
          payload: {
            popupHeaderOne: 'assessment',
            popupHeaderOneBadgeOne: 'close',
            popupHeaderOneBadgeTwo: '',
            isPopUpValue: '',
            popupOpenType: 'primary',
            secondaryOptionCheckValue: 'assignment',
            popupContentArrValue: ASSESSMENT_FINISH_POPUP_OPTION,
            selectedTagValue: e.currentTarget.getAttribute('assignmentid'),
            selectedTagStatus: 'status'
          }
        });
        dispatch({
          type: SET_ASSESSEE_ASSESSMENT_DYNAMIC_STATE,
          payload: { stateName: 'assesseeAssessmentStartData', value: null }
        });
        dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneSix' });
        dispatch({ type: POPUP_OPEN, payload: 'paneSevenPopup' });
        setcurrentQuestionIndex(-1);
      }
    }
    // dispatch({ type: NAVIGATOR_MODE });
  };
  useEffect(() => {
    setItemTimeStart(new Date().getTime());
    const sec = assesseeAssessmentStartData?.assessmentTime / 1000;
    let tt = new Date();
    tt.setSeconds(tt.getSeconds() + sec);
    setTimer(tt);
  }, [assesseeAssessmentStartData]);
  const primaryIcon = [];
  const secondaryIcon = [
    { label: 'first', onClick: onClickFooter, Icon: FirstPage },
    { label: 'previous', onClick: onClickFooter, Icon: ArrowLeft },
    { label: 'next', onClick: onClickFooter, Icon: ArrowRight },
    { label: 'last', onClick: onClickFooter, Icon: LastPage }
  ];
  const handleRadioButton = (e) => {
    console.log(e.target.value);
    setcurrentQuestionChoice(e.target.value);
  };
  console.log('currentQuestionIndex', currentQuestionIndex);
  let itemObect = assesseeAssessmentStartData?.assessmentItem[currentQuestionIndex];
  console.log('itemObect', itemObect);
  return (
    <>
      <div>
        <HeaderCard
          className=""
          displayPane="five"
          headerOne={assesseeAssessmentStartData ? 'assessment' : null}
          headerOneBadgeOne=""
          headerPanelColour="green"
        />
      </div>
      {assesseeAssessmentStartData?.assessmentItem?.length > 0 && (
        <div className={'containerPadding'}>
          <AssessmentHeader
            qnumber={currentQuestionIndex + 1}
            totalQuestion={assesseeAssessmentStartData?.assessmentItem?.length}
            score={
              assesseeAssessmentStartData?.assessmentItem[currentQuestionIndex]
                .itemFrameworkOneScore
            }
            assessmentName={assesseeAssessmentStartData?.assessmentName}
            assessmentDesc={assesseeAssessmentStartData?.assessmentDescription}
            onClickFlag={flagQuestion}
            isQuestionFlaged={isQuestionFlaged}
            timerFinished={timerFinished}
            timer={timer}
          />
        </div>
      )}
      <div className="containerPadding displayPaneFive-main-container">
        {assesseeAssessmentStartData && (
          <Fragment>
            {/* item label */}
            {itemObect.itemFrameworkOneLabel?.itemFrameworkOneLabelMedia && (
              <div className={'innerpadding'}>
                <div className={['ex_container', 'ig-label'].join(' ')}>
                  <EditorTemplate
                    label={'itemFrameworkOneLabel'}
                    jsonData={itemObect?.itemFrameworkOneLabel?.itemFrameworkOneLabelMedia}
                  />
                </div>
              </div>
            )}
            {/* item */}
            {itemObect.itemFrameworkOneMedia !== '' && (
              <div className={'innerpadding'}>
                <div className={['ex_container'].join(' ')}>
                  <EditorTemplate
                    label={'itemFrameworkOneMedia'}
                    jsonData={itemObect?.itemFrameworkOneMedia}
                  />
                </div>
              </div>
            )}
            {/* item explanation */}
            {itemObect.itemFrameworkOneExplanation?.itemFrameworkOneExplanationMedia && (
              <div className={'innerpadding'}>
                <div className={['ex_container', 'ig-label'].join(' ')}>
                  <EditorTemplate
                    label={'itemFrameworkOneExplanation'}
                    jsonData={
                      itemObect?.itemFrameworkOneExplanation?.itemFrameworkOneExplanationMedia
                    }
                  />
                </div>
              </div>
            )}
            {/* response label */}
            {itemObect.itemFrameworkOneResponseLabel?.itemFrameworkOneResponseLabelMedia && (
              <div className={'innerpadding'}>
                <div className={['ex_container', 'ig-label'].join(' ')}>
                  <EditorTemplate
                    label={'itemFrameworkOneResponseLabel'}
                    jsonData={
                      itemObect?.itemFrameworkOneResponseLabel?.itemFrameworkOneResponseLabelMedia
                    }
                  />
                </div>
              </div>
            )}
            {/* response choices */}
            {itemObect.itemFrameworkOneResponseChoice.map((op, key) => {
              return (
                <Fragment>
                  {op.itemFrameworkOneResponseChoiceMedia !== '' && (
                    <div key={`op-${key}`}>
                      <div className="option-container ex_container" key={`option-${key}`}>
                        <div style={{ paddingRight: '5px', display: 'flex', alignItems: 'center' }}>
                          <input
                            type="radio"
                            name="option1"
                            style={{ cursor: 'pointer' }}
                            value={`${op.itemFrameworkOneResponseChoiceNumber}`}
                            onChange={handleRadioButton}
                            checked={
                              currentQuestionChoice === op.itemFrameworkOneResponseChoiceNumber
                            }
                          />
                        </div>

                        <div
                          className={['ig-itemGeneric '].join(' ')}
                          style={{
                            paddingLeft: '5px'
                          }}
                        >
                          <EditorTemplate
                            jsonData={op.itemFrameworkOneResponseChoiceMedia}
                            label={'itemFrameworkOneResponseChoiceMedia'}
                          />
                        </div>
                      </div>

                      <div>
                        {op.itemFrameworkOneResponseChoiceExplanation
                          ?.itemFrameworkOneResponseChoiceExplanationMedia && (
                          <div className={['ex_container', 'ig-explanation '].join(' ')}>
                            <EditorTemplate
                              jsonData={
                                op.itemFrameworkOneResponseChoiceExplanation
                                  ?.itemFrameworkOneResponseChoiceExplanationMedia
                              }
                              label={'itemFrameworkOneResponseChoiceExplanationMedia'}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Fragment>
              );
            })}
            {/* item explanation */}
            {itemObect?.itemFrameworkOneResponseExplanation
              ?.itemFrameworkOneResponseExplanationMedia !== '' && (
              <div className={'innerpadding'}>
                <div className={['ex_container', 'ig-explanation '].join(' ')}>
                  <EditorTemplate
                    jsonData={
                      itemObect?.itemFrameworkOneResponseExplanation
                        ?.itemFrameworkOneResponseExplanationMedia
                    }
                    label={'itemFrameworkOneResponseExplanationMedia'}
                  />
                </div>
              </div>
            )}
            <FooterIconTwo
              className={isDisplayPaneSixShow ? 'widthDisplayPaneFive' : 'fullWidth'}
              FilterModeEnable={false}
              FilterMode={FilterMode}
              onClick={onClickFooter}
              primaryIcon={primaryIcon}
              secondaryIcon={secondaryIcon}
            />
          </Fragment>
        )}
        {/* {assesseeAssessmentStartData && (
          <Fragment>
            {(assesseeAssessmentStartData.assessmentItem[currentQuestionIndex]
              .itemFrameworkOneType === '61090cace50cf61d5eb440ce' ||
              assesseeAssessmentStartData.assessmentItem[currentQuestionIndex]
                .itemFrameworkOneType === 'Response-Choice (Single-Select)') && (
              <div className="containerPadding sticky-header">
                <Fragment>
                  {currentQuestionIndex !== -1 && (
                    <div
                      style={{ minHeight: '55px' }}
                      dangerouslySetInnerHTML={{
                        __html:
                          assesseeAssessmentStartData.assessmentItem[currentQuestionIndex]
                            .itemFrameworkOneMedia
                      }}
                    ></div>
                  )}
                </Fragment>

                <div>
                  {assesseeAssessmentStartData.assessmentItem[
                    currentQuestionIndex
                  ].itemFrameworkOneResponseChoice.map((op, key) => {
                    return (
                      <Fragment>
                        <div key={`op-${key}`}>
                          <div className="option-container ex_container" key={`option-${key}`}>
                            <div
                              style={{ paddingRight: '5px', display: 'flex', alignItems: 'center' }}
                            >
                              <input
                                type="radio"
                                name="option1"
                                value={`${op.itemFrameworkOneResponseChoice}`}
                                checked={
                                  currentQuestionChoice === op.itemFrameworkOneResponseChoice
                                }
                                onChange={handleRadioButton}
                                style={{ cursor: 'pointer' }}
                              />
                            </div>

                            <div
                              style={{
                                paddingLeft: '5px'
                              }}
                              dangerouslySetInnerHTML={{
                                __html: op?.itemFrameworkOneResponseChoiceMedia
                              }}
                            ></div>
                          </div>

                          <div>
                            {op.itemFrameworkOneResponseChoiceExplanation
                              ?.itemFrameworkOneResponseChoiceExplanation && (
                              <div className="ex_container">
                                {ReactHTMLParser(
                                  op.itemFrameworkOneResponseChoiceExplanation
                                    ?.itemFrameworkOneResponseChoiceExplanation
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            )}
            
          </Fragment>
        )} */}
      </div>

      <PopUpAssessmentNavigator isActive={isPopUpValue === 'NavigatorPOPUP'} />
    </>
  );
};

export default DisplayPaneSeven;
