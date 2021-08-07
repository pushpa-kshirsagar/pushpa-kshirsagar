import React, { Fragment, useEffect, useState } from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ArrowRight from '@material-ui/icons/ChevronRight';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import HeaderCard from '../../Molecules/Header/HeaderCard';
import './DisplayPaneSeven.css';
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
      <div style={{ height: '50px', padding: '0 5px', display: 'flex' }}>
        <div style={{ flex: '2' }} className="flex-center">
          <span style={{ fontWeight: 'bold' }}>{props.assessmentName}</span>
        </div>
        <div style={{ flex: '1' }} className="flex-center">
          <span style={{ fontWeight: 'bold' }}>{props.qnumber + '/' + props.totalQuestion}</span>
        </div>
        <div style={{ flex: '1' }} className="flex-center">
          <span style={{ fontWeight: 'bold' }}>{props.score}</span>
        </div>
        {/* <div style={{ flex: '1' }} className="flex-center">
          <IconButton>
            <RefreshIcon style={{ width: '20px', height: '20px', color: 'black' }} />
          </IconButton>
        </div> */}
        <div style={{ flex: '1' }} className="flex-center">
          {props.timer && (
            <span style={{ color: '#fff', fontWeight: 'bold' }}>
              <AssessmentTimer
                expiryTimestamp={props.timer}
                key={props.timer}
                timerFinished={props.timerFinished}
              />
            </span>
          )}
        </div>
        <div style={{ flex: '1' }} className="flex-center">
          <IconButton onClick={props.onClickFlag} className={'assessmentFlagButton'}>
            {props.isQuestionFlaged ? (
              <i className="fa fa-flag" style={{ color: '#ff6464' }}></i>
            ) : (
              <i className="far fa-flag"></i>
            )}
          </IconButton>
        </div>
      </div>
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

    if (clickedval === 'next') {
      setAssesseeAssessmentItemSaveResCall(
        selectedAssociateInfo,
        dispatch,
        assesseeAssessmentStartData,
        itemId,
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
  return (
    <>
      <div>
        <HeaderCard
          className=""
          displayPane="five"
          headerOne={'assessment'}
          headerOneBadgeOne=""
          headerPanelColour="green"
        />
      </div>
      <div className="containerPadding displayPaneFive-main-container">
        {assesseeAssessmentStartData && (
          <Fragment>
            <div className="containerPadding sticky-header">
              {assesseeAssessmentStartData?.assessmentItem?.length > 0 && (
                <AssessmentHeader
                  qnumber={currentQuestionIndex + 1}
                  totalQuestion={assesseeAssessmentStartData?.assessmentItem?.length}
                  score={
                    assesseeAssessmentStartData?.assessmentItem[currentQuestionIndex]
                      .itemFrameworkOneScore
                  }
                  assessmentName={assesseeAssessmentStartData?.assessmentName}
                  onClickFlag={flagQuestion}
                  isQuestionFlaged={isQuestionFlaged}
                  timerFinished={timerFinished}
                  timer={timer}
                />
              )}

              <Fragment>
                {currentQuestionIndex !== -1 && (
                  <div
                    style={{ height: '55px' }}
                    dangerouslySetInnerHTML={{
                      __html:
                        assesseeAssessmentStartData.assessmentItem[currentQuestionIndex]
                          .itemFrameworkOneMedia
                    }}
                  ></div>
                )}
              </Fragment>

              <div>
                <RadioGroup
                  name="option"
                  value={currentQuestionChoice}
                  onChange={handleRadioButton}
                >
                  {assesseeAssessmentStartData.assessmentItem[
                    currentQuestionIndex
                  ].itemFrameworkOneResponseChoice.map((item) => {
                    return (
                      <Fragment>
                        <FormControlLabel
                          value={item.itemFrameworkOneResponseChoice}
                          className={'assessmentRadioQuestion'}
                          control={<Radio color="black" />}
                          label={
                            <span
                              dangerouslySetInnerHTML={{
                                __html: item.itemFrameworkOneResponseChoiceMedia
                              }}
                            />
                          }
                        />
                      </Fragment>
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
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

        <PopUpAssessmentNavigator isActive={isPopUpValue === 'NavigatorPOPUP'} />
      </div>
    </>
  );
};

export default DisplayPaneSeven;
